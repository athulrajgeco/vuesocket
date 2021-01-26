<template lang="html">
  <div class="">
    <div class="login">
      <form class="" action="index.html" method="post">
        <label for="uname">Username</label>
        <input type="text" name="uname" v-model="username">
        <br>
        <label for="pwd">Password</label>
        <input type="password" name="pwd" v-model="password">
        <br>
        <input type="submit" @click.prevent='login' value="Login">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      username:'',
      password:''
    }
  },
  methods: {
    login(){
      console.log(`${this.username} has password ${this.password}`);
    }
  }
}
</script>

<style lang="css" scoped>
label{
  margin-right: 12px;
}
</style>
