<template lang="html">
  <div class="outer">
    <h1>{{title.toUpperCase()}}</h1>
    <div class="inner">
      <div class="square daynames" v-for='d in 7' v-if="type == 'm'">
        {{weekdays[d-1]}}
      </div>
      <div class="" v-for='r in cols'>
        <div class="square" v-for='c in 5' v-if='(r==1)&&(c<4)'>
          {{dispDate(r,c)}}
        </div>
        <div class="square" style="background-color: lightgrey;" v-else>
          {{dispDate(r,c)}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      rows : 1,
      cols : 1,
      weekdays: ['Sunday','Monday','Tuesday',
      'Wednesday','Thursday','Friday',
      'Saturday'],
      itemStyle : ''
    }
  },
  props:[
    'title',
    'type',
    'start',
    'days'
  ],
  created(){
    switch (this.type) {
      case 'm':
        this.cols = 7
        break;
      case 'y':
        this.cols = 3
        break;
      default:
        this.cols = 6
        break;
    }
  },
  methods: {
    dispDate(r,c){
      console.log(r,c);
      if(((r==1)&&(c<4))||(r*c > 30-4)){
        this.itemStyle = 'background-color: lightgrey;'
        return 0;
      } else{
        return 'k';
      }
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
  width: 100px;
  height: 100px;
  flex-grow: 1;
  background-color: white;
  margin: 3px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.daynames{
  height: 30px;
  font-weight: 600;
  font-size: 18px;
  color: indigo;
  background-color: aliceblue;
}
.inactive{
  display: none;
}
h1{
  margin: 5px;
  font-family: serif;
}
</style>
