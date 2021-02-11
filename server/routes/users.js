const express = require('express')
const cors = require('cors');

let router = express.Router()
router.use(cors())
router.use(express.urlencoded({extended: false}))
router.use(express.json())

const classes = ['101', '303', '507']

router.post('/login',(req, res)=>{
  console.log(req.body);
  let route = 'student'
  if(req.body.username.search('TR')==0){
    route = 'faculty'
  }
  res.send(route)
})

module.exports = router
