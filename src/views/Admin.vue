<template lang="html">
  <div class="">
    <div class="auth" v-if="!$store.state.adminAuth">
      <h2>Admin Login</h2>
      <login-form type='admin'/>
    </div>
    <div class="" v-else>
      <h1>Administration Panel</h1>
      <hr>
      <div class="gridcontainer">
        <div class="sidebar">
          <p class="sections" @click='expand("a")'>Analytics</p>
          <div class="subtopic" v-if="isExpand.a == true">
            <p @click='daily'>Classes Today</p>
            <p @click='monthly'>Classes this Month</p>
            <p @click='byMonth = true'>Classes by Month
            <select class="" name="" v-if="byMonth" required>
              <option value="">Choose month</option>
              <option v-model="monthly" v-for='month in showMonth()+1' @click='byMonthly(month-1)'>{{mName(month-1)}}</option>
            </select>  </p>
            <p @click='yearly'>Classes this Year</p>
          </div>
          <p class="sections" @click='expand("b")'>Users</p>
          <div class="subtopic" v-if="isExpand.b == true">
            <p>Add New User</p>
            <p>Delete User</p>
          </div>
          <p class="sections" @click='expand("c")'>Account</p>
          <div class="subtopic" v-if="isExpand.c == true">
            <p>Change Password</p>
            <p>Edit Profile</p>
          </div>
        </div>
        <div class="dashboard">
          <calendar v-if='month' :title="monthName" :type='calType' :days='monthDays' :start='monthStart' />
          <calendar v-if='year' :title="monthName" :type='calType' :days='monthDays' :start='monthStart' />
          <calendar v-if='chosenMonth' :title="monthName" :type='calType' :days='monthDays' :start='monthStart' />
          <div v-if='today' class="outer">
            <h1>{{reportTitle.toUpperCase()}}</h1>
            <div class="inner">
              <table>
                <tr>
                  <th>Sl No.</th>
                  <th>Faculty</th>
                  <th>Subject</th>
                  <th>Start Time</th>
                  <th>Duration</th>
                  <th>Participants</th>
                </tr>
                <tr v-for="k,i of reportToday">
                  <td>{{i+1}}</td>
                  <td v-for="value in k">{{value}}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
import Calendar from '../components/Calendar.vue'
import axios from 'axios'
export default {
  components:{
    'login-form': LoginForm,
    'calendar': Calendar
  },
  data(){
    return{
      isExpand: {a:false, b:false, c:false},
      monthDays: 28,
      monthStart: 1,
      monthName: '',
      calType: '',
      today: false,
      month: false,
      year: false,
      byMonth: false,
      chosenMonth: false,
      reportToday: [],
      reportTitle: ''
    }
  },
  methods: {
    resetViews(){
      this.today = false,
      this.month = false,
      this.byMonth = false,
      this.chosenMonth = false,
      this.year = false
    },
    expand(n){
      for(let k in this.isExpand){
        this.isExpand[k] = false
      }
      this.isExpand[n] = true
    },
    daily(){
      this.resetViews()
      let curMonth = new Date()
      this.reportTitle = `${this.mName(curMonth.getMonth())} ${curMonth.getDate()}, ${curMonth.getFullYear()}`
      let address = this.$server + `report/daily`
      axios.get(address)
      .then(data =>{
        this.reportToday = data.data
      })
      .catch(err =>{
        console.log(err);
      })
      this.today = true
    },
    mName(k){
      const months = [
        "January", "February",
        "March", "April", "May",
        "June", "July", "August",
        "September", "October",
        "November", "December"
      ];
      return(months[k])
    },
    mDays(k){
      const oneDay = 24 * 60 * 60 * 1000
      let today = new Date()
      let start = new Date(today.getYear(),k , 1);
      let end = new Date(today.getYear(),k+1 , 1);
      return Math.round(Math.abs((end- start) / oneDay));
    },
    monthly(){
      this.resetViews()
      let curMonth = new Date()
      this.monthName = this.mName(curMonth.getMonth())
      this.monthStart = new Date(curMonth.getFullYear(),curMonth.getMonth(),1).getDay()
      this.monthDays = this.mDays(curMonth.getMonth())
      this.calType = 'm'
      this.month = true
    },
    yearly(){
      this.resetViews()
      let curMonth = new Date()
      this.monthName = String(curMonth.getFullYear())
      this.monthStart = 0
      this.monthDays = 12
      this.calType = 'y'
      this.year = true
    },
    showMonth(){
      let curMonth = new Date()
      return curMonth.getMonth()
    },
    byMonthly(k){
      this.resetViews()
      let curMonth = new Date()
      this.monthName = this.mName(k)
      this.monthStart = new Date(curMonth.getFullYear(),k,1).getDay()
      this.monthDays = this.mDays(k)
      this.calType = 'bm'
      this.chosenMonth = true
      this.byMonth = true
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
.gridcontainer{
  display: grid;
  grid-template-areas: "a b"
                       "a b";
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 250px 1fr;
}
.sidebar{
  grid-area: a;
  border-right: 4px solid lightgrey;
  height: 100%;
  margin-left: 10px;
  padding-left: 0;
  color: white;
}
.sections{
  text-align: left;
  font-size: 22px;
  text-shadow: 0 0 3px black;
  font-family: serif;
  padding: 15px 8px;
  margin: 0;
  cursor: pointer;
  background-color: deepskyblue;
  grid-area: a;
}
.sections:nth-of-type(even){
  background-color: dodgerblue;
}
.dashboard{
  margin: auto;
  grid-area: b;
}
.subtopic{
  background-color: white;
  color: rgb(70,70,70);
  font-size: 18px;
  font-weight: 500;
  text-align: left;
}
.subtopic >p{
  padding: 12px 15px;
  margin: 0;
  background-color: bisque;
}
.subtopic >p:nth-of-type(odd){
  background-color: beige;
}
.subtopic >p:hover{
  font-weight: 800;
  cursor: pointer;
}
.subtopic >p>select{
  margin: 5px;
}
.outer{
  border-radius:  15px;
  background-color: orange;
  width: 840px;
  padding-top: 5px;
}
.outer>h1{
  font-family: serif;
}
.inner{
  border-radius:  15px;
  background-color: lightgrey;
  width: 840px;
  margin: auto;
  padding: 5px;
  box-sizing: border-box;
}
.lalign{
  text-align: left;
  background-color: blue;
}
h1{
  font-family: "Jellee";
  font-size: 28px;
  position: relative;
  top: 5px;
}
h2{
  margin-top: 0;
  color: maroon;
}
hr{
  margin: 0;
  height: 5px;
  background-color: lightgrey;
  border: none;
}
table{
  border-collapse: collapse;
  width: calc(100% - 30px);
  margin: auto;
  padding: 10px;
  margin-top: 18px;
  margin-bottom: 18px;
}
td,th {
  border: 4px solid rgba(200,200,200,0.5);
  padding: 10px;
}
td{
  /* text-align: left; */
  font-size: 16px;
  vertical-align: middle;
}
tr{
  background-color: #dfd;
  height: 50px;
}
tr:nth-child(even) {
  background-color: #fdf;
}
th{
  background-color: #545;
  color: white;
  font-size: 18px;
}
</style>
