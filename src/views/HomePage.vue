<template lang="html">
  <div class="">
    <div class="login">
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
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      username:'',
      password:''
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
        if(data.data == 'faculty')
          this.$router.push('/wb')
        else
          this.$router.push('/stwb')
        console.log(data);
      })
      .catch(err =>{
        console.log(err);
      })
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
</style>
