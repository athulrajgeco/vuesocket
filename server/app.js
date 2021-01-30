const express = require('express')
const socketio = require('socket.io')

const app = express()
const expServer = app.listen(3000,()=>{
  console.log('Listening to port 3000')
})

const io = socketio(expServer,{
  cors:{
    origin: '*'
  }
})
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
  socket.on('vid',(data)=>{
    //socket.broadcast.emit('follow',data)
    console.log(data);
  })
  socket.on('candidate',cd =>{
    socket.broadcast.emit('candidate',cd)
  })
  socket.on('offer',cd =>{
    socket.broadcast.emit('offer',cd.sdp)
  })
  socket.on('answer',cd =>{
    socket.broadcast.emit('answer',cd.sdp)
  })
})
