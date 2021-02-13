<template lang="html">
  <div class="">
    <div class="login" v-if="user == ''">
      <h2>Please login to continue</h2>
      <form class="" method="post">
        <div class="gridcontainer">
          <label class="griditem1" style="grid-row: 1;" for="uname">Username</label>
          <input class="griditem2" style="grid-row: 1;" type="text" name="uname" v-model="username">
        </div>
        <br>
        <div class="gridcontainer">
          <label class="griditem1" style="grid-row: 2;" for="pwd">Password</label>
          <input class="griditem2" style="grid-row: 2;" type="password" name="pwd" v-model="password">
        </div>
        <br>
        <input type="submit" @click.prevent='login' value="Login">
      </form>
      <br>
    </div>
    <div class="" v-if="user == 'student'">
      <h1>Ongoing classes</h1>
      <div class="flexcontainer">
        <div v-for='c of ongoingClass' class="notice">
          <h3>Subject</h3>
          <p>{{c.sub}}</p>
          <h3>Faculty</h3>
          <p>{{c.fac}}</p>
          <h3>Start Time</h3>
          <p>{{c.start}}</p>
          <button type="button" name="button" @click='joinClass'>Join</button>
        </div>
      </div>
      <h1>Starting Soon...</h1>
      <div class="" v-for='c of soonClass'>
        <h3>Subject</h3>
        <p></p>
        <h3>Faculty</h3>
        <p></p>
        <h3>Start Time</h3>
        <p></p>
      </div>
    </div>
    <!-- <div class="" v-else>
      <button type="button" name="button">Schedule a class</button>
      <button type="button" name="button">Start class</button>
    </div> -->
    <div class="modal" v-if="modal" @click='modal = false'>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      username:'',
      password:'',
      user: '',
      ongoingClass: [],
      soonClass: [],
      modal: false
    }
  },
  methods: {
    login(){
      console.log(`${this.username} has password ${this.password}`)
      let address = this.$server + `user/login`
      let data = {
        username: this.username,
        password: this.password
      }
      axios.post(address, data)
      .then(data =>{
        if(data.data.user == 'faculty'){
          confirm("Maximize your window to get maximum whiteboard width")
          //this.$router.push('/wb')
          this.user = 'faculty'
        }
        else{
          let classList = []
          this.user = 'student'
          classList = data.data.class
          classList.forEach((item, i) => {
            if (item.start < Date.now()) {
              this.ongoingClass.push(item)
            } else {
              this.soonClass.push(item)
            }
          })
        }
        console.log(data.data);
      })
      .catch(err =>{
        console.log(err);
      })
    },
    startClass(){

    },
    joinClass(k){
      this.modal = true
    }
  }
}
</script>

<style lang="css" scoped>
  label{
    margin-right: 12px;
    text-align: right;
    align-self: center;
  }
  h2{

  }
  .gridcontainer{
    display: grid;
    grid-template-columns: repeat(12, minmax(0,1fr));
    grid-gap: 6px;
  }
  .griditem1{
    grid-column: 4 /6;
  }
  .griditem2{
    grid-column: 6 /9;
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
  .flexcontainer{
    display: flex;
  }
  .notice{
    position: relative;
    background-color: lightblue;
    margin: 15px 20px;
    padding: 15px;
    padding-bottom: 30px;
    min-width: 250px;
    border-radius: 0 25px 0 25px;
  }
  .notice::before {
    content: "";
    position: absolute;
    background-color: transparent;
    top: 0px;
    left: -50px;
    height: 25px;
    width: 50px;
    border-top-right-radius: 25px;
    box-shadow: 25px 0 0 0 lightblue;
  }
  .notice::after {
    content: "";
    position: absolute;
    background-color: transparent;
    bottom: 0px;
    right: -50px;
    height: 25px;
    width: 50px;
    border-bottom-left-radius: 25px;
    box-shadow: -25px 0 0 0 lightblue;
  }
  .notice > h3{
    color: sienna;
    font-weight: 800;
    font-size: 22px;
  }
</style>
