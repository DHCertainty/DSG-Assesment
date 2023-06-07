<template lang="pug">
div
    //- div.progress.mb-4
    //-   div.progress-bar.progressbarstyle(role="progressbar" style="width: 100%;height:30px;position:fixed;z-index: 1;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100") 25%
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
            .col-sm-6
              label.common.gap(for="score") Latest score on:
  
              .row.center
                .col-2
                  input#AMT.checkbox_circle(type="checkbox" v-model="isAMT" value="AMT")
                  label(for="AMT") &nbsp;AMT
                  .row.center
                    .col-2(v-if="isAMT") 
                        input.checkbox#score(v-model="amtVal" type="number" min="0" )
                .col-2
                  input#MMSE.checkbox_circle(type="checkbox" v-model="isMMSE" value="MMSE")
                  label(for="MMSE") &nbsp;MMSE
                  .row.center 
                    .col-2(v-if="isMMSE")
                      input.checkbox#score(v-model="mmseVal" type="number" min="0")
                .col-2 
                  input#MOCA.checkbox_circle(type="checkbox" v-model="isMOCA" value="MOCA")
                  label(for="MOCA") &nbsp;MOCA
                  .row.center
                    .col-2(v-if="isMOCA")
                      input.checkbox#score(v-model="mocaVal" type="number" min="0")
            .col-sm-6
              label.common.gap(for="score") Date Done in hospital:
              input.numbers#score(v-model="date" name="score" type="date")
          hr
  
  
  
          // General questions
          section(v-show="type && stageof && date && (isAMT || isMOCA || isMMSE)")
            label.mt-4(style="font-size: 17px;font-weight: bold;") General:
            .formed.gap
              input#sacop.checkbox_circle(v-model="checker" type="checkbox" value="sacop" name="part2")
              label.gapped.text-small(for="sacop") Shared about Centre's objectives & program
            .formed.gap
              input#wcv.checkbox_circle(v-model="checker2" name="part2" type="checkbox" value="wcv")
              label.gapped.text-small(for="wcv") Watched Centre's video
            
            .formed.gap
              input#pttg.checkbox_circle(v-model="checker3" name="part2" type="checkbox" value="pttg")
              label.gapped.text-small(for="pttg") Played Table Top games
  
  
  
            // Survey questions
            label.mt-5(style="font-size: 17px;font-weight: bold;") Games & Surveys:
            .formed.gap
              input#pnbtg.checkbox_circle(name="the-pnbtg" value="pnbtg" type="checkbox" v-model="neeuro")
              label.gapped.text-small(for="pnbtg") Played NeeuroFIT brain training game
            .container.my-4(v-show="neeuro")
              h2 NeeuroFit Games:
              .gap.left
                input#att.checkbox_circle(v-model="atten" name="part2ins" type="checkbox" value="att")
                label.my-2.font_bold(for="att") &nbsp;Attention
                .row.px-5(v-show="atten")
                  .gap.col-sm-6
                    label(for="stageof" ) Game played:
                    v-select(:options="game1" v-model="attentiongame")
                  .gap.col-sm-6
                    label(for="stageof" ) Finished Level:
                    v-select(:options="levels" v-model="attentionlevel")
              .gap.left 
                input#spat.checkbox_circle(type="checkbox" name="part2ins" v-model="spatial" value="spat")
                label.my-2.font_bold(for="spat") &nbsp;Spatial
                .row.px-5(v-show="spatial")
                  .gap.col-sm-6
                    label(for="stageof") Game Played:
                    v-select(:options="game2" v-model="spatialgame")
                  .gap.col-sm-6
                    label(for="stageof") Finished Level:
                    v-select(:options="levels" v-model="spatiallevel")
              .gap.left 
                input#dec.checkbox_circle(type="checkbox" name="part2ins" v-model="decision" value="dec")
                label.my-2.font_bold(for="dec") &nbsp;Decision
                .row.px-5(v-show="decision")
                  .gap.col-sm-6
                    label(for="stageof") Game Played:
                    v-select(:options="game3" v-model="decisiongame")
                  .gap.col-sm-6
                    label(for="stageof") Finished Level:
                    v-select(:options="levels" v-model="decisionlevel")
              .gap.left 
                input#mem.checkbox_circle(type="checkbox" name="part2ins" v-model="memory" value="mem")
                label.my-2.font_bold(for="mem") &nbsp;Memory
                .row.px-5(v-show="memory")
                  .gap.col-sm-6
                    label(for="stageof") Game Played:
                    v-select(:options="game4" v-model="memorygame")
                  .gap.col-sm-6
                    label(for="stageof") Finished Level:
                    v-select(:options="levels" v-model="memorylevel")
              .gap.left
                  input#flexi.checkbox_circle(type="checkbox" name="part2ins" v-model="flexibility" value="flexi")
                  label.my-2.font_bold(for="flexi") &nbsp;Flexibility
                  .row.px-5(v-show="flexibility")
                    .gap.col-sm-6
                      label(for="stageof") Game Played:
                      v-select(:options="game5" v-model="flexibilitygame")
                    .gap.col-sm-6
                      label(for="stageof") Finished Level:
                      v-select(:options="levels" v-model="Flexibilitylevel")
  
            //MOCA form     
            .formed.gap
              input#mocaform.checkbox_circle(v-model="checker4" name="mocaform" type="checkbox" value="mocaform")
              label.gapped.text-small(for="mocaform") MOCA form
            .container.left.gap(v-show="checker4")
              h2.moca.gapbot MOCA
              p.common Version:
              div
                input#cn.checkbox_circle(v-model="cn" name="cnbx" type="checkbox" value="0")
                label.gapped(for="cn") Chinese 
              div
                input#en.checkbox_circle(v-model="en" name="enbx" type="checkbox" value="1")
                label.gapped(for="en") English 
              p.common.gap Education Level:
              .col-sm-6
                v-select(v-model="edulev" :options="edulevel")
                .gap(v-show="edulev")
                  p.common.gap Education Year:
                  div
                    input#un.checkbox_circle(v-model="unyearSelected" name="unbx" type="checkbox" value="un" disabled="true")
                    label.gapped(for="un") ≤ 6 Years
                  div
                    input#ov.checkbox_circle(v-model="ovyearSelected" name="ovbx" type="checkbox" value="ov" disabled="true")
                    label.gapped(for="ov") > 6 Years
              .row
                p.common.gap.mb-4 Visuospatial/Executive
                
                .col-sm-6 
                  .row.mb-4
                    img(@click="pick_answer_naming('1')").image_container_number(src="/form-images/number.jpeg")
                  .row
                    label Alternating Trail Making:
                    v-select(v-model="vis1" :options="['0', '1']" :clearable="false")
                  
                .col-sm-6 
                  .row.mb-4
                    img(@click="pick_answer_naming('2')").image_container_cube(src="/form-images/cube.jpeg")
                  .row
                    label Copy Cube:
                    v-select(v-model="vis2" :options="['0', '1']" :clearable="false") 
  
  
                label.gap Draw Clock(Ten past eleven) [3 Points]
                v-select(multiple v-model="vis3" :options="dclock" :clearable="false") 
              .row 
                p.common.gap Naming
                  .row.center_items_row.mb-4
                    .col-auto
                      img(@click="pick_answer_naming('4')").image_container_lion(:src=" vis4 == '1' ? '/form-images/lion_correct.png': '/form-images/lion.png'")
                    .col-auto 
                      img(@click="pick_answer_naming('5')").image_container_elephant(:src=" vis5 == '1' ? '/form-images/elephant_correct.png': '/form-images/elephant.png'")
                    .col-auto
                      img(@click="pick_answer_naming('6')").image_container_camel(:src=" vis6 == '1' ? '/form-images/camel_correct.png': '/form-images/camel.png'")
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
              p.common.gap Delayed Recall [5 Points]
              v-select(multiple v-model="vis15" :options="Delayed")
              p.common.gap Orientation
              v-select(multiple v-model="vis16" :options="['Date', 'Month', 'Year', 'Day', 'Place', 'Country']")
              p.common.gap Total Score: {{ totalscore }}
            .formed.gap
              input#eq5d.checkbox_circle(v-model="checker5" name="eq5d" type="checkbox" value="eq5d")
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
            //- hr   
          section.mt-5(v-show="type && stageof && date && (neeuro || checker || checker2 || checker3 || checker4 || checker5)")
            .formed
              label.common(for="comment") Comment/Observation about the client
              textarea#comment(name="comment" rows="3" type="text" v-model="checking")
            hr
                    
            //- b-button.mb-3(v-b-toggle.subsidy_box @click="checkSubsidy") Subsidy Included
            //-   label(v-show=x"") yes
  
          section.mt-5(v-show="type && stageof && date && (neeuro || checker || checker2 || checker3 || checker4 || checker5)")
            .formed
              .row
                .col-sm-3
                  label.common(for="session") Session Recommended: 
                .col     
                  b-btn#add-btn(@click="addmethod") + Add Session 
              
              div.my-4(v-if="this.sessions.length === 0")
                b-card
                  p.common.gap No Session Selected
              div.my-4.p-3.border(v-else style="border-radius: 0.5rem;" )
                p.ma-4(v-for="ses in sessions" :key="ses.id")
                  | {{ses.type}} - {{ ses.day }} {{ ses.time }} ( {{ ses.location }} )
  
              //- ul.my-4(v-for="ses in sessions" key="ses.id")
              //-   b-card 
              //-     li.ma-4()
              //-       | {{ses.type}} , {{ ses.day }} {{ ses.time }} ( {{ ses.location }} )
              b-modal#add-session(size="md" title="Add Session" scrollable centered)         
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

            .formed(style="margin-top:40px" v-show="this.sessions.length")
              label.common.gap(for="admission") Admission date:
              input.numbers-half#admission(v-model="adm" name="admission" type="date")
  
          section(v-show="this.sessions.length")
            .row.gap
              .col-md-2 
                label.common.gap Fee & Payment:
                  //- .col-auto 
                  //-   .formed.gap
                  //-     input#no(v-model="no" name="subsidy" type="radio" value="no" @click="revert()")
                  //-     label(for="no") &nbsp;No
                  //- .col-auto 
                  //-   .formed.gap.gapbot
                  //-     input#yes( v-model="subsidy" name="subsidy" type="radio" value="yes")
                      label(for="yes") &nbsp;Yes
            .centerCheckbox
              input#subsidytoggle.checkbox_circle(v-model="subsidy" v-b-toggle.subsidy_box type="checkbox" value="yes")
              label(for="subsidytoggle").m-3.subsidy_label Subsidy included

          b-collapse#subsidy_box
              b-card
                section
                    .formed
                      .formed.gap
                        input#dsg1.checkbox_circle(v-model="subs1" name="subsidy1" type="checkbox" value="dsg1")
                        label.long.gapped(for="dsg1") DSG
                        .row.gap(v-show="subs1")
                            .col-md-2 
                              input.numbers#means(name="means" type="number" min="20" v-model="subs1val")
                            .col-md-2 
                              b-form-select.numbers(v-model="dsgsubsidy" :options="subsidyoptions")
                            .col-md-2
                              label.common subsidy
                      .gap 
                        input#dsg2.checkbox_circle(v-model="subs2" name="subsidy2" type="checkbox" value="dsg2" :disabled="checknationality")
                        label.long.gapped(for="dsg2") Toteboard
                        .row.gap(v-show="subs2")
                          .col-md-2 
                            label.common Means Test Result
                          .col-md-2 
                            v-select(v-model="subsidyAmount" :options="clientdata.crb5c_citizenship == 0 ?  toteboardSG : toteboardPR")
                          .col-md-2
                            label.common % subsidy
                      .formed.gap.mb-4
                        input#dsg3.checkbox_circle(v-model="subs3" name="subsidy3" type="checkbox" value="dsg3" disabled)
                        label.long.gapped(for="dsg3") Others
                        .formed.gap(v-show="subs3")
                          label.common(for="others") Specify: 
                          input.numbers-half#others(name="others" type="text")
                      //- .formed.gapbot(v-show="subs1 || subs2 || subs3 ")
                      //-     label.common(for="subsid" style="justify-content:end") Amount Subsidized:
                      //-     .row(style="justify-content:end")
                      //-       input.small-input-width#subsid(name="subsid" type="number" min="0")
                //- hr


          section.mt-5(v-show="this.sessions.length")
            label.common Applicable Fee (excluding GST):
            .formed
              .formed.gap
                input#80.checkbox_circle(v-model="totalGST" name="cbfees" type="checkbox" value="80" v-show="gotGroupFee  && checkCenter && !subs2")
                label.gapped.text-small(for="80" v-show="gotGroupFee && !subs2") Centre-based 3-HR FOW group session $80
              .formed.gap
                input#60.checkbox_circle(v-model="totalGST" name="cbfees" type="checkbox" value="60" v-show="gotIndividualFee && checkCenter && !subs2")
                label.gapped.text-small(for="60" v-show="gotIndividualFee && checkCenter && !subs2") Centre-based 1-HR one-to-one FOW session $60
              .formed.gap
                input#90.checkbox_circle(v-model="totalGST" name="cbfees" type="checkbox" value="90" v-show="gotIndividualFee && checkCenter && !subs2")
                label.gapped.text-small(for="90" v-show="gotIndividualFee && checkCenter && !subs2") Centre-based 1.5-HR one-to-one FOW session $90
              .formed.gap
                input#120.checkbox_circle(v-model="totalGST" name="cbfees" type="checkbox" value="120" v-show="gotIndividualFee && checkCenter && !subs2")
                label.gapped.text-small(for="120" v-show="gotIndividualFee && checkCenter && !subs2") Centre-based 2-HR one-to-one FOW session $120
              .formed.gap
                input#240.checkbox_circle(v-model="totalGST" name="cbfees" type="checkbox" value="240" v-show="!subs2")
                label.gapped.text-small(for="240" v-show="!subs2") Centre-based NeeuroFIT 6 months subcription $240
              .formed.gap
                input#hb90.checkbox_circle(v-model="totalGST" name="cbfees" type="checkbox" value="40" v-show="gotIndividualFee && checkResidence && !subs2") 
                label.gapped.text-small(for="hb90" v-show="gotIndividualFee && checkResidence && !subs2") Home-based 1-HR one-to-one FOW session(incl. transport) $40
              .formed.gap
                input#hb120.checkbox_circle(v-model="totalGST" name="cbfees" type="checkbox" value="120" v-show="gotIndividualFee && checkResidence && !subs2")
                label.gapped.text-small(for="hb120" v-show="gotIndividualFee && checkResidence && !subs2") Home-based 1.5-HR one-to-one FOW session(incl. transport) $120
              .formed.gap
                input#hb150.checkbox_circle(v-model="totalGST" name="cbfees" type="checkbox" value="150" v-show="gotIndividualFee && checkResidence && !subs2")
                label.gapped.text-small(for="hb150" v-show="gotIndividualFee && checkResidence && !subs2") Home-based 2-HR one-to-one FOW session(incl. transport) $120
              .formed.gap.gapbot
                input#hb90-2.checkbox_circle(v-model="totalGST" name="cbfees" type="checkbox" value="90" v-show="gotIndividualFee && checkZoom && !subs2")
                label.gapped.text-small(for="hb90-2" v-show="gotIndividualFee && checkZoom && !subs2") Home-based 1-HR FOW session via video calls $90
              .formed.gap(v-show="subs2")
                  input#sgp.checkbox_circle( v-model="isCIP" name="cbfees" type="checkbox" :value="1") 
                  label.gapped.text-small(for="sgp") Centre-based 3-HR CIP trial run  ${{ fees4val }} 
                    span(style="font-weight:bold") ({{ prORsg }})
              .formed.gap.border.border-1(style="border-radius: 0.5rem;" v-show="isCIP")
                  b-row.p-3
                    b-col.col-6
                      b-row
                        b-col
                          b-row
                            b-col
                              label.common.gap Public Holiday:
                              p(v-if="listPublicHolidayCurrentMonth" v-for="publicHoliday in listPublicHolidayCurrentMonth" :key="publicHoliday._id")
                                | {{ formatDatePublicHoliday(publicHoliday.date) }} - {{ publicHoliday.holiday }}
                              p(v-if="!listPublicHolidayCurrentMonth")
                                | No Public Holiday for this month
                      b-row
                        b-col
                          b-row
                            b-col
                              label.common.gap(for="dsgOffday") DSG Off day:
                          b-row
                            b-col
                              input.numbers-half#admission(v-model="dsgOffDay.date" name="dsgOffday" type="date")
                          b-row
                            b-col.gap
                              b-button(@click="addDSGOffday")
                                | Add Off day
                          b-row(v-if="dsgOffDay.listDay.length !== 0")
                            b-col
                              b-row.mb-2.align-items-center(v-for="holiday in dsgOffDay.listDay" :key="holiday.id")
                                b-col.col-8
                                  p.my-auto
                                    | {{ formatDSFOffDayContent(holiday.date) }}
                                b-col.col-4
                                  b-button(variant="danger" @click="removeDSGOffDay(holiday.id)")
                                    | Remove
                    b-col.col-6
                      b-row
                        b-col
                          b-row
                            b-col
                              label.common.gap(for="admission") 1st Session date: [{{ firstSesDay(this.firSession) }}]
                                span(v-show="this.firSession").mx-3
                                  b-form-checkbox(switch v-model="firstSesFormat" value=0) 
                                    span.mx-1 {{ is1stAM }}
                          b-row
                            b-col
                              input.numbers-half#admission(v-model="firSession" name="admission" type="date")
                          b-row
                            b-col
                              label.common.gap(for="admission") 2nd Session date: [{{ secondSesDay(this.secSession) }}]
                                span(v-show="this.secSession").mx-3
                                  b-form-checkbox(switch v-model="secondSesFormat" value=0)
                                    span.mx-1 {{ is2ndAM }}
                          b-row
                            b-col
                              input.numbers-half#admission(v-model="secSession" name="admission" type="date")
                          b-row
                            b-col
                              b-btn.gap(@click="CIPtotal") Calculate
                          b-row
                            b-col.d-flex.justify-content-end.align-items-end(style="font-size: 20px;")
                              label(v-show="totalforCIP") ${{totalforCIP}} for {{ CIPdays }} session
  
  
                  //- b-card
                  //-   label.common.gap(for="admission") 1st Session date:
                  //-   input.numbers-half#admission(v-model="firSession" name="admission" type="date")
  
                  //-   label.common.gap(for="admission") 2nd Session date:
                  //-   input.numbers-half#admission(v-model="secSession" name="admission" type="date")
  
                  //-   b-btn.mt-3(@click="CIPtotal") Calculate
            
                  //-   div(style="text-align: right;width: 100%;font-size: 20px;")
                  //-     label(v-show="totalforCIP") ${{totalforCIP}} for {{ CIPdays }} session
            
          
          section(v-show="this.sessions.length" style="margin-top:50px")
              label.common Additional fee:
              .formed.gap
                input#50.checkbox_circle(v-model="totalGST" name="cbfees" type="checkbox" value="50")
                label.gapped.text-small(for="50") One-time Assessment $50
              .formed.gap
                input#refund.checkbox_circle(v-model="totalNoGST" name="cbfees" type="checkbox" value="320")
                label.gapped.text-small(for="refund") Refundable One-Month Deposit (4 X applicable fee) $320
          
          //Payment type
                //-"
          section(style="margin-top:50px"  v-show="this.sessions.length")
            .gapright.row.mt-4
              .gap.col-sm-6
                label.common(for="receipt") Official Receipt:
                .gap.col-sm-6
                label Upload receipt:
                .d-flex.mx-1
                  b-form-file(class="mt-3" plain)
                .gap.col-sm-6
                label(style="font-weight:bold") OR
                .gap.col-sm-6
                label Reference ID:
                input.numbers#receipt(name="receipt" type="text" v-model="referenceid")
              .gap.col-sm-6
                label.common.amountjustify(for="collect" ) Amount Collected + GST [SGD]:
                label.common.amountjustify(for="collect" style="font-size:30px") ${{ viewamtcollect.toFixed(2)}}
              hr
                //- input.numbers#collect(v-model="amtcollect " name="collect" type="text" readonly="readonly")
            label.common.gap Mode of Payment:
            .row 
              .col-md-auto
                label(for="cash") 
                  div(:class="(this.modeofpayment == 'cash') ? 'checkboxSelectionSelected' : 'checkboxSelection'")
                    input#cash(v-model="modeofpayment" name="payment" type="radio" value="cash")
                    |&nbsp;&nbsp;Cash
                    img.checkboxImg.mx-3(src="/form-images/money.png")
              .col-md-auto
                label(for="paynow") 
                  div(:class="(this.modeofpayment == 'paynow') ? 'checkboxSelectionSelected' : 'checkboxSelection'")
                    input#paynow( v-model="modeofpayment" name="payment" type="radio" value="paynow") 
                    |&nbsp;&nbsp;PayNow
                    img.mx-3.my-2(src="/form-images/paynow_logo.png" style="width:100px")
              .col-md-auto
                label(for="e-bank") 
                  div(:class="(this.modeofpayment == 'e-bank') ? 'checkboxSelectionSelected' : 'checkboxSelection'")
                    input#e-bank( v-model="modeofpayment" name="payment" type="radio" value="e-bank")
                    |&nbsp;&nbsp;Internet Banking
                    img.checkboxImg.mx-3(src="/form-images/money_transfer.png")
              .col-md-auto
                label(for="cheque")
                  div(:class="(this.modeofpayment == 'cheque') ? 'checkboxSelectionSelected' : 'checkboxSelection'")
                    input#cheque( v-model="modeofpayment" name="payment" type="radio" value="cheque")
                    |&nbsp;&nbsp;Cheque
                    img.checkboxImg.mx-3(src="/form-images/cheque.png")
  
          // Submit button 
          section.submitbtn(v-if="modeofpayment" @click="submitassessment")
            b-btn(style="background: #917093;font-size: 17px;width: 20%;") Submit
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
  import axios from 'axios';
  
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
        listPublicHolidayCurrentMonth: null,
        dsgOffDay: {
          date: null,
          startDate: null,
          endDate: null,
          listDay: [],
        },
        isCIP: 0,
        firstSesFormat: 0,
        secondSesFormat: 0,
        totalforCIP: 0,
        CIPdays: '',
        isAMT: false,
        isMOCA: false,
        isMMSE: false,
        mmseVal: 0,
        amtVal: 0,
        mocaVal: 0,
        gstval: 1.08,
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
        // latestscore: "",
        adm: "",
        // latest: "0",
        type: "",
        stageof: "",
        date: "",
        edulev: "",
        gp: false,
        ind: false,
        subsidyAmount: null,
        firSession: null,
        secSession: null,
        subs1: false,
        subs2: false,
        subs3: false,
        subs4: false,
        // amtcollect: 0,
        // amtcollectGst: 0,
        totalGST:[] ,
        totalNoGST: [],
        // fees1: [],
        // fees2: false,
        // fees3: false,
        // fees4: false,
        // fees5: false,
        // fees6: false,
        // fees7: false,
        // fees8: false,
        // fees9: false,
        // fees10: false,
        // fees11: false,
        // fees12: false,
        // fees13: false,
        cn: false,
        en: false,
        referenceid: null,
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
        subsidyoptions:[
          "%",
          "$"
        ],
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
  
      const listPublicHoliday = await this.getSGPublicHoliday();
      console.log('listPublicHoliday: ', listPublicHoliday);
      this.listPublicHolidayCurrentMonth = this.getPublicHolidayCurrentMonth(listPublicHoliday).length === 0 ? null : this.getPublicHolidayCurrentMonth(listPublicHoliday);
      console.log('listPublicHolidayCurrentMonth: ', this.listPublicHolidayCurrentMonth);
  
    },
    methods: {
      firstSesDay(date){
        return date ? dayjs(this.firSession).format('dddd') : 'None';
      },
      secondSesDay(date){
        return date ? dayjs(this.secSession).format('dddd') : 'None';
      },
      checkdsgsubsidy(val,val2){
        if((val || val2) && this.subs1 && this.subs1val && this.dsgsubsidy == '$'){
            return this.subs1val;
          }
        if ((val || val2) && this.subs1 && this.subs1val && this.dsgsubsidy == '%') {
            return (val + val2) * this.subs1val/100;
          }
        else{
          return 0;
        }
      },
      async getSGPublicHoliday(){
        const LINK = 'https://data.gov.sg/api/action/datastore_search?resource_id=98aa24ef-954d-4f76-b733-546e0fcf1d0a&';
        const { data } = await axios.get(LINK);
        return data.result.records;
  
      },
      getPublicHolidayCurrentMonth(listPublicHoliday){
        return listPublicHoliday.filter(item => {
          const itemMonth = this.formatDatePublicHoliday(item.date).split('/')[1];
          const currentMonth = (dayjs().month() + 1) + '';
  
          return itemMonth === currentMonth;
        });
  
      },
      formatDatePublicHoliday(date){
        const DATE_FORMAT = 'D/M/YYYY';
        return dayjs(date).format(DATE_FORMAT);
  
      },
      addDSGOffday(){
        // TODO: add date difference, if negative, do guard clause or give error alert
        if(!this.dsgOffDay.date){
          return;
        }
  
        this.dsgOffDay.listDay.push({
          id: Math.floor(Math.random() * Date.now()) + '',
          date: this.dsgOffDay.date,
        });
  
        this.dsgOffDay.date = null;
  
      },
      removeDSGOffDay(id){
        this.dsgOffDay.listDay = this.dsgOffDay.listDay.filter(item => item.id !== id);
  
      },
      formatDSFOffDayContent(dateParent){
        const getDayNameBasedOnDate = (dateChild) => {
          const listNameDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          return listNameDay.at(dayjs(dateChild).day());
        }
  
        return `${this.formatDatePublicHoliday(dateParent)} - ${getDayNameBasedOnDate(dateParent)}`;
  
      },
      async CIPtotal(){
        if (this.firSession && this.secSession)  {
          let day = 0;   
          let day2 = 0;
  
          const publicHolidayCount = {
            copylistPublicHolidayCurrentMonthOne: this.listPublicHolidayCurrentMonth,
            copylistPublicHolidayCurrentMonthTwo: this.listPublicHolidayCurrentMonth,
            day1: 0,
            day2: 0,
          };
  
          const dsgOffDayCount = {
            copylistDSGOffday: this.dsgOffDay.listDay.map(({date}) => ({date})),
            day: 0,
          }
  
          const setAgainCopylistDSGOffday = () => {
            dsgOffDayCount.copylistDSGOffday = this.dsgOffDay.listDay.map(({date}) => ({date}));
          }
  
          const calculatePublicHoliday = (day, whatDayIndex) => {
            if(publicHolidayCount.copylistPublicHolidayCurrentMonthOne && publicHolidayCount.copylistPublicHolidayCurrentMonthTwo){
              const listDate = day === '1' ? publicHolidayCount.copylistPublicHolidayCurrentMonthOne : publicHolidayCount.copylistPublicHolidayCurrentMonthTwo;
              const dayIncluded = listDate.filter(item => dayjs(item.date).day() === whatDayIndex);
  
              if(dayIncluded.length !== 0){
                if(day === '1'){
                  publicHolidayCount.day1++
                }
                if(day === '2'){
                  publicHolidayCount.day2++
                }
              }
  
              if(day === '1'){
                publicHolidayCount.copylistPublicHolidayCurrentMonthOne = listDate.filter(item => item === dayIncluded);
              }
              if(day === '2'){
                publicHolidayCount.copylistPublicHolidayCurrentMonthTwo = listDate.filter(item => item === dayIncluded);
              }
            }
          }
  
          const calculateDSGOffday = (whatDayIndex) => {
            if(dsgOffDayCount.copylistDSGOffday.length){
              if(dsgOffDayCount.copylistDSGOffday.every(item => item.date !== null)){
                const listDate = dsgOffDayCount.copylistDSGOffday;
                const dayIncluded = listDate.filter(item => dayjs(item.date).day() === whatDayIndex); 
  
                if(dayIncluded.length !== 0){
                  dsgOffDayCount.day++
                }
  
                dsgOffDayCount.copylistDSGOffday = listDate.filter(item => dayjs(item.date).day() !== whatDayIndex);
  
              }
  
            }
  
          }
  
  
          let whatday = dayjs(this.firSession).day();
          let whatday2 = dayjs(this.secSession).day();
          const startDate = new Date(dayjs(this.firSession).format('MM-DD-YYYY'));
          const endDate = new Date(dayjs(this.firSession).endOf('month').format('MM-DD-YYYY'));
          let loop = new Date(startDate);
  
          while (loop <= endDate) {
            if (loop.getDay() === whatday) {
              day++;
            }
  
            calculatePublicHoliday('1', whatday);
            calculateDSGOffday(whatday);
  
            let newDate = loop.setDate(loop.getDate() + 1);
            loop = new Date(newDate);
          }
  
          setAgainCopylistDSGOffday();
  
          const startDate2 = new Date(dayjs(this.secSession).format('MM-DD-YYYY'));
          const endDate2 = new Date(dayjs(this.secSession).endOf('month').format('MM-DD-YYYY'))
          let loop2 = new Date(startDate2);
  
          console.log('loop2:', loop2, 'endDate2:', endDate2)
          while (loop2 <= endDate2) {
            console.log('inside loop2....');
  
            if (loop2.getDay() === whatday2) {
              day2++;
            }
  
            calculatePublicHoliday('2', whatday2);
            calculateDSGOffday(whatday2);
  
            let newDate = loop2.setDate(loop2.getDate() + 1);
            loop2 = new Date(newDate);
          }
  
          const totalDay = day + day2 - (publicHolidayCount.day1 || 0) - (publicHolidayCount.day2 || 0) - (dsgOffDayCount.day || 0);
          this.totalforCIP = this.fees4val * (totalDay);
          this.CIPdays = totalDay;
        }
      
      },
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
        this.subs1 = false;
        this.subs2 = null;
        this.subs1val = 0;
  
      },
      runSecondSession(){ 
          let day2 = 0; 
          const start = new Date(dayjs(this.secSession).format('MM-DD-YYYY'));
          const end = new Date(dayjs(this.secSession).endOf('month').format('MM-DD-YYYY'))
          let loop = new Date(start);
          while (loop <= end) {
            if (loop.getDay() == 3) {
                day2++;    
            }
            let newDate = loop.setDate(loop.getDate() + 1);
            loop = new Date(newDate);
        }
        return day2;
      },
      addmethod() {
        this.$bvModal.show("add-session");
      },
      async addNew() {
        if(!this.typeses || !this.day || !this.time || !this.location){
          return;
        }
  
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
      groupingSessionRecommended(){
        // TODO: grouping session recommended after ended
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
        // crb5c_latestscoreon: this.latestscore,
        // crb5c_latestscorevalue: (this.latestscore == 'MOCA') ? this.totalscoreMoca : this.latest,
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
        crb5c_referenceid: this.referenceid,
        crb5c_dateofassessment: dayjs(this.$store.state.assessment_date).format("MM-DD-YYYY"),
        crb5c_mocascore: (this.isMOCA) ? this.mocaVal : 0,
        crb5c_amtscore: (this.isAMT) ? this.amtVal : 0,
        crb5c_mmsescore: (this.isMMSE) ? this.mmseVal : 0,
        crb5c_cip1stsession:  this.firSession,
        crb5c_cip2ndsession: this.secSession,
        // crb5c_cip1stsessionformat: this.firstSesFormat,
        // crb5c_cip2ndsessionformat: this.secondSesFormat,
       };
      //  const payloadClient ={
      //   crb5c_cipmember: (this.isCIP) ? 1 : 0,
      //  }

      //  console.log(this.isCIP)

        const { data } = this.$store.state.axios.post(
          `/crb5c_fowassessmentforms`,payload);
        console.log(data)

        // console.log(this.$store.state.assessment_client_id)
        // const { client } = this.$store.state.axios.patch(
        //   `/crb5c_fow_customers(${this.$store.state.assessment_client_id})`,payloadClient);
        // console.log(client)

        alert('Client Assessment is successfully submitted!');
        
        window.close();
    },
    pick_answer_naming(val){
        if(this[`vis${val}`] == '0'){
            this[`vis${val}`] = '1';
            return;
        }
          this[`vis${val}`] = '0';
      },
      checkSubsidy(){
        console.log("running")
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
      
      // fees1(value) {
      //   console.log(this.fees1)
      //   if (value === true) {
      //     this.amtcollect += 80;
      //   } else {
      //     this.amtcollect -= 80;
      //   }
      // },
      // fees2(value) {
      //   if (value === true) {
      //     this.amtcollect += 90;
      //   } else {
      //     this.amtcollect -= 90;
      //   }
      // },
      // fees3(value) {
      //   if (value === true) {
      //     this.amtcollect += 240;
      //   } else {
      //     this.amtcollect -= 240;
      //   }
      // },
      typeses(value){
        if(value == 'Group'){
          this.location = 'Center';
        }
      },
      // fees4(value) {
      //   let val = 83;
      //   if (value === true) {
      //     // if(this.subsidyAmount){
      //     //   console.log('math',this.normcost * (parseInt(this.subsidyAmount)/100))
      //     //  val = val - (this.normcost * (parseInt(this.subsidyAmount)/100));
      //     // }
      //     this.amtcollect += val - (this.normcost * (parseInt(this.subsidyAmount)/100));
      //   } else {
      //     this.amtcollect -= val - (this.normcost * (parseInt(this.subsidyAmount)/100));
      //   }
      // },
      // fees5(value) {
      //   if (value === true) {
      //     this.amtcollect += 85;
      //   } else {
      //     this.amtcollect -= 85;
      //   }
      // },
      // fees6(value) {
      //   if (value === true) {
      //     this.amtcollect += 90;
      //   } else {
      //     this.amtcollect -= 90;
      //   }
      // },
      // fees7(value) {
      //   if (value === true) {
      //     this.amtcollect += 120;
      //   } else {
      //     this.amtcollect -= 120;
      //   }
      // },
      // fees8(value) {
      //   if (value === true) {
      //     this.amtcollect += 150;
      //   } else {
      //     this.amtcollect -= 150;
      //   }
      // },
      // fees9(value) {
      //   if (value === true) {
      //     this.amtcollect += 90;
      //   } else {
      //     this.amtcollect -= 90;
      //   }
      // },
      // fees10(value) {
      //   if (value === true) {
      //     this.amtcollect += 50;
      //   } else {
      //     this.amtcollect -= 50;
      //   }
      // },
      // fees11(value) {
      //   if (value === true) {
      //     this.amtcollect += 320;
      //   } else {
      //     this.amtcollect -= 320;
      //   }
      // },
      // fees12(value){
      //   if (value === true) {
      //     this.amtcollect += 60;
      //   } else {
      //     this.amtcollect -= 60;
      //   }
      // },
      // fees13(value){
      //   if (value === true) {
      //     this.amtcollect += 120;
      //   } else {
      //     this.amtcollect -= 120;
      //   }
      // },
    },
    computed: {
      is1stAM(){
        return this.firstSesFormat == 0 ? 'AM' : 'PM';
      },
      is2ndAM(){
        return this.secondSesFormat == 0 ? 'AM' : 'PM';
      },
      totalofGST(){
        if (this.totalGST.length) {
          let val = this.totalGST.reduce((sum, num) => parseInt(sum) + parseInt(num), 0);
        return val*1.08;
        }
        return 0;    
      },
      totalofNoGST(){
        if (this.totalNoGST.length) {
          return parseInt(this.totalNoGST[0]);
        }
        return 0;
 
      },
      calculateCipCost(){
        return this.totalforCIP ? (this.totalforCIP)*1.08 : 0;
      },
      viewamtcollect(){
        let GSTtotal = this.totalofGST;
        let NoGstTotal = this.totalofNoGST;
        let dsgsubsidiyval = this.checkdsgsubsidy(GSTtotal,NoGstTotal);
        let cipCost = this.calculateCipCost;
          // console.log( val+val2 - dsgsubsidiyval)
          // console.log(this.totalNoGST)
          return (GSTtotal + cipCost + NoGstTotal - dsgsubsidiyval );
      },
      checknationality(){
        if (this.clientdata.crb5c_citizenship == 0) {
          return false;
        }
        else if(this.clientdata.crb5c_citizenship == 1) {
          return false;
        }
        else{
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
    // font-family: 'Montserrat';
  }
  
  .container {
    border-radius: 10px;
    border: 1px solid rgb(142, 142, 142);
    background:#ffffff;
    padding: 2rem;
    margin: auto;
    display: block;
    justify-content: center;
    text-align: center;
  }
  
  .submitbtn{
    text-align:right;
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
  
  .checkbox {
    display: flex;
    height: 2rem;
    width: 125px;
    font: inherit;
    margin-bottom: 10px;
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
  
  .image_container_number{
      width: 315px;
      margin: auto;
  }
  
  .image_container_lion{
      width: 265px;
      margin: auto;
      -moz-transform: scale(-1, -1);
      -o-transform: scale(-1, -1);
      -webkit-transform: scale(-1, -1);
      transform: scale(-1, 1);
  }
  
  .image_container_elephant{
      width: 260px;
      margin: auto;
  }
  
  .image_container_camel{
      width: 230px;
      margin: auto;
  }
  
  .image_container_cube{
      width: 286px;
      margin: auto;
  }
  
  .center_items_row{
    justify-content: center;
  }
  
  .center{
    gap: 60px;
  }
  
  .font_bold{
    font-weight: bold;
  }
  .checkboxSelection{
    border: 1.5px solid #d3d3d3;
    border-radius: 5px;
    padding: 25px;
    margin: 5px;
    height: 100px;
  }
  
  .checkboxSelectionSelected{
    border: 3px solid #b183d7;
    border-radius: 5px;
    padding: 25px;
    margin: 5px;
    height: 100px;
  }
  
  .checkboxImg{
    width: 50px;
  }
  
  .header_title{
    background: #502b73;
    padding: 10px;
    text-align: center;
    color: white;
    font-size: 20px;
    font-weight: 600;
  }
  .centerCheckbox{
    font-size: 16px;
    display: inline-flex;
  }
  
  .progressbarstyle{
    background: rgb(118, 80, 137); 
  }
  
  .checkbox_circle{
    border-radius: 50%;
    height: 20px;
    width: 20px;  
    margin: auto;   
    border-color: transparent !important;   
    opacity: 0.65;
    transition: all 0.5s;
  }
  </style>
  