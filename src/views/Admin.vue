<template lang="html">
  <div class="">
    <div class="auth" v-if="!$store.state.adminAuth">
      <h2>Admin Login</h2>
      <login-form type='admin'/>
    </div>
    <div class="" v-else>
      <!-- <h1 @click="$store.commit('changeAuth','admin')">hello</h1> -->
      <hr>
      <div class="gridcontainer">
        <div class="sidebar">
          <p @click='expand("a")'>Analytics</p>
          <div class="subtopic" v-if="isExpand.a == true">
            <p>Classes Today</p>
            <p @click='monthly()'>Classes this Month</p>
            <p>Classes this Year</p>
          </div>
          <p @click='expand("b")'>Users</p>
          <div class="subtopic" v-if="isExpand.b == true">
            <p>Add New User</p>
            <p>Delete User</p>
          </div>
        </div>
        <div class="dashboard">
          <calendar title="February" type='m'> </calendar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
import Calendar from '../components/Calendar.vue'
export default {
  components:{
    'login-form': LoginForm,
    'calendar': Calendar
  },
  data(){
    return{
      isExpand: {a:false, b:false}
    }
  },
  methods: {
    expand(n){
      for(let k in this.isExpand){
        this.isExpand[k] = false
      }
      this.isExpand[n] = true
    },
    monthly(){
      let curMonth = new Date()
    }
  }
}
</script>

<style lang="css" scoped>
.auth{
  margin: auto;
  margin-top: 10vh;
  width: 50vw;
  min-width: 550px;
  border: 8px solid gainsboro;
  background-color: seashell;
  padding: 25px;
  box-sizing: border-box;
}
.gridcontainer{
  display: grid;
  grid-template-areas: "a b"
                       "a b";
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 250px 1fr;
}
.sidebar{
  grid-area: a;
  border-right: 4px solid lightgrey;
  height: 100%;
  margin-left: 10px;
  padding-left: 0;
  color: white;
}
.sidebar >p{
  text-align: left;
  font-size: 22px;
  text-shadow: 0 0 3px black;
  font-family: serif;
  padding: 15px 8px;
  margin: 0;
  cursor: pointer;
  background-color: deepskyblue;
}
.sidebar >p:nth-child(even){
  background-color: dodgerblue;
}
.dashboard{
  /* position: relative;
  grid-column: 2 /5;
  grid-row: 1; */
  margin: auto;
  /* width: calc(100% - 250px); */
  grid-area: b;
}
.subtopic{
  background-color: white;
  padding-left: 20px;
  color: rgb(70,70,70);
  font-size: 18px;
  font-weight: 500;
  text-align: left;
}
.subtopic >p:hover{
  font-weight: 800;
  cursor: pointer;
}
h2{
  margin-top: 0;
  color: maroon;
}
hr{
  margin: 0;
  height: 5px;
  background-color: lightgrey;
  border: none;
}
</style>
