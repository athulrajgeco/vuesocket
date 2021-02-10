<template lang="html">
  <div class="">
    <div class="login">
      <form class="" method="post">
        <label for="uname">Username</label>
        <input type="text" name="uname" v-model="username">
        <br>
        <label for="pwd">Password</label>
        <input type="password" name="pwd" v-model="password">
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
}
</style>
