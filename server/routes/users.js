const express = require('express')
const cors = require('cors');

let classList = [
  {
    sub: 'Programming',
    fac: 'Prof. Athul Raj',
    start: '2613149859623'
  },
  {
    sub: 'Signals',
    fac: 'Prof. Haryhar',
    start: '1613149857623'
  },
  {
    sub: 'PE',
    fac: 'Dr. Jaison Mathew',
    start: '1613149957623'
  }
]

let router = express.Router()
router.use(cors())
router.use(express.urlencoded({extended: false}))
router.use(express.json())

const classes = ['101', '303', '507']

router.get('/student',(req, res)=>{
  res.send(classList)
})

router.post('/validate',(req, res)=>{
  if (req.body.user == 'athulraj') {
    if (req.body.pass == 'world') {
      res.json({status:'ok'})
    } else {
      res.json({status:'unauth'})
    }
  } else{
    res.json({status:'st'})
  }
})



module.exports = router
