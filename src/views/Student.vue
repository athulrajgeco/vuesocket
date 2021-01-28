<template lang="html">
  <div class="">
    <canvas ref='stcanvas' width="1000" height="600"></canvas>
  </div>
</template>

<script>
export default {
  data(){
    return{
      ctx: null
    }
  },
  created(){
    const socket = this.$io('http://localhost:3000')
    socket.on('welcome',(data)=>{
      console.log(data);
      this.ctx = this.$refs.stcanvas.getContext('2d')
      this.ctx.lineJoin = 'round'
      this.ctx.lineCap = 'round'

    })
    socket.on('follow',(data)=>{
      if(data.clear){
        this.ctx.clearRect(0,0,1000,600)
      }
      else{
        this.ctx.strokeStyle = data.color
        this.ctx.lineWidth = data.size
        this.ctx.beginPath();
        this.ctx.moveTo(data.prvX, data.prvY);
        this.ctx.lineTo(data.curX, data.curY);
        this.ctx.stroke()
      }
    })
  }
}
</script>

<style lang="css" scoped>
canvas{
  border: 8px ridge lightgrey;
  border-radius: 8px;
  background-color: #20b2aa;
}
</style>
