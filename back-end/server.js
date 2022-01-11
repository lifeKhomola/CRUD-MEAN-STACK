
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Issue = require('./models/model')

const app = express();
const router = express.Router();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); 

//connection to the database using mongoose connection

mongoose.connect('mongodb+srv://vhutshilo:Vhutshilo1@cluster0.hi4oc.mongodb.net/issues')
const connection = mongoose.connection;
connection.on('error',(error)=>{
    console.error()
});
connection.once('open',() =>{
    console.log('mondodb database connection successfully')
});


//endpoints
router.route('/issues').get((req,res) =>{
    Issue.find((err,issues) =>{
        if(err){
            console.log(err)
        }
        else{
            res.json(issues)
        }
    });
});

router.route('/issues/:id').get((req,res)=>{
    Issue.findById(req.params.id, (err,issue) =>{
        if(err)
        {
           console.log(err) 
        }else{
            res.json(issue)
        }
    });
});

router.route('/issues/add').post((req,res)=>{
    let issue = new Issue(req.body);
    issue.save()
        .then(issue =>{
            res.status(200).json({'issue': 'Added successfully'});
        })
        .catch(err =>{
            res.status(400).send('failed to create a new record')
        });
});

router.route('/issues/update/:id').post((req,res) => {
    Issue.findById(req.params.id, (err,issue)=>{
        if(!issue){
            return next (new Error('Could not load document'))
        }
        else{
            issue.title = req.body.title;
            issue.responsible = req.body.responsible;
            issue.description = req.body.description;
            issue.severity = req.body.severity;
            issue.status = req.body.status;

            issue.save().then(issue=>{
                res.json('update done');
            }).catch(err =>{
                res.status(400).send('update failed')
            }); 

        }
    })
})

router.route('/issues/delete/:id').get((req,res) =>{
    Issue.findByIdAndRemove({_id: req.params.id}, (err, issue)=>{
        if(err)
        {
            res.json(err);
        }
        else{
            res.json('remove successfully');
        }
    })
})

app.use('/', router);

const port = 4000;
app.listen(port, ()=>{
    console.log('Server Running on port:4000')
}
);