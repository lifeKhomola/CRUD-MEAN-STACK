const express = require('express')
const router = express.Router()


//getting all
router.get('/',(req,res) =>{

})

//getting one
router.get('/:id',(req,res) =>{
    res.send('hello world')
})
//creating one 
router.post('/',(req,res) =>{
    
})
//updating one
//put updates all the information the user gives
router.patch('/:id',(req,res) =>{
    
})
//deleting on
router.delete('/:id',(req,res) =>{
    
})

module.exports = router;