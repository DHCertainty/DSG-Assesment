<template>
  <header>
    <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>
    <h1>Day of Assessment</h1>
    <img src='../assets/logo.png'/>
    <ul>
      <li>Date of Assessment:</li>
      <li>Client name:</li>
    </ul>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  height: 10rem;
  display: flex;
  justify-content: center;
  background-color: #f6f6f6;
  position: fixed;
  margin: -8px;
  overflow: hidden;
  float: left;
}

h1 {
  color: black;
  margin: 0px;
  position: fixed;
  top: 120px;
  font-size: 25px;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  position: fixed;
  top: 20px;
  left: 70%;
  font-size: 12px;
}

li {
  margin-right: 6rem;
}

img {
    position: fixed;
    padding-top: 5px;
    top: 10px;
    left: 1%;
}

*{
    font-family: Roboto;
}
</style>
