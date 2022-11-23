<template>
  <header class="container-fluid front">
    <link
      href="https://fonts.googleapis.com/css?family=Roboto"
      rel="stylesheet"
    />
    <img src="../assets/logo.png" />
    <ul>
      <li>Date of Assessment: 22/11/2222</li>
      <li>Client name: Abcdef</li>
    </ul>
    <h1>Day of Assessment</h1>
  </header>
  <br />
</template>

<style scoped>
header {
  width: 100%;
  height: 10rem;
  display: flex;
  justify-content: center;
  background-color: #f6f6f6;
  position: fixed;
  overflow: hidden;
  float: left;
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
  display: flex;
}

li {
  position: relative;
  left: 70%;
  margin-right: 6rem;
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
