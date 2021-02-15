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
    <input type="submit" @click.prevent='login' value="Login">
  </form>
</template>

<script>
export default {
  data(){
    return {
      username: '',
      password: ''
    }
  },
  methods:{
    login(){
      //console.log(this.type);
      if (this.type =='Faculty') {
        if(confirm("Maximize your browser window for maximum board width"))
          this.$router.push('/fdb')
      } else if (this.type =='Student'){
        this.$router.push('/stwb')
      } else if (this.type =='admin'){
        this.$store.commit('changeAuth','admin')
      }
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
</style>
