<template>
  <div>
    <form class="centered">
      <section>
        <div class="grid-rows">
          <div class="form-control">
            <label class="common" for="typeof">Type of Dementia:</label>
            <v-select v-model="type" :options="['1', '2', '3']"></v-select>
            <!-- <select v-model="type" class="common" id="typeof" name="typeof">
              <option disabled selected value="type0"></option>
              <option value="type1">1</option>
              <option value="type2">2</option>
              <option value="type3">3</option>
            </select> -->
          </div>
          <div class="form-control">
            <label class="common" for="stageof">Stage of Dementia:</label>
            <v-select v-model="stageof" :options="['1', '2', '3']"></v-select>
            <!-- <select
              v-model="stageof"
              class="common"
              id="stageof"
              name="stageof"
            >
              <option disabled selected value="stage0"></option>
              <option value="stage1">1</option>
              <option value="stage2">2</option>
              <option value="stage3">3</option>
            </select> -->
          </div>
          <div class="form-control">
            <label class="common" for="score"
              >Latest AMT/MMSE/MOCA score:</label
            >
            <input
              v-model="latest"
              class="common"
              id="score"
              name="score"
              type="text"
            />
          </div>
          <div class="form-control">
            <label class="common" for="score">Date Done : </label>
            <input
              v-model="date"
              class="common"
              id="score"
              name="score"
              type="date"
            />
          </div>
        </div>
        <hr />
        <section v-show="type && stageof && latest && date">
        <div class="form-control gap">
          <input
            v-model="checker"
            id="sacop"
            name="part2"
            type="checkbox"
            value="sacop"
          />
          <label class="gapped" for="sacop"
            >Shared about Centre's objectives & program</label
          >
        </div>
        <div class="form-control gap">
          <input
            v-model="checker2"
            id="wcv"
            name="part2"
            type="checkbox"
            value="wcv"
          />
          <label class="gapped" for="wcv">Watched Centre's video</label>
        </div>
        <div class="form-control gap">
          <input
            id="pnbtg"
            name="the-pnbtg"
            type="checkbox"
            value="pnbtg"
            v-model="neeuro"
          />
          <label class="gapped" for="pnbtg"
            >Played NeeuroFIT brain training game</label
          >
        </div>
        <div class="form-control gap">
          <input
            v-model="checker3"
            id="pttg"
            name="part2"
            type="checkbox"
            value="pttg"
          />
          <label class="gapped" for="pttg">Played Table Top games</label>
        </div>
        <!-- <div class="container" v-show="neeuro"> -->
        <!-- </div> -->
        <div class="container" v-show="neeuro">
          <h2>Pick Games:</h2>
          <div>
            <div class="left">
              <input
                v-model="atten"
                id="att"
                name="part2ins"
                type="checkbox"
                value="att"
              />
              <label for="att">&nbsp;Attention</label>
            </div>
            <section class="grid-rows" v-show="atten">
              <div>
                <label class="inside" for="stageof">Game played:</label>
                <select class="inside" id="stageof" name="stageof">
                  <option disabled selected value></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div>
                <label class="inside" for="stageof">Finished Level:</label>
                <select class="inside" id="stageof" name="stageof">
                  <option disabled selected value></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </section>
            <div class="gap left">
              <input
                v-model="spatial"
                id="spat"
                name="part2ins"
                type="checkbox"
                value="spat"
              />
              <label for="spat">&nbsp;Spatial</label>
            </div>
            <section class="grid-rows" v-show="spatial">
              <div>
                <label class="inside" for="stageof">Game played:</label>
                <select class="inside" id="stageof" name="stageof">
                  <option disabled selected value></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div>
                <label class="inside" for="stageof">Finished Level:</label>
                <select class="inside" id="stageof" name="stageof">
                  <option disabled selected value></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </section>
            <div class="gap left">
              <input v-model="decision" id="dec" name="part2ins" type="checkbox" value="dec" />
              <label for="dec">&nbsp;Decision</label>
            </div>
            <section class="grid-rows" v-show="decision">
              <div>
                <label class="inside" for="stageof">Game played:</label>
                <select class="inside" id="stageof" name="stageof">
                  <option disabled selected value></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div>
                <label class="inside" for="stageof">Finished Level:</label>
                <select class="inside" id="stageof" name="stageof">
                  <option disabled selected value></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </section>
            <div class="gap left">
              <input v-model="memory" id="mem" name="part2ins" type="checkbox" value="mem" />
              <label for="mem">&nbsp;Memory</label>
            </div>
            <section class="grid-rows" v-show="memory">
              <div>
                <label class="inside" for="stageof">Game played:</label>
                <select class="inside" id="stageof" name="stageof">
                  <option disabled selected value></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div>
                <label class="inside" for="stageof">Finished Level:</label>
                <select class="inside" id="stageof" name="stageof">
                  <option disabled selected value></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </section>
            <div class="gap left">
              <input v-model="flexibility" id="flexi" name="part2ins" type="checkbox" value="flexi" />
              <label for="flexi">&nbsp;Flexibility</label>
            </div>
            <section class="grid-rows" v-show="flexibility">
              <div>
                <label class="inside" for="stageof">Game played:</label>
                <select class="inside" id="stageof" name="stageof">
                  <option disabled selected value></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div>
                <label class="inside" for="stageof">Finished Level:</label>
                <select class="inside" id="stageof" name="stageof">
                  <option disabled selected value></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </section>
          </div>
        </div>
        <hr />
        </section>
        <section
          v-show="
            type &&
            stageof &&
            latest &&
            date &&
            (neeuro || checker || checker2 || checker3)
          "
        >
          <div class="form-control">
            <label class="common" for="comment"
              >Comment/Observation about the client</label
            >
            <textarea
              id="comment"
              name="comment"
              rows="3"
              type="text"
              v-model="checking"
            ></textarea>
          </div>
          <hr />
        </section>
        <!-- section v-show="checking" -->
        <section
          v-show="
            type &&
            stageof &&
            latest &&
            date &&
            checking &&
            (neeuro || checker || checker2 || checker3)
          "
        >
        <!-- <section> -->
          <div class="form-control">
            <label class="common" for="session">Session Reccomended:</label>
            <v-select
              multiple
              v-model="ses"
              :options="[
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
              ]"
            ></v-select>
          </div>
          <div class="form-control">
            <label class="common gap" for="admission">Admission date:</label>
            <input
              v-model="adm"
              class="half"
              id="admission"
              name="admission"
              type="text"
            />
          </div>
          <hr />
        </section>
        <section
          v-show="
            type &&
            stageof &&
            latest &&
            date &&
            checking &&
            (neeuro || checker || checker2 || checker3)
            && ses.length > 0 && adm
          "
        >
        <!-- <section> -->
          <label class="common gap">Subsidy:</label>
          <div class="form-control gap">
            <input
              v-model="no"
              id="no"
              name="subsidy"
              type="radio"
              value="no"
              @click="revert()"
            />
            <label for="no">&nbsp;No</label>
          </div>
          <div class="form-control gap gapbot">
            <input
              v-model="subsidy"
              id="yes"
              name="subsidy"
              type="radio"
              value="yes"
            />
            <label for="yes">&nbsp;Yes</label>
          </div>
          <!--  -->
          <section v-show="subsidy">
            <div class="grid-rows-subsidy">
            <label class="common">Means Test Result</label>
              <input class="common" id="means" name="means" type="text" />
              <label class="common subsidy">% subsidy</label>
            </div>

            <div class="grid-rows">
              <div class="form-control gapbot">
                <label class="common" for="sponsor">Pick Sponsor:</label>
                <select class="common" id="sponsor" name="sponsor">
                  <option disabled selected value></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>

              <div class="form-control gapbot">
                <label class="common" for="subsid">Amount Subsidized:</label>
                <input
                  class="common"
                  id="subsid"
                  name="subsid"
                  type="text"
                  value="S$"
                  readonly="readonly"
                />
              </div>
            </div>
          </section>
          <hr />
        </section>
        <section
          v-show="
            type &&
            stageof &&
            latest &&
            date &&
            checking &&
            (neeuro || checker || checker2 || checker3) &&
            (no || subsidy) &&
            ses.length > 0 &&
            adm
          "
        >
          <div>
            <label class="common">Applicable Fee (excluding GST):</label>
            <div class="form-control">
              <div class="form-control gap">
                <input id="80" name="cbfees" type="checkbox" value="80" />
                <label class="long" for="80"
                  >Centre-based 3-HR FOW group session [$80]</label
                >
              </div>
              <div class="form-control gap">
                <input id="90" name="cbfees" type="checkbox" value="90" />
                <label class="long" for="90"
                  >Centre-based 1.5-HR one-to-one FOW session [$90]</label
                >
              </div>
              <div class="form-control gap">
                <input id="256" name="cbfees" type="checkbox" value="256" />
                <label class="long" for="256"
                  >Centre-based 6 months subcription [$256.80]</label
                >
              </div>
              <div class="form-control gap">
                <input id="sgp" name="cbfees" type="checkbox" value="sgp" />
                <label class="long" for="sgp"
                  >Centre-based 3-HR CIP trial run [S'porean]</label
                >
              </div>
              <div class="form-control gap gapbot">
                <input
                  id="prfees"
                  name="cbfees"
                  type="checkbox"
                  value="prfees"
                />
                <label class="long" for="prfees"
                  >Centre-based 3-HR CIP trial run [PR]</label
                >
              </div>
              <div class="form-control gap">
                <input id="hb90" name="hbfees" type="checkbox" value="hb90" />
                <label class="long" for="hb90"
                  >Home-based 1-HR one-to-one FOW session(incl. transport)
                  [$90]</label
                >
              </div>
              <div class="form-control gap">
                <input id="hb120" name="hbfees" type="checkbox" value="hb120" />
                <label class="long" for="hb120"
                  >Home-based 1.5-HR one-to-one FOW session(incl. transport)
                  [$120]</label
                >
              </div>
              <div class="form-control gap">
                <input id="hb150" name="hbfees" type="checkbox" value="hb150" />
                <label class="long" for="hb150"
                  >Home-based 2-HR one-to-one FOW session(incl. transport)
                  [$150]</label
                >
              </div>
              <div class="form-control gap gapbot">
                <input id="hb90" name="hbfees" type="checkbox" value="hb90" />
                <label class="long" for="hb90"
                  >Home-based 1-HR FOW session via video calls [$90]</label
                >
              </div>
              <div class="form-control gap">
                <input id="50" name="other-fees" type="checkbox" value="50" />
                <label class="long" for="50">One-time Assessment [$50]</label>
              </div>
              <div class="form-control gap">
                <input
                  id="refund"
                  name="other-fees"
                  type="checkbox"
                  value="refund"
                />
                <label class="long" for="refund"
                  >Refundable One-Month Deposit (4 X applicable fee)</label
                >
              </div>
              <div class="grid-rows gapbot">
                <div class="form-control">
                  <label class="common" for="receipt">Official Receipt:</label>
                  <input
                    class="common"
                    id="receipt"
                    name="receipt"
                    type="text"
                  />
                </div>
                <div class="form-control">
                  <label class="common" for="collect">Amount Collected:</label>
                  <input
                    class="common"
                    id="collect"
                    name="collect"
                    type="text"
                  />
                </div>
              </div>
              <label class="common gap" for="cash">Mode of Payment: </label>
              <div class="grid-rows-4">
                <div>
                  <input id="cash" name="payment" type="radio" value="cash" />
                  <label for="cash">&nbsp;Cash</label>
                </div>
                <div>
                  <input
                    id="paynow"
                    name="payment"
                    type="radio"
                    value="paynow"
                  />
                  <label for="paynow">&nbsp;PayNow</label>
                </div>
                <div>
                  <input
                    id="e-bank"
                    name="payment"
                    type="radio"
                    value="e-bank"
                  />
                  <label for="e-bank">&nbsp;Internet Banking</label>
                </div>
                <div>
                  <input
                    id="cheque"
                    name="payment"
                    type="radio"
                    value="cheque"
                  />
                  <label for="cheque">&nbsp;Cheque</label>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </form>
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";
// import Deselect from './Deselect.vue'
// import OpenIndicator from './OpenIndicator.vue'
// import BaseCard from './BaseCard.vue';
export default {
  // Deselect,
  // OpenIndicator,
  components: { vSelect },
  // emits: ["newresource"],
  data() {
    return {
      neeuro: false,
      atten: false,
      spatial: false,
      decision: false,
      memory: false,
      flexibility: false,
      checker: false,
      checker2: false,
      checker3: false,
      subsidy: null,
      no: null,
      checking: "",
      ses: [],
      adm: "",
      latest: "",
      type: "",
      stageof: "",
      date: "",
    };
  },
  methods: {
    revert() {
      this.subsidy = null;
    },
  },
  watch: {
    checking(value) {
      if (value === "") {
        this.ses = [];
        this.adm = "";
      }
    },
    // ses(value){
    //   if(value.length === 0){
    //     value = [];
    //   }
    //   console.log(value);
    // }
    // latest(value){
    //   if (value === ""){
    //     this.checking = "";
    //     this.neeuro = false;
    //     this.checker = false;
    //     this.checker2 = false;
    //     this.checker3 = false;
    //   }
    // }
  },
};

//font: roboto
</script>

<style scoped>
.container {
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 2rem auto;
  max-width: 100rem;
  display: block;
  justify-content: left;
  text-align: center;
}

label.common {
  font-weight: bold;
  display: flex;
  margin-bottom: 0.5rem;
  width: 35.5vw;
}

label.inside {
  display: flex;
  margin-bottom: 0.5rem;
  width: 15vw;
}

.long {
  font-size: 15px;
}

.half {
  display: flex;
  width: 50%;
  height: 1.5rem;
  font: inherit;
  padding: 0.2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input.common {
  display: flex;
  width: 100%;
  height: 1.5rem;
  font: inherit;
  padding: 0.2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

textarea {
  display: flex;
  width: 70%;
  height: 5.5rem;
  font: inherit;
  padding: 0.2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

select.common {
  display: flex;
  width: 100%;
  height: 2rem;
  font: inherit;
  padding: 0.2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

select.inside {
  display: flex;
  width: 100%;
  height: 2rem;
  font: inherit;
  padding: 0.2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #3a0061;
  background-color: #f7ebff;
}

.form-control {
  position: relative;
  /* padding-left: 90px; */
  margin-right: 3rem;
}

.gap {
  margin-top: 1rem;
}

.gapped {
  margin-left: 1rem;
}

.gapbot {
  margin-bottom: 2rem;
}

* {
  font-family: roboto;
}

.grid-rows {
  display: grid;
  grid-gap: 50px;
  grid-template-columns: auto auto;
  margin-top: 30px;
}

.grid-rows-subsidy {
  display: grid;
  grid-template-columns: 130px auto auto;
  /* margin-right: 100px; */
  grid-gap: 10px;
  max-width: 100%;
  /* justify-content: center; */
  /* white-space: nowrap; */
  /* width: 60%; */
}

.subsidy{
  text-align: left;
}

.grid-rows-4 {
  display: grid;
  grid-template-columns: auto auto auto auto;
  margin-top: 30px;
}

.centered {
  width: 72%;
  display: flex;
  margin: auto;
}

.left {
  text-align: left;
}
hr {
  margin-left: -40px;
  margin-top: 2rem;
  margin-bottom: 2rem;
  /* max-width: 100%; */
}
</style>
