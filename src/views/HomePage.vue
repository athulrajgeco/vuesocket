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
      <video ref='localVideo' autoplay poster="posterimage.jpg" width="350px">
      </video>
      <br>
      <label for="">Remote Video</label>
      <video ref='remoteVideo' autoplay poster="posterimage.jpg" width="350px">
      </video>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      username:'',
      password:'',
      mediaConstraints:{
        video: true,
        audio: false
      },
      localStream:{},
      remoteStream:{}
    }
  },
  methods: {
    login(){
      console.log(`${this.username} has password ${this.password}`);
    }
  },
  created(){
    console.log(this.$io)
    const socket = this.$io('http://localhost:3000')
    socket.on('welcome',(data)=>{
      console.log(data);
    })
    console.log(navigator.mediaDevices); //navigator.getMediaDevices
    navigator.mediaDevices.getUserMedia(this.mediaConstraints)
    .then(stream =>{
      this.localStream = stream
      console.log(stream);
      this.$refs.localVideo.srcObject = this.localStream
      console.log('stream obtained');
      console.log(this.$refs.localVideo);
      // socket.emit('vid',{
      //   name: 'stream',
      //   id: 25874
      // })
      socket.emit('vid',this.localStream)
    })
    .catch(err =>{
      console.log(err);
    })
    socket.on('remvid',(data)=>{
      console.log(data);
      //this.$refs.remoteVideo.srcObject = data
    })
  }
}
</script>

<style lang="css" scoped>
label{
  margin-right: 12px;
}
</style>
