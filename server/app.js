const express = require('express')
const socketio = require('socket.io')
const users = require('./routes/users')
const report = require('./routes/report')

const app = express()

const expServer = app.listen(3000,()=>{
  console.log('Listening to port 3000')
})

const io = socketio(expServer,{
  cors:{
    origin: '*'
  }
})
app.set('io', io)
io.on('connection',(socket)=>{
  console.log(`${socket.id} connected`);
  socket.join('class101')
  socket.emit('welcome','Welcome to socket server')
  socket.on('draw',(data)=>{
    socket.broadcast.emit('follow',data)
  })
  socket.on('clear',(data)=>{
    socket.broadcast.emit('follow',data)
  })
  socket.on('wbsettings',(data)=>{
    socket.broadcast.emit('wbsettings',data)
    console.log(data);
  })
})

app.use('/user',users)
app.use('/report',report)
