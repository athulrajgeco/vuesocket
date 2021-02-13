<template lang="html">
  <div class="">
    <div class="">
      <h1 id="name">Litmus Class Room</h1>
    </div>
    <div class="login" v-if="user == ''">
      <h2>Please choose your role</h2>
      <div class="gridcontainer">
        <div class="facbtn" @click='facdb'>
          Faculty
        </div>
        <div class="stbtn" @click='clList'>
          Student
        </div>
      </div>
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
          <button type="button" name="button" @click='joinClass(c)'>Join</button>
        </div>
      </div>
      <h1>Starting Soon...</h1>
      <div class="flexcontainer">
        <div v-for='c of soonClass' class="soon">
          <h3>Subject</h3>
          <p>{{c.sub}}</p>
          <h3>Faculty</h3>
          <p>{{c.fac}}</p>
          <h3>Start Time</h3>
          <p>{{c.start}}</p>
        </div>
      </div>
    </div>
    <div class="modal" v-if="modal" @click='modal = false'>
      <div class="loginform">
        <h3>Faculty login</h3>
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
      </div>
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
    clList(){
      let address = this.$server + `user/student`
      axios.get(address)
      .then(data =>{
        let classList = []
        this.user = 'student'
        classList = data.data
        classList.forEach((item, i) => {
          if (item.start < Date.now()) {
            this.ongoingClass.push(item)
          } else {
            this.soonClass.push(item)
          }
        })
        console.log(data.data);
      })
      .catch(err =>{
        console.log(err);
      })
    },
    login(){
      this.modal = false
      if(confirm("Maximize your browser window for maximum board width"))
        this.$router.push('/fdb')
    },
    facdb(){
      this.modal = true
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
  #name{
     text-align: center;
     font-family:'Jellee','Ostrich';
     font-size: 45px;
     background: linear-gradient(to right, red 25%, blue 75%);
     background-clip: text;
     color:transparent;
  }
  .gridcontainer{
    display: grid;
    grid-template-columns: repeat(12, minmax(0,1fr));
    grid-gap: 6px;
  }
  .facbtn{
    padding: 15px 20px;
    background-color: lightcoral;
    border: 2px solid firebrick;
    color: white;
    font-size: 22px;
    grid-column: 4 /6;
  }
  .facbtn:hover{
    cursor: pointer;
    background-color: IndianRed;
    font-weight: 800;
  }
  .stbtn{
    padding: 15px 20px;
    background-color: lightseagreen;
    border: 2px solid olive;
    color: white;
    font-size: 22px;
    grid-column: 8 /10;
  }
  .stbtn:hover{
    cursor: pointer;
    background-color: seagreen;
    font-weight: 800;
  }
  .griditem1{
    grid-column: 4 /6;
  }
  .griditem2{
    grid-column: 6 /10;
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
    font-family: "Ostrich";
    color: sienna;
    font-size: 22px;
    text-decoration: underline double;
  }
  .soon{
    background-color: lightslategrey;
    margin: 15px 20px;
    padding: 15px;
    padding-bottom: 30px;
    min-width: 250px;
    border: 3px dashed white;
    color: white;
    font-family: serif;
  }
  .soon > h3{
    text-decoration: underline;
  }
  .loginform{
    background-color: lightblue;
    border: 4px solid mediumblue;
    border-radius: 15px;
    position: absolute;
    top:25vh;
    height: 50vh;
    max-height: 200px;
    left: 25vw;
    width: 50vw;
    min-width: 500px;
    padding: 20px;
  }
</style>
