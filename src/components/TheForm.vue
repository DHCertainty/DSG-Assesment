<template lang="pug">
div
  .container-xxl
    form
      section
        .row
          .col-sm-6
            label.common.gap(for="typeof") Type of Dementia:
            v-select(v-model="type" :options="DementiaType")
          .col-sm-6
            label.common.gap(for="stageof") Stage of Dementia:
            v-select(v-model="stageof" :options="DementiaStage")
        .row
          .col-sm-3 
            label.common.gap(for="score") Latest score on:
            v-select(v-model="latestscore" :options="['AMT', 'MMSE', 'MOCA']")
          .col-sm-3.gap
            input.numbers.gap-twice#score(v-model="latest" type="number" min="0" :disabled="!latestscore")
          .col-sm-6
            label.common.gap(for="score") Date Done:
            input.numbers#score(v-model="date" name="score" type="date")
        hr
        section(v-show="type && stageof && latest && latestscore && date")
          .formed.gap
            input#sacop(v-model="checker" type="checkbox" value="sacop" name="part2")
            label.gapped.text-small(for="sacop") Shared about Centre's objectives & program
          .formed.gap
            input#wcv(v-model="checker2" name="part2" type="checkbox" value="wcv")
            label.gapped.text-small(for="wcv") Watched Centre's video
          .formed.gap
            input#pnbtg(name="the-pnbtg" value="pnbtg" type="checkbox" v-model="neeuro")
            label.gapped.text-small(for="pnbtg") Played NeeuroFIT brain training game
          .container(v-show="neeuro")
            h2 Pick Games:
            .left
              input#att(v-model="atten" name="part2ins" type="checkbox" value="att")
              label(for="att") &nbsp;Attention
              .row(v-show="atten")
                .gap.col-sm-6
                  label.common.inside(for="stageof") Game played:
                  v-select(:options="game1")
                .gap.col-sm-6
                  label.common.inside(for="stageof") Finished Level:
                  v-select(:options="levels")
            .gap.left 
              input#spat(type="checkbox" name="part2ins" v-model="spatial" value="spat")
              label(for="spat") &nbsp;Spatial
              .row(v-show="spatial")
                .gap.col-sm-6
                  label.common.inside(for="stageof") Game Played:
                  v-select(:options="game2")
                .gap.col-sm-6
                  label.common.inside(for="stageof") Finished Level:
                  v-select(:options="levels")
            .gap.left 
              input#dec(type="checkbox" name="part2ins" v-model="decision" value="dec")
              label(for="dec") &nbsp;Decision
              .row(v-show="decision")
                .gap.col-sm-6
                  label.common.inside(for="stageof") Game Played:
                  v-select(:options="game3")
                .gap.col-sm-6
                  label.common.inside(for="stageof") Finished Level:
                  v-select(:options="levels")
            .gap.left 
              input#mem(type="checkbox" name="part2ins" v-model="memory" value="mem")
              label(for="mem") &nbsp;Memory
              .row(v-show="memory")
                .gap.col-sm-6
                  label.common.inside(for="stageof") Game Played:
                  v-select(:options="game4")
                .gap.col-sm-6
                  label.common.inside(for="stageof") Finished Level:
                  v-select(:options="levels")
              .gap.left
                input#flexi(type="checkbox" name="part2ins" v-model="flexibility" value="flexi")
                label(for="flexi") &nbsp;Flexibility
                .row(v-show="flexibility")
                  .gap.col-sm-6
                    label.common.inside(for="stageof") Game Played:
                    v-select(:options="game5")
                  .gap.col-sm-6
                    label.common.inside(for="stageof") Finished Level:
                    v-select(:options="levels")
          .formed.gap
            input#pttg(v-model="checker3" name="part2" type="checkbox" value="pttg")
            label.gapped.text-small(for="pttg") Played Table Top games
          .formed.gap
            input#mocaform(v-model="checker4" name="mocaform" type="checkbox" value="mocaform")
            label.gapped.text-small(for="mocaform") MOCA form
          .container.left.gap(v-show="checker4")
            h2.moca.gapbot MOCA
            p.common Version:
            div
              input#cn(v-model="cn" name="cnbx" type="checkbox" value="cn")
              label.gapped(for="cn") Chinese 
            div
              input#en(v-model="en" name="enbx" type="checkbox" value="en")
              label.gapped(for="en") English 
            p.common.gap Education Level:
            .col-sm-6
              v-select(v-model="edulev" :options="edulevel")
              .gap(v-show="edulev")
                p.common.gap Education Year:
                div
                  input#un(v-model="unyearSelected" name="unbx" type="checkbox" value="un")
                  label.gapped(for="un") ≤ 6 Years
                div
                  input#ov(v-model="ovyearSelected" name="ovbx" type="checkbox" value="ov")
                  label.gapped(for="ov") > 6 Years
            .row 
              p.common.gap Visuospatial/Executive
              .col-sm-6 
                label Alternating Trail Making:
                v-select(v-model="vis1" :options="['0', '1']" :clearable="false") 
              .col-sm-6 
                label Copy Cube:
                v-select(v-model="vis2" :options="['0', '1']" :clearable="false") 
              label.gap Draw Clock(Ten past eleven) [3 Points]
              v-select(multiple v-model="vis3" :options="dclock" :clearable="false") 
            .row 
              p.common.gap Naming
              .col-sm-6 
                label Lion:
                v-select(v-model="vis4" :options="['0', '1']" :clearable="false")
              .col-sm-6 
                label Elephant:
                v-select(v-model="vis5" :options="['0', '1']" :clearable="false")
              .col-sm-6 
                label.gap Camel:
                v-select(v-model="vis6" :options="['0', '1']" :clearable="false")
              p.common.gap Memory[0 Point]
              .col-sm-6
                input.numbers(type="text" value="0" disabled)
            .row
              p.common.gap Attention
              .col-sm-6
                label Repeat Forward order 2 1 8 5 4 :
                v-select(v-model="vis7" :options="['0', '1']" :clearable="false")
              .col-sm-6
                label Able to tap with his hand at each number 1:
                v-select(v-model="vis8" :options="['0', '1']" :clearable="false")
              .col-sm-6.gap
                label Serial 7 subtraction starting at 100:
                v-select(v-model="vis9" :options="['0', '1', '2', '3']" :clearable="false")
              .col-sm-6.gap
                label Repeat Backward order 7 4 2 :
                v-select(v-model="vis17" :options="['0', '1']" :clearable="false")
            .row
              p.common.gap Language(Repeat)
              .col-sm-6
                label First Sentence:
                v-select(v-model="vis10" :options="['0', '1']" :clearable="false")
              .col-sm-6
                label Second Sentence:
                v-select(v-model="vis11" :options="['0', '1']" :clearable="false")
              .col-sm-6.gap
                label Verbal Fluency:
                v-select(v-model="vis12" :options="['0', '1']" :clearable="false")
              .col-sm-6.gap
                label Specify(how many animals)
                v-select(v-model="vis18" :options="specify" :clearable="false")
            .row 
              p.common.gap Abstraction
              .col-sm-6 
                label Similarity between train - bicycle:
                v-select(v-model="vis13" :options="['0', '1']" :clearable="false")
              .col-sm-6 
                label Similarity between watch - ruler:
                v-select(v-model="vis14" :options="['0', '1']" :clearable="false")
            p.common.gap Delayed Recall[5 Points]
            v-select(multiple v-model="vis15" :options="Delayed")
            p.common.gap Orientation
            v-select(multiple v-model="vis16" :options="['Date', 'Month', 'Year', 'Day', 'Place', 'Country']")
            p.common.gap Total Score: {{ totalscore }}
          .formed.gap
            input#eq5d(v-model="checker5" name="eq5d" type="checkbox" value="eq5d")
            label.gapped.text-small(for="eq5d") EQ-5D-5L form
          .container.gap(v-show="checker5")
            h2.moca.gapbot EQ-5D-5L
            p.common Health Status:
            .row
              .left.col-sm-6
                .row.gap
                  label.col-lg-4 Mobility:
                  v-select.col-lg-8(v-model="eq1" :options="eq5dnumbers" :clearable="false")
                .row.gap
                  label.col-lg-4 Self-Care:
                  v-select.col-lg-8(v-model="eq2" :options="eq5dnumbers" :clearable="false")
                .row.gap
                  label.col-lg-4 Usual Activities:
                  v-select.col-lg-8(v-model="eq3" :options="eq5dnumbers" :clearable="false")
                .row.gap
                  label.col-lg-4 Pain/Discomfort:
                  v-select.col-lg-8(v-model="eq4" :options="eq5dnumbers" :clearable="false")
                .row.gap
                  label.col-lg-4 Anxiety/Depression:
                  v-select.col-lg-8(v-model="eq5" :options="eq5dnumbers" :clearable="false")
              .col-sm-6
                p.gapbot Total Score:
                .sm-container
                  <br/>
                  h1 {{ eq5dcounter }}/25
            p.common.gap Perceived Health Scale:
            .row 
              label.left.col-sm-2 Health Scale:
              .col-sm-4
                input.numbers(type="number" min="0" max="100")
          hr    
        section(v-show="type && stageof && latest && latestscore && date && (neeuro || checker || checker2 || checker3 || checker4 || checker5)")
          .formed
            label.common(for="comment") Comment/Observation about the client
            textarea#comment(name="comment" rows="3" type="text" v-model="checking")
          hr
        section(v-show="type && stageof && latest && latestscore && date && (neeuro || checker || checker2 || checker3 || checker4 || checker5) && checking")
          .formed
            label.common(for="session") Session Recommended:      
            b-btn#add-btn(@click="addmethod") + Add Session 
            b-modal#add-session(size="lg" title="Add Session" centered)         
              p.common Type 
                div
                  input#group(v-model="typeses" name="typeSes" type="radio" value="Group")
                  label(for="group") &nbsp;Group
                div
                  input#individual(v-model="typeses" name="typeSes" type="radio" value="Individual")
                  label(for="individual") &nbsp;Individual
                  .row.gap(v-show="typeses")
                    p.common.gap Day 
                      div 
                        input#monday(v-model="day" name="daySes" type="radio" value="Monday")
                        label(for="monday") &nbsp;Monday
                      div
                        input#tuesday(v-model="day" name="daySes" type="radio" value="Tuesday")
                        label(for="tuesday") &nbsp;Tuesday
                      div
                        input#wednesday(v-model="day" name="daySes" type="radio" value="Wednesday")
                        label(for="wednesday") &nbsp;Wednesday
                      div
                        input#thursday(v-model="day" name="daySes" type="radio" value="Thursday")
                        label(for="thursday") &nbsp;Thursday
                      div 
                        input#friday(v-model="day" name="daySes" type="radio" value="Friday")
                        label(for="friday") &nbsp;Friday
                        .row.gap(v-show="day")
                          p.common.gap Time 
                          div
                            input#am(v-model="time" name="timeSes" type="radio" value="AM")
                            label(for="am") &nbsp;9:30 AM
                          div
                            input#pm(v-model="time" name="timeSes" type="radio" value="PM")
                            label(for="pm") &nbsp;2:30 PM
                            .row.gap(v-show="time")
                              p.common.gap Location
                              div
                                input#center(v-model="location" name="location" type="radio" value="Center")
                                label(for="center") &nbsp;Center 
                            div(v-if="(time==='AM' || time==='PM') && typeses==='Individual'")
                              input#videocall(v-model="location" name="location" type="radio" value="Video Call (Zoom)")
                              label(for="videocall") &nbsp;Video Call (Zoom)
                              div
                                input#residence(v-model="location" name="location" type="radio" value="Residence")
                                label(for="residence") &nbsp;Residence 
              template(#modal-footer="{ok}")
                b-btn(v-show="location" size="md" @click="addNew") Add


          .formed
            label.common.gap(for="admission") Admission date:
            input.numbers-half#admission(v-model="adm" name="admission" type="date")
          hr
        section(v-show="type && stageof && latest && latestscore && date && (neeuro || checker || checker2 || checker3 || checker4 || checker5) && checking ")
          label.common.gap Subsidy:
          .formed.gap
            input#no(v-model="no" name="subsidy" type="radio" value="no" @click="revert()")
            label(for="no") &nbsp;No
          .formed.gap.gapbot
            input#yes(v-model="subsidy" name="subsidy" type="radio" value="yes")
            label(for="yes") &nbsp;Yes
            section(v-show="subsidy")
              .formed
                .formed.gap
                  input#dsg1(v-model="subs1" name="subsidy1" type="checkbox" value="dsg1")
                  label.long(for="dsg1") DSG
                .gap 
                  input#dsg2(v-model="subs2" name="subsidy2" type="checkbox" value="dsg2")
                  label.long(for="dsg2") Toteboard
                  .row.gap(v-show="subs2")
                    .col-md-2 
                      label.common Means Test Result
                    .col-md-2 
                      input.numbers#means(name="means" type="number" min="0")
                    .col-md-2
                      label.common % subsidy
                .formed.gap
                  input#dsg3(v-model="subs3" name="subsidy3" type="checkbox" value="dsg3")
                  label.long(for="dsg3") Others
                  .formed.gap(v-show="subs3")
                    label.common(for="others") Specify: 
                    input.numbers-half#others(name="others" type="text")
                .formed.gap.gapbot 
                  input#dsg4(v-model="subs4" name="subsidy4" type="checkbox" value="dsg4")
                  label.long(for="dsg4") Amount Subsidized
                  .formed.gapbot(v-show="subs4")
                    label.common(for="subsid") Amount Subsidized:
                    input.numbers-half#subsid(name="subsid" type="number" min="0")
          hr
        section(v-show="type && stageof && latest && latestscore && date && (neeuro || checker || checker2 || checker3 || checker4 || checker5) && checking && (no || subsidy)")
          label.common Applicable Fee (excluding GST):
          .formed
            .formed.gap
              input#80(v-model="fees1" name="cbfees" type="checkbox" value="80")
              label.gapped.text-small(for="80") Centre-based 3-HR FOW group session [$80]
            .formed.gap
              input#90(v-model="fees2" name="cbfees" type="checkbox" value="90")
              label.gapped.text-small(for="90") Centre-based 1.5-HR one-to-one FOW session [$90]
            .formed.gap
              input#240(v-model="fees3" name="cbfees" type="checkbox" value="240")
              label.gapped.text-small(for="240") Centre-based NeeuroFIT 6 months subcription [$240]
            .formed.gap
              input#sgp(v-model="fees4" name="cbfees" type="checkbox" value="sgp")
              label.gapped.text-small(for="sgp") Centre-based 3-HR CIP trial run [S'porean]
            .formed.gap.gapbot
              input#prfees(v-model="fees5" name="cbfees" type="checkbox" value="prfees")
              label.gapped.text-small(for="prfees") Centre-based 3-HR CIP trial run [PR]
            .formed.gap
              input#hb90(v-model="fees6" name="cbfees" type="checkbox" value="hb90")
              label.gapped.text-small(for="hb90") Home-based 1-HR one-to-one FOW session(incl. transport) [$90]
            .formed.gap
              input#hb120(v-model="fees7" name="cbfees" type="checkbox" value="hb120")
              label.gapped.text-small(for="hb120") Home-based 1.5-HR one-to-one FOW session(incl. transport) [$120]
            .formed.gap
              input#hb150(v-model="fees8" name="cbfees" type="checkbox" value="hb150")
              label.gapped.text-small(for="hb150") Home-based 2-HR one-to-one FOW session(incl. transport) [$150]
            .formed.gap.gapbot
              input#hb90-2(v-model="fees9" name="cbfees" type="checkbox" value="hb90-2")
              label.gapped.text-small(for="hb90-2") Home-based 1-HR FOW session via video calls [$90]
            .formed.gap
              input#50(v-model="fees10" name="cbfees" type="checkbox" value="50")
              label.gapped.text-small(for="50") One-time Assessment [$50]
            .formed.gap
              input#refund(v-model="fees11" name="cbfees" type="checkbox" value="refund")
              label.gapped.text-small(for="refund") Refundable One-Month Deposit (4 X applicable fee)
          .gapright.row
            .gap.col-sm-6
              label.common(for="receipt") Official Receipt:
              input.numbers#receipt(name="receipt" type="text")
            .gap.col-sm-6
              label.common(for="collect") Amount Collected [in SGD($)]:
              input.numbers#collect(v-model="amtcollect" name="collect" type="text" readonly="readonly")
          label.common.gap Mode of Payment:
          .row 
            .col-md-3
              input#cash(name="payment" type="radio" value="cash")
              label(for="cash") &nbsp;Cash
            .col-md-3
              input#paynow(name="payment" type="radio" value="paynow")
              label(for="paynow") &nbsp;PayNow
            .col-md-3
              input#e-bank(name="payment" type="radio" value="e-bank")
              label(for="e-bank") &nbsp;Internet Banking
            .col-md-3
              input#cheque(name="payment" type="radio" value="cheque")
              label(for="cheque") &nbsp;Cheque
    <br>
    <br>
    <br>
    <br>
    <br>
</template>

<script>
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";
// import colors from "././scss/colors.scss";
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
      checker4: false,
      checker5: false,
      subsidy: null,
      no: null,
      checking: "",
      ses: [],
      latestscore: "",
      adm: "",
      latest: "0",
      type: "",
      stageof: "",
      date: "",
      edulev: "",
      gp: false,
      ind: false,
      subs1: true,
      subs2: false,
      subs3: false,
      subs4: false,
      amtcollect: 0,
      fees1: false,
      fees2: false,
      fees3: false,
      fees4: false,
      fees5: false,
      fees6: false,
      fees7: false,
      fees8: false,
      fees9: false,
      fees10: false,
      fees11: false,
      cn: false,
      en: false,
      unyearSelected: false,
      ovyearSelected: false,
      un: false,
      ov: false,
      typeses: false,
      day: false,
      time: false,
      location: false,
      unpoint: 0,
      vis1: [0],
      vis2: [0],
      vis3: [],
      vis4: [0],
      vis5: [0],
      vis6: [0],
      vis7: [0],
      vis8: [0],
      vis9: [0],
      vis10: [0],
      vis11: [0],
      vis12: [0],
      vis13: [0],
      vis14: [0],
      vis15: [],
      vis16: [],
      vis17: [0],
      vis18: [],
      eq1: 0,
      eq2: 0,
      eq3: 0,
      eq4: 0,
      eq5: 0,
      DementiaType: [
        "Alzheimer’s Disease",
        "Vascular Dementia",
        "Mixed Dementia",
        "Lewy Body Dementia",
        "Parkinson Dementia",
        "Fronto-temporal Dementia",
        "Others",
      ],
      DementiaStage: [
        "Mild",
        "Mild to Moderate",
        "Moderate",
        "Moderate to Severe",
        "Severe",
      ],
      levels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      game1: [
        "Psychic Cyclist",
        "Mindcopter",
        "Sushi Recall",
        "Sitting Ducks",
        "Multitask Master",
      ],
      game2: ["Whats’s this Word ?", "Dot Connect", "Stargazer", "Space 360"],
      game3: [
        "Junction Control",
        "Pyramid Solitaire",
        "Supreme Shopper",
        "Flower Garden",
      ],
      game4: [
        "Farmhouse Friends",
        "Who’s Who?",
        "Pyramid Solitaire",
        "Sushi Recall",
        "Sitting Ducks",
      ],
      game5: ["Multitask Master", "Junction Control"],
      edulevel: [
        "Primary",
        "Secondary",
        "Pre-University",
        "Diploma",
        "Associate Degree",
        "Bachelor’s Degree",
        "Master’s Degree",
        "Doctorate Degree",
      ],
      dclock: ["Contour(1 point)", "Numbers(1 point)", "Hands(1 point)"],
      specify: [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "more than 11",
      ],
      Delayed: [
        "Cannot Recall(0 point)",
        "Face(1 point)",
        "Silk(1 point)",
        "Church(1 point)",
        "Rose(1 point)",
        "Red(1 point)",
      ],
      eq5dnumbers: ['0', '1', '2', '3', '4', '5'],
    };
  },
  compatConfig: { MODE: 3 },
  methods: {
    revert() {
      this.subsidy = null;
    },
    addmethod() {
      this.$bvModal.show("add-session");
    },
    addNew() {
      const sessions = [];

      sessions.push({
        type: this.typeses,
        day: this.day,
        time: this.time,
        location: this.location,
      });

      console.log('after: ', sessions)

      this.typeses= false;
      this.day=false;
      this.time=false;
      this.location= false;
    }
  },
  watch: {
    gp(value) {
      if( value === true) {
        this.ind = false;
      }
    },
    ind(value) {
      if( value === true) {
        this.gp = false;
      }
    },
    subs1(value) {
      if (value === true) {
        this.subs2 = false;
        this.subs3 = false;
        this.subs4 = false;
      }
    },
    subs2(value) {
      if (value === true) {
        this.subs1 = false;
        this.subs4 = false;
        this.subs3 = false;
      }
    },
    subs3(value) {
      if (value === true) {
        this.subs2 = false;
        this.subs1 = false;
        this.subs4 = false;
      }
    },
    subs4(value) {
      if (value === true) {
        this.subs2 = false;
        this.subs1 = false;
        this.subs3 = false;
      }
    },
    cn(value) {
      if (value === true) {
        this.en = false;
      }
    },
    en(value) {
      if (value === true) {
        this.cn = false;
      }
    },
    edulev(value){
      if(value === "Primary" || value === "Secondary"){
        // checked
        this.unyearSelected = true;
        // checked
        // unchecked
        this.ovyearSelected = false;
        // unchecked
        this.un = true;
        this.ov = false;
        this.unpoint = 1;
      }
      else {
        // unchecked
        this.unyearSelected = false;
        // unchecked
        // checked
        this.ovyearSelected = true;
        // checked
        this.un = false;
        this.ov = true;
        this.unpoint = 0;
      }
    },
    un(value) {
      if (value === true) {
        this.ov = false;
        this.unpoint = 1;
      } else {
        this.unpoint = 0;
      }
    },
    ov(value) {
      if (value === true) {
        this.un = false;
      }
    },
    fees1(value) {
      if (value === true) {
        this.amtcollect += 80;
      } else {
        this.amtcollect -= 80;
      }
    },
    fees2(value) {
      if (value === true) {
        this.amtcollect += 90;
      } else {
        this.amtcollect -= 90;
      }
    },
    fees3(value) {
      if (value === true) {
        this.amtcollect += 240;
      } else {
        this.amtcollect -= 240;
      }
    },
    fees4(value) {
      if (value === true) {
        this.amtcollect += 65;
      } else {
        this.amtcollect -= 65;
      }
    },
    fees5(value) {
      if (value === true) {
        this.amtcollect += 85;
      } else {
        this.amtcollect -= 85;
      }
    },
    fees6(value) {
      if (value === true) {
        this.amtcollect += 90;
      } else {
        this.amtcollect -= 90;
      }
    },
    fees7(value) {
      if (value === true) {
        this.amtcollect += 120;
      } else {
        this.amtcollect -= 120;
      }
    },
    fees8(value) {
      if (value === true) {
        this.amtcollect += 150;
      } else {
        this.amtcollect -= 150;
      }
    },
    fees9(value) {
      if (value === true) {
        this.amtcollect += 90;
      } else {
        this.amtcollect -= 90;
      }
    },
    fees10(value) {
      if (value === true) {
        this.amtcollect += 50;
      } else {
        this.amtcollect -= 50;
      }
    },
    fees11(value) {
      if (value === true) {
        this.amtcollect += 60;
      } else {
        this.amtcollect -= 60;
      }
    },
  },
  computed: {
    totalscore: function () {
      let length1 = this.vis3.length;
      let length3 = this.vis16.length;
      let vis18_point = (this.vis18 == '11' || this.vis18 == 'more than 11') ? 1 : 0;
      let vis15_point =  (this.vis15.includes("Cannot Recall(0 point)"))? 0: this.vis15.length;
      return (
        parseInt(this.vis1) +
        parseInt(this.vis2) +
        length1 +
        parseInt(this.vis4) +
        parseInt(this.vis5) +
        parseInt(this.vis6) +
        parseInt(this.vis7) +
        parseInt(this.vis8) +
        parseInt(this.vis9) +
        parseInt(this.vis10) +
        parseInt(this.vis11) +
        parseInt(this.vis12) +
        parseInt(this.vis13) +
        parseInt(this.vis14) +
        vis15_point +
        length3 +
        parseInt(this.vis17) +
        vis18_point +
        this.unpoint
      );
    },
    eq5dcounter: function () {
      return (
        parseInt(this.eq1) +
        parseInt(this.eq2) +
        parseInt(this.eq3) +
        parseInt(this.eq4) +
        parseInt(this.eq5)
      );
    },
}}

//font: roboto
</script>

<style lang="scss" scoped>
$base-color-purple :#50276B;

* {
  font-family: roboto;
}

.container {
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 1rem;
  margin: auto;
  max-width: 80vw;
  display: block;
  justify-content: center;
  text-align: center;
}

.sm-container {
  border-radius: 15px;
  border: 1px solid #ccc;
  padding: 1rem;
  text-align: center;
  justify-content: center;
  margin: auto;
  // position: relative;
  // left: 30%;
  width: 200px;
  height: 9rem;
}

label.common {
  font-weight: bold;
  display: flex;
  margin-bottom: 0.5rem;
  margin-left: 0;
  // width: 35.5vw;
}

p.common {
  font-weight: bold;
  display: flex;
  margin-bottom: 0.5rem;
}

label.inside {
  display: flex;
  margin-bottom: 0.5rem;
  // max-width: 15vw;
}

@media screen and (max-width: 411px) {
  .text-small {
    // display: none;
    // background-color: red;
    margin: 0;
    font-size: 3vw;
  }
}

.long {
  font-size: 15px;
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

.numbers {
  display: flex;
  width: 100%;
  height: 2rem;
  font: inherit;
  padding: 0.2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.numbers-half {
  display: flex;
  width: 50%;
  height: 2rem;
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
  // border-color: $tq;
  border-color: #3a0061;
  background-color: #f7ebff;
}

.formed {
  position: relative;
  /* padding-left: 90px; */
  margin-right: 3rem;
}

.gap {
  margin-top: 1rem;
}

.gap-twice {
  margin-top: 2rem;
}
.gapped {
  margin-left: 1rem;
}

.gapbot {
  margin-bottom: 2rem;
}

.left {
  text-align: left;
}

hr {
  margin-top: 3rem;
  margin-bottom: 2rem;
  border-width: 2px;
  border-color: black;
  display: block;
  // max-width: 100%;
}
.moca {
  font-weight: bold;
}
</style>
