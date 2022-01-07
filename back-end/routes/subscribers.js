const express = require('express')
const subscriber = require('../models/subscriber')
const router = express.Router()
const Subscriber = require('../models/subscriber')

//getting all
router.get('/',async (req,res) =>{
    try{
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (err){
        //error 500 means there's an error on the server
        res.status(500).json.stringify({message: err.message})
    }

})

//getting one
router.get('/:id',getSubscriber,(req,res) =>{
   res.json(res.subscriber)
})
//creating one 
router.post('/',async (req,res) =>{
    const subscriber = new Subscriber({
        name: req.body.name,
        subscriberToChannel: req.body.subscriberToChannel
    })
    try{
        const newSubcriber = await subscriber.save()
        //201 means successful//created something
        res.status(201).json(newSubcriber)
    }catch(err){
        //something wrong with the user input
        res.status(400).json({message: err.message})
    }
})
//updating one
//put updates all the information the user gives
router.patch('/:id',getSubscriber,async (req,res) =>{
    if(req.body.name != null){
        res.subscriber.name = req.body.name
    }
    if(req.body.subscriberToChannel != null){
        res.subscriber.subscriberToChannel = req.body.subscriberToChannel
    }
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
        
    } catch (err) {
        res.status(400).json({message: err.message})
    }
    
})
//deleting on
router.delete('/:id',getSubscriber,async (req,res) =>{
   try{
       await res.subscriber.remove()
       res.json({message: "Deleted subscriber"})

   }catch (err) {
       res.status(500).json({message: err.message})

   }
})
//middleware function 
async function getSubscriber(req,res,next){
    let subscriber;
try{
    subscriber = await Subscriber.findById(req.params.id)
    if(subscriber == null)
    {
        //404 cannot find anything
        return res.status(404).json({message: 'cannot find subscriber'})
    }
}
catch (err){
    return res.status(500).json({message: err.message})
}
res.subscriber = subscriber
next();
}
module.exports = router;