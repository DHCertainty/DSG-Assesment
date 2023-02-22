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
            .gap.left
              input#att(v-model="atten" name="part2ins" type="checkbox" value="att")
              label(for="att") &nbsp;Attention
              .row(v-show="atten")
                .gap.col-sm-6
                  label.common.inside(for="stageof" ) Game played:
                  v-select(:options="game1" v-model="attentiongame")
                .gap.col-sm-6
                  label.common.inside(for="stageof" ) Finished Level:
                  v-select(:options="levels" v-model="attentionlevel")
            .gap.left 
              input#spat(type="checkbox" name="part2ins" v-model="spatial" value="spat")
              label(for="spat") &nbsp;Spatial
              .row(v-show="spatial")
                .gap.col-sm-6
                  label.common.inside(for="stageof") Game Played:
                  v-select(:options="game2" v-model="spatialgame")
                .gap.col-sm-6
                  label.common.inside(for="stageof") Finished Level:
                  v-select(:options="levels" v-model="spatiallevel")
            .gap.left 
              input#dec(type="checkbox" name="part2ins" v-model="decision" value="dec")
              label(for="dec") &nbsp;Decision
              .row(v-show="decision")
                .gap.col-sm-6
                  label.common.inside(for="stageof") Game Played:
                  v-select(:options="game3" v-model="decisiongame")
                .gap.col-sm-6
                  label.common.inside(for="stageof") Finished Level:
                  v-select(:options="levels" v-model="decisionlevel")
            .gap.left 
              input#mem(type="checkbox" name="part2ins" v-model="memory" value="mem")
              label(for="mem") &nbsp;Memory
              .row(v-show="memory")
                .gap.col-sm-6
                  label.common.inside(for="stageof") Game Played:
                  v-select(:options="game4" v-model="memorygame")
                .gap.col-sm-6
                  label.common.inside(for="stageof") Finished Level:
                  v-select(:options="levels" v-model="memorylevel")
            .gap.left
                input#flexi(type="checkbox" name="part2ins" v-model="flexibility" value="flexi")
                label(for="flexi") &nbsp;Flexibility
                .row(v-show="flexibility")
                  .gap.col-sm-6
                    label.common.inside(for="stageof") Game Played:
                    v-select(:options="game5" v-model="flexibilitygame")
                  .gap.col-sm-6
                    label.common.inside(for="stageof") Finished Level:
                    v-select(:options="levels" v-model="Flexibilitylevel")
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
              input#cn(v-model="cn" name="cnbx" type="checkbox" value="0")
              label.gapped(for="cn") Chinese 
            div
              input#en(v-model="en" name="enbx" type="checkbox" value="1")
              label.gapped(for="en") English 
            p.common.gap Education Level:
            .col-sm-6
              v-select(v-model="edulev" :options="edulevel")
              .gap(v-show="edulev")
                p.common.gap Education Year:
                div
                  input#un(v-model="unyearSelected" name="unbx" type="checkbox" value="un" disabled="true")
                  label.gapped(for="un") ≤ 6 Years
                div
                  input#ov(v-model="ovyearSelected" name="ovbx" type="checkbox" value="ov" disabled="true")
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
              //- p.common.gap Memory[0 Point]
              //- .col-sm-6
              //-   input.numbers(type="text" value="0" disabled)
            .row
              p.common.gap Attention
              .col-sm-6
                label Repeat Forward order 2 1 8 5 4 :
                v-select(v-model="vis7" :options="['0', '1']" :clearable="false")
              .col-sm-6
                label Repeat Backward order 7 4 2 :
                v-select(v-model="vis17" :options="['0', '1']" :clearable="false")
              .col-sm-6.gap
                label Able to tap with his hand at each number 1:
                v-select(v-model="vis8" :options="['0', '1']" :clearable="false")
              .col-sm-6.gap
                label Serial 7 subtraction starting at 100:
                v-select(v-model="vis9" :options="['0', '1', '2', '3']" :clearable="false")
            .row
              p.common.gap Language
              .col-sm-6
                label Repeat First Sentence:
                v-select(v-model="vis10" :options="['0', '1']" :clearable="false")
              .col-sm-6
                label Repeat Second Sentence:
                v-select(v-model="vis11" :options="['0', '1']" :clearable="false")
              .col-sm-6.gap
                label Fluency(Specify how many animals): 
                  span(style="font-weight:bold") &nbsp; [ {{ fluencyPoints }} point ]
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
                input.numbers(v-model="healthscale" type="range" min="0" max="100") 
              .col-sm-4(style="font-size:22px;font-weight:bold;")
                input.numberslider(v-model="healthscale" type="number" min="0" max="100" onkeydown="return event.keyCode !== 190") 
          hr   
        section(v-show="type && stageof && latest && latestscore && date && (neeuro || checker || checker2 || checker3 || checker4 || checker5)")
          .formed
            label.common(for="comment") Comment/Observation about the client
            textarea#comment(name="comment" rows="3" type="text" v-model="checking")
          hr
        section(v-show="type && stageof && latest && latestscore && date && (neeuro || checker || checker2 || checker3 || checker4 || checker5)")
          .formed
            .row
              .col-sm-3
                label.common(for="session") Session Recommended: 
              .col     
                b-btn#add-btn(@click="addmethod") + Add Session 
            div.my-4(v-if="this.sessions.length === 0")
              p.common.gap No Session Selected
            ul.my-4(v-for="ses in sessions" key="ses.id")
              li()
                  | {{ses.type}} , {{ ses.day }} {{ ses.time }} ( {{ ses.location }} )
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
                        .row.gap(v-show="day && typeses==='Group'")
                          p.common.gap Time 
                          div
                            input#am(v-model="time" name="timeSes" type="radio" value="AM")
                            label(for="am") &nbsp;9:30 AM
                          div
                            input#pm(v-model="time" name="timeSes" type="radio" value="PM")
                            label(for="pm") &nbsp;2:00 PM
                            
                        .row.gap(v-show="day && typeses==='Individual'")
                          p.common.gap Time
                          div
                            b-form-timepicker.numbers#timeSession(v-model="time" name="timeSession" type="time" locale="en")
                            .row.gap(v-show="time && typeses==='Individual'")
                              p.common.gap Location
                              div
                                input#center(v-model="location" name="location" type="radio" value="Center")
                                label(for="center") &nbsp;Center 
                              div
                                input#videocall(v-model="location" name="location" type="radio" value="Video Call (Zoom)")
                                label(for="videocall") &nbsp;Video Call (Zoom)
                              div
                                input#residence(v-model="location" name="location" type="radio" value="Residence")
                                label(for="residence") &nbsp;Residence 
              template(#modal-footer="{ok}")
                b-btn(v-show="location" size="md" @click="addNew") Add


          .formed(style="margin-top:80px")
            label.common.gap(for="admission") Admission date:
            input.numbers-half#admission(v-model="adm" name="admission" type="date")
          hr
        section(v-show="type && stageof && latest && latestscore && date && (neeuro || checker || checker2 || checker3 || checker4 || checker5) && this.sessions.length > 0")
          .row.gap
            .col-md-1 
              label.common.gap Subsidy:
            .col-auto 
              .formed.gap
                input#no(v-model="no" name="subsidy" type="radio" value="no" @click="revert()")
                label(for="no") &nbsp;No
            .col-auto 
              .formed.gap.gapbot
                input#yes(v-model="subsidy" name="subsidy" type="radio" value="yes")
                label(for="yes") &nbsp;Yes
          section(v-show="subsidy")
              .formed
                .formed.gap
                  input#dsg1(v-model="subs1" name="subsidy1" type="checkbox" value="dsg1")
                  label.long.gapped(for="dsg1") DSG
                  .row.gap(v-show="subs1")
                      .col-md-2 
                        input.numbers#means(name="means" type="number" min="20" v-model="subs1val")
                      .col-md-2
                        label.common % subsidy
                .gap 
                  input#dsg2(v-model="subs2" name="subsidy2" type="checkbox" value="dsg2" disabled="checknationality")
                  label.long.gapped(for="dsg2") Toteboard
                  .row.gap(v-show="subs2")
                    .col-md-2 
                      label.common Means Test Result
                    .col-md-2 
                      v-select(v-model="subsidyAmount" :options="clientdata.crb5c_citizenship == 0 ?  toteboardSG : toteboardPR")
                    .col-md-2
                      label.common % subsidy
                .formed.gap
                  input#dsg3(v-model="subs3" name="subsidy3" type="checkbox" value="dsg3")
                  label.long.gapped(for="dsg3") Others
                  .formed.gap(v-show="subs3")
                    label.common(for="others") Specify: 
                    input.numbers-half#others(name="others" type="text")
                //- .formed.gapbot(v-show="subs1 || subs2 || subs3 ")
                //-     label.common(for="subsid" style="justify-content:end") Amount Subsidized:
                //-     .row(style="justify-content:end")
                //-       input.small-input-width#subsid(name="subsid" type="number" min="0")
          hr
        section(v-show="subsidy  || no")
          label.common Applicable Fee (excluding GST):
          .formed
            .formed.gap
              input#80(v-model="fees1" name="cbfees" type="checkbox" value="80" v-show="gotGroupFee  && checkCenter")
              label.gapped.text-small(for="80" v-show="gotGroupFee") Centre-based 3-HR FOW group session $80
            .formed.gap
              input#60(v-model="fees12" name="cbfees" type="checkbox" value="60" v-show="gotIndividualFee && checkCenter")
              label.gapped.text-small(for="60" v-show="gotIndividualFee && checkCenter") Centre-based 1-HR one-to-one FOW session $60
            .formed.gap
              input#90(v-model="fees2" name="cbfees" type="checkbox" value="90" v-show="gotIndividualFee && checkCenter")
              label.gapped.text-small(for="90" v-show="gotIndividualFee && checkCenter") Centre-based 1.5-HR one-to-one FOW session $90
            .formed.gap
              input#120(v-model="fees13" name="cbfees" type="checkbox" value="120" v-show="gotIndividualFee && checkCenter")
              label.gapped.text-small(for="120" v-show="gotIndividualFee && checkCenter") Centre-based 2-HR one-to-one FOW session $120
            .formed.gap
              input#240(v-model="fees3" name="cbfees" type="checkbox" value="240")
              label.gapped.text-small(for="240") Centre-based NeeuroFIT 6 months subcription $240
            .formed.gap
              input#hb90(v-model="fees6" name="cbfees" type="checkbox" value="hb90" v-show="gotIndividualFee && checkResidence") 
              label.gapped.text-small(for="hb90" v-show="gotIndividualFee && checkResidence") Home-based 1-HR one-to-one FOW session(incl. transport) $40
            .formed.gap
              input#hb120(v-model="fees7" name="cbfees" type="checkbox" value="hb120" v-show="gotIndividualFee && checkResidence")
              label.gapped.text-small(for="hb120" v-show="gotIndividualFee && checkResidence") Home-based 1.5-HR one-to-one FOW session(incl. transport) $120
            .formed.gap
              input#hb150(v-model="fees8" name="cbfees" type="checkbox" value="hb150" v-show="gotIndividualFee && checkResidence")
              label.gapped.text-small(for="hb150" v-show="gotIndividualFee && checkResidence") Home-based 2-HR one-to-one FOW session(incl. transport) $120
            .formed.gap.gapbot
              input#hb90-2(v-model="fees9" name="cbfees" type="checkbox" value="hb90-2" v-show="gotIndividualFee && checkZoom")
              label.gapped.text-small(for="hb90-2" v-show="gotIndividualFee && checkZoom") Home-based 1-HR FOW session via video calls $90
            
            section(v-show="subs2" style="margin-top:50px")
              hr
              .formed.gap
                input#sgp(v-model="fees4" name="cbfees" type="checkbox" value="sgp") 
                label.gapped.text-small(for="sgp") Centre-based 3-HR CIP trial run  ${{ fees4val }} 
                  span(style="font-weight:bold") ({{ prORsg }})
            .formed.gap
            hr
        section(v-show="(subsidy || no)" style="margin-top:50px")
            .formed.gap
              input#50(v-model="fees10" name="cbfees" type="checkbox" value="50")
              label.gapped.text-small(for="50") One-time Assessment $50
            .formed.gap
              input#refund(v-model="fees11" name="cbfees" type="checkbox" value="refund")
              label.gapped.text-small(for="refund") Refundable One-Month Deposit (4 X applicable fee) $320
          
        section(v-show="(subsidy || no)" style="margin-top:50px")
          .gapright.row.mt-4
            .gap.col-sm-6
              label.common(for="receipt") Official Receipt:
              b-form-file(class="mt-3" plain)
              //- input.numbers#receipt(name="receipt" type="file")
            .gap.col-sm-6
              label.common.amountjustify(for="collect" ) Amount Collected + GST [in SGD]:
              label.common.amountjustify(for="collect" style="font-size:30px") ${{ viewamtcollect.toFixed(2)}}
            hr
              //- input.numbers#collect(v-model="amtcollect " name="collect" type="text" readonly="readonly")
          label.common.gap Mode of Payment:
          .row 
            .col-md-3
              input#cash(v-model="modeofpayment" name="payment" type="radio" value="cash")
              label(for="cash") &nbsp;Cash
            .col-md-3
              input#paynow( v-model="modeofpayment" name="payment" type="radio" value="paynow")
              label(for="paynow") &nbsp;PayNow
            .col-md-3
              input#e-bank( v-model="modeofpayment" name="payment" type="radio" value="e-bank")
              label(for="e-bank") &nbsp;Internet Banking
            .col-md-3
              input#cheque( v-model="modeofpayment" name="payment" type="radio" value="cheque")
              label(for="cheque") &nbsp;Cheque
        section.submitbtn(v-if="modeofpayment" @click="submitassessment" )
          b-btn Submit
    <br>
    <br>
    <br>
    <br>
    <br>
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
      checkCenter:false,
      checkResidence:false,
      checkZoom:false,
      gotIndividualFee:false,
      gotGroupFee:false,
      modeofpayment: null,
      healthscale: 0,
      totalscoreMoca: null,
      totalscoreEq: null,
      normcost: 65 ,
      clientdata: [],
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
      sessions: [],
      latestscore: "",
      adm: "",
      latest: "0",
      type: "",
      stageof: "",
      date: "",
      edulev: "",
      gp: false,
      ind: false,
      subsidyAmount: null,
      subs1: false,
      subs2: false,
      subs3: false,
      subs4: false,
      amtcollect: 0,
      amtcollectGst: 0,
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
      fees12: false,
      fees13: false,
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
        "No Education",
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
      toteboardPR: ['15','30','40','50','55'],
      toteboardSG: ['30','50','60','75','80'],
    };
  },
  compatConfig: { MODE: 3 },
  async mounted() {
    const component = this;
    this.$root.$on('getFormData', function(){
      component.getdatainform();
    })
  },
  methods: {
    filterFees() {
      console.log('session',this.sessions)
      console.log('running')
      for (let i = 0 ; i < this.sessions.length; i++){
        if (this.sessions[i].type == 'Individual'){
          console.log("individual")
          this.gotIndividualFee = true
        } 
        else if (this.sessions[i].type == 'Group') {
          console.log("Group")
          this.gotGroupFee = true
        }
        for (let j = 0 ; j < this.sessions.length;j++){
          if(this.sessions[j].location=="Center"){
            this.checkCenter=true
          }
          else if (this.sessions[j].location == "Residence"){
            this.checkResidence=true
          }else{
            this.checkZoom=true
          }
        }
      }
    },
    revert() {
      this.subsidy = null;
    },

    addmethod() {
      this.$bvModal.show("add-session");
    },
    async addNew() {
       this.sessions.push({
        type: this.typeses,
        day: this.day,
        time: this.time,
        location: this.location,
      });
      await this.filterFees();
      console.log('after: ', this.sessions)

      this.typeses= false;
      this.day=false;
      this.time=false;
      this.location= false;

      this.$bvModal.hide("add-session");
    },
    async getdatainform(){
      const clientId = this.$store.state.assessment_client_id;
      let paramObj = {
        $select:'crb5c_no,crb5c_nricno,crb5c_citizenship',
        $filter: `crb5c_fow_customerid eq '${clientId}'`,
      };
      let params = new URLSearchParams(paramObj);
      let { data: data } = await this.$store.state.axios.get(
        `crb5c_fow_customers/?${params.toString()}`
      );
      this.clientdata = data.value[0];
      console.log('form data',this.clientdata);
  },
   async submitassessment(){
    this.totalscoreMoca = this.totalscore;
    this.totalscoreEq = this.eq5dcounter;

    const payload = { 
      crb5c_typeofdementia: this.type,
      crb5c_stageofdementia: this.stageof,
      crb5c_latestscoreon: this.latestscore,
      crb5c_latestscorevalue: (this.latestscore == 'MOCA') ? this.totalscoreMoca : this.latest,
      crb5c_datedone: this.date,
      crb5c_sharedcentreobjectivesprogramme: this.checker,
      crb5c_watchedcentrevideo: this.checker2,
      crb5c_playedtabletopgame: this.checker3,
      crb5c_playedneeurofitgame: this.neeuro,
      crb5c_educationlevel: this.edulev,
      crb5c_clientname:this.$store.state.assessment_client_name,
      crb5c_clientid: this.$store.state.assessment_client_id,
      crb5c_alternatetrailmaking: parseInt(this.vis1),
      crb5c_copycube: parseInt(this.vis2),
      crb5c_lion: parseInt(this.vis4),
      crb5c_elephant: parseInt(this.vis5),
      crb5c_camel: parseInt(this.vis6),
      crb5c_repeatforward: parseInt(this.vis7),
      crb5c_repeatbackward: parseInt(this.vis17),
      crb5c_abletotap: parseInt(this.vis8),
      crb5c_serial7subtraction: parseInt(this.vis9),
      crb5c_repeatfirstsentence: parseInt(this.vis10),
      crb5c_repeatsecondsentence: parseInt(this.vis11),
      crb5c_similaritybetweentrainbicycle: parseInt(this.vis13),
      crb5c_similaritybetweenwatchruler: parseInt(this.vis14),
      crb5c_mocatotalscore: this.totalscoreMoca,
      crb5c_eqtotalscore: this.totalscoreEq,
      crb5c_commentsaboutclient: this.checking,
      crb5c_eqmobility: parseInt(this.eq1),
      crb5c_eqselfcare:parseInt(this.eq2),
      crb5c_equsualactivities:parseInt(this.eq3),
      crb5c_eqpaindiscomfort:parseInt(this.eq4),
      crb5c_eqanxietydepression:parseInt(this.eq5),
      crb5c_eqhealthscale: this.healthscale,
      crb5c_neeurofitattentiongame: this.attentiongame,
      crb5c_neeurofitattentionlevel: parseInt(this.attentionlevel),
      crb5c_neeurofitspatialgame: this.spatialgame,
      crb5c_neeurofitspatiallevel: parseInt(this.attentionlevel),
      crb5c_neeurofitdecisiongame: this.decisiongame,
      crb5c_neeurofitdecisionlevel: parseInt(this.decisionlevel),
      crb5c_neeurofitmemorygame: this.memorygame,
      crb5c_neeurofitmemorylevel: parseInt(this.memorylevel),
      crb5c_neeurofitflexibilitygame: this.flexibilitygame,
      crb5c_neeurofitflexibilitylevel: parseInt(this.flexibilitylevel),
      crb5c_orientation: this.vis16.length,
      crb5c_delayedrecall: this.delayedrecall,
      crb5c_fluency: this.checkfluency,
      crb5c_drawclock: this.vis3.length,
      crb5c_languageversion: this.language,
      crb5c_modeofpayment: this.modeofpayment,
      crb5c_amountcollected: '$' + this.viewamtcollect.toFixed(2),
      crb5c_educationyear: this.selectedyear,
      crb5c_mocaform: this.checker4,
      crb5c_eq5d5lform: this.checker5,
      crb5c_admissiondate: (this.adm) ? this.adm : null,
      crb5c_dateofassessment: dayjs(this.$store.state.assessment_date).format("MM-DD-YYYY hh:mm A"),

     };
      const { data } = this.$store.state.axios.post(
        `/crb5c_fowassessmentforms`,payload);
      console.log(data)
      alert('Client Assessment is successfully submitted!')


  },
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
    subsidyAmount(value){
      if(value === true){
        this.discount = this.subsidyAmount ? this.subsidyAmount/100 : 0;
      }
    },
    // subs1(value) {
    //   if (value === true) {
    //     let discountval = 0
    //     if(this.subs1val){
    //       discountval = this.subs1val/100;
    //     }
    //     this.viewamtcollect
    //   }
    // },
    // subs2(value) {
    //   if (value === true) {
    //     this.subs1 = false;
    //     this.subs4 = false;
    //     this.subs3 = false;
    //   }
    // },
    // subs3(value) {
    //   if (value === true) {
    //     this.subs2 = false;
    //     this.subs1 = false;
    //     this.subs4 = false;
    //   }
    // },
    // subs4(value) {
    //   if (value === true) {
    //     this.subs2 = false;
    //     this.subs1 = false;
    //     this.subs3 = false;
    //   }
    // },
    cn(value) {
      if (value === true) {
        this.en = false;
        this.language = 0;
      }
    },
    en(value) {
      if (value === true) {
        this.cn = false;
        this.language = 1;
      }
    },
    edulev(value){
      if(value === "Primary" || value === "No Education"){
        // checked
        this.unyearSelected = true;
        // checked
        // unchecked
        this.ovyearSelected = false;
        // unchecked
        this.un = true;
        this.ov = false;
        this.unpoint = 1;
        this.selectedyear = 0;
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
        this.selectedyear = 1;
      }
    },
    unyearSelected(value) {
      if (value === true) {
        this.ovyearSelected = false;
        this.unpoint = 1;
      } else {
        this.unpoint = 0;
      }
    },
    ovyearSelected(value) {
      if (value === true) {
        this.unyearSelected = false;
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
    typeses(value){
      if(value == 'Group'){
        this.location = 'Center';
      }
    },
    fees4(value) {
      let val = 83;
      if (value === true) {
        // if(this.subsidyAmount){
        //   console.log('math',this.normcost * (parseInt(this.subsidyAmount)/100))
        //  val = val - (this.normcost * (parseInt(this.subsidyAmount)/100));
        // }
        this.amtcollect += val - (this.normcost * (parseInt(this.subsidyAmount)/100));
      } else {
        this.amtcollect -= val - (this.normcost * (parseInt(this.subsidyAmount)/100));
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
        this.amtcollect += 320;
      } else {
        this.amtcollect -= 320;
      }
    },
    fees12(value){
      if (value === true) {
        this.amtcollect += 60;
      } else {
        this.amtcollect -= 60;
      }
    },
    fees13(value){
      if (value === true) {
        this.amtcollect += 120;
      } else {
        this.amtcollect -= 120;
      }
    },
  },
  computed: {
    viewamtcollect(){
      if (this.amtcollect > 0) { 
        return this.amtcollect * 1.08;
      }
      return 0;
    },
    checknationality(){
      if (this.clientdata.crb5c_citizenship) {
        return false;
      }
      else {
        return true;
      }
    },
    prORsg(){
      if(this.clientdata.crb5c_citizenship == 0){
        return 'SG';
      }
      else if(this.clientdata.crb5c_citizenship == 1){
        return 'PR';
      }
      else{
        return 'no val';
      }
    },
    fees4val(){
      if(this.subsidyAmount){
        return 83 - (this.normcost * (parseInt(this.subsidyAmount)/100));
      }
      return 83;
    },
    checkfluency(){
      return (this.vis18 == '11' || this.vis18 == 'more than 11') ? 1 : 0;
    },
    delayedrecall(){
      return (this.vis15.includes("Cannot Recall(0 point)"))? 0: this.vis15.length;
    },
    fluencyPoints(){
      return (this.vis18 == '11' || this.vis18 == 'more than 11') ? 1 : 0;
    },
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
  font-family: 'Montserrat';
}

.container {
  border-radius: 10px;
  border: 1px solid rgb(142, 142, 142);
  background:#f9f9f9;
  padding: 2rem;
  margin: auto;
  max-width: 100%;
  display: block;
  justify-content: center;
  text-align: center;
}

.submitbtn{
  text-align: center;
  margin-top: 60px;
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

.amountjustify{
  justify-content: right;
  margin-right: 30px;
}
.numberslider{
  text-align: center;
  display: flex;
  width: 50%;
  height: 2rem;
  font: inherit;
  padding: 0.2rem;
  border: 1px solid rgb(228, 228, 228);
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

.small-input-width {
  display: flex;
  width: 20%;
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
  margin-top: 2rem;
  margin-bottom: 10px
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
  border-color: #00000059;
  display: block;
  // max-width: 100%;
}
.moca {
  font-weight: bold;
}
</style>
