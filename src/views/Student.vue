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
      this.ctx.lineWidth = 4
      this.ctx.lineJoin = 'round'
      this.ctx.lineCap = 'round'

    })
    //console.log(this.$refs);
    socket.on('follow',(data)=>{
      this.ctx.strokeStyle = data.color
      this.ctx.beginPath();
      this.ctx.moveTo(data.prvX, data.prvY);
      this.ctx.lineTo(data.curX, data.curY);
      this.ctx.stroke()
    })
  }
}
</script>

<style lang="css" scoped>
canvas{
  border: 1px solid grey;
  background-color: beige;
}
</style>
