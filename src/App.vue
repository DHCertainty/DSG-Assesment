
<template>
  <div>
    <the-navbar></the-navbar>
    <the-form></the-form>
  </div>
  
</template>
<script src="https://cdn.lordicon.com/lordicon.js"></script>
<script>
import TheForm from './components/TheForm.vue';
import TheNavbar from './components/TheNavbar.vue';
import axios from "axios";
import * as msal from "@azure/msal-browser";
export default {
  name: 'App',
  components: {
    TheNavbar,
    TheForm
  },
  data() {
    return {
      msalApp: null,
      promptLogin: null,
      logindata: null
    }
  },
  methods: {
    async prepareAxios(){
       let msalApp = this.$store.state.msalApp;

       if (!msalApp) {
         return;
       }

      let accounts = msalApp.getAllAccounts();
      if (accounts.length > 0) {
        msalApp.setActiveAccount(accounts[0]);
        this.$store.commit('msalApp', msalApp);
      }

        let {accessToken} = await msalApp.acquireTokenSilent({scopes:[
            `https://${this.$store.state.logindata.DATAVERSE_DOMAIN}/.default`
        ]});
        this.$store.commit('accessToken',accessToken);
        this.token = accessToken
        let result = axios.create({
            baseURL:`https://${this.$store.state.logindata.DATAVERSE_DOMAIN}/api/data/${this.$store.state.logindata.DATAVERSE_VERSION}`,
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'OData-MaxVersion': '4.0',
                'OData-Version': '4.0',
                'Authorization':'Bearer '+ accessToken,
                'Prefer': 'return=representation'
            }
        });
        this.$store.commit('axios', result);
        this.$store.state.axios.get("/GlobalOptionSetDefinitions(560a1b0a-77fe-487d-840d-131c258ed1e0)").then(({data})=>{
          let rooms = {}  
          data.Options.forEach(o=>{
            rooms[o.Value] = o.Label.UserLocalizedLabel.Label;
          })
          this.$store.commit('rooms', rooms);

        })

    },
    async login() {
      
      try {
        await this.msalApp.loginRedirect({
          scopes: [`https://${this.logindata.DATAVERSE_DOMAIN}/.default`],
          redirectUri: location.origin + "/home",
          state:  this.$route.query.client_id
        });
        !this.$store.state.msalApp && this.msalApp
          ? this.$store.commit("msalApp", this.msalApp)
          : console.log("not");
        await this.prepareAxios();

        this.promptLogin = false;
      } catch (e) {
        console.log(e);
      }
    },
    async init() {
      return axios.get("/api/init").then(async (rsp) => {
        this.logindata = rsp.data;
        this.$store.commit("logindata", rsp.data);
        const msalConfig = {
          auth: {
            clientId: this.logindata.MS_APP_ID,
            authority: `https://login.microsoftonline.com/${this.logindata.TENANT_ID}`,
          },
        };
        // console.log(msalConfig);
        let msalApp = (this.msalApp = new msal.PublicClientApplication(
          msalConfig
        ));
        let accounts = msalApp.getAllAccounts();
        this.$store.commit('msalAccount', accounts);
        // console.log(accounts);
        if (accounts.length > 0) {
          msalApp.setActiveAccount(accounts[0]);
          this.$store.commit("msalApp", msalApp);
          await this.prepareAxios();
        } else {
          msalApp.handleRedirectPromise().then(async () => {
            // Check if user signed in 
            const account = msalApp.getActiveAccount();
            this.$store.commit("msalApp", msalApp);
            await this.prepareAxios();
            if (!account) {
              this.login();
            }
          }).catch(() => {
            this.login();
          });
          this.login();
        }

        return rsp;
      });
    },
  }
};

</script>

<style>
@font-face {
  font-family: "Montserrat";
  src: local("Montserrat"),
   url(../src/assets/font/Montserrat/Montserrat-VariableFont_wght.ttf) format("truetype");
}

.back{
  /* position: static; */
  z-index: 0;
}

.close{
  border: 0;
  background-color: #fff;
}

</style>