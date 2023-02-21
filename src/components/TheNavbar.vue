<template>
  <header class="front">
    <link
      href="https://fonts.googleapis.com/css?family=Roboto"
      rel="stylesheet"
    />
    <img src="../assets/logo.png" />
    <ul>
      <li class="navbar__dateAssessment"><span>Date of Assessment: </span>{{ dateofassessment }}</li>
      <li class="navbar__clientName"><span>Client name: </span>{{ client_name }}</li>
    </ul>
    <h1>Client Assessment</h1>
  </header>
</template>

<script>

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone"; // dependent on utc plugin
import isToday from "dayjs/plugin/isToday";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isToday);
const defaultTimezone = "Asia/Singapore";
dayjs.tz.setDefault(defaultTimezone);

export default {
  data(){
    return{
      client_id: "",
      client_name: "",
      dateofassessment: "",
    }
  },
  async mounted() {
    let clientId = this.$route.query.client_id;
    if (!clientId) {
      const url = new URLSearchParams(window.location.href);
      const state = url.get('state');
      clientId = state.split('|')[1];
    }
    console.log('receivedid:',clientId);
    this.client_id = clientId;
    this.$store.commit('assessment_client_id',clientId)
    
    await this.$parent.init();
    console.log(this.$store.state);
    await this.getClientData();
  },
  methods:{
    async getClientData(){
      let paramObj = {
        $select:'crb5c_no,crb5c_nricno',
        $filter: `crb5c_fow_customerid eq '${this.client_id}'`,
      };
      let params = new URLSearchParams(paramObj);
      let { data: clientData } = await this.$store.state.axios.get(
        `crb5c_fow_customers/?${params.toString()}`
      );
      console.log(clientData);

      this.client_name = clientData.value[0].crb5c_no;
      this.$store.commit('assessment_client_name',this.client_name);
      this.dateofassessment = dayjs().format("MM-DD-YYYY hh:mm A");

      this.$root.$emit('getFormData')
    }
  }
}
</script>
<style scoped lang="scss">
header {
  width: 100%;
  height: 10rem;
  display: flex;
  justify-content: center;
  /* text-align: center; */
  background-color: #f6f6f6;
  position: sticky;
  top: 0;
  overflow: hidden;
  /* float: left; */
}
@media screen and (max-width: 360px) {
  .navbar__dateAssessment,
  .navbar__clientName{
    // display: none;
    // background-color: red;
    left: -5vw;
    top: 5rem;
  }
}
@media screen and (min-width: 361px) {
  .navbar__dateAssessment,
  .navbar__clientName{
    // display: none;
    // background-color: red;
    left: 20vw;
    font-size: 14px;
    font-weight: bold;
  }
}
@media screen and (min-width: 500px) {
  .navbar__dateAssessment,
  .navbar__clientName{
    // display: none;
    // background-color: red;
    // display: inline-block;
    left: 26vw;
  }
  .navbar__dateAssessment{
    margin-right: 1rem;
  }
}
@media screen and (min-width: 580px) {
  .navbar__dateAssessment,
  .navbar__clientName{
    // display: none;
    // background-color: red;
    display: inline-block;
    left: 18vw;
  }
  .navbar__dateAssessment{
    margin-right: 1rem;
  }
}
@media screen and (min-width: 780px) {
  .navbar__dateAssessment,
  .navbar__clientName{
    // display: none;
    // background-color: red;
    display: inline-block;
    left: 25vw;
  }
  .navbar__dateAssessment{
    margin-right: 1rem;
  }
}
@media screen and (min-width: 780px) {
  .navbar__dateAssessment,
  .navbar__clientName{
    // display: none;
    // background-color: red;
    display: inline-block;
  }
  .navbar__dateAssessment{
    margin-right: 1rem;
  }
}
@media screen and (min-width: 950px) {
  .navbar__dateAssessment,
  .navbar__clientName{
    // display: none;
    // background-color: red;
    display: inline-block;
  }
  .navbar__dateAssessment{
    margin-right: 3rem;
  }
}
@media screen and (min-width: 1200px) {
  .navbar__dateAssessment,
  .navbar__clientName{
    // display: none;
    // background-color: red;
    display: inline-block;
  }

  .navbar__dateAssessment{
    margin-right: 3rem;
  }
}
h1 {
  color: black;
  position: fixed;
  font-weight: bold;
  top: 100px;
  font-size: 25px;
}
ul {
  list-style: none;
  font-size: 12px;
  display: inline;
}
li {
  position: relative;
  /* display: flex; */
  left: 27vw;
  top: 1rem;
  /* margin-right: 5vw; */
}
img {
  position: fixed;
  padding-top: 5px;
  top: 10px;
  left: 1%;
}
* {
  font-family: 'Montserrat';
}
.front{
  /* position: fixed; */
  z-index: 1;
}
</style>
