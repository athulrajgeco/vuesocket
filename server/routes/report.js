const express = require('express')
const cors = require('cors');

const month = [1,2,3,4,5]

let router = express.Router()
router.use(cors())
router.use(express.urlencoded({extended: false}))
router.use(express.json())

router.get('/monthly',(req,res)=>{
  console.log(req.query);
  res.json(month[req.query.date])
})

router.get('/yearly',(req,res)=>{
  console.log(req.query);
  let today = new Date()
  if (today.getMonth()< req.query.month) {
    res.json(-2)
  } else {
    res.json(6)
  }
})
module.exports = router
