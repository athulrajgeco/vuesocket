<template lang="html">
  <div class="">
    <div class="auth" v-if="!isAuth">
      <h2>Admin Login</h2>
      <login-form />
    </div>
    <div class="" v-else>

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
      isAuth: false
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
h2{
  margin-top: 0;
  color: maroon;
}
</style>
