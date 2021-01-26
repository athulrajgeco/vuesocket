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
io.on('connect',(socket)=>{
  console.log(`${socket.id} connected`);
  socket.emit('welcome','Welcome to socket server')
  socket.on('vid',(data)=>{
    console.log(data);
    socket.emit('remvid',data)
  })
})
