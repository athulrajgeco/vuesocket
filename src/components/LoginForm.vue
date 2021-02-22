<template lang="html">
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
    <p v-if='unAuth'>Wrong credentials</p>
    <input type="submit" class='button' @click.prevent='login' value="Login">
  </form>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      username: '',
      password: '',
      unAuth: false
    }
  },
  methods:{
    login(){
      let address = this.$server + `user/validate`
      let credentials = {
        type: this.type ,
        user: this.username,
        pass: this.password
      }
      axios.post(address, credentials)
      .then(data =>{
        console.log(data);
          if (data.data.status == 'ok') {
            if(confirm("Maximize your browser window for maximum board width"))
                this.$router.push('/fdb')
          } else if (data.data.status == 'st'){
            this.$router.push('/stwb')
          } else {
            this.unAuth = true
          }
      })
      .catch(err =>{
        console.log(err);
        return {status: "unauth"}
      })
    }
  },
  props:{
    type: String
  }
}
</script>

<style lang="css" scoped>
.gridcontainer{
  display: grid;
  grid-template-columns: repeat(12, minmax(0,1fr));
  grid-gap: 10px;
  align-items: center;
}
.griditem1{
  grid-column: 4 /6;
  text-align: right;
}
.griditem2{
  grid-column: 6 /10;
}
p{
  color: crimson;
  margin: 0;
  margin-bottom: 10px;
}
.button{
  width: 80px;
  height: 30px;
  /* border-radius: 20px; */
  font-size: 16px;
  box-shadow: 2px 2px 0 black;
}
.button:active{
  box-shadow: none;
  transform: translateX(3px);
  transform: translateY(3px);
}
</style>
