<template>
  <header class="front">
    <link
      href="https://fonts.googleapis.com/css?family=Roboto"
      rel="stylesheet"
    />
    <img src="../assets/logo.png" />
    <ul>
      <li class="navbar__dateAssessment">Date of Assessment: {{ dateofassessment }}</li>
      <li class="navbar__clientName">Client name: {{ clientname }}</li>
    </ul>
    <h1>Day of Assessment</h1>
  </header>
</template>

<script>
export default {
  data(){
    return{
      clientname: "John Doe",
      dateofassessment: "16/01/2023",
    }
  },
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
    left: 27vw;
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
    left: 27vw;
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
    left: 30vw;
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
    left: 33.5vw;
  }

  .navbar__dateAssessment{
    margin-right: 3rem;
  }
}

h1 {
  color: black;
  position: fixed;
  font-weight: bold;
  top: 120px;
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
  font-family: Roboto;
}
.front{
  /* position: fixed; */
  z-index: 1;
}
</style>
