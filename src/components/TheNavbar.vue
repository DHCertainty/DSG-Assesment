<template>
  <header class="front border-bottom" >
    <link
      href="https://fonts.googleapis.com/css?family=Roboto"
      rel="stylesheet"
    />
    
    <img src="../assets/logo.png" />
    <ul style="margin-top: 20px;">
      <li class="navbar__dateAssessment"><button class="timeEdit" v-b-modal.modal-time-change >Edit</button> Date of Assessment: <span style="font-weight:bold">{{ dateofassessment }}</span></li>
      
      <li class="navbar__clientName">Client name: &nbsp;<span style="font-weight:bold">{{ client_name }}</span></li>
    </ul>

    <b-modal id="modal-time-change" hide-footer hide-header ref="modal-time-change">
    <p class="my-4">Pick a time</p>
    <b-form-datepicker id="datepicker" v-model="edit_time" class="mb-2"></b-form-datepicker>
    <div style="text-align:center;margin-top: 30px;margin-bottom: 20px;"><b-button @click="editTime">Change date</b-button></div>

    
  </b-modal>
  
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
      isLocal: false,
      edit_time:null,
      client_id: "",
      client_name: "",
      dateofassessment: "",
    }
  },
  async mounted() {
    let clientId = '';

    this.isLocal = location.host.includes("localhost");

    if(!this.isLocal){
      clientId = this.$route.query.client_id;
    }else{
      clientId = '9dd18ad0-e27e-ed11-81ac-000d3a85cb45';

    }
    
    if (!clientId) {
      const url = new URLSearchParams(window.location.href);
      const state = url.get('state');
      clientId = state?.split('|')[1];
    }
    console.log('receivedid:',clientId);
    this.client_id = clientId;
    this.$store.commit('assessment_client_id',clientId)
    
    await this.$parent.init();
    // console.log(this.$store.state);
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
      // console.log(clientData);
      this.client_name = clientData.value[0].crb5c_no;
      this.$store.commit('assessment_client_name',this.client_name);
      this.dateofassessment = dayjs().format("MM-DD-YYYY");
      this.$store.commit('assessment_date',this.dateofassessment);
      this.$root.$emit('getFormData')
    },
    editTime(){
      this.dateofassessment = dayjs(this.edit_time).format("MM-DD-YYYY");
      this.$store.commit('assessment_date',this.dateofassessment);
      this.$refs['modal-time-change'].hide()
    }
  }
}
</script>
<style scoped lang="scss">
header {
  width: 100%;
  height: 6rem;
  display: flex;
  justify-content: center;
  /* text-align: center; */
  background-color: #ffffff;
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
    font-weight: normal;
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
  left: 2%;
}
* {
  font-family: 'Montserrat';
}
.front{
  /* position: fixed; */
  z-index: 1;
}

.timeEdit{
  background: rgba(255, 255, 255, 0);
  border: none;
  color: rgb(140, 63, 211);
}
</style>
