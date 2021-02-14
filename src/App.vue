<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/stWb">Student</router-link> |
      <router-link to="/wb">Whiteboard</router-link>
    </div> -->
    <h1 id="name">Litmus Class Room</h1>
    <router-view/>
  </div>
</template>

<style>
@font-face {
  font-family: "Ostrich";
  src: url(./assets/fonts/Ostrich.ttf) format("truetype");
}
@font-face {
  font-family: "Jellee";
  src: url(./assets/fonts/Jellee.woff) format("woff");
}
@font-face {
  font-family: "Hussar";
  src: url(./assets/fonts/Hussar3d.otf) format("opentype");
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e20;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e20;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#name{
   text-align: center;
   font-family:'Jellee','Ostrich';
   font-size: 45px;
   background: linear-gradient(to right, red 25%, blue 75%);
   background-clip: text;
   color:transparent;
   margin-top: 8px;
   margin-bottom: 8px;
}
</style>
