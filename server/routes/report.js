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

module.exports = router
