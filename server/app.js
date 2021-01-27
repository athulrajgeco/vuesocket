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
  console.log(socket.rooms);
  socket.on('draw',(data)=>{
    console.log(data);
    socket.broadcast.emit('follow',data)
  })
})
