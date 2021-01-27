<template lang="html">
  <div class="">
    <canvas ref='canvas' width="1000" height="600" v-on:mousedown="begin" v-on:mouseup="end"  v-on:mousemove="draw"></canvas>
  </div>
</template>

<script>
export default {
  created(){
    this.socket = this.$io('http://localhost:3000')
    this.socket.on('welcome',(data)=>{
      console.log(data);
      this.socket.emit('vid',{
        prvX:this.prvX,
        prvY:this.prvY,
        curX:this.curX,
        curY:this.curY,
       })
      this.ctx = this.$refs.canvas.getContext('2d')
      this.ctx.strokeStyle = 'blue'
      this.ctx.lineWidth = 4
      this.ctx.lineJoin = 'round'
      this.ctx.lineCap = 'round'
      this.canOffL = this.$refs.canvas.offsetLeft
      this.canOffT = this.$refs.canvas.offsetTop
    })
  },
  data(){
    return{
      prvX: 0,
      prvy: 0,
      curX: 0,
      curY: 0,
      isDraw: false,
      canOffL: 0,
      canOffT: 0,
      ctx: null,
      socket: null
    }
  },
  methods:{
    begin(){
      this.isDraw = true
    },
    end(){
      this.isDraw = false
    },
    draw(){
      let evt = window.event;
      this.prvX = this.curX
      this.prvY = this.curY
      this.curX = evt.clientX - this.canOffL
      this.curY = evt.clientY - this.canOffT
      if (this.isDraw) {
        this.ctx.beginPath()
        this.ctx.moveTo(this.prvX,this.prvY)
        this.ctx.lineTo(this.curX,this.curY)
        this.ctx.stroke()
        this.socket.emit('draw',{
          prvX:this.prvX,
          prvY:this.prvY,
          curX:this.curX,
          curY:this.curY,
         })
      }
    }
  }
}
</script>

<style lang="css" scoped>
canvas{
  border: 1px solid grey;
  background-color: beige;
}
</style>
