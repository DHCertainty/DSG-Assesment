<template lang="pug">
div(ref='pdfWholePage')
    //- b-container(v-if='axiosReady')
    //-   | axios getting ready
    b-container().main-container.mt-2.mb-4
      form
          .mb-4
            .row
              .col-auto
                label Date: 
                  span(style="font-weight: bold;").mx-2 {{ dateofassessment }}
                  span
                    b-button.timeEdit(v-b-modal="'modal-time'" v-show="notPDFview") Edit date
              .col-auto(style="margin-left:auto")
                label Name:
                  span.mx-2(style="font-weight: bold;") {{ caregiverClientName }}
              .col-auto
                label NRIC (last 4 digit): 
                  span.mx-2(style="font-weight: bold;") {{ caregiverClientIc.slice(-4) }}
          //- div
          //-   button(@click="generatePDF") Generate PDF
          section.p-4.border.mb-4.border-light.rounded.shadow
            .row
              .col-sm-6
                label.common(for="typeof") Type of Dementia:
                v-select(v-model="type" :options="DementiaType")
              .col-sm-6
                label.common(for="stageof") Stage of Dementia:
                v-select(v-model="stageof" :options="DementiaStage")
            .row.mt-3
              .col-sm-6
                label.common(for="score") Latest score on:
                .row.center
                  .col-2
                    b-form-checkbox(type="checkbox" v-model="isAMT" value="AMT") &nbsp;AMT
                    .row.center
                      .col-2(v-if="isAMT") 
                          input.checkbox#score(v-model="amtVal" type="number" min="0" )
                  .col-2
                    b-form-checkbox(type="checkbox" v-model="isMMSE" value="MMSE") &nbsp;MMSE 
                    .row.center 
                      .col-2(v-if="isMMSE")
                        input.checkbox#score(v-model="mmseVal" type="number" min="0")
                  .col-2 
                    b-form-checkbox(type="checkbox" v-model="isMOCA" value="MOCA") &nbsp;MOCA
                    .row.center
                      .col-2(v-if="isMOCA")
                        input.checkbox#score(v-model="mocaVal" type="number" min="0")
              .col-sm-6
                label.common(for="score") Date Done in hospital:
                input.numbers#score(v-model="date" name="score" type="date")
  
          // General questions (remove restrictions v-show="type && stageof && date && (isAMT || isMOCA || isMMSE)")
          section.p-4.border.my-4.border-light.rounded.shadow()
            label.mb-2(style="font-size: 17px;font-weight: bold;") General:
            b-form-checkbox.mb-2(v-model="checker" value="sacop" name="part2") &nbsp;Shared about Centre's objectives & program
            b-form-checkbox.mb-2(v-model="checker2" name="part2" value="wcv") &nbsp;Watched Centre's video
            b-form-checkbox(v-model="checker3" name="part2" value="pttg") &nbsp;Played Table Top games
            hr
            label.mb-2(style="font-size: 17px;font-weight: bold;") Games & Surveys:
            b-form-checkbox.mb-2(name="the-pnbtg" value="pnbtg" v-model="neeuro") &nbsp;Played NeeuroFIT brain training game
            b-card.my-4(v-show="neeuro"  header-tag="header")
              template(#header)
                h5.font-weight-bold Neeurofit
              b-form-checkbox.mb-2(v-model="atten" name="part2ins" value="att") &nbsp;Attention
              .row.mb-2(v-show="atten")
                .col-sm-6
                  label(for="stageof" ) Game played:
                  v-select(:options="game1" v-model="attentionObj.attentiongame")
                .col-sm-6
                  label(for="stageof" ) Finished Level:
                  v-select(:options="levels" v-model="attentionObj.attentionlevel")
              b-form-checkbox.mb-2(type="checkbox" name="part2ins" v-model="spatial" value="spat") &nbsp;Spatial
              .row.mb-2(v-show="spatial")
                .col-sm-6
                  label(for="stageof") Game Played:
                  v-select(:options="game2" v-model="spatialObj.spatialgame")
                .col-sm-6
                  label(for="stageof") Finished Level:
                  v-select(:options="levels" v-model="spatialObj.spatiallevel")
              b-form-checkbox.mb-2(type="checkbox" name="part2ins" v-model="decision" value="dec") &nbsp;Decision
              .row.mb-2(v-show="decision")
                .col-sm-6
                  label(for="stageof") Game Played:
                  v-select(:options="game3" v-model="decisionObj.decisiongame")
                .col-sm-6
                  label(for="stageof") Finished Level:
                  v-select(:options="levels" v-model="decisionObj.decisionlevel")
              b-form-checkbox.mb-2(type="checkbox" name="part2ins" v-model="memory" value="mem") &nbsp;Memory
              .row.mb-2(v-show="memory")
                .col-sm-6
                  label(for="stageof") Game Played:
                  v-select(:options="game4" v-model="memoryObj.memorygame")
                .col-sm-6
                  label(for="stageof") Finished Level:
                  v-select(:options="levels" v-model="memoryObj.memorylevel")
              b-form-checkbox.mb-2(type="checkbox" name="part2ins" v-model="flexibility" value="flexi") &nbsp;Flexibility
              .row.mb-2(v-show="flexibility")
                .col-sm-6
                  label(for="stageof") Game Played:
                  v-select(:options="game5" v-model="flexibilityObj.flexibilitygame")
                .col-sm-6
                  label(for="stageof") Finished Level:
                  v-select(:options="levels" v-model="flexibilityObj.Flexibilitylevel")
  
            //MOCA form     
            b-form-checkbox.mb-2(v-model="checker4" name="mocaform" type="checkbox" value="mocaform") &nbsp;MOCA form
            b-card.my-4(v-show="checker4"  header-tag="header")
              template(#header)
                h5.font-weight-bold MOCA
              //- p.common Version:
              //- div.d-flex
              //-   b-form-checkbox(v-model="language" name="languageVer" type="checkbox" value="0" disabled) &nbsp;Chinese
              //-   b-form-checkbox.mx-4(v-model="language" name="languageVer" type="checkbox" value="1") &nbsp;English
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
                    img(@click="pick_answer_naming('1')").image_container_number(src="/form-images/number.png")
                  .row
                    label Alternating Trail Making:
                    v-select(v-model="vis1" :options="['0', '1']" :clearable="false")
                .col-sm-6 
                  .row.mb-4
                    img(@click="pick_answer_naming('2')").image_container_cube(src="/form-images/cube.png")
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
            b-form-checkbox.mb-2(v-model="checker5" name="eq5d" type="checkbox" value="eq5d") &nbsp;EQ-5D-5L form
              // input#eq5d.checkbox_circle(v-model="checker5" name="eq5d" type="checkbox" value="eq5d")
              // label.gapped.text-small(for="eq5d") EQ-5D-5L form
            b-card.gap(v-show="checker5"  header-tag="header")
              template(#header)
                h5.font-weight-bold EQ-5D-5L
              .row
                .left.col-sm-6
                  .row.mb-3
                    label.col-lg-4 Mobility:
                    v-select.col-lg-8(v-model="eq1" :options="eq5dnumbers" :clearable="false")
                  .row.mb-3
                    label.col-lg-4 Self-Care:
                    v-select.col-lg-8(v-model="eq2" :options="eq5dnumbers" :clearable="false")
                  .row.mb-3
                    label.col-lg-4 Usual Activities:
                    v-select.col-lg-8(v-model="eq3" :options="eq5dnumbers" :clearable="false")
                  .row.mb-3
                    label.col-lg-4 Pain / Discomfort:
                    v-select.col-lg-8(v-model="eq4" :options="eq5dnumbers" :clearable="false")
                  .row.mb-3
                    label.col-lg-4 Anxiety/Depression:
                    v-select.col-lg-8(v-model="eq5" :options="eq5dnumbers" :clearable="false")
                .col-sm-6
                  b-card.mx-auto(header-tag="header")
                    template(#header)
                      h5.font-weight-bold Total Score
                    h5.font-weight-bold.mx-auto {{ eq5dcounter }}/25
                  b-card.mx-auto.mt-3(header-tag="header")
                    template(#header)
                      div.d-flex
                        h5.font-weight-bold Perceived Health Scale:
                        input.numberslider.mx-3.my-auto.w-25(style="font-size:22px;font-weight:bold;" v-model="healthscale" type="number" min="0" max="100" onkeydown="return event.keyCode !== 190") 
                    .row 
                      .col-sm-12
                        input.numbers(v-model="healthscale" type="range" min="0" max="100") 

          //remove restrictions v-show="type && stageof && date && (neeuro || checker || checker2 || checker3 || checker4 || checker5)"
          section.p-4.border.my-4.border-light.rounded.shadow()
            .formed
              label.common(for="comment") Comment/Observation about the client
              textarea#comment.p-2(name="comment" rows="3" type="text" placeholder="Comment about the client" v-model="checking")

          //remove restriction v-show="type && stageof && date && (neeuro || checker || checker2 || checker3 || checker4 || checker5)"
          section.p-4.border.my-4.border-light.rounded.shadow()
            .row
              .col-md-2 
                label.common Fee & Payment:
            .centerCheckbox
              b-form-checkbox(v-model="subsidy" v-b-toggle.subsidy_box type="checkbox" :value="`${true}`") &nbsp;Subsidy included
            b-collapse.mt-3#subsidy_box(v-model="subsidy")
              b-card
                section
                    .formed
                      .formed
                        b-form-checkbox.mb-2(v-model="subs1" name="subsidy1" type="checkbox" value="dsg1") &nbsp;DSG
                        .row.my-2(v-show="subs1")
                            .col-md-2 
                              input.numbers#means(name="means" type="number" min="20" v-model="subs1val")
                            .col-md-2 
                              b-form-select.numbers(v-model="dsgsubsidy" :options="subsidyoptions")
                            .col-md-2
                              label.common subsidy
                              //- checknationality 
                        b-form-checkbox.mb-2( v-model="subs2" name="subsidy2" type="checkbox" value="dsg2" disabled) &nbsp;Toteboard
                        .row.my-2(v-show="subs2")
                          .col-md-2 
                            label.common Means Test Result
                          .col-md-2 
                            v-select(v-model="subsidyAmount" :options="clientdata.crb5c_citizenship == 0 ?  toteboardSG : toteboardPR")
                          .col-md-2
                            label.common % subsidy
                        b-form-checkbox.mb-2(v-model="subs3" name="subsidy3" type="checkbox" value="dsg3" disabled) &nbsp;Others
                        .formed.my-2(v-show="subs3")
                          label.common(for="others") Specify: 
                          input.numbers-half#others(name="others" type="text")
                      //- .formed.gapbot(v-show="subs1 || subs2 || subs3 ")
                      //-     label.common(for="subsid" style="justify-content:end") Amount Subsidized:
                      //-     .row(style="justify-content:end")
                      //-       input.small-input-width#subsid(name="subsid" type="number" min="0")
                //- hr
                b-row(v-if="subs2")
                  b-col.col-12
                    b-row.align-items-center
                      b-col.col-12.my-3
                        input.checkbox_circle(id="transport-checkbox" v-model="transport.isIncluded" name="transport-checkbox" type="checkbox")
                        label.long.gapped(for="transport-checkbox")
                          | Transport Included ${{  (transport.fixedFee * (1 - ((subsidyAmount ?? 0) / 100))).toFixed(2) }}
                    b-collapse(id="transport-included-section" v-model="transport.isIncluded")
                      b-row.my-2
                        b-col.col-12
                          b-row.align-items-center
                            b-col.col-2
                              label
                                | Start Postal Code:
                            b-col.col-2
                              b-form-input(v-model="transport.startPostalCode" type="number" placeholder="Enter postal code")
                      b-row
                        b-col.col-12
                          b-row.align-items-center
                            b-col.col-2
                              label
                                | Destination Postal Code:
                            b-col.col-2
                              b-form-input(v-model="transport.destinationPostalCode" type="number" placeholder="Enter postal code" disabled)
                      b-row.my-4
                        b-col.col-3
                          b-button( v-show="notPDFview" style="background-color: rgb(118, 80, 137); color: #fff; font-weight: bold; border-radius: 0.625rem" @click="checkDistanceTransport")
                            | Check distance
                      b-row.my-2
                        b-col.col-12
                          iframe( v-show="notPDFview" style="width: 100%;" id="iframe" height="500" width="500" :src="transport.iframeSrc")
                      b-row.my-4
                        b-col.col-12
                          b-row.align-items-center
                            b-col.col-2
                              label
                                | Additional Fee: $
                            b-col.col-2
                              b-form-input(v-model="transport.amountToBePaid" type="number" placeholder="Amount")
  
          //remove restriction v-show="type && stageof && date && (neeuro || checker || checker2 || checker3 || checker4 || checker5)"
          section.p-4.border.my-4.border-light.rounded.shadow()
            .formed
              .row
                .col-sm-3.align-self-center.col-auto
                  label.common(for="session") Session Recommended: 
                .col.col-auto(style="text-align: right;")   
                  b-btn#add-btn.btn-warning.mx-3(@click="addmethod(0)" v-show="notPDFview") Available Sessions 
                //- .col.col-auto(style="text-align: right;")   
                //-   b-btn#add-btn.mx-2.btn-warning(@click="addmethod(1)" v-show="notPDFview") + Create New Session 
                //- .col.col-auto(style="text-align: right;")   
                //-   b-btn#add-btn.mx-2.btn-dark(@click="AutoMatchingSession()") + (Test) Automation
                  //- b-btn#add-btn(@click="addfile") + Add file 
              
              div.my-4(v-if="!sessions.length && !recommended_session_pick.length" )
                b-card(style="text-align: center;padding: 40px;")
                  b-icon.large_icon(icon="box-seam")
                  p.gap(style="justify-content: center;") No Session Selected, click add session to begin.

              <!-- div.my-4.rounded.border(v-if="recommended_session_pick.length") -->
                <!-- .row -->
                  <!-- p.p-3(v-for="(rec_ses, index) in recommended_session_pick" :key="index")
                    | {{index+1+'.'}} {{rec_ses.crb5c_session_id}}
                    b-icon.delete_icon(icon="x-circle-fill" @click="removePickedSession(index)") -->
              b-table.my-4(:fields="sessionTableFields" :items="recommended_session_pick" v-if="recommended_session_pick.length" striped bordered responsive)
                template(#cell(session_name)="data")
                  p {{data.item.crb5c_session_id}}
                template(#cell(session_type)="data")
                  p {{sessionTypeCheck(data.item.crb5c_sessiontype)}}
                template(#cell(session_duration)="data")
                  p {{sessionDurationCheck(data.item.crb5c_duration)}}
                template(#cell(actions)="data")
                  b-button(variant="danger" @click="removePickedSession(data.index)") Remove

              div.my-4.p-3.border(v-if="sessions.length" style="border-radius: 0.5rem;" )
                .row
                  p.p-3(v-for="(ses, index) in sessions" :key="index") 
                    | {{index+1+'.'}} {{ses.name}} [{{ses.type}}] - {{ ses.day }} {{ ses.time }} ( {{ ses.location }} ) 
                    b-icon.delete_icon(icon="x-circle-fill" @click="removeSession(index)")

              .formed.mt-3( v-show="this.sessions.length || this.recommended_session_pick.length")
                label.common.gap(for="admission") Admission date:
                input.numbers-half#admission(v-model="adm" name="admission" type="date")

              //- b-modal#confrimationModal.modal_confimration(size="lg" title="Sign here" scrollable centered hide-footer)
              //-     input(type="file" @change="uploadFile")
              //-     b-btn(@click="confirmUpload") Submit

              b-modal(id="modal-time" hide-footer hide-header)
                p.my-4 Pick a time
                b-form-datepicker(id="datepicker" v-model="edit_time" class="mb-2")
                div(style="text-align:center; margin-top: 30px; margin-bottom: 20px;")
                  b-button(@click="editTime") Change date
                            
              b-modal#automatedMatchingModal.modal_confimration(size="lg"  scrollable centered hide-footer hide-header no-close-on-esc no-close-on-backdrop)
                div(v-if="loadingAutomated")
                  b-row.mt-5 
                    Icon.icon-loader(icon="line-md:cog-filled-loop")
                  b-row.my-5.text-center
                    h6 Please wait while the sessions are being automated
                div(v-else)
                  //- div.mx-3(style="text-align: right; font-size: 3vh") 
                  //-   b-button.btn-transparent(@click="closeModal('automatedMatchingModal')")
                  //-     Icon(icon="ic:twotone-close" ) 
                  b-row.mt-2.justify-content-center
                    lord-icon(src="https://cdn.lordicon.com/gqjpawbc.json" trigger="loop" delay="500"  colors="primary:#121331,secondary:#4f1091" state="in-reveal" style="width:350px;height:350px")
                  b-row.my-5.text-center
                    h6 Completed, you can now close this page.

              b-modal#assessmentSubmission.modal_confimration(size="lg"  scrollable centered hide-footer hide-header no-close-on-esc no-close-on-backdrop)
                div(v-if="loadingSubmission")
                  b-row.mt-5 
                    Icon.icon-loader(icon="line-md:loading-twotone-loop")
                  b-row.my-5.text-center
                    h6 Please wait, assessment is being finalized and submitting
                div(v-else)
                  //- div.mx-3(style="text-align: right; font-size: 3vh") 
                  //-   b-button.btn-transparent(@click="closeModal('automatedMatchingModal')")
                  //-     Icon(icon="ic:twotone-close" ) 
                  b-row.mt-4.justify-content-center
                    lord-icon(src="https://cdn.lordicon.com/wzwygmng.json" trigger="loop" delay="1200"  colors="primary:#121331,secondary:#4f1091" state="in-reveal" style="width:350px;height:350px")
                  b-row.my-5.text-center
                    h6 Submitted successfully, session automation will beginin 5 seconds.

                
              b-modal#addAdHocModal.modal_confimration(size="lg" title="Ad-hoc Fee" scrollable centered hide-footer)
                  .d-flex.flex-column
                    b-form-group.mb-3(label="Remark:")
                      b-form-input(type="text" v-model="adHocItems.remark")
                    b-form-group.mb-3(label="Amount ($): ")
                      b-form-input(type="number" v-model="adHocItems.total" value="")
                    b-form-checkbox.mb-2(v-model="adHocItems.isRecurring"  type="checkbox") &nbsp;Recurring (Monthly)
                    b-form-checkbox.mb-2(v-model="adHocItems.isIncludeInFee"  type="checkbox") &nbsp;Include in current fee
                    .d-flex.justify-content-center.mt-3
                      b-button(@click="adHocFee" variant="primary" :disabled="!adHocItems.remark || !adHocItems.total || (!adHocItems.isRecurring && !adHocItems.isIncludeInFee)" style="width:50%") Add Fee

              b-modal#paymentConfirmation(size="xl" scrollable centered hide-footer)
                .mx-5
                  h3(style="font-weight:700;") Payment Instructions
                  h5.text-danger(style="font-weight:700;") Payment via QR code is highly recommended.
                  p Kindly make payment by scanning the PayNow QR code below with a mobile banking application.
                hr
                    
                label.common.gap.mx-5.my-2 Mode of Payment:
                .row(style="display: flex;flex-wrap: wrap;text-align: center;") 
                  .col(cols="2")
                    label(for="cash") 
                      div(:class="(this.modeofpayment == 'cash') ? 'checkboxSelectionSelected' : 'checkboxSelection'")
                        input#cash(v-model="modeofpayment" name="payment" type="radio" value="cash")
                        |&nbsp;&nbsp;Cash
                        img.checkboxImg.mx-3(src="/form-images/money.png")
                  .col(cols="2")
                    label(for="paynow") 
                      div(:class="(this.modeofpayment == 'paynow') ? 'checkboxSelectionSelected' : 'checkboxSelection'")
                        input#paynow( v-model="modeofpayment" name="payment" type="radio" value="paynow") 
                        |&nbsp;&nbsp;PayNow
                        img.mx-3.my-2(src="/form-images/paynow_logo.png" style="width:100px")
                  //- .col(cols="6")
                  //-   label(for="e-bank") 
                  //-     div.border-danger(:class="(this.modeofpayment == 'e-bank') ? 'checkboxSelectionSelected' : 'checkboxSelection'")
                  //-       input#e-bank( v-model="modeofpayment" name="payment" type="radio" value="e-bank" disabled)
                  //-       |&nbsp;&nbsp;Internet Banking
                  //-       img.checkboxImg.mx-3(src="/form-images/money_transfer.png")
                  //- .col(cols="6")
                  //-   label(for="cheque")
                  //-     div.border-danger(:class="(this.modeofpayment == 'cheque') ? 'checkboxSelectionSelected' : 'checkboxSelection'")
                  //-       input#cheque( v-model="modeofpayment" name="payment" type="radio" value="cheque" disabled)
                  //-       |&nbsp;&nbsp;Cheque
                  //-       img.checkboxImg.mx-3(src="/form-images/cheque.png")
                  section.mx-5.my-4
                    label.common(for="collect") Total (GST Included):
                    label.common(for="collect" style="font-size:30px") ${{ viewamtcollect.toFixed(2)}}
                  hr

                section.gap( v-if="this.modeofpayment == 'cash'" style="margin: 20px 60px 60px")
                  label.common(for="collect") Please collect the payment before continuing!
                
                section.gap(v-if="this.modeofpayment == 'paynow' || this.modeofpayment == 'e-bank'" style="margin: 20px 60px 40px")
                  p.my-2.text-danger IMPORTANT: For electronic funds transfer, please indicate invoice number as payment reference.
                  h4.text-danger(style="font-weight:700; text-decoration:underline;")
                    u {{invoices[0].crb5c_id}}
                  div.payment-container
                    .background-container.my-3
                      .qr-code-container
                        vueQrcode(:value="paynowString" :options="{ width: 250, height: 250}" )
                      .paynow-logo-container.my-1
                        .logo-background
                          img(src="/form-images/paynow_logo.png" alt='paynow' style="max-width:100px; height:auto;")
                  
            
                    //- h4.mb-5.text-danger(style="font-weight:700; text-decoration:underline;")
                    //- .row 
                    //-   .col-6 
                    //-     .d-flex.px-5.mx-2.my-4
                    //-     b-table-simple(small, borderless, style="max-width:50%;")
                    //-       b-tr
                    //-         b-td Bank account name:
                    //-         b-td Dementia Singapore Ltd - Acc 1
                    //-       b-tr
                    //-         b-td Bank account number:
                    //-         b-td 451-312-912-7
                    //-       b-tr
                    //-         b-td UEN for PayNow:
                    //-         b-td 202111519KDSG
                    //-       b-tr
                    //-         b-td Bank:
                    //-         b-td United Overseas Bank Limited
                    //-       b-tr
                    //-         b-td Branch code:
                    //-         b-td 001
                    //-       b-tr
                    //-         b-td Bank address:
                    //-         b-td
                    //-           | 80 Raffles Place
                    //-           br
                    //-           | Singapore 048624
                    //-       b-tr
                    //-         b-td Bank Code:
                    //-         b-td 7375
                    //-       b-tr
                    //-         b-td Bank SWIFT Code:
                    //-         b-td UOVBSGSG
                    //-   .col-2
                        
                      hr'
                  
                      
                                    

                section.gap(v-if="this.modeofpayment == 'cheque'" style="margin: 20px 60px 60px")
                  p For Cheque Payment:
                        p.mb-1 All cheques should be crossed and made payable to 
                          b.text-danger Dementia Singapore Ltd - Acc 1
                        p Kindly indicate name of the client and invoice number at the back of the cheque.

                  
                section.submitbtn(v-if="modeofpayment" @click="submitassessment")
                  b-button(variant="success" style="font-size: 17px;width: 90%;") Done


              b-modal#pick-session(size="lg" title="Add Session" scrollable centered hide-footer) 
                div
                  b-form-checkbox-group(v-model="pick_sessions")
                    b-form-checkbox.mb-2( :value="session" required v-for="session in filteredChoice" :key='session.crb5c_fow_session_scheduleid' :id="session.crb5c_fow_session_scheduleid") &nbsp;{{ session.crb5c_session_id }}
                  div.text-center.my-2
                    b-button.my-3.px-4( size="md" variant="success" :disabled="isAddButtonDisabled" @click="addNewPickSession") Add
                  
              //------- add new session modal -start
              b-modal#add-session(size="md" title="Add Session" scrollable centered)
                b-card.p-3(no-body)

                  b-form-group.mb-2(label="Session Name:")
                    b-form-input.input-border-light.rounded(v-model="newSessionTitle" size="sm" type="text")  

                  div.d-flex.mb-2
                    b-form-group(label="Session Type:")
                      b-form-select.p-1.input-border-light.rounded(v-model="newSessionType" :options="sessionType")
                    b-form-group.mx-auto(label="Report Type: ")
                      b-form-select.p-1.input-border-light.rounded(v-model="newDementiaType" :options="dementiaLvl")

                  div.d-flex.mb-2
                    b-form-group(label="Duration: ")
                      b-form-select.p-1.rounded.w-100.input-border-light(v-model="newDuration" :options="durationSession")
                    
                b-card.my-3.p-3(no-body)
                  b-form-group
                    div.d-flex
                      label.mr-2 Type:
                      b-form-radio.mx-2( v-model="typeses" name="typeSes" value="Group") &nbsp;Group 
                      b-form-radio.mx-2( v-model="typeses" name="typeSes" value="Individual") &nbsp;Individual
                b-card.p-3(no-body )
                  div.d-flex
                    b-form-group
                      label.mr-2.font-weight-bold Day:
                        b-form-radio( v-model="day" name="daySes" value=1) &nbsp;Monday 
                        b-form-radio( v-model="day" name="daySes" value=2) &nbsp;Tuesday
                        b-form-radio( v-model="day" name="daySes" value=3) &nbsp;Wednesday
                        b-form-radio( v-model="day" name="daySes" value=4) &nbsp;Thursday
                        b-form-radio( v-model="day" name="daySes" value=5) &nbsp;Friday
                    b-form-group.mx-auto(v-if="day && typeses==='Group'")
                      label.mr-2.font-weight-bold Time:
                        b-form-radio( v-model="time" name="timeSes" value="09:30") &nbsp;9:30 AM
                        b-form-radio( v-model="time" name="timeSes" value="14:00") &nbsp;2:00 PM
                    b-form-group.mx-auto.w-auto(label="Time:" v-if="day && typeses==='Individual'")
                      b-form-timepicker.numbers#timeSession(v-model="time" name="timeSession" type="time" locale="en")
                  b-form-group(label="Location:" v-show="typeses==='Individual'")
                    b-form-radio( v-model="location" name="location" type="radio" value="Center") &nbsp;Center 
                    b-form-radio( v-model="location" name="location" type="radio" value="Video-Call") &nbsp;Video Call (Zoom)
                    b-form-radio( v-model="location" name="location" type="radio" value="Residence") &nbsp;Residence
                template(#modal-footer="{ok}")
                  b-btn.btn-success(v-show="location" size="md" @click="addNew") Add
              // add new session modal -end  
          section.p-4.border.my-4.border-light.rounded.shadow(v-show="this.sessions.length || this.recommended_session_pick.length")
            label.common Applicable Sessions (excluding GST):
            .formed
              .formed(v-for="(programme, index)  in filteredProgrammeInfos " :key="index")
                input.checkbox_circle(v-model="applicableFeeTotal" type="checkbox" :value="programme" :id="programme.crb5c_fowprogrammeid")
                label.gapped.text-small(:for="programme.crb5c_fowprogrammeid") {{programme.crb5c_programmename}} 
                  label(v-if="programme.crb5c_type != 4") ${{ programme.crb5c_price }}
                  label(v-else) ${{ fees4val  }}  
                    span(v-if="transport.isIncluded") (with transport fee: ${{ transportTotalView.toFixed(2) }})
              .formed
              .border.border-1.m-4(v-show="isCipSelected" style="border-radius: 0.5rem;")
                  b-row.p-3.mx-4
                    b-col.col-6(style="border-right-style: ridge;")
                      b-row
                        b-col
                          b-row.my-4 
                            label(style="font-size:16px;font-weight:bold;color:#6f6f6f;text-decoration-line: underline;") CIP Date picker
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
                            //- b-col
                            //-   b-btn.gap(@click="CIPtotal" v-show="notPDFview") Calculate
                          b-row.my-4
                            b-col.d-flex.justify-content-start.align-items-start(v-show="totalforCIP" style="font-size: 20px;")
                              label(style="font-size:14px") Total of {{ CIPdays }} Session (s) for this month
                              //- b-row.flex 
                              //-   .col-auto
                              //-     input.numbers-half.col-auto( type="number" v-model="CIPdays")
                              //-   .col-auto 
                              //-     span Session (s)
                              //-   b-col
                              //-     label.mx-2 
                              
                    b-col.col-6

                      b-row.mx-4
                        b-col
                          b-row.my-4 
                            label(style="font-size:16px;font-weight:bold;color:#6f6f6f;text-decoration-line: underline;") Holidays and Off days
                          b-row
                            b-col
                              label.common.gap Public & DSG Holiday:
                              p(v-if="listPublicHolidayCurrentMonth" v-for="publicHoliday in listPublicHolidayCurrentMonth" :key="publicHoliday._id")
                                | {{ formatDatePublicHoliday(publicHoliday.date) }} - {{ publicHoliday.holiday }}
                              p(v-if="!listPublicHolidayCurrentMonth")
                                | No Public Holiday for this month
                      b-row.mx-4.mb-5
                        b-col
                          b-row
                            b-col.col-auto.align-self-center
                              label.common.gap(for="dsgOffday") DSG Off day:
                            b-col.col-auto.gap
                              b-button(@click="addDSGOffday" v-show="notPDFview")
                                | +
                          b-row
                            b-col
                              input.numbers-half#admission(v-model="dsgOffDay.date" name="dsgOffday" type="date")
                          
                      
                          b-row(v-if="dsgOffDay.listDay.length !== 0")
                            b-col
                              b-row.mb-2.align-items-center(v-for="holiday in dsgOffDay.listDay" :key="holiday.id")
                                b-col
                                  p.my-auto
                                    | {{ formatDSFOffDayContent(holiday.date) }}
                                b-col
                                  b-button(variant="danger" @click="removeDSGOffDay(holiday.id)")
                                    | Remove
                    
                              
                              
              
  
                  //- b-card
                  //-   label.common.gap(for="admission") 1st Session date:
                  //-   input.numbers-half#admission(v-model="firSession" name="admission" type="date")
  
                  //-   label.common.gap(for="admission") 2nd Session date:
                  //-   input.numbers-half#admission(v-model="secSession" name="admission" type="date")
  
                  //-   b-btn.mt-3(@click="CIPtotal") Calculate
            
                  //-   div(style="text-align: right;width: 100%;font-size: 20px;")
                  //-     label(v-show="totalforCIP") ${{totalforCIP}} for {{ CIPdays }} session
            
          section.p-4.border.my-4.border-light.rounded.shadow(v-show="(this.sessions.length || this.recommended_session_pick.length)  && !isCipSelected" style="margin-top:50px")
            label.common NeeuroFit Subscription (Optional):
            b-form-checkbox(v-model="neeurofitFeeTotal" type="checkbox" :value="neeuroFitFees") &nbsp;Centre-based NeeuroFIT 6 months subcription $240

          
          section.p-4.border.my-4.border-light.rounded.shadow(v-show="this.sessions.length || this.recommended_session_pick.length")
              .d-flex.align-items-center
                label Additional fee:
                b-button.mx-3(v-b-modal.addAdHocModal variant="success" v-show="notPDFview") Ad-hoc fee
              .formed.gap()
                b-form-checkbox(v-model="additionalFeeTotal" type="checkbox" :value="additionalFees.one_time.price") &nbsp;One-time Assessment $50
              //- .formed.gap(v-show="subs1")
              //-   input#one_time_other.checkbox_circle( v-model="additionalFeeTotal"  type="checkbox" :value="oneTimeOtherValue" :disabled="!oneTimeOtherValue")
              //-   label.gapped.text-small(for="one_time_other") One-time Assessment $
              //-     input.mx-2(type="number" v-model="one_time_other_value")
              .formed.gap(v-show="subs1")
                input#one_time_waived(v-model="additionalFeeTotal" type="checkbox" :value="additionalFees.one_time_waived.price")
                label.gapped.text-small(for="one_time_waived") One-time Assessment
                  strike.mx-2 $50 
                    label.mx-2 [Waived]
              .formed.gap(v-if="!isCipSelected")
                b-form-checkbox(v-model="refundableFeeTotal" type="checkbox" :value="refundableDeposit") &nbsp;Refundable One-Month Deposit (4 X applicable fee) ${{ refundableDeposit }}

              b-table.my-4(:fields="adHocFeeTableFields" :items="adHocFeeTotal" v-if="adHocFeeTotal.length" striped bordered responsive)
                template(#cell(remark)="data")
                  p {{data.item.remark}}
                template(#cell(total)="data")
                  p {{data.item.total}}
                template(#cell(isRecurring)="data")
                  p  {{ data.item.isRecurring ? 'Yes' : 'No' }}
                template(#cell(isIncludeInFee)="data")
                  p  {{ data.item.isIncludeInFee ? 'Yes' : 'No' }}
                template(#cell(action)="data")
                  b-button(variant="danger" @click="deleteAdHoc(data.index)") Remove
                //Payment type
                      //-"
                      //- .row
                      //-   .col
                      //-     .row 
                      //-       .col-sm-8
                      //-         | Fee
                      //-       .col-sm-2
                      //-         | Amount
                      //-     .row.mt-5 
                      //-       .col-sm-8
                      //-         label.common(v-if="totalOfNeeurofit !== 0") {{ isNeeuroFit }}
                      //-       .col-sm
                      //-         label.common(v-if="totalOfNeeurofit !== 0") {{ totalOfNeeurofit }} (with GST : {{ totalOfNeeurofit*1.08.toFixed(2) }})
                      //-   .col
                
          section.p-4.border.my-4.border-light.rounded.shadow(v-if="viewamtcollectNoGST")
            div.d-flex.justify-content-between
              div
                  div.mb-3(v-if="CIPdays")
                    label.common CIP Fee (before GST)
                    div(v-if="CIPdays" v-for="(programme, index) in CipPrgrammeSummary" :key="index")
                        label {{programme.name}}  ( ${{ programme.isCip ? fees4val : programme.cost }} {{ programme.quantity > 1 ? "X " + programme.quantity : ''  }} )
                  div 
                    label.common(v-if="selectedProgrammeSummary.length") Fee (before GST):
                    div(v-for="(programme, index) in selectedProgrammeSummary" :key="index")
                        label {{programme.name}} 
                        |  &nbsp; ( {{typeof programme.cost === 'number' ? '$' :''}}{{ programme.cost }}  {{ programme.quantity > 1 ? "X " +programme.quantity : '' }} )
                
                  

              div.d-flex.flex-column.align-items-end
                label.common.mb-4 Amount to be Collected :
                label.mb-2(for="collect" style="font-size:20px") Total : ${{ viewamtcollectNoGST.toFixed(2)}}
                label.mb-2(for="collect" style="font-size:20px") 9% GST: ${{ (viewamtcollect - viewamtcollectNoGST ).toFixed(2)}}
                label.common(for="collect" style="font-size:30px") Total + GST: ${{ viewamtcollect.toFixed(2)}}

          section(v-if="!viewServiceForm" v-show="this.sessions.length || this.recommended_session_pick.length")
            div.justify-content-left.align-items-left
                b-button(variant="success" @click="navigateToServiceForm" v-if="!viewServiceForm") Continue to Agreement 

          div( ref='pdfFormView' v-if="viewServiceForm")
            section.p-4.border.my-4.border-light.rounded.shadow()
              h2 Service Agreement Form
              .row.mt-3
                  .col-sm.text-left
                    p NRIC Name of Client:
                  .col-sm
                    | {{ clientdata.crb5c_no }}
              .row.mt-3
                  .col-sm.text-left
                    p NRIC No. of Client:
                  .col-sm
                    | {{ clientdata.crb5c_nricno}}
              .row.mt-3
                  .col-sm.text-left
                    p Services Provided:
                  .col-sm
                    p Family of Wisdom (Enrichment) Programme
              .row.mt-3
                  .col-sm.text-left
                    p Date of Commencement:
                  .col-sm
                    | {{ adm }}
              //- .row.mt-3
              //-     .col-sm.text-left
              //-       p Fee charged per session (before GST): $
              //-     .col-sm
              //-       | {{ isCipSelected? (fees4val + transportTotalView )  : totalOfApplicable  }} 
                    
              hr
              .row(style="text-align:justify;line-height:5vh")
                .d-flex.flex-wrap
                  span.m-2 I,
                  v-select.w-25.d-inline.m-2(:options="caregiverDetails" v-model="caregiverPicked" label="crb5c_name" taggable)
                  //- b-form-select.w-25.d-inline.m-2(v-model="caregiverPicked" :options="caregiverDetails" value-field="crb5c_fow_caregiverid" text-field="crb5c_name")
                  span.m-2 (NRIC Name), confirm that I am the
                  input.form-control.w-25.d-inline.m-2(type="text" v-model="clientReationship" placeholder="Spouse / Sibling / Children / Caregiver / Guardian")
                  span.m-2 (relationship) of
                  input.form-control.w-50.d-inline.m-2(type="text" v-model="caregiverClientName" placeholder="Client Name")
                  span.m-2 (NRIC Name of client),
                  input.form-control.w-25.d-inline.m-2(type="text" v-model="caregiverClientIc" placeholder="Caregiver IC")
                  span.m-2 (NRIC No.).
                
              hr  
              section.mt-3(style="text-align:left;")
                p I hereby declare that I have understood and agree to abide by the:
                ul
                    li Service Agreement
                p of Family of Wisdom (Bendemeer)
                .row.mt-3
                  .col 
                    .row.mt-3.mx-1
                          VueSignatureCanvas.gap.sig-canvas(ref="caregiverSignature" )
                    div.d-flex.justify-content-between
                      h5
                        u.text-center Caregiver Sign Here
                      b-button(v-show="notPDFview" variant="danger" @click="clearCanvas('caregiverSignature')") Clear

                          
                  .col 
                    .row.mt-3.mx-1
                          VueSignatureCanvas.gap.sig-canvas(ref="staffSignature" )
                    div.d-flex.justify-content-between.align-items-center
                      h5
                        u.text-center Staff Sign Here 
                      b-button(v-show="notPDFview" variant="danger" @click="clearCanvas('staffSignature')") Clear
                hr
                .row.mt-2
                  .col-sm
                      p Contact Number:
                  .col-sm
                      input.form-control(type="number" v-model="serviceAgreementContact")
                .row.mt-2
                  .col-sm
                      p Email:
                  .col-sm
                      input.form-control(type="email" v-model="serviceAgreementEmail")
                .row.mt-3
                  .col-sm 
                      p Date:
                  .col-sm
                      input.form-control(type="date" v-model="serviceAgreementDate")
                div.mt-3.d-flex.justify-content-center.align-items-center
                  b-button.px-5.py-2( v-show="notPDFview" v-if="viewamtcollect" variant="success" @click="paymentSubmission" ) Continue to Payment
                
                //- .row(v-if="imagesSign")
                //-   img(:src="'data:image/jpeg;base64,' + imagesSign[0].crb5c_caregiversignature")
              //- input.numbers#collect(v-model="amtcollect " name="collect" type="text" readonly="readonly") 
        
      section(v-if="modeofpayment")
        //- b-row.justify-content-center
        //-     VueSignatureCanvas.gap(ref="handWrite" :canvasProps="{class: 'sig-canvas'}")
        //- b-row.justify-content-center
        //-     b-btn.gap.confimrationBtn#getImagebtn(@click="getImage()") Submit 
        //- b-row
        //-   .col-sm-2
        //-     img.signatureView(:src="signatureImg")
      //- Submit button 

</template>
  
  <script>
  
  import dayjs from "dayjs";
  // import html2canvas from 'html2canvas';
  import * as html2pdf from 'html2pdf.js';
  import {Icon} from '@iconify/vue2';
  import PaynowQR from 'paynowqr'
  import VueQrcode from '@chenfengyuan/vue-qrcode';
  import utc from "dayjs/plugin/utc";
  import timezone from "dayjs/plugin/timezone"; // dependent on utc plugin
  import isToday from "dayjs/plugin/isToday";
  import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
  import axios from 'axios';
  import VueSignatureCanvas from 'vue-signature-canvas';
  import { createInvoice } from "@/utils/generateInvoiceNumber.mjs";
  import { 
    // mapState, 
    mapMutations, 
  } from "vuex";

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(isToday);
  dayjs.extend(isSameOrBefore);
  
  const defaultTimezone = "Asia/Singapore";
  dayjs.tz.setDefault(defaultTimezone);
  import "vue-select/dist/vue-select.css";
  import vSelect from "vue-select";
  // import colors from "././scss/colors.scss";
  export default {
    // Deselect,
    // OpenIndicator,
    
    components: { 
      vSelect,
      VueQrcode,
      // PaynowQR,
      // VueQrcode,
      Icon,
      VueSignatureCanvas,
    },
    // emits: ["newresource"],
    data() {
      return {
        neeuroFitAuto: false,
        notPDFview: true,
        edit_time: null,
        dateofassessment: '',
        invoices: [],
        // CIPdays: 0,
        CIPprice: 0,
        caregiverNamePrefilled: '',
        pdfFullPage: '',
        pdfAgreement: '',
        clientReationship: '',
        caregiverPicked: null,
        caregiverDetails: [],
        adHocFeeTableFields:[
          {key:'remark', label:'Remarks'},
          {key:'total', label:'Amount'},
          {key:'isRecurring', label:'Recurring (Monthly)'},
          {key:'isIncludeInFee', label:'Include in Fee'},
          {key:'action', label:'Action'}
        ],
        sessionTableFields:[
          {key:"session_name", label:"Name"},
          {key:"session_duration", label:"Duration"},
          {key:"session_type", label:"Type"},

          {key:"actions", label:"Actions"}
        ],
        language:null,
        loadingSubmission: false,
        loadingAutomated: false,
        newDuration: 180,
        newDementiaType: null,
        newSessionType: null,
        newSessionTitle: '',
        viewServiceForm: false,
        caregiverName: '',
        caregiverRelationship: '',
        caregiverClientName: '',
        caregiverClientIc: '',
        serviceAgreementContact: '',
        serviceAgreementEmail: '',
        serviceAgreementName: '',
        serviceAgreementDate: '',
        imagesSign: [],
        isNeeuroFit: 'NeeuroFIT 6 months subcription',
        adHocItems:{
          remark : '',
          total: null,
          isRecurring: false,
          isIncludeInFee: false,
        },
        dementiaLvl: [
          {text: 'Mild', value: 0 },
          {text: 'Moderate', value: 1 },
          {text: 'Individual', value: 3 }
        ],
        durationSession: [
          {text: '1 hour', value: 60 },
          {text: '1 hour 30 minute', value: 90 },
          {text: '2 hours', value: 120 },
          {text: '3 hour', value: 180 },
        ],
        sessionType: [
          {text: 'Group HQ (Centre) Based', value: 0},
          {text: 'One-to-one HQ (Centre) Based', value: 1},
          {text: 'Home Based', value: 2},
          {text: 'Virtual / Online / Zoom', value: 3},
        ],
        adHocFeeTotal: [],
        pick_sessions: [],
        schedule_info: [],
        recommended_session_pick: [],
        GST: 1.09,
        neeuroFitFees: 240,
        applicableFeeTotal: [],
        additionalFeeTotal: [],
        refundableFeeTotal: null,
        redundableFeeTotal: null,
        neeurofitFeeTotal: null,
        one_time_other_value: null,
        additionalFees: {
          one_time :{
            price: 50,
          },
          one_time_waived :{
            price: 0,
          },
        },
        filterTypeValues: [],
        programmeInfos: [],
        filesToUpload: [],
        assessment_files: [],
        name: 'FirstSignatureCanvas',
        signatureImg: '',
        listPublicHolidayCurrentMonth: null,
        dsgOffDay: {
          date: null,
          startDate: null,
          endDate: null,
          listDay: [],
        },
        attentionObj: {
          attentiongame: null,
          attentionlevel: null,
        },
        spatialObj: {
          spatialgame: null,
          spatiallevel: null,
        },
        decisionObj: {
          decisiongame: null,
          decisionlevel: null,
        },
        memoryObj: {
          memorygame: null,
          memorylevel: null,
        },
        flexibilityObj:{
          flexibilitygame: null,
          Flexibilitylevel: null,
        },
        subs1val: null,
        dsgsubsidy: null,
        isCIP: 0,
        firstSesFormat: 0,
        secondSesFormat: 0,
        totalforCIP: 0,
        CIPdays: '',
        isAMT: false,
        isMOCA: false,
        isMMSE: false,
        mmseVal: null,
        amtVal: null,
        mocaVal: null,
        gstval: 1.09,
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
        subsidy: false,
        no: null,
        checking: "",
        sessions: [],
        // latestscore: "",
        adm: "",
        // latest: "0",
        type: "",
        stageof: "",
        date: null,
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
        transport: {
          isIncluded: false,
          startPostalCode: null,
          destinationPostalCode: '339914',
          amountToBePaid: null,
          fixedFee: 49,
          iframeSrc: 'https://maps.google.com/maps?saddr=Singapore&ie=UTF8&output=embed&mode=driving',
        },
      };
    },
    compatConfig: { MODE: 3 },
    async mounted() {
      this.initSavedData();
      const component = this;
      this.$root.$on('getFormData', function(){
        component.getdatainform();
      })

      // const listPublicHoliday = await this.getSGPublicHoliday();
      // this.listPublicHolidayCurrentMonth = this.getPublicHolidayCurrentMonth(listPublicHoliday).length === 0 ? null : this.getPublicHolidayCurrentMonth(listPublicHoliday);
      // let getHolidays = await this.getDsgHoliday();
      // // console.log('getHolidays',getHolidays)
      // let dsgHoliday = getHolidays.map(
      //   (holiday) => {
      //     return {
      //       date: dayjs(holiday.crb5c_date).format('YYYY-MM-DD'),
      //       day: dayjs(holiday.crb5c_date).format('dddd'),
      //       holiday: holiday.crb5c_name,
      //       _id: holiday.crb5c_fowcalendarid
      //     };
      //   }
      // );
      // this.listPublicHolidayCurrentMonth.push(...dsgHoliday);
      // console.log('public holiday',this.listPublicHolidayCurrentMonth)
      // console.log('dsg off', this.dsgOffDay.listDay)

      let today = dayjs().format('YYYY-MM-DD')
      this.serviceAgreementDate = today;
      
      this.dateofassessment = dayjs().format("YYYY-MM-DD");
      this.$store.commit('assessment_date',this.dateofassessment);
    },
    methods: {
    ...mapMutations(['assessmentDataChange']),
    initSavedData(){
      const rawAssessmentData = localStorage.getItem("assessmentData");
      if(!rawAssessmentData){
        return;
      }

      const assessmentData = JSON.parse(rawAssessmentData);

      this.type = assessmentData.typeOfDementia;
      this.stageof = assessmentData.stageOfDementia;
      this.isAMT = assessmentData.isAMT;
      this.amtVal = assessmentData.amtVal;
      this.isMOCA = assessmentData.isMOCA;
      this.mocaVal = assessmentData.mocaVal;
      this.isMMSE = assessmentData.isMMSE;
      this.mmseVal = assessmentData.mmseVal;
      this.date = assessmentData.dateDoneInHospital;

      // general
      this.checker = assessmentData.generalCheckerOne;
      this.checker2 = assessmentData.generalCheckerTwo;
      this.checker3 = assessmentData.generalCheckerThree;
      // general

      // games & survey
      // neeurofit
      this.neeuro = assessmentData.isNeeuroFitBrainTrainingGame;
      this.atten = assessmentData.atten;
      this.attentionObj = assessmentData.attentionObj ?? {...this.attentionObj};
      this.spatial = assessmentData.spatial;
      this.spatialObj = assessmentData.spatialObj ?? {...this.spatialObj};
      this.decision = assessmentData.decision;
      this.decisionObj = assessmentData.decisionObj ?? {...this.decisionObj};
      this.memory = assessmentData.memory;
      this.memoryObj = assessmentData.memoryObj ?? {...this.memoryObj};
      this.flexibility = assessmentData.flexibility;
      this.flexibilityObj = assessmentData.flexibilityObj ?? {...this.flexibilityObj};
      // neeurofit
      // MOCA form
      this.checker4 = assessmentData.isMocaForm;
      this.language = assessmentData.language;
      this.edulev = assessmentData.edulev;
      this.unyearSelected = assessmentData.unyearSelected;
      this.ovyearSelected = assessmentData.ovyearSelected;
      this.vis1 = assessmentData.vis1 ?? this.vis1;
      this.vis2 = assessmentData.vis2 ?? this.vis2;
      this.vis3 = assessmentData.vis3 ?? this.vis3;
      this.vis4 = assessmentData.vis4 ?? this.vis4;
      this.vis5 = assessmentData.vis5 ?? this.vis5;
      this.vis6 = assessmentData.vis6 ?? this.vis6;
      this.vis7 = assessmentData.vis7 ?? this.vis7;
      this.vis8 = assessmentData.vis8 ?? this.vis8;
      this.vis9 = assessmentData.vis9 ?? this.vis9;
      this.vis10 = assessmentData.vis10 ?? this.vis10;
      this.vis11 = assessmentData.vis11 ?? this.vis11;
      this.vis18 = assessmentData.vis18 ?? this.vis18;
      this.vis13 = assessmentData.vis13 ?? this.vis13;
      this.vis14 = assessmentData.vis14 ?? this.vis14;
      this.vis15 = assessmentData.vis15 ?? this.vis15;
      this.vis16 = assessmentData.vis16 ?? this.vis16;
      // MOCA form
      // EQ5D5L form
      this.checker5 = assessmentData.isEQ5D5Lform;
      this.eq1 = assessmentData.eq1 ?? this.eq1;
      this.eq2 = assessmentData.eq2 ?? this.eq2;
      this.eq3 = assessmentData.eq3 ?? this.eq3;
      this.eq4 = assessmentData.eq4 ?? this.eq4;
      this.eq5 = assessmentData.eq5 ?? this.eq5;
      this.healthscale = assessmentData.healthscale;
      // EQ5D5L form
      // games & survey

      this.checking = assessmentData.checking;

      //-- fee & payment
      //-- DSG
      this.subsidy = assessmentData.subsidy;
      this.subs1 = assessmentData.subs1 ?? this.subs1;
      this.subs1val = assessmentData.subs1val ?? this.subs1val;
      this.dsgsubsidy = assessmentData.dsgsubsidy ?? this.dsgsubsidy;
      //-- DSG
      //-- Toteboard
      this.subs2 = assessmentData.subs2 ?? this.subs2;
      this.subsidyAmount = assessmentData.subsidyAmount ?? this.subsidyAmount;
      //-- Toteboard
      this.transport = assessmentData.transport ?? this.transport;
      //-- fee & payment

      // TODO: set data here
      this.recommended_session_pick = assessmentData.recommended_session_pick ?? this.recommended_session_pick;
      this.applicableFeeTotal = assessmentData.applicableFeeTotal ?? this.applicableFeeTotal;
      this.firSession = assessmentData.firSession ?? this.firSession;
      this.secSession = assessmentData.secSession ?? this.secSession;
      this.dsgOffDay = assessmentData.dsgOffDay ?? this.dsgOffDay;
      this.adHocFeeTotal = assessmentData.adHocFeeTotal ?? this.adHocFeeTotal;

      // //---- Service Agreement Form
      // this.clientReationship = assessmentData.clientReationship ?? this.clientReationship;
      // this.caregiverClientName = assessmentData.caregiverClientName ?? this.caregiverClientName;
      // this.caregiverClientIc = assessmentData.caregiverClientIc ?? this.caregiverClientIc;
      // this.serviceAgreementContact = assessmentData.serviceAgreementContact ?? this.serviceAgreementContact;
      // this.serviceAgreementDate = assessmentData.serviceAgreementDate ?? this.serviceAgreementDate;
      // //---- Service Agreement Form

    },
    clearLocalStorage(){
      localStorage.clear();
    },
    // async generateInvoice(){
    //   const invoiceJson = {
    //     sessions: this.selectedProgrammeSummary.map(item => ({
    //       id: item.crb5c_fow_session_scheduleid,
    //       name: item.crb5c_session_id,
    //       time: item.crb5c_time,
    //       day: item.crb5c_day,
    //       type: item.crb5c_sessiontype,
    //       hrs: item.crb5c_time_hrs
    //     }))
    //   };
    //   return  JSON.stringify(sessionJson)
    //   },
    getRecSessions(val){
      const sessionJson = {
        sessions: val.map(item => ({
          id: item.crb5c_fow_session_scheduleid,
          name: item.crb5c_session_id,
          time: item.crb5c_time,
          day: item.crb5c_day,
          type: item.crb5c_sessiontype,
          hrs: item.crb5c_time_hrs
        }))
      };
      return  JSON.stringify(sessionJson)
    },
    async generateEmail(){
      const response = await axios.post('/api/sendEmail', {
          cr_email: this.serviceAgreementEmail,
          cr_name: this.serviceAgreementName,
          staff_email: this.$store.state.msalAccount[0].username,
          staff_name: this.$store.state.msalAccount[0].name,
        });
      console.log(response.data.message);
      
    },
    getApplicable(val){
      const applcableJson = {
        applicable: val.map(item => ({
          id: item.crb5c_fowprogrammeid,
          name: item.crb5c_programmename,
          cost: item.crb5c_price,
          type: item.crb5c_type
        }))
      };
      return  JSON.stringify(applcableJson)
    },
    async getFeeInfo(val){
      const feeJson = {
        fee: val.map(item => ({
          name: item.name,
          cost: item.cost,
          gst: item.noGst ? false : true,
          date: dayjs(),
          client_id: this.$store.state.assessment_client_id
        }))
      };
      return  JSON.stringify(feeJson)
    },
    async paymentSubmission(){
      if (!this.serviceAgreementEmail || !this.serviceAgreementName) {
        alert('Fill up the caregiver name and email.')
        return;
      }
      let data = await this.getFeeInfo(this.selectedProgrammeSummary);
      let invoiceData = JSON.parse(data)
      // console.log(invoiceData)
      if(!this.invoices.length){
        let response = await createInvoice(invoiceData.fee)
        this.invoices = response;
        console.log('Invoice created',this.invoices);
      }
      this.$bvModal.show("paymentConfirmation");
    },
    sessionTypeCheck(val){
      switch (val) {
        case 0: return "Group HQ (Centre) Based";
        case 1: return "One-to-one (Centre) Based";
        case 2: return "Home Based";
        case 3: return "Virtual/Online/Zoom";
        default: return "null";
      }
    },
    sessionDurationCheck(val){
      let hours = Math.floor(val / 60);
      let minutes = val % 60;
      if (hours > 0) {
        return hours + ' Hour(s) ' + (minutes > 0 ? minutes + ' Minute(s)' : '');
      } else {
        return minutes + ' Minute(s)';
      }
    },
    editTime(){
      this.dateofassessment = dayjs(this.edit_time).format("YYYY-MM-DD");
      this.$store.commit('assessment_date',this.dateofassessment);
      this.$bvModal.hide('modal-time');
    },
      // async generatePDF() {
      //   },
    pdfToBase64(pdfBlob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(pdfBlob);
        reader.onloadend = () => {
          resolve(reader.result.split(',')[1]);
        };

        reader.onerror = error => reject(error);
      });
    },
      closeModal(modal_name){
        console.log('dsflkfmk')
        this.$bvModal.hide(modal_name);
      },
      async associateTable(data){
        let isLocal = location.host.includes("localhost");
        let url;
        let pl;

        if(isLocal){
           url = `https://orga7b5e99e.crm5.dynamics.com/api/data/v9.2/crb5c_fow_customers(${this.$store.state.assessment_client_id})/crb5c_FOW_Customer_session_schedule_crb5c/$ref`;
           pl ={
            "@odata.id": `https://orga7b5e99e.crm5.dynamics.com/api/data/v9.2/crb5c_fow_session_schedules(${data.crb5c_fow_session_scheduleid})`,
          }
        }
        else{
           url = `https://dsg-fow.crm5.dynamics.com/api/data/v9.2/crb5c_fow_customers(${this.$store.state.assessment_client_id})/crb5c_FOW_Customer_session_schedule_crb5c/$ref`;
           pl ={
            "@odata.id": `https://dsg-fow.crm5.dynamics.com/api/data/v9.2/crb5c_fow_session_schedules(${data.crb5c_fow_session_scheduleid})`,
          }

        }

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.$store.state.accessToken}` 
        };

        const {data: x} = await axios.post(url, pl, { headers })

        console.log('associate result',x)

        let params = new URLSearchParams({
            $select: "crb5c_time_hrs,crb5c_time_mins,crb5c_day,crb5c_duration,crb5c_session_id,crb5c_allowadhoccheckin,crb5c_fow_session_scheduleid,crb5c_sessionreporttype,crb5c_sessiontype,crb5c_gender,crb5c_language,crb5c_transportincluded,crb5c_isactive",
            $expand:"ownerid,crb5c_FOW_Customer_session_schedule_crb5c($select=crb5c_fow_customerid,crb5c_defaultroom;$top=1000),crb5c_parent_activity_bridge($select=crb5c_name,crb5c_activityid,crb5c_activitytype)",
            $filter:`crb5c_fow_session_scheduleid eq ${data.crb5c_fow_session_scheduleid}`,
            $top:1000
        })
        let {data:{value:schedules}} = await this.$store.state.axios.get(`/crb5c_fow_session_schedules?${params}`);
        console.log('entities',schedules)
    },
      async AutoMatchingSession(){

        this.loadingAutomated = true;
        this.$bvModal.show("automatedMatchingModal");
        
        let payloadAssessment = {
            crb5c_admissiondate: this.adm
        }

        const { data } = await this.$store.state.axios.patch(`/crb5c_fow_customers(${this.$store.state.assessment_client_id})`,payloadAssessment);
        console.log('after admission post',data)

        if (this.sessions.length) {

          for (let session of this.sessions){
              console.log('Creating new Session')
              console.log('time value',session.time )
              let [hours, minutes] = '';
              hours = session.time.split(':')[0];
              minutes = session.time.split(':')[1];
              
              let payloadSession  = {
              crb5c_session_id: session.name,
              crb5c_sessiontype: session.sessionType,
              crb5c_sessionreporttype: session.dementiaLevel,
              crb5c_time_hrs: hours,
              crb5c_time_mins: minutes,
              crb5c_duration: session.duration,
              crb5c_day: parseInt(session.day),
              crb5c_isactive: true,
              }

              const { data } = await this.$store.state.axios.post(`/crb5c_fow_session_schedules`,payloadSession);
              console.log('afterpost',data)

              await this.associateTable(data)
          }
        }
        if(this.recommended_session_pick.length){
          for (let rec of this.recommended_session_pick){
            await this.associateTable(rec)
            }
          }
          
          await new Promise(r => setTimeout(r, 5000));
          this.loadingAutomated = false;
          
                            
      },
      navigateToServiceForm(){
        // this.getFeeInfo(this.selectedProgrammeSummary);
        // if (!this.adm) {
        //   alert('Please fill up the admission date before proceeding!') 
        //   return
        // }

        // this.AutoMatchingSession();
        // console.log("applicableFeeTotal", this.applicableFeeTotal)
        this.viewServiceForm = true;
      },
      clearadhoc(){
        this.adHocItems = {
          remark : '',
          total: null,
          isRecurring: false,
          isIncludeInFee: false,
        }
      },
      deleteAdHoc(val){
        this.adHocFeeTotal = this.adHocFeeTotal.filter((_, index) => index !== val)
      },
      async adHocFee(){
        this.adHocFeeTotal.push(this.adHocItems);
        this.$bvModal.hide("addAdHocModal");
        this.clearadhoc()
      },
      async addNewPickSession(){
        this.recommended_session_pick.push(...this.pick_sessions);
        await this.filterFees();
        this.$bvModal.hide("pick-session");
        this.pick_sessions = [];
      },
      createBase64Image(val){
         this.filesToUpload = [];
        const reader = new FileReader();
        reader.onload = (event) => {
            this.filesToUpload.push(event.target.result) 
        }
        reader.readAsDataURL(val);
    },
      uploadFile(event) {
        this.assessment_files = event.target.files[0];
      },
      async confirmUpload(){
        // console.log('assessment_files',this.assessment_files)
        // await this.createBase64Image(this.assessment_files);
      //   console.log('files',this.filesToUpload)
      //   console.log('object',object)
        
      //   const payload = {
      //     crb5c_name: 'Document test',
      //     crb5c_image: object,
      //  };

      //   const { data } = this.$store.state.axios.post(
      //     `/crb5c_fowdocuments`,payload);
      //   console.log(data)
        
        let image_id = 'bc356540-ae74-ee11-8179-000d3a85d02d'

        let paramObj = {
          $filter: `crb5c_fowdocumentid eq '${image_id}'`,
        };
        let params = new URLSearchParams(paramObj);
        let { data: data2 } = await this.$store.state.axios.get(
          `crb5c_fowdocuments/?${params.toString()}`
        );
        let val = data2.value[0];
        console.log('form data',val.crb5c_image);
      },
      addfile(){
        this.$bvModal.show("confrimationModal");
      },
      async removePickedSession(id){
        if (this.applicableFeeTotal.length) {
          alert('Un-check any "Applicable Sessions" before removing session')
          return;
        }
        this.recommended_session_pick = this.recommended_session_pick.filter((_, index) => index !== id)
        await this.filterFees();
      },
      async removeSession(id){
        this.gotIndividualFee = false
        this.gotGroupFee = false
        this.checkCenter=false
        this.checkResidence=false
        this.checkZoom=false
        this.sessions = this.sessions.filter((_, index) => index !== id);
        await this.filterFees();

      },
      // getImage(){
      //   this.signatureImg = this.$refs.handWrite.toDataURL();
      //   this.submitassessment();
      // },
      firstSesDay(date){
        return date ? dayjs(this.firSession).format('dddd') : 'None';
      },
      secondSesDay(date){
        return date ? dayjs(this.secSession).format('dddd') : 'None';
      },
      checkdsgsubsidy(val){
        if((val) && this.subs1 && this.subs1val && this.dsgsubsidy == '$'){
            return this.subs1val;
          }
        if ((val) && this.subs1 && this.subs1val && this.dsgsubsidy == '%') {
            return (val) * this.subs1val/100;
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
        this.CIPtotal();
      },
      removeDSGOffDay(id){
        this.dsgOffDay.listDay = this.dsgOffDay.listDay.filter(item => item.id !== id);
        this.CIPtotal();
  
      },
      formatDSFOffDayContent(dateParent){
        const getDayNameBasedOnDate = (dateChild) => {
          const listNameDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          return listNameDay.at(dayjs(dateChild).day());
        }
        return `${this.formatDatePublicHoliday(dateParent)} - ${getDayNameBasedOnDate(dateParent)}`;
      },
      async CIPtotal(){
        let day1count = 0;
        let day2count = 0;

        if (this.firSession) {
            const day1OfWeekToCount = dayjs(this.firSession).day();
            const day2OfWeekToCount = dayjs(this.secSession).day();
            const endoftheMonth = dayjs().endOf('month');

            for (let i = dayjs(this.firSession); i.isSameOrBefore(endoftheMonth, 'day') ; i = i.add(1, 'day')) {
              if (i.day() === day1OfWeekToCount) {
                day1count++;
              }
            }

            for (let i = dayjs(this.secSession); i.isSameOrBefore(endoftheMonth, 'day') ; i = i.add(1, 'day')) {
              if (i.day() === day2OfWeekToCount) {
                day2count++;
              }
            }

            console.log(`There are ${day1count} ${dayjs(this.firSession).format('dddd')}s and ${day2count} ${dayjs(this.secSession).format('dddd')}s`);
          }

          // console.log('public holiday',this.listPublicHolidayCurrentMonth)
          // console.log('dsg off', this.dsgOffDay)

          let offDayList = [];
          if (this.listPublicHolidayCurrentMonth || this.dsgOffDay.listDay.length) {

            for (let index = 0; index < this.dsgOffDay.listDay.length; index++) {
              offDayList.push(dayjs(this.dsgOffDay.listDay[index].date).day())
            }
            console.log('offDayList',offDayList)
          }

          if (offDayList.length) {
            for (let i = 0; i < offDayList.length; i++) {
            console.log('offDayList[i]',offDayList[i])
            console.log('first',dayjs(this.firSession).day())
            // console.log('second',dayjs(this.secSession).day())
            if (offDayList[i] === dayjs(this.firSession).day()) {
              day1count--;
            }
            else if (offDayList[i] === dayjs(this.secSession).day()) {
              day2count--;
            }
          }
          }
          
          const totalDay = day1count + (day2count ? day2count : 0);
          this.totalforCIP = this.fees4val * (totalDay);
          this.CIPdays = totalDay;
          console.log('day 1, day 2',day1count,day1count)


        // if (this.firSession)  {
        //   let day = 0;   
        //   let day2 = 0;
  
        //   const publicHolidayCount = {
        //     copylistPublicHolidayCurrentMonthOne: this.listPublicHolidayCurrentMonth,
        //     copylistPublicHolidayCurrentMonthTwo: this.listPublicHolidayCurrentMonth,
        //     day1: 0,
        //     day2: 0,
        //   };
  
        //   const dsgOffDayCount = {
        //     copylistDSGOffday: this.dsgOffDay.listDay.map(({date}) => ({date})),
        //     day: 0,
        //   }
  
        //   const setAgainCopylistDSGOffday = () => {
        //     dsgOffDayCount.copylistDSGOffday = this.dsgOffDay.listDay.map(({date}) => ({date}));
        //   }
  
        //   const calculatePublicHoliday = (day, whatDayIndex) => {
        //     if(publicHolidayCount.copylistPublicHolidayCurrentMonthOne && publicHolidayCount.copylistPublicHolidayCurrentMonthTwo){
        //       const listDate = day === '1' ? publicHolidayCount.copylistPublicHolidayCurrentMonthOne : publicHolidayCount.copylistPublicHolidayCurrentMonthTwo;
        //       const dayIncluded = listDate.filter(item => dayjs(item.date).day() === whatDayIndex);
        //       if(dayIncluded.length !== 0){
        //         if(day === '1'){
        //           publicHolidayCount.day1++
        //         }
        //         if(day === '2'){
        //           publicHolidayCount.day2++
        //         }
        //       }
        //       if(day === '1'){
        //         publicHolidayCount.copylistPublicHolidayCurrentMonthOne = listDate.filter(item => item === dayIncluded);
        //       }
        //       if(day === '2'){
        //         publicHolidayCount.copylistPublicHolidayCurrentMonthTwo = listDate.filter(item => item === dayIncluded);
        //       }
        //     }
        //   }
  
        //   const calculateDSGOffday = (whatDayIndex) => {
        //     if(dsgOffDayCount.copylistDSGOffday.length){
        //       if(dsgOffDayCount.copylistDSGOffday.every(item => item.date !== null)){
        //         const listDate = dsgOffDayCount.copylistDSGOffday;
        //         const dayIncluded = listDate.filter(item => dayjs(item.date).day() === whatDayIndex); 
        //         if(dayIncluded.length !== 0){
        //           dsgOffDayCount.day++
        //         }
        //         dsgOffDayCount.copylistDSGOffday = listDate.filter(item => dayjs(item.date).day() !== whatDayIndex);
        //       }
        //     }
        //   }
  
        //   let whatday = dayjs(this.firSession).day();
        //   let whatday2 = dayjs(this.secSession).day();
        //   const startDate = new Date(dayjs(this.firSession).format('MM-DD-YYYY'));
        //   const endDate = new Date(dayjs(this.firSession).endOf('month').format('MM-DD-YYYY'));
        //   let loop = new Date(startDate);
  
        //   while (loop <= endDate) {
        //     if (loop.getDay() === whatday) {
        //       day++;
        //     }
  
        //     calculatePublicHoliday('1', whatday);
        //     calculateDSGOffday(whatday);
  
        //     let newDate = loop.setDate(loop.getDate() + 1);
        //     loop = new Date(newDate);
        //   }
  
        //   setAgainCopylistDSGOffday();
  
        //   const startDate2 = new Date(dayjs(this.secSession).format('MM-DD-YYYY'));
        //   const endDate2 = new Date(dayjs(this.secSession).endOf('month').format('MM-DD-YYYY'))
        //   let loop2 = new Date(startDate2);
  
        //   console.log('loop2:', loop2, 'endDate2:', endDate2)
        //   while (loop2 <= endDate2) {
        //     console.log('inside loop2....');
        //     if (loop2.getDay() === whatday2) {
        //       day2++;
        //     }
  
        //     calculatePublicHoliday('2', whatday2);
        //     calculateDSGOffday(whatday2);
  
        //     let newDate = loop2.setDate(loop2.getDate() + 1);
        //     loop2 = new Date(newDate);
        //   }
  
        //   const totalDay = day + day2 - (publicHolidayCount.day1 || 0) - (publicHolidayCount.day2 || 0) - (dsgOffDayCount.day || 0);
        //   this.totalforCIP = this.fees4val * (totalDay);
        //   this.CIPdays = totalDay;
        // }
      
      },
      filterFees() {
        this.filterTypeValues = [];

        for (let i = 0 ; i < this.sessions.length; i++){
          if (this.sessions[i].type == 'Group' && this.sessions[i].location=="Center" && this.subs2){
            this.filterTypeValues.push(4)
            return;
          } 
          if (this.sessions[i].type == 'Group' && this.sessions[i].location=="Center"){
            this.filterTypeValues.push(0)
          } 
          else if (this.sessions[i].type == 'Individual' && this.sessions[i].location=="Center"){
            this.filterTypeValues.push(1)
          } 
          else if (this.sessions[i].type == 'Individual' && this.sessions[i].location=="Residence"){
            this.filterTypeValues.push(2)
          } 
          else if (this.sessions[i].type == 'Individual' && this.sessions[i].location=="Video-Call"){
            this.filterTypeValues.push(3)
          } 
        }

        for (let i = 0 ; i < this.recommended_session_pick.length; i++){
          if (this.recommended_session_pick[i].crb5c_sessiontype === 0 && this.subs2){
            this.filterTypeValues.push(4)
            return;
          } 
          if (this.recommended_session_pick[i].crb5c_sessiontype === 0){
            this.filterTypeValues.push(0)
          } 
          else if (this.recommended_session_pick[i].crb5c_sessiontype === 1){
            this.filterTypeValues.push(1)
          } 
          else if (this.recommended_session_pick[i].crb5c_sessiontype === 2){
            this.filterTypeValues.push(2)
          } 
          else if (this.recommended_session_pick[i].crb5c_sessiontype === 3){
            this.filterTypeValues.push(3)
          } 
        }

        this.filterTypeValues = [...new Set(this.filterTypeValues)];
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
      async addmethod(option) {
        if (option == 1) {
          this.$bvModal.show("add-session");
        }
        else{
          let data = await this.getSessionScheduleinform();
          this.schedule_info = data;
          this.schedule_info.sort((a, b) => a.crb5c_day - b.crb5c_day)
          // console.log('schedule_info',this.schedule_info)
          this.$bvModal.show("pick-session");
        }
        
      },
      async addNew() {
        let testobj={type: this.typeses,
          day: this.day,
          time: this.time,
          location: this.location,
          name: this.newSessionTitle,
          duration: this.newDuration,
          dementiaLevel: this.newDementiaType,
          sessionType: this.newSessionType,}
        console.log(testobj);
        if(!this.typeses || !this.day || !this.time || !this.location || !this.newSessionTitle || !this.newDuration || this.newSessionType == null || this.newDementiaType==null){
          alert('Please fill up all the inforation for the new session')
          return;
        }
  
         this.sessions.push({
          type: this.typeses,
          day: this.day,
          time: this.time,
          location: this.location,
          name: this.newSessionTitle,
          duration: this.newDuration,
          dementiaLevel: this.newDementiaType,
          sessionType: this.newSessionType,
        });
  
        await this.filterFees();
  
        this.typeses= false;
        this.day=false;
        this.time=false;
        this.location= false;
        this.newSessionTitle = '';
  
        this.$bvModal.hide("add-session");
  
      },
      groupingSessionRecommended(){
        // TODO: grouping session recommended after ended
      },
      async getdatainform(){
        const clientId = this.$store.state.assessment_client_id;
        let paramObj = {
          $select:'crb5c_no,crb5c_nricno,crb5c_citizenship',
          $expand:"crb5c_fow_caregiver_client_crb5c_FOW_Cust($select=crb5c_name,crb5c_contactnumbermobile,crb5c_relationship,crb5c_email)",
          $filter: `crb5c_fow_customerid eq '${clientId}'`,
          };
        let params = new URLSearchParams(paramObj);
        let { data: data } = await this.$store.state.axios.get(
          `crb5c_fow_customers/?${params.toString()}`
          );
        // console.log('data',data)
        this.clientdata = data.value[0];
        this.caregiverClientIc = this.clientdata.crb5c_nricno;
        this.caregiverClientName = this.clientdata.crb5c_no;
        this.caregiverDetails = this.clientdata.crb5c_fow_caregiver_client_crb5c_FOW_Cust;
        // console.log('caregiver data',this.caregiverDetails);
        await this.getProgrammeInfos();

      },
      async getSessionScheduleinform(){
        let paramObj = {
          $select:'crb5c_session_id,crb5c_sessionreporttype,crb5c_sessiontype,crb5c_day,crb5c_duration,crb5c_time,crb5c_time_hrs,crb5c_time_mins,crb5c_session_time_choice',
          $filter:'crb5c_isactive eq true',
          };
        let params = new URLSearchParams(paramObj);
        let { data: data } = await this.$store.state.axios.get(
          `crb5c_fow_session_schedules/?${params.toString()}`
          );
        return data.value;
      },
      async getProgrammeInfos(){
          let paramObj = {
            $select:'crb5c_programmename,crb5c_price,crb5c_type',
          };
          let params = new URLSearchParams(paramObj);
          try {
            let { data } = await this.$store.state.axios.get(
            `crb5c_fowprogrammes/?${params.toString()}`
            );
            if (data) {
              this.programmeInfos = data.value;
              this.programmeInfos.sort((a, b) => a.crb5c_programmename.localeCompare(b.crb5c_programmename))
            }
            else{
              console.log('No programmes retrieved')
            }
          } catch (error) {
            console.error('Error fetching programme', error)
          }
          
          // console.log('programme data',this.programmeInfos);
    },
    async getImagesInfos(){
          let id = '9d8fc0b8-157f-ee11-8179-002248ecdc58';
          let paramObj = {
            $select:'crb5c_dsgsignature,crb5c_caregiversignature',
            $filter: `crb5c_fowserviceagreementid eq '${id}'`,
          };
          let params = new URLSearchParams(paramObj);
          let { data } = await this.$store.state.axios.get(
            `crb5c_fowserviceagreements/?${params.toString()}`
          );
          this.imagesSign = data.value;
          console.log('this.imagesSign',this.imagesSign)
          
          // console.log('programme data',this.programmeInfos);
        },
    async getDsgHoliday(){
          let paramObj = {
            $select:'crb5c_date,crb5c_name',
          };
          let params = new URLSearchParams(paramObj);
          let { data } = await this.$store.state.axios.get(
            `crb5c_fowcalendars/?${params.toString()}`
          );
          return data.value;
          // console.log('programme data',this.programmeInfos);
      },
      clearCanvas(val){
        this.$refs[val].clear();
      },
      // showConfimrationModal(){
      //   // this.$bvModal.show("confrimationModal");
      // },
      async linkClientProgramme(){
        for(let programme of this.applicableFeeTotal ){
          let payload = { 
            "crb5c_Client@odata.bind": `/crb5c_fow_customers(${this.$store.state.assessment_client_id})`, 
            "crb5c_Programme@odata.bind": `/crb5c_fow_customers(${programme.crb5c_fowprogrammeid})`,
          }
          const { data } = await this.$store.state.axios.post(`/crb5c_fowclientandprogrammes`,payload);
          console.log('client and programme linked', data)
        }
      },
      async submitServiceAgreement(){
        this.caregiverSignatureImg = this.$refs.caregiverSignature.toDataURL().split(',')[1];
        this.staffSignatureImg = this.$refs.staffSignature.toDataURL().split(',')[1];

        const payload1 = { 
          crb5c_caregivername: this.caregiverName,
          crb5c_clientname : this.caregiverClientName,
          crb5c_clientic: this.caregiverClientIc,
          crb5c_relationship: this.caregiverRelationship,
          crb5c_caregiversignature: this.caregiverSignatureImg,
          crb5c_clientid: this.$store.state.assessment_client_id,
       };
        const { data } = await this.$store.state.axios.post(`/crb5c_fowserviceagreements`,payload1);
        console.log('main',data)
        let id = data.crb5c_fowserviceagreementid

        await this.signatureUploadforStaff(id);
        await this.triggerPDFView();
        await this.uploadAssessmentFullPDF();
        await this.uploadServiceAgreement();

        this.loadingSubmission = false;
        this.$bvModal.hide('paymentConfirmation');

        setTimeout(() => {
          this.$bvModal.hide('assessmentSubmission');
          this.sessionAutomation();
        }, 6000);



      },
      triggerPDFView(){
        this.notPDFview = false;
      },
      async signatureUploadforStaff(id){
        const payload2 = { 
          crb5c_dsgsignature: this.staffSignatureImg,
        };
        const { data2 } = await this.$store.state.axios.patch(`/crb5c_fowserviceagreements(${id})`,payload2);
        console.log('patching image 2',data2)
      },
      async uploadServiceAgreement(){
        const options = {
          margin: 1, 
        };
        let el = this.$refs.pdfFormView;
        const pdf = await html2pdf().from(el).set(options).outputPdf();
        const base64 = btoa(pdf);
        this.pdfAgreement = base64;
          
        const payloadPdf = {
          documentbody: this.pdfAgreement,
          subject: this.$store.state.assessment_client_id,
          filename: 'Service Agreement (Assessment)',
        }
        const { pdfSuccsess } = await this.$store.state.axios.post(`/annotations`,payloadPdf);
        console.log('service agreeement',pdfSuccsess)
      },
      async uploadAssessmentFullPDF(){
        const options = {
          margin: 2, 
        };
        let elementPage = this.$refs.pdfWholePage;
        const pdfFull = await html2pdf().from(elementPage).set(options).outputPdf();
        const base64Full = btoa(pdfFull);
        this.pdfFullPage = base64Full;
        // console.log('this.pdfFullPage',this.pdfFullPage)
        const payloadAssessmentPdf = {
        documentbody: this.pdfFullPage,
        subject: this.$store.state.assessment_client_id,
        filename: 'Assessment Full',
        }
        const { pdfSuccsess } = await this.$store.state.axios.post(`/annotations`,payloadAssessmentPdf);
        console.log('Assessment',pdfSuccsess)
      },
      async submitassessment(){

        if (!this.adm) {
          alert('Please fill up the admission date before proceeding!') 
          return
        }

        this.loadingSubmission = true;
        this.$bvModal.show("assessmentSubmission");
        this.totalscoreMoca = this.totalscore;
        this.totalscoreEq = this.eq5dcounter;
    
        const payload = { 
          crb5c_typeofdementia: this.type,
          crb5c_stageofdementia: this.stageof,
          // crb5c_latestscoreon: this.latestscore,
          // crb5c_latestscorevalue: (this.latestscore == 'MOCA') ? this.totalscoreMoca : this.latest,
          crb5c_datedone: this.date,
          crb5c_sharedcentreobjectivesprogramme: this.checker ? true : false,
          crb5c_watchedcentrevideo: this.checker2  ? true : false,
          crb5c_playedtabletopgame: this.checker3  ? true : false,
          crb5c_playedneeurofitgame: this.neeuro  ? true : false,
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
          crb5c_neeurofitattentiongame: this.attentionObj.attentiongame,
          crb5c_neeurofitattentionlevel: parseInt(this.attentionObj.attentionlevel),
          crb5c_neeurofitspatialgame: this.spatialObj.spatialgame,
          crb5c_neeurofitspatiallevel: parseInt(this.attentionObj.attentionlevel),
          crb5c_neeurofitdecisiongame: this.decisionObj.decisiongame,
          crb5c_neeurofitdecisionlevel: parseInt(this.decisionObj.decisionlevel),
          crb5c_neeurofitmemorygame: this.memoryObj.memorygame,
          crb5c_neeurofitmemorylevel: parseInt(this.memoryObj.memorylevel),
          crb5c_neeurofitflexibilitygame: this.flexibilityObj.flexibilitygame,
          crb5c_neeurofitflexibilitylevel: parseInt(this.flexibilityObj.Flexibilitylevel),
          crb5c_orientation: this.vis16.length,
          crb5c_delayedrecall: this.delayedrecall,
          crb5c_fluency: this.checkfluency,
          crb5c_drawclock: this.vis3.length,
          crb5c_languageversion: this.language,
          crb5c_modeofpayment: this.modeofpayment,
          crb5c_amountcollected: '$' + this.viewamtcollect.toFixed(2),
          crb5c_educationyear: this.selectedyear,
          crb5c_mocaform: this.checker4 ? true : false,
          crb5c_eq5d5lform: this.checker5 ? true : false,
          crb5c_admissiondate:  this.adm ? dayjs(this.adm).toISOString(): null,
          crb5c_referenceid: this.referenceid,
          crb5c_dateofassessment: dayjs(this.$store.state.assessment_date).toISOString(),
          crb5c_mocascore: (this.isMOCA) ? this.mocaVal : 0,
          crb5c_amtscore: (this.isAMT) ? this.amtVal : 0,
          crb5c_mmsescore: (this.isMMSE) ? this.mmseVal : 0,
          crb5c_cip1stsession:  this.firSession ? dayjs(this.firSession).toISOString(): null,
          crb5c_cip2ndsession: this.secSession ? dayjs(this.secSession).toISOString(): null,
          crb5c_additionalfee: parseInt(this.transport.amountToBePaid),
          crb5c_refundabledeposit: parseInt(this.refundableDeposit),
          // crb5c_onetimeassessmentother: this.,
          crb5c_neeurofitsubscription: this.neeurofitFeeTotal ? 1 : 0,
          // crb5c_onetimeassessmentpaid: ,
          // crb5c_onetimeassessmentwaived: ,
          crb5c_neeurofitamount: this.isCipSelected ? 0 : parseInt(this.neeurofitFeeTotal) ,
          crb5c_meanstestresult: parseInt(this.subsidyAmount),
          crb5c_transporttotal: parseInt((this.transport.fixedFee * (1 - ((this.subsidyAmount ?? 0) / 100))).toFixed(2)),
          crb5c_transportincluded: this.transport.isIncluded ? 1 : 0,
          crb5c_toteboardincluded: this.subs2 ? 1 : 0,
          crb5c_cip1stsessionformat: this.firstSesFormat,
          crb5c_cip2ndsessionformat: this.secondSesFormat,
          crb5c_recommendedsessions: this.getRecSessions(this.recommended_session_pick),
          crb5c_applicablesessions: this.getApplicable(this.applicableFeeTotal),
          // crb5c_feeinfo: this.getFeeInfo(this.selectedProgrammeSummary),
        };
          console.log('payload',payload)
          const { data } = await this.$store.state.axios.post(
            `/crb5c_fowassessmentforms`,payload);
          console.log('data',data)
          await this.linkClientProgramme();
          await this.submitServiceAgreement();
          await this.generateEmail();

          this.clearLocalStorage();
        
    },
    async sessionAutomation(){
      this.AutoMatchingSession()
    },
      pick_answer_naming(val){
        if(this[`vis${val}`] == '0'){
            this[`vis${val}`] = '1';
            return;
        }
          this[`vis${val}`] = '0';
      },
      // checkSubsidy(){
      //   console.log("running")
      // },
      checkDistanceTransport(){
        if(!this.transport.startPostalCode || !this.transport.destinationPostalCode){
          alert('Please specify start and destination postal code');
          return;
        }

        if(this.transport.startPostalCode.length !== 6 || this.transport.destinationPostalCode.length !== 6){
          alert('Please enter valid postal code');
          return;
        }

        console.log(this.transport.startPostalCode);
        console.log(this.transport.destinationPostalCode);

        this.transport.iframeSrc = `https://maps.google.com/maps?saddr=Singapore ${this.transport.startPostalCode}&daddr=Singapore ${this.transport.destinationPostalCode}&ie=UTF8&output=embed&mode=driving`;

      },
      async getAndSetClientTransportPostalCode(){
        try {
          const clientId = this.$store.state.assessment_client_id;
          const paramObj = {
            $select:'crb5c_postcode',
            $filter: `crb5c_fow_customerid eq '${clientId}'`,
          };
          const params = new URLSearchParams(paramObj);

          if(!this.$store.state?.axios?.get){
            return null;
          }

          const { data } = await this.$store.state.axios.get(
            `crb5c_fow_customers/?${params.toString()}`
          );
          const postalCode = data.value[0].crb5c_postcode;
          console.log('Client postal code: ', postalCode);

          return postalCode;
          
        } catch (error) {
          console.error(error);

          return null;
        }

      }
    },
    watch: {
      //------------------ SAVE TO LOCAL STORAGE ------------------//
      type(val){
        this.assessmentDataChange({
          typeOfDementia: val,
        });
      },
      stageof(val){
        this.assessmentDataChange({
          stageOfDementia: val,
        });
      },
      isAMT(val){
        this.assessmentDataChange({
          isAMT: val,
        });
      },
      amtVal(val){
        this.assessmentDataChange({
          amtVal: val,
        });
      },
      isMOCA(val){
        this.assessmentDataChange({
          isMOCA: val,
        });
      },
      mocaVal(val){
        this.assessmentDataChange({
          mocaVal: val,
        });
      },
      isMMSE(val){
        this.assessmentDataChange({
          isMMSE: val,
        });
      },
      mmseVal(val){
        this.assessmentDataChange({
          mmseVal: val,
        });
      },
      date(val){
        this.assessmentDataChange({
          dateDoneInHospital: val,
        });
      },
      //-- general
      checker(val){
        this.assessmentDataChange({
          generalCheckerOne: val,
        });
      },
      checker2(val){
        this.assessmentDataChange({
          generalCheckerTwo: val,
        });
      },
      checker3(val){
        this.assessmentDataChange({
          generalCheckerThree: val,
        });
      },
      //-- general
      //-- games & surveys
      //-- Neeurofit
      neeuro(val){
        this.assessmentDataChange({
          isNeeuroFitBrainTrainingGame: val,
        });
      },
      atten(val){
        this.assessmentDataChange({
          atten: val,
        });
      },
      attentionObj: {
        handler(val){
          this.assessmentDataChange({
            attentionObj: val,
          });
        },
        deep: true,
      },
      spatial(val){
        this.assessmentDataChange({
          spatial: val,
        });
      },
      spatialObj: {
        handler(val){
          this.assessmentDataChange({
            spatialObj: {
              ...val
            },
          });
        },
        deep: true,
      },
      decision(val){
        this.assessmentDataChange({
          decision: val,
        });
      },
      decisionObj:{
        handler(val){
          this.assessmentDataChange({
            decisionObj: val,
          });
        },
        deep: true,
      },
      memory(val){
        this.assessmentDataChange({
          memory: val,
        });
      },
      memoryObj: {
        handler(val){
          this.assessmentDataChange({
            memoryObj: val,
          });
        },
        deep: true,
      },
      flexibility(val){
        this.assessmentDataChange({
          flexibility: val,
        });
      },
      flexibilityObj: {
        handler(val){
          this.assessmentDataChange({
            flexibilityObj: val,
          });
        },
        value: true,
      },

      //-- Neeurofit
      //-- MOCA Form
      language(val){
        this.assessmentDataChange({
          language: val,
        });
      },
      // edulev(val){
      //   this.assessmentDataChange({
      //     edulev: val,
      //   });
      // },
      // unyearSelected(val){
      //   this.assessmentDataChange({
      //     unyearSelected: val,
      //   });
      // },
      // ovyearSelected(val){
      //   this.assessmentDataChange({
      //     ovyearSelected: val,
      //   });
      // },
      vis1(val){
        this.assessmentDataChange({
          vis1: val,
        });
      },
      vis2(val){
        this.assessmentDataChange({
          vis2: val,
        });
      },
      vis3(val){
        this.assessmentDataChange({
          vis3: val,
        });
      },
      vis4(val){
        this.assessmentDataChange({
          vis4: val,
        });
      },
      vis5(val){
        this.assessmentDataChange({
          vis5: val,
        });
      },
      vis6(val){
        this.assessmentDataChange({
          vis6: val,
        });
      },
      vis7(val){
        this.assessmentDataChange({
          vis7: val,
        });
      },
      vis8(val){
        this.assessmentDataChange({
          vis8: val,
        });
      },
      vis9(val){
        this.assessmentDataChange({
          vis9: val,
        });
      },
      vis10(val){
        this.assessmentDataChange({
          vis10: val,
        });
      },
      vis11(val){
        this.assessmentDataChange({
          vis11: val,
        });
      },
      vis18(val){
        this.assessmentDataChange({
          vis18: val,
        });
      },
      vis13(val){
        this.assessmentDataChange({
          vis13: val,
        });
      },
      vis14(val){
        this.assessmentDataChange({
          vis14: val,
        });
      },
      vis15(val){
        this.assessmentDataChange({
          vis15: val,
        });
      },
      vis16(val){
        this.assessmentDataChange({
          vis16: val,
        });
      },
      //-- MOCA Form
      //-- EQ5D5L Form
      checker5(val){
        this.assessmentDataChange({
          isEQ5D5Lform: val,
        });
      },
      eq1(val){
        this.assessmentDataChange({
          eq1: val,
        });
      },
      eq2(val){
        this.assessmentDataChange({
          eq2: val,
        });
      },
      eq3(val){
        this.assessmentDataChange({
          eq3: val,
        });
      },
      eq4(val){
        this.assessmentDataChange({
          eq4: val,
        });
      },
      eq5(val){
        this.assessmentDataChange({
          eq5: val,
        });
      },
      healthscale(val){
        this.assessmentDataChange({
          healthscale: val,
        });
      },
      //-- EQ5D5L Form
      //-- games & surveys
      
      checking(val){
        this.assessmentDataChange({
          checking: val,
        });
      },

      //-- fee & payment
      subsidy(val){
        this.assessmentDataChange({
          subsidy: val,
        });
      },
      //-- DSG
      subs1(val){
        this.assessmentDataChange({
          subs1: val,
        });
      },
      subs1val(val){
        this.assessmentDataChange({
          subs1val: val,
        });
      },
      dsgsubsidy(val){
        this.assessmentDataChange({
          dsgsubsidy: val,
        });
      },
      //-- DSG
      //-- Toteboard
      // subs2(val){
      //   this.assessmentDataChange({
      //     subs2: val,
      //   });
      // },
      // subsidyAmount(val){
      //   this.assessmentDataChange({
      //     subsidyAmount: val,
      //   });
      // },
      //-- Toteboard
      //-- fee & payment

      //-- Transport Included
      // transport: {
      //   handler(val){
      //     this.assessmentDataChange({
      //       transport: {
      //         ...val
      //       },
      //     });
      //   },
      //   deep: true,
      // },
      //-- Transport Included


      recommended_session_pick(val){
        this.assessmentDataChange({
          recommended_session_pick: val,
        });
      },
      applicableFeeTotal(val){
        this.assessmentDataChange({
          applicableFeeTotal: val,
        });
      },
      dsgOffDay: {
        handler(val){
          this.assessmentDataChange({
            dsgOffDay: {
              ...val,
            },
          });
        },
        deep: true,
      },
      adHocFeeTotal(val){
        this.assessmentDataChange({
          adHocFeeTotal: val,
        });
      },

      // //---- Service Agreement Form
      // clientReationship(val){
      //   this.assessmentDataChange({
      //     clientReationship: val,
      //   });
      // },
      // caregiverClientName(val){
      //   this.assessmentDataChange({
      //     caregiverClientName: val,
      //   });
      // },
      // caregiverClientIc(val){
      //   this.assessmentDataChange({
      //     caregiverClientIc: val,
      //   });
      // },
      // serviceAgreementContact(val){
      //   this.assessmentDataChange({
      //     serviceAgreementContact: val,
      //   });
      // },
      // serviceAgreementDate(val){
      //   this.assessmentDataChange({
      //     serviceAgreementDate: val,
      //   });
      // },
      // //---- Service Agreement Form

      //------------------ SAVE TO LOCAL STORAGE ------------------//
        secSession(val){
          if(val){
            this.CIPtotal();
          }

          this.assessmentDataChange({
            secSession: val,
          });
        },
        caregiverPicked(val) {
          const caregiver = this.caregiverDetails.find(c => c.crb5c_fow_caregiverid === val.crb5c_fow_caregiverid);
          if (caregiver) {
            // console.log('caregiver',caregiver)
            this.clientReationship = caregiver.crb5c_relationship || '';
            this.serviceAgreementContact = caregiver.crb5c_contactnumbermobile || '';
            this.serviceAgreementEmail = caregiver.crb5c_email || '';
            this.serviceAgreementName = caregiver.crb5c_name || '';
          } else {
            this.clientReationship = '';
            this.serviceAgreementContact = '';
          }
          // this.assessmentDataChange({
          //   caregiverPicked: val,
          // });
        },
      newSessionType(val){
        switch (val) {
          case 0:
            this.location =  'Center'
            break;
          case 1:
            this.location = 'Center'
            break;
          case 2:  
            this.location = 'Residence'
            break;
          case 3:
            this.location = 'Video-Call'
            break;
        }
      },
      firSession(val){
        if (val) {
          this.adm = val;
          this.CIPtotal();
        }

        this.assessmentDataChange({
          firSession: val,
        });
      },
      checker4(val){
        if (val) {
          this.additionalFeeTotal.push(this.additionalFees.one_time.price)
        }
        this.assessmentDataChange({
          isMocaForm: val,
        });
      },
      isCipSelected:{
        deep: true,
        handler: function (val) {
          if(!val){
          this.totalforCIP = 0;
          this.CIPday = 0;
        }
        }
      },
      totalscore(value){
        if (value >= 18 && this.ovyearSelected) {
          console.log('moca:',this.totalscoreMoca,this.ovyearSelected )
          this.neeurofitFeeTotal = this.neeuroFitFees;
          this.neeuroFitAuto = true;
        }
        
      },
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

        this.assessmentDataChange({
          subsidyAmount: value,
        });
      },
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

        this.assessmentDataChange({
          edulev: value,
        });
      },
      unyearSelected(value) {
        if (value === true) {
          this.ovyearSelected = false;
          this.unpoint = 1;
        } else {
          this.unpoint = 0;
        }

        this.assessmentDataChange({
          unyearSelected: value,
        });
      },
      ovyearSelected(value) {
        if (value === true) {
          this.unyearSelected = false;
        }

        this.assessmentDataChange({
          ovyearSelected: value,
        });
      },

      typeses(value){
        if(value == 'Group'){
          this.location = 'Center';
        }
      },
      subs2(value){
        if(!value){
          this.subsidyAmount = null;
          this.transport.isIncluded = false;
          this.filterFees();
        }
        else{
          this.filterTypeValues = [];
          this.filterTypeValues.push(4)
        }

        this.assessmentDataChange({
          subs2: value,
        });
      },
      // isCIP(value){
      //   if(!value){
      //     this.totalGST = this.totalGST.filter(item => item !== '240');
      //   }else{
      //     this.totalGST.push('240');
      //   }
      // },
      transport: {
        async handler(value){
          if(value.isIncluded){
            if(!value.startPostalCode){
              this.transport.startPostalCode = await this.getAndSetClientTransportPostalCode();
              return;
            }
          }

          if(!value.isIncluded){
            this.transport.amountToBePaid = null;
          }

          this.assessmentDataChange({
            transport: {
              ...value,
            },
          });

        },
        deep: true,
      },

    },
    computed: {
      // axiosReady(){
      //   if (this.$store.state.axios) {
      //     return true;
      //   }
      //   else{
      //     return false;
      //   }
      // },
      CipPrgrammeSummary(){
        let programmeName = [];

        if (this.CIPdays) {
          for( let programme of this.applicableFeeTotal ){
          if(programme.crb5c_type === 4){
            programmeName.push({name: programme.crb5c_programmename, quantity: this.CIPdays, cost: programme.crb5c_price, isCip: true})
          }
        }
        }
        if(this.transport.isIncluded){
          programmeName.push({name: 'Transport Fee', quantity: this.CIPdays, cost: (this.transport.fixedFee * (1 - ((this.subsidyAmount ?? 0) / 100))).toFixed(2) })
        }
        if(this.transport.amountToBePaid){
          programmeName.push({name: 'Additional Transport Fee', quantity: this.CIPdays, cost: this.transport.amountToBePaid })
        }
        
        return  programmeName;
      },
      selectedProgrammeSummary(){
        let programmeName = [];
        
        if (this.applicableFeeTotal.length) {
          for( let programme of this.applicableFeeTotal ){
          if(programme.crb5c_type === !4){
            programmeName.push({name: programme.crb5c_programmename, quantity: 1, cost: programme.crb5c_price, isCip: false})
          }
        }
        }
        if(this.neeurofitFeeTotal){
          if (this.neeuroFitAuto) {
            programmeName.push({name: ' NeeuroFIT 6 months subcription', quantity: 1, cost:'Included'})
          }
          else{
            programmeName.push({name: ' NeeuroFIT 6 months subcription', quantity: 1, cost:this.neeurofitFeeTotal})
          }
        }

        if (this.additionalFeeTotal.length) {
          programmeName.push({name: 'One-time Assessment', quantity: 1, cost:this.additionalFeeTotal[0]})
        }

         if (this.refundableFeeTotal) {
          programmeName.push({name: 'Refundable Deposit (No GST)', quantity: 1, cost:this.refundableDeposit, noGst: true})
        }

        if (this.subs1 && this.subs1val && this.dsgsubsidy) {
          if(this.subs1 && this.subs1val && this.dsgsubsidy == '$'){
            programmeName.push({name: 'DSG Subsidy DEDUCTED', quantity: 1, cost: '- $' + this.subs1val})
          }
        if (this.subs1 && this.subs1val && this.dsgsubsidy == '%') {
            programmeName.push({name: 'DSG Subsidy DEDUCTED', quantity: 1, cost: '- ' + this.subs1val+ ' %' })

          }
        } 
        if (this.adHocFeeTotal.length) {
          for( let adhoc of this.adHocFeeTotal){
            programmeName.push({name: adhoc.remark, quantity: 1, cost: adhoc.total })
          }
        }
        return programmeName;
      },
      // clientReationship(){
      //   let val = '';
      //   if(this.caregiverPicked){
      //     val = this.caregiverDetails.find(c => c.crb5c_fow_caregiverid === this.caregiverPicked)?.crb5c_relationship;
      //   }
      //   return val; 
      // },
      // autoSelectNeeuroFIt(){
      //   if (this.mocaVal) {
      //     if (this.mocaVal >= 18 && this.ovyearSelected) {
      //       this.neeurofitFeeTotal = this.neeuroFitFees;
      //     }
      //   }
      // },
      isAddButtonDisabled() {
        return this.pick_sessions.length === 0;
      },
      filteredChoice() {
        return this.schedule_info.filter(
          (option2) => !this.recommended_session_pick.some((option1) => option1.crb5c_fow_session_scheduleid === option2.crb5c_fow_session_scheduleid)
        );
      },
      transportTotalView(){
        if(this.transport.isIncluded){
          let total_amount = 0;
          total_amount = (this.transport.fixedFee * (1 - (this.subsidyAmount ?? 0) / 100)) + (this.transport.amountToBePaid ? + this.transport.amountToBePaid : 0);
          return total_amount;
        }
        return 0;
      },
      paynowString(){
          let qrcode = new PaynowQR({
              uen:'202111519KDSG', //Required: UEN of company
              amount : this.viewamtcollect.toFixed(2), //Specify amount of money to pay.
              refNumber: this.invoices[0].crb5c_id,  //Reference number for Paynow Transaction. Useful if you need to track payments for recouncilation.
              company:  'Dementia Singapore Ltd. - Acc 1', //Company name to embed in the QR code. Optional.               
            });
            return qrcode.output();
      },
      qroptions(){
          return{
              errorCorrectionLevel:"H",
              color:{
                  dark:"#7C1978"
              }
          }
      },
      is1stAM(){
        return this.firstSesFormat == 0 ? 'AM' : 'PM';
      },
      is2ndAM(){
        return this.secondSesFormat == 0 ? 'AM' : 'PM';
      },
      isCipSelected(){
        if(this.applicableFeeTotal.length) {
          for(let totalApplicable of this.applicableFeeTotal){
            if (totalApplicable.crb5c_type === 4) {
              return true;
            }
            return false
          }
        }
        return false
      },
      totalOfAdditional(){
        if (this.additionalFeeTotal.length) {
            let total_amount = 0;
            for(let totalAdditional of this.additionalFeeTotal){
                total_amount = total_amount + parseInt(totalAdditional);
              }
          return total_amount;
          }
          return 0;
      },
      totalOfNeeurofit(){          
          if(this.neeurofitFeeTotal){
            let total_amount = 0;
            total_amount = total_amount + this.neeuroFitFees ;
            return total_amount;
            
          }

          return 0;
      },
      totalofAddhoc(){
        if(this.adHocFeeTotal.length){
          let total_amount = 0;
          for(let adhoc of this.adHocFeeTotal){
            if (adhoc.isIncludeInFee) {
              total_amount = total_amount + parseInt(adhoc.total) ;
            }

          }
          return total_amount;
        }return 0;
      },
      totalOfApplicable(){
        if(this.applicableFeeTotal.length && this.applicableFeeTotal.length ) {
          let total_amount = 0;
          for(let totalApplicable of this.applicableFeeTotal){
            total_amount = total_amount + totalApplicable.crb5c_price;

          }
        return total_amount;
        }
        return 0;    
      },
      calculateCipCost(){
        return this.totalforCIP ? (this.totalforCIP)*1.09 : 0;
      },
      calculateCipCostNoGST(){
        return this.totalforCIP ? (this.totalforCIP) : 0;
      },
      filteredProgrammeInfos(){
        let filteredProgramme = []

        for (let type of this.filterTypeValues){
          filteredProgramme.push(...this.programmeInfos.filter((item) => {
          return item.crb5c_type === type;
          }))
        }
        return filteredProgramme;
      },
      viewamtcollectNoGST(){      
        let refundable = this.refundableFeeTotal ? this.refundableDeposit : 0;
        let GSTtotal = this.isCipSelected ? 0 :((this.totalOfAdditional + this.totalOfNeeurofit));
        let dsgsubsidiyval = this.checkdsgsubsidy((refundable + this.totalOfNeeurofit));
        let cipCost = this.calculateCipCostNoGST;

        let CIPAdditional = this.totalOfAdditional ? (this.totalOfAdditional) : 0;
        let addHocAdditional = this.totalofAddhoc ? (this.totalofAddhoc) : 0;

        const transportFee = this.transport.isIncluded ? (this.transport.fixedFee * (1 - (this.subsidyAmount ?? 0) / 100)) : 0;
        const transportAdditionalFee = this.transport.amountToBePaid ? +this.transport.amountToBePaid : 0;
        const totalTransportFeeWithGST = (transportFee + transportAdditionalFee);

        if (this.isCipSelected) {
          return (GSTtotal + cipCost + CIPAdditional + addHocAdditional) + (totalTransportFeeWithGST * this.CIPdays);
        }
        else{
          return (GSTtotal + cipCost + addHocAdditional + refundable - dsgsubsidiyval ) + (totalTransportFeeWithGST *  this.CIPdays);
        }

      },
      viewamtcollect(){      
        let refundable = this.refundableFeeTotal ? this.refundableDeposit : 0;
        let GSTtotal = this.isCipSelected ? 0 :((this.totalOfAdditional + this.totalOfNeeurofit) * this.GST);
        let dsgsubsidiyval = this.checkdsgsubsidy((refundable + this.totalOfNeeurofit * this.GST));
        let cipCost = this.calculateCipCost;

        let CIPAdditional = this.totalOfAdditional ? (this.totalOfAdditional*this.GST) : 0;
        let addHocAdditional = this.totalofAddhoc ? (this.totalofAddhoc * this.GST) : 0;

        const transportFee = this.transport.isIncluded ? (this.transport.fixedFee * (1 - (this.subsidyAmount ?? 0) / 100)) : 0;
        const transportAdditionalFee = this.transport.amountToBePaid ? +this.transport.amountToBePaid : 0;
        const totalTransportFeeWithGST = (transportFee + transportAdditionalFee) * this.GST;

        if (this.isCipSelected) {
          return (GSTtotal + cipCost + CIPAdditional + addHocAdditional) + (totalTransportFeeWithGST * this.CIPdays);
        }
        else{
          return (GSTtotal + cipCost + addHocAdditional + refundable - dsgsubsidiyval ) + (totalTransportFeeWithGST *  this.CIPdays);
        }

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
          return 'SG or PR';
        }
      },
      refundableDeposit(){
        if (this.totalOfApplicable) {
          return this.totalOfApplicable * 4;
        }
        return 0;
        
      },
      oneTimeOtherValue(){
        if(this.one_time_other_value){
          return this.one_time_other_value
        }
        return 0;
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

  // Remove input number Arrows/Spinners css
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  .container {
    border-radius: 10px;
    border: 1px solid rgb(142, 142, 142);
    background:#ffffff;
    padding: 2rem;
    margin: auto;
    display: block;
    justify-content: center;
    text-align: left;
  }
  
  .submitbtn{
    text-align: center;
    margin: 70px 0px 28px; 
  }

  .generateInvoice{
    text-align:left;
    margin-top: 60px;  
  }
  
  .sm-container {
    border-radius: 16px;
    border: 1px solid #ccc;
    padding: 1rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    // position: relative;
    // left: 30%;
    width: 160px;
    height: 8rem;
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

  .invoiceTotal{
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
  .payment-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
}

.qr-code-container {
  margin: 20px 0;
}

.background-container {
  background: linear-gradient(135deg, #ec3965, #972887);
  padding: 20px;
  border-radius: 10px;
  display: inline-block;
}
.logo-background {
  background-color: #ffffff;
  padding: 5px;
  border-radius: 5px;
  display: inline-block;
}
.paynow-logo-container {
  margin-top: 20px;
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
    /* margin-right: 3rem; */
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

  .timeEdit{
  background: rgba(255, 255, 255, 0);
  border: none;
  color: rgb(140, 63, 211);
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

  .delete_icon{
    font-size: 25px;
    margin-left: 15px;
    color: #e33838;
  }

  .large_icon{
    font-size: 150px;
    margin: 20px;
    color: #393939;
  }

  .sig-canvas {
        width: 80vh;
        height: 30vh;
        border-style: dotted;
        background-color: rgba(203, 203, 203, 0);
        border: solid 1px dotted rgb(172, 172, 172);
        border-radius: 5px;
    }
  
  .font_bold{
    font-weight: bold;
  }

  .addtional_fee{
    border: 1px Solid #e2e2e2;
    padding: 2vh;
    width: 100vh;
  }

  .modified_remark_input{
    border: 1px Solid #b5b5b5;
    width: 40vh;
  }

  .qr_code{
    width: 250px;
  }

  .checkboxSelection{
    border: 1.5px solid #d3d3d3;
    border-radius: 5px;
    padding: 25px;
    margin: 5px;
    height: 100px;
    width: 450px;
  }
  
  .checkboxSelectionSelected{
    border: 3px solid #b183d7;
    border-radius: 5px;
    padding: 25px;
    margin: 5px;
    height: 100px;
    width: 450px;
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
  .signatureView{
        width: 80vh;
        background-color: rgba(203, 203, 203, 0);
        border: solid 1px rgb(172, 172, 172);
        border-radius: 5px;
  }

  .text-center{
    text-align: center;
  }

  .confimrationBtn{
    width: 20vh;
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

  .btn-transparent{
    border: none;
    background: rgba(253, 253, 253, 0);
    color: black;
  }

  .icon-loader{
    font-size: 20vh;
  }

  .input-border-light{
    border: 1px Solid rgb(210, 210, 210);
  }

  .main-container{
    border: 1px Solid rgb(255, 255, 255);
  }


  </style>
  