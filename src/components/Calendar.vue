<template lang="html">
  <div class="">
    <div class="outer">
      <h1>{{title.toUpperCase()}}</h1>
      <div class="inner">
        <div class="square daynames" v-for='d in 7' v-if="type == 'm'">
          {{weekdays[d-1]}}
        </div>
        <div class="" v-for='c in cols'>
          <div class="square" v-if='((r+c-2<start)&&(r==1))||(((r-1)*7)+c-1-start)>=days'
             v-for='r in rows' style="background-color: lightgrey;">
          </div>
          <div class="square month" v-else-if='type == "y"'
            @click='showdetails(r,c)' style="cursor:pointer;">
            <p style="font-size: 35px">{{months[(r-1)*3+c-1]}}</p>
          </div>
          <div class="square" v-else
            @click='showdetails(r,c)' style="cursor:pointer;">
            <p>{{date[((r-1)*7)+c-1-start]}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" v-if="modal" @click='modal = false'>
      <div class="infobox" :style='invalid'>
        <h3>{{classes}}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      rows : 4,
      cols : 1,
      weekdays: ['Sunday','Monday','Tuesday',
      'Wednesday','Thursday','Friday',
      'Saturday'],
      months: [
        "January", "February",
        "March", "April", "May",
        "June", "July", "August",
        "September", "October",
        "November", "December"
      ],
      date: [],
      modal: false,
      classes: '',
      invalid: ''
    }
  },
  props:{
    title: String,
    type: String,
    start: Number,
    days: Number
  },
  created(){
    this.update()
  },
  watch: {
    type: function(){
      this.update()
    }
  },
  methods: {
    update(){
      for (let i = 1; i <= this.days; i++) {
        this.date.push(i)
      }
      switch (this.type) {
        case 'm':
          this.cols = 7
          break;
        case 'y':
          this.cols = 3
          this.rows = 4
          break;
        default:
          this.cols = 6
          break;
      }
      if (this.days + this.start > 35) {
        this.rows = 6
      } else if (this.days + this.start > 28){
        this.rows = 5
      }
    },
    showdetails(r,c){
        this.modal = true
        let address = ''
        if (this.type=='m') {
          address = this.$server + `report/monthly?num=${this.title}&date=${((r-1)*7)+c-1-this.start}`
        } else {
          address = this.$server + `report/yearly?num=${this.title}&month=${((r-1)*3)+c-1-this.start}`
        }
        //console.log(address);
        axios.get(address)
        .then(data=>{
          // console.log(data.data);
          if (data.data >= 0) {
            this.invalid = ''
            this.classes = `${data.data} classes conducted`
          } else{
            this.invalid = 'background-color: firebrick; border: none; color: white;'
            this.classes = `No data on future month`
          }
        })
        .catch(err =>{
          console.log(err);
        })
    }
  }
}
</script>

<style lang="css" scoped>
.outer{
  border-radius:  15px;
  background-color: orange;
  width: 840px;
  padding-top: 10px;
}
.inner{
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  border-radius:  15px;
  background-color: lightgrey;
  width: 840px;
  margin: auto;
  padding: 5px;
  box-sizing: border-box;
  align-items: flex-end;
}
.square{
  min-width: 100px;
  height: 100px;
  flex-grow: 1;
  background-color: white;
  margin: 3px;
  margin-top: 10px;
  align-content: space-around;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.month{
  min-width: 220px;
}
.daynames{
  min-width: 110px;
  height: 35px;
  font-weight: 600;
  font-size: 17px;
  color: white;
  background-color: cornflowerblue;
  flex-grow: 0;
}
.modal{
  height: 100%;
  width: 100%;
  background-color: rgba(0,0,0,0.85);
  z-index: 1;
  position: fixed;
  top: 0px;
  left: 0px;
}
.infobox{
  background-color: aliceblue;
  border: 2px solid mediumblue;
  border-radius: 15px;
  position: absolute;
  top:35px;
  min-height: 50px;
  left: 35vw;
  width: 30vw;
  padding: 20px;
}
p{
  font-size: 40px;
  font-family: monospace;
  color: black;
}
h1{
  margin: 5px;
  font-family: serif;
}
</style>
