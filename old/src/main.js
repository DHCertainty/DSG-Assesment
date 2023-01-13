import { createApp } from 'vue';
//import Vue from 'vue';
import bootstrap from 'bootstrap';
import App from './App.vue' ;

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const app = createApp(App);

//Vue.use(bootstrap);
// app.component("v-select", vSelect);
app.use(bootstrap);
app.mount('#app');

