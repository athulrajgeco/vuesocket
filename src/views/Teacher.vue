<template lang="html">
  <div class="">
    <div id="controls">
      <label for="clr" :style='textColor'>Pen Color </label>
      <input type="color" name="clr" v-model="colour" id="clr">
      <label for="pen">Pen Width</label>
      <p style="width:40px; text-align:right;">{{penWidth}} px</p>
      <input type="range" name="pen" v-model="penWidth" min="1" max="15">
      <button type="button" name="button" @click='clear'>Clear</button>
    </div>
    <canvas ref='canvas' width="1000" height="600" v-on:mousedown="begin" v-on:mouseup="end"  v-on:mousemove="draw"></canvas>
  </div>
</template>

<script>
export default {
  created(){
    this.socket = this.$io(this.$server)
    this.socket.on('welcome',(data)=>{
      console.log(data);
      console.log(this.$refs.canvas);
      this.$refs.canvas.width = window.innerWidth -30
      this.$refs.canvas.height = window.innerHeight
      this.ctx = this.$refs.canvas.getContext('2d')
      this.ctx.lineJoin = 'round'
      this.ctx.lineCap = 'round'
      this.socket.emit('wbsettings',{
        class: 'class101',
        cwidth: this.$refs.canvas.width,
        cheight: this.$refs.canvas.height,
        password: ''
      })
    })
  },
  data(){
    return{
      prvX: 0,
      prvy: 0,
      curX: 0,
      curY: 0,
      isDraw: false,
      ctx: null,
      socket: null,
      colour: '#0000FF',
      textColor: 'color: #0000FF;',
      penWidth: 4,
      textWidth: 'font-size:4px;'
    }
  },
  watch:{
    colour: function(){
      this.textColor = `color: ${this.colour};`
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
      this.curX = evt.clientX - this.$refs.canvas.offsetLeft + window.scrollX
      this.curY = evt.clientY - this.$refs.canvas.offsetTop + window.scrollY
      this.ctx.strokeStyle = this.colour
      this.ctx.lineWidth = this.penWidth
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
          color:this.colour,
          size:this.penWidth
        })
      }
    },
    clear(){
      this.ctx.clearRect(0,0,this.$refs.canvas.width,this.$refs.canvas.height)
      this.socket.emit('clear',{
        clear:true
      })
    }
    // resize(){
    //   let evt = window.event;
    //   console.log('scrolled');
    //   console.log(evt);
    // }
  }
}
</script>

<style lang="css" scoped>
canvas{
  border: 2px solid black;
  border-radius: 8px;
  background-color: #20b2aa;
  box-sizing: border-box;
}
label{
  font-size: 20px;
  font-weight: 700;
  margin: 0 10px;
  text-shadow: 0px 0px 5px white;
}
#clr{
  display: none;
}
#controls{
  margin: auto;
  margin-bottom: 5px;
  padding: 5px;
  border: 3px solid indianred;
  border-radius: 5px;
  height: 50px;
  width: 800px;
  background-color: peachpuff;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
p{
  margin-right: 3px;
  font-size: 14px;
}
button{
  margin: 5px;
}
</style>
