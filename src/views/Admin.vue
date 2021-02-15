<template lang="html">
  <div class="">
    <div class="auth" v-if="!$store.state.adminAuth">
      <h2>Admin Login</h2>
      <login-form type='admin'/>
    </div>
    <div class="" v-else>
      <!-- <h1 @click="$store.commit('changeAuth','admin')">hello</h1> -->
      <hr>
      <div class="sidebar">
        <p @click='expand("a")'>Analytics</p>
        <div class="subtopic" v-if="isExpand.a == true">
          <p>Classes Today</p>
          <p>Classes this Month</p>
          <p>Classes this Year</p>
        </div>
        <p @click='expand("b")'>Users</p>
        <div class="subtopic" v-if="isExpand.b == true">
          <p>Add New User</p>
          <p>Delete User</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
export default {
  components:{
    'login-form': LoginForm
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
      console.log(this.isExpand);
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
.sidebar{
  width: 250px;
  position: fixed;
  left: 0;
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
