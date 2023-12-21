<template lang="pug">
div
    //- div.progress.mb-4
    //-   div.progress-bar.progressbarstyle(role="progressbar" style="width: 100%;height:30px;position:fixed;z-index: 1;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100") 25%
    b-container.mt-2.mb-4
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
                    v-select(:options="game1" v-model="attentionObj.attentiongame")
                  .gap.col-sm-6
                    label(for="stageof" ) Finished Level:
                    v-select(:options="levels" v-model="attentionObj.attentionlevel")
              .gap.left 
                input#spat.checkbox_circle(type="checkbox" name="part2ins" v-model="spatial" value="spat")
                label.my-2.font_bold(for="spat") &nbsp;Spatial
                .row.px-5(v-show="spatial")
                  .gap.col-sm-6
                    label(for="stageof") Game Played:
                    v-select(:options="game2" v-model="spatialObj.spatialgame")
                  .gap.col-sm-6
                    label(for="stageof") Finished Level:
                    v-select(:options="levels" v-model="spatialObj.spatiallevel")
              .gap.left 
                input#dec.checkbox_circle(type="checkbox" name="part2ins" v-model="decision" value="dec")
                label.my-2.font_bold(for="dec") &nbsp;Decision
                .row.px-5(v-show="decision")
                  .gap.col-sm-6
                    label(for="stageof") Game Played:
                    v-select(:options="game3" v-model="decisionObj.decisiongame")
                  .gap.col-sm-6
                    label(for="stageof") Finished Level:
                    v-select(:options="levels" v-model="decisionObj.decisionlevel")
              .gap.left 
                input#mem.checkbox_circle(type="checkbox" name="part2ins" v-model="memory" value="mem")
                label.my-2.font_bold(for="mem") &nbsp;Memory
                .row.px-5(v-show="memory")
                  .gap.col-sm-6
                    label(for="stageof") Game Played:
                    v-select(:options="game4" v-model="memoryObj.memorygame")
                  .gap.col-sm-6
                    label(for="stageof") Finished Level:
                    v-select(:options="levels" v-model="memoryObj.memorylevel")
              .gap.left
                  input#flexi.checkbox_circle(type="checkbox" name="part2ins" v-model="flexibility" value="flexi")
                  label.my-2.font_bold(for="flexi") &nbsp;Flexibility
                  .row.px-5(v-show="flexibility")
                    .gap.col-sm-6
                      label(for="stageof") Game Played:
                      v-select(:options="game5" v-model="flexibilityObj.flexibilitygame")
                    .gap.col-sm-6
                      label(for="stageof") Finished Level:
                      v-select(:options="levels" v-model="flexibilityObj.Flexibilitylevel")
  
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
              textarea#comment.p-2(name="comment" rows="3" type="text" placeholder="Comment about the client" v-model="checking")
            hr
          section(v-show="type && stageof && date && (neeuro || checker || checker2 || checker3 || checker4 || checker5)")
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
                              //- checknationality
                      .gap 
                        input#dsg2.checkbox_circle(v-model="subs2" name="subsidy2" type="checkbox" value="dsg2" :disabled="false")
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
                          b-button(style="background-color: rgb(118, 80, 137); color: #fff; font-weight: bold; border-radius: 0.625rem" @click="checkDistanceTransport")
                            | Check distance
                      b-row.my-2
                        b-col.col-12
                          iframe(style="width: 100%;" id="iframe" height="500" width="500" :src="transport.iframeSrc")
                      b-row.my-4
                        b-col.col-12
                          b-row.align-items-center
                            b-col.col-2
                              label
                                | Additional Fee: $
                            b-col.col-2
                              b-form-input(v-model="transport.amountToBePaid" type="number" placeholder="Amount")
          //v-show="type && stageof && date && (neeuro || checker || checker2 || checker3 || checker4 || checker5)"
          section.mt-5()
            .formed
              .row
                .col-sm-3.align-self-center
                  label.common(for="session") Session Recommended: 
                .col.col-auto(style="text-align: right;")   
                  b-btn#add-btn.mx-4(@click="addmethod(0)") + Pick Session 
                .col.col-auto(style="text-align: right;")   
                  b-btn#add-btn.mx-4(@click="addmethod(1)") + Add New Session 
                  //- b-btn#add-btn(@click="addfile") + Add file 
              
              div.my-4(v-if="!sessions.length && !recommended_session_pick.length" )
                b-card(style="text-align: center;padding: 40px;")
                  b-icon.large_icon(icon="box-seam")
                  p.gap(style="justify-content: center;") No Session Selected, click add session to begin.

              div.my-4.p-3.border(v-if="recommended_session_pick.length" style="border-radius: 0.5rem;" )
                .row
                  p.ma-4.p-4(v-for="(rec_ses, index) in recommended_session_pick" :key="index")
                    | {{index+1+'.'}} {{rec_ses.crb5c_session_id}} 
                    b-icon.delete_icon(icon="x-circle-fill" @click="removePickedSession(index)")

              div.my-4.p-3.border(v-if="sessions.length" style="border-radius: 0.5rem;" )
                .row
                  p.ma-4.p-4(v-for="(ses, index) in sessions" :key="index")
                    | {{index+1+'.'}} {{ses.name}} [{{ses.type}}] - {{ ses.day }} {{ ses.time }} ( {{ ses.location }} ) 
                    b-icon.delete_icon(icon="x-circle-fill" @click="removeSession(index)")

              //- b-modal#confrimationModal.modal_confimration(size="lg" title="Sign here" scrollable centered hide-footer)
              //-     input(type="file" @change="uploadFile")
              //-     b-btn(@click="confirmUpload") Submit
                
              b-modal#addAdHocModal.modal_confimration(size="lg" title="Add here" scrollable centered hide-footer)
                  .row 
                    .col.m-2
                      label.text-small.m-4  Remarks: #[input.mx-2.modified_remark_input(type="text" v-model="adHocItems.remark")]
                      label.text-small.m-4 Amount $ : #[input.mx-2(type="number" v-model="adHocItems.total" value="")]
                  .row.mt-4
                    .row.m-4
                      .col-sm-1
                        input#recurringfee.checkbox_circle(v-model="adHocItems.isRecurring" type="checkbox")
                      .col-sm
                        label(for="recurringfee") Recurring (Monthly)
                    .row.m-4
                      .col-sm-1
                        input#includeFee.checkbox_circle(v-model="adHocItems.isIncludeInFee" type="checkbox")
                      .col-sm
                        label(for="includeFee") Include in current fee
                    .row.mt-5(style="justify-content: center;")
                      b-btn(@click="adHocFee" style="width:50%") Add Fee

              b-modal#paymentConfirmation(size="xl" scrollable centered hide-footer)
                section.gap.mx-5
                  label.common(for="collect") Amount to be Collected + GST [SGD]:
                  label.common(for="collect" style="font-size:30px") ${{ viewamtcollect.toFixed(2)}}
                    
                  hr
                .mx-5
                    h1(style="font-weight:700;") Payment Instructions
                    h4.my-2.text-danger(style="font-weight:700;") Payment via QR code is highly recommended.
                    p Kindly make payment by scanning the PayNow QR code below with a mobile banking application, or making an electronic funds transfer (FAST), to the bank account below.
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
                  .col(cols="6")
                    label(for="e-bank") 
                      div(:class="(this.modeofpayment == 'e-bank') ? 'checkboxSelectionSelected' : 'checkboxSelection'")
                        input#e-bank( v-model="modeofpayment" name="payment" type="radio" value="e-bank")
                        |&nbsp;&nbsp;Internet Banking
                        img.checkboxImg.mx-3(src="/form-images/money_transfer.png")
                  .col(cols="6")
                    label(for="cheque")
                      div(:class="(this.modeofpayment == 'cheque') ? 'checkboxSelectionSelected' : 'checkboxSelection'")
                        input#cheque( v-model="modeofpayment" name="payment" type="radio" value="cheque")
                        |&nbsp;&nbsp;Cheque
                        img.checkboxImg.mx-3(src="/form-images/cheque.png")

                section.gap( v-if="this.modeofpayment == 'cash'" style="margin: 20px 60px 60px")
                  label.common(for="collect") Please collect the payment before continuing!
                
                section.gap(v-if="this.modeofpayment == 'paynow' || this.modeofpayment == 'e-bank'" style="margin: 20px 60px 60px")
                  p.my-2.text-danger IMPORTANT: For electronic funds transfer, please indicate invoice number as payment reference.
                  
                    
                    h4.mb-5.text-danger(style="font-weight:700; text-decoration:underline;")
                    .row 
                      .col-6 
                        .d-flex.px-5.mx-2.my-4
                        b-table-simple(small, borderless, style="max-width:50%;")
                          b-tr
                            b-td Bank account name:
                            b-td Dementia Singapore Ltd - Acc 1
                          b-tr
                            b-td Bank account number:
                            b-td 451-312-912-7
                          b-tr
                            b-td UEN for PayNow:
                            b-td 202111519KDSG
                          b-tr
                            b-td Bank:
                            b-td United Overseas Bank Limited
                          b-tr
                            b-td Branch code:
                            b-td 001
                          b-tr
                            b-td Bank address:
                            b-td
                              | 80 Raffles Place
                              br
                              | Singapore 048624
                          b-tr
                            b-td Bank Code:
                            b-td 7375
                          b-tr
                            b-td Bank SWIFT Code:
                            b-td UOVBSGSG
                      .col-2
                        .ml-auto.qrcode
                          //- vueQrcode(:value="paynowString", :options="qroptions")
                          img.qr_code(src="/form-images/sample_paynow.png", alt="paynow")
                      hr
                                    

                section.gap(v-if="this.modeofpayment == 'cheque'" style="margin: 20px 60px 60px")
                  p For Cheque Payment:
                        p.mb-1 All cheques should be crossed and made payable to 
                          b.text-danger Dementia Singapore Ltd - Acc 1
                        p Kindly indicate name of the client and invoice number at the back of the cheque.

                  
                section.submitbtn(v-if="modeofpayment" @click="submitassessment")
                  b-btn(style="background: #917093;font-size: 17px;width: 20%;") Submit


              b-modal#pick-session(size="lg" title="Add Session" scrollable centered hide-footer) 
                  div.p-3    
                    div.m-3.p-1(v-for="(session, index) in  schedule_info" :key="index" )
                      input#group.mx-3(v-model="pick_sessions"  type="radio" :value="session" :id="session.crb5c_fow_session_scheduleid")
                      label(:for="session.crb5c_fow_session_scheduleid") {{ session.crb5c_session_id }}
                  div.text-center.my-3
                    b-btn.my-3( size="md" @click="addNewPickSession") Add
                  

              b-modal#add-session(size="md" title="Add Session" scrollable centered) 
                b-row.my-5
                  b-col.col-auto
                    label.common Session name:
                  b-col
                    input#group(v-model="newSessionTitle" type="text")  
                  
                b-row
                  b-col.col-auto
                    label.common Session Type:
                  b-col
                    b-form-select(v-model="newSessionType" :options="sessionType")

                b-row
                  b-col.col-auto
                    label.common Report Type:
                  b-col
                    b-form-select(v-model="newDementiaType" :options="dementiaLvl")
                   
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
                                  input#videocall(v-model="location" name="location" type="radio" value="Video-Call")
                                  label(for="videocall") &nbsp;Video Call (Zoom)
                                div
                                  input#residence(v-model="location" name="location" type="radio" value="Residence")
                                  label(for="residence") &nbsp;Residence 
                template(#modal-footer="{ok}")
                  b-btn(v-show="location" size="md" @click="addNew") Add
      
          section.mt-5(v-show="this.sessions.length || this.recommended_session_pick.length")
            label.common Applicable Sessions (excluding GST):
            .formed
              .formed.gap(v-for="(programme, index)  in filteredProgrammeInfos " :key="index")
                input.checkbox_circle(v-model="applicableFeeTotal" type="checkbox" :value="programme" :id="programme.crb5c_fowprogrammeid")
                label.gapped.text-small(:for="programme.crb5c_fowprogrammeid") {{programme.crb5c_programmename}} 
                  label(v-if="programme.crb5c_type != 4") ${{ programme.crb5c_price }}
                  label(v-else) ${{ fees4val  }}  
                    span(v-if="transport.isIncluded") (with transport fee: ${{ transportTotalView.toFixed(2) }})
            .formed

              //- .formed.gap
              //-   input#80.checkbox_circle(v-model="totalGST" name="cbfees" type="checkbox" value="80" v-show="gotGroupFee  && checkCenter && !subs2")
              //-   label.gapped.text-small(for="80" v-show="gotGroupFee && !subs2") Centre-based 3-HR FOW group session $80
              //- .formed.gap
              //-   input#60.checkbox_circle(v-model="totalGST" name="cbfees" type="checkbox" value="80" v-show="gotIndividualFee && checkCenter && !subs2")
              //-   label.gapped.text-small(for="60" v-show="gotIndividualFee && checkCenter && !subs2") Centre-based 1-HR one-to-one FOW session $80
              //- .formed.gap
              //-   input#90.checkbox_circle(v-model="totalGST" name="cbfees" type="checkbox" value="120" v-show="gotIndividualFee && checkCenter && !subs2")
              //-   label.gapped.text-small(for="90" v-show="gotIndividualFee && checkCenter && !subs2") Centre-based 1.5-HR one-to-one FOW session $120
              //- .formed.gap
              //-   input#120.checkbox_circle(v-model="totalGST" name="cbfees" type="checkbox" value="160" v-show="gotIndividualFee && checkCenter && !subs2")
              //-   label.gapped.text-small(for="120" v-show="gotIndividualFee && checkCenter && !subs2") Centre-based 2-HR one-to-one FOW session $160
              //- .formed.gap
              //-   input#hb90.checkbox_circle(v-model="totalGST" name="cbfees" type="checkbox" value="130" v-show="gotIndividualFee && checkResidence && !subs2") 
              //-   label.gapped.text-small(for="hb90" v-show="gotIndividualFee && checkResidence && !subs2") Home-based 1-HR one-to-one FOW session(incl. transport) $130
              //- .formed.gap
              //-   input#hb120.checkbox_circle(v-model="totalGST" name="cbfees" type="checkbox" value="170" v-show="gotIndividualFee && checkResidence && !subs2")
              //-   label.gapped.text-small(for="hb120" v-show="gotIndividualFee && checkResidence && !subs2") Home-based 1.5-HR one-to-one FOW session(incl. transport) $170
              //- .formed.gap
              //-   input#hb150.checkbox_circle(v-model="totalGST" name="cbfees" type="checkbox" value="210" v-show="gotIndividualFee && checkResidence && !subs2")
              //-   label.gapped.text-small(for="hb150" v-show="gotIndividualFee && checkResidence && !subs2") Home-based 2-HR one-to-one FOW session(incl. transport) $210
              //- .formed.gap.gapbot
              //-   input#hb90-2.checkbox_circle(v-model="totalGST" name="cbfees" type="checkbox" value="90" v-show="gotIndividualFee && checkZoom && !subs2")
              //-   label.gapped.text-small(for="hb90-2" v-show="gotIndividualFee && checkZoom && !subs2") Home-based 1-HR FOW session via video calls $80
              //- .formed.gap(v-show="subs2")
              //-     input#sgp.checkbox_circle( v-model="isCIP" name="cbfees" type="checkbox" :value="1") 
              //-     label.gapped.text-small(for="sgp") Centre-based 3-HR CIP trial run  ${{ fees4val }} 
              //-       span(style="font-weight:bold") ({{ prORsg }})
              .formed.gap.border.border-1(style="border-radius: 0.5rem;" v-show="isCipSelected")
                  b-row.p-3
                    b-col.col-6
                      b-row
                        b-col
                          b-row
                            b-col
                              label.common.gap Public & DSG Holiday:
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
              .formed(style="margin-top:40px" v-show="this.sessions.length || this.recommended_session_pick.length")
                label.common.gap(for="admission") Admission date:
                input.numbers-half#admission(v-model="adm" name="admission" type="date")
  
                  //- b-card
                  //-   label.common.gap(for="admission") 1st Session date:
                  //-   input.numbers-half#admission(v-model="firSession" name="admission" type="date")
  
                  //-   label.common.gap(for="admission") 2nd Session date:
                  //-   input.numbers-half#admission(v-model="secSession" name="admission" type="date")
  
                  //-   b-btn.mt-3(@click="CIPtotal") Calculate
            
                  //-   div(style="text-align: right;width: 100%;font-size: 20px;")
                  //-     label(v-show="totalforCIP") ${{totalforCIP}} for {{ CIPdays }} session
            
          // 
          section.mt-5(v-show="(this.sessions.length || this.recommended_session_pick.length)  && !isCipSelected" style="margin-top:50px")
            label.common NeeuroFit Subscription:
            .formed.gap
                input#neeurofit.checkbox_circle(v-model="neeurofitFeeTotal" type="checkbox" :value="neeuroFitFees")
                label.gapped.text-small(for="neeurofit") Centre-based NeeuroFIT 6 months subcription $240

          //
          section(style="margin-top:50px" v-show="this.sessions.length || this.recommended_session_pick.length")
              .row.mt-5
                .col 
                  label.common Additional fee:
                .col 
                  b-btn(v-b-modal.addAdHocModal) Ad-hoc fee
              .formed.gap(v-show="!subs1")
                input#one_time.checkbox_circle(v-model="additionalFeeTotal" type="checkbox" :value="additionalFees.one_time.price")
                label.gapped.text-small(for="one_time") One-time Assessment $50
              .formed.gap(v-show="subs1")
                input#one_time_other.checkbox_circle( v-model="additionalFeeTotal"  type="checkbox" :value="oneTimeOtherValue" :disabled="!oneTimeOtherValue")
                label.gapped.text-small(for="one_time_other") One-time Assessment $
                  input.mx-2(type="number" v-model="one_time_other_value")
              .formed.gap(v-show="subs1")
                input#one_time_waived.checkbox_circle(v-model="additionalFeeTotal" type="checkbox" :value="additionalFees.one_time_waived.price")
                label.gapped.text-small(for="one_time_waived") One-time Assessment
                  strike.mx-2 $50 
                    label.mx-2 [Waived]
              .formed.gap(v-if="!isCipSelected")
                input#refund.checkbox_circle(v-model="refundableFeeTotal" type="checkbox" :value="refundableDeposit")
                label.gapped.text-small(for="refund") Refundable One-Month Deposit (4 X applicable fee) ${{ refundableDeposit }}
              .formed.gap.addtional_fee(v-for="(adhoc,index) in adHocFeeTotal")
                .row  
                  .col.mt-2
                    label.gapped.text-small(for="refund") Fee remark: {{ adhoc.remark }}
                    label.gapped.text-small(for="refund") Amount : ${{ adhoc.total }}
                    label.gapped.text-small.mx-4(for="refund") Monthly: {{ adhoc.isRecurring ? 'Yes' : 'No' }}
                  .col(style="text-align-last: right;")
                    b-btn.danger(@click="deleteAdHoc(index)") Delete
                  
              
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
                
          //v-show="this.sessions.length || this.recommended_session_pick.length"
          section
            .gap.row.mt-0
              .gap
                    label.common.amountjustify(for="collect" ) Amount to be Collected + GST [SGD]:
                    label.common.amountjustify(for="collect" style="font-size:30px") ${{ viewamtcollect.toFixed(2)}}
                    b-btn(@click="navigateToServiceForm") Continue to Agreement 

              section(v-if="viewServiceForm")
                h2.mt-5 Service Agreement Form
                .row.mt-5
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
                      p Family of Wisdom (Enrichment) Programme:
                .row.mt-3
                    .col-sm.text-left
                      p Date of Commencement:
                    .col-sm
                      | {{ adm }}
                .row.mt-3
                    .col-sm.text-left
                      p Fee charged per session (before GST): $
                    .col-sm
                      | {{ isCipSelected? (fees4val + transportTotalView )  : totalOfApplicable  }} 
                      

                .row.mt-5(style="text-align:justify;line-height:5vh")
                  p I, #[input.form-control(type="text" v-model="caregiverName")] (NRIC Name), confirm that I am the #[input.form-control(type="text" v-model="caregiverRelationship" )] (relationship) of #[input.form-control(type="text" v-model="caregiverClientName" )] (NRIC Name of client),#[input.form-control(type="text" v-model="caregiverClientIc")] (NRIC No.).
                  
                hr  
                section.mt-5(style="text-align:left;")
                  p I hereby declare that I have understood and agree to abide by the:

                  ul
                      li Service Agreement
                      
                  p of Family of Wisdom (Bendemeer)

                  
                  .row.mt-4
                    .col 
                      .row.mt-5.mx-1
                            VueSignatureCanvas.gap.sig-canvas(ref="caregiverSignature" )
                      .row.mt-2
                            p.text-center --- Caregiver Sign here ---
                    .col 
                      .row.mt-5.mx-1
                            VueSignatureCanvas.gap.sig-canvas(ref="staffSignature" )
                      .row.mt-2
                            p.text-center --- Staff Sign here ---
                  .row.mt-5  
                    .col-sm
                        p Contact Number:
                    .col-sm
                        input.form-control(type="number" v-model="serviceAgreementContact")
                  .row.mt-5
                    .col-sm 
                        p Date:
                    .col-sm
                        input.form-control(type="date" v-model="serviceAgreementDate")
                  .row.mt-5 
                    b-btn( v-if="viewamtcollect" v-b-modal.paymentConfirmation style="background: #917093;font-size: 17px;width: 20%;float:right;margin:50px 20px 0px 0px") Continue
                  
                  //- .row(v-if="imagesSign")
                  //-   img(:src="'data:image/jpeg;base64,' + imagesSign[0].crb5c_caregiversignature")
                    

                //- input.numbers#collect(v-model="amtcollect " name="collect" type="text" readonly="readonly")
            
            //- 
            
          section(v-if="modeofpayment")
            //- b-row.justify-content-center
            //-     VueSignatureCanvas.gap(ref="handWrite" :canvasProps="{class: 'sig-canvas'}")
            //- b-row.justify-content-center
            //-     b-btn.gap.confimrationBtn#getImagebtn(@click="getImage()") Submit 
            //- b-row
            //-   .col-sm-2
            //-     img.signatureView(:src="signatureImg")

          // Submit button 
</template>
  
  <script>
  import dayjs from "dayjs";
  // import PaynowQR from '@chewhx/paynowqr';
  // import VueQrcode from 'vue-qrcode';
  import utc from "dayjs/plugin/utc";
  import timezone from "dayjs/plugin/timezone"; // dependent on utc plugin
  import isToday from "dayjs/plugin/isToday";
  import axios from 'axios';
  import VueSignatureCanvas from 'vue-signature-canvas';
  
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
    components: { 
      vSelect,
      // VueQrcode,
      VueSignatureCanvas,
    },
    // emits: ["newresource"],
    data() {
      return {
        newDementiaType: '',
        newSessionType: '',
        newSessionTitle: '',
        viewServiceForm: false,
        caregiverName: '',
        caregiverRelationship: '',
        caregiverClientName: '',
        caregiverClientIc: '',
        serviceAgreementContact: '',
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
        GST: 1.08,
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
      
      const component = this;
      this.$root.$on('getFormData', function(){
        component.getdatainform();
      })

      const listPublicHoliday = await this.getSGPublicHoliday();
      this.listPublicHolidayCurrentMonth = this.getPublicHolidayCurrentMonth(listPublicHoliday).length === 0 ? null : this.getPublicHolidayCurrentMonth(listPublicHoliday);
      let getHolidays = await this.getDsgHoliday();
      // console.log('getHolidays',getHolidays)
      let dsgHoliday = getHolidays.map(
        (holiday) => {
          return {
            date: dayjs(holiday.crb5c_date).format('YYYY-MM-DD'),
            day: dayjs(holiday.crb5c_date).format('dddd'),
            holiday: holiday.crb5c_name,
            _id: holiday.crb5c_fowcalendarid
          };
        }
      );
      // console.log('holiday',dsgHoliday)
      this.listPublicHolidayCurrentMonth.push(...dsgHoliday);


      // console.log('this.listPublicHolidayCurrentMonth', this.listPublicHolidayCurrentMonth)
      let today = dayjs().format('YYYY-MM-DD')
      this.serviceAgreementDate = today;
      
      this.getProgrammeInfos();
      // this.getImagesInfos();
    },
    methods: {
      async AutoMatchingSession(){

        let params = new URLSearchParams({
            $select: "crb5c_time_hrs,crb5c_time_mins,crb5c_day,crb5c_duration,crb5c_session_id,crb5c_allowadhoccheckin,crb5c_fow_session_scheduleid,crb5c_sessionreporttype,crb5c_sessiontype,crb5c_gender,crb5c_language,crb5c_transportincluded,crb5c_isactive",
            $expand:"ownerid,crb5c_FOW_Customer_session_schedule_crb5c($select=crb5c_fow_customerid,crb5c_defaultroom;$top=1000),crb5c_parent_activity_bridge($select=crb5c_name,crb5c_activityid,crb5c_activitytype)",
            $filter:`crb5c_fow_session_scheduleid eq ${this.pick_sessions.crb5c_fow_session_scheduleid}`,
            $top:1000
        })
        
        let {data:{value:schedules}} = await this.$store.state.axios.get(`/crb5c_fow_session_schedules?${params.toString()}`);
        
        console.log('entities',schedules)
 
          
          const relationshipSchemaName = 'FOW_Customer_session_schedule_crb5c';

          // Form the URL for the AssociateEntities endpoint
          const url = `https://orga7b5e99e.crm5.dynamics.com//api/data/v9.2/crb5c_fow_customer_crb5c_fow_session_scset(${this.pick_sessions.crb5c_fow_session_scheduleid})/${relationshipSchemaName}/`;

          // Configure headers with the authorization token
          const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.$store.state.accessToken}` // Replace with your actual access token
          };

          // Send the POST request to associate the records
          axios.post(url, { "@odata.id": `https://orga7b5e99e.crm5.dynamics.com//api/data/v9.2/crb5c_fow_customer_crb5c_fow_session_scset(${this.$store.state.assessment_client_id})` }, { headers })
            .then(response => {
              console.log('Association successful:', response.data);
            })
            .catch(error => {
              console.error('Error associating records:', error);
            });
        // const relatedEntities =  {
        //   entityType: "crb5c_fow_customerid",
        //   id: this.$store.state.assessment_client_id,    
        // }

        // console.log('related entities :',relatedEntities)

        // var manyToManyAssociateRequest = {
        // getMetadata: () => ({
        //     boundParameter: null,
        //     parameterTypes: {},
        //     operationType: 1,
        //     operationName: "Associate"
        // }),
        // relationship: "crb5c_parent_activity_bridge",

        // target: {
        //     entityType: "crb5c_fow_session_schedule",
        //     id: 
        // },
        // relatedEntities
        // }
        // try {
        //     let result = await this.$store.state.axios.get("https://orga7b5e99e.crm5.dynamics.com/api/data/v9.2/AssociateEntities", manyToManyAssociateRequest, {
        //       headers: {
        //           "Content-Type": "application/json",
        //           "Authorization": `Bearer ${this.$store.state.accessToken}`
        //       }
        //   });

        //   console.log("RESULT OF ADDING CLIENT", result.data);
                  
        //   }
        // catch (e) {
        //         console.log("ERROR Adding bridge table", e);
        //     }

        
        let paramsOption = new URLSearchParams({
        $select: "crb5c_time_hrs,crb5c_time_mins,crb5c_day,crb5c_duration,crb5c_session_id,crb5c_allowadhoccheckin,crb5c_fow_session_scheduleid,crb5c_sessionreporttype,crb5c_sessiontype,crb5c_gender,crb5c_language,crb5c_transportincluded,crb5c_isactive",
        $expand:"ownerid,crb5c_FOW_Customer_session_schedule_crb5c($select=crb5c_fow_customerid,crb5c_defaultroom;$top=1000),crb5c_parent_activity_bridge($select=crb5c_name,crb5c_activityid,crb5c_activitytype)",
        $filter:`crb5c_fow_session_scheduleid eq ${this.pick_sessions.crb5c_fow_session_scheduleid}`,
        $top:1000
        })
        
        let {data:{value:schedulesRetrieval}} = await this.$store.state.axios.get(`/crb5c_fow_session_schedules?${paramsOption.toString()}`);
        
        console.log('entities again',schedulesRetrieval)



        // if (this.schedulerActivityList?.length) {
        //                     for (let i = 0; i < this.schedulerActivityList.length; i++) {
        //                         var disassociateRequest = {
        //                             getMetadata: () => ({
        //                                 boundParameter: null,
        //                                 parameterTypes: {},
        //                                 operationType: 2,
        //                                 operationName: "Disassociate"
        //                             }),
        //                             relationship: "crb5c_parent_activity_bridge",

        //                             target: {
        //                                 entityType: "crb5c_fow_session_schedule",
        //                                 id: entityId
        //                             },
        //                             relatedEntityId: this.schedulerActivityList[i].crb5c_activityprofileid
        //                             }
        //                         try {
        //                                 let result = await window.parent.Xrm.WebApi.online.execute(disassociateRequest);
        //                                 console.log("RESULT OF DELETION", result);
        //                             }   
        //                         catch (e) {
        //                                 console.log("ERROR deleting bridge table", e);
        //                             }
        //                         }
                                
        //                     }
                            
      },
      navigateToServiceForm(){
        this.AutoMatchingSession();
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
        this.recommended_session_pick.push(this.pick_sessions);
        await this.filterFees();
        this.$bvModal.hide("pick-session");
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
      //   const object = "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"
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
        this.filterTypeValues = [];

        for (let i = 0 ; i < this.sessions.length; i++){
          if (this.sessions[i].type == 'Group' && this.sessions[i].location=="Center" && this.subs2){
            this.filterTypeValues.push(4)
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
          this.schedule_info = data.filter(item => item.crb5c_sessionreporttype != 3);
          this.schedule_info.sort((a, b) => a.crb5c_day - b.crb5c_day)
          // console.log('schedule_info',this.schedule_info)
          this.$bvModal.show("pick-session");
        }
        
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
          name: this.newSessionTitle,
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
          $filter: `crb5c_fow_customerid eq '${clientId}'`,
          };
        let params = new URLSearchParams(paramObj);
        let { data: data } = await this.$store.state.axios.get(
          `crb5c_fow_customers/?${params.toString()}`
          );
        this.clientdata = data.value[0];
        this.caregiverClientIc = this.clientdata.crb5c_nricno;
        this.caregiverClientName = this.clientdata.crb5c_no;
        // console.log('form data',this.clientdata);
      },
      async getSessionScheduleinform(){
        let paramObj = {
          $select:'crb5c_session_id,crb5c_sessionreporttype,crb5c_sessiontype,crb5c_day,crb5c_duration,crb5c_time,crb5c_time_hrs,crb5c_time_mins,crb5c_session_time_choice',
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
          let { data } = await this.$store.state.axios.get(
            `crb5c_fowprogrammes/?${params.toString()}`
          );
          this.programmeInfos = data.value;
          this.programmeInfos.sort((a, b) => a.crb5c_programmename.localeCompare(b.crb5c_programmename))
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
      showConfimrationModal(){
        // this.$bvModal.show("confrimationModal");
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
        console.log('crb5c_fowserviceagreementid',id)

        const payload2 = { 
          crb5c_dsgsignature: this.staffSignatureImg,
        };

        const { data2 } = await this.$store.state.axios.patch(`/crb5c_fowserviceagreements(${id})`,payload2);
        console.log('patching img',data2)

        alert('Client Assessment is successfully submitted!');

        window.close();
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
        crb5c_clientname:this.$store.state.assessment_client_name ? this.$store.state.assessment_client_name : 'John testing',
        crb5c_clientid: this.$store.state.assessment_client_id ? this.$store.state.assessment_client_id : '2343434234',
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
        crb5c_additionalfee: this.transport.amountToBePaid,
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
        // crb5c_cip1stsessionformat: this.firstSesFormat,
        // crb5c_cip2ndsessionformat: this.secondSesFormat,
        
       };
       
        const { data } = await this.$store.state.axios.post(
          `/crb5c_fowassessmentforms`,payload);
        
        console.log('data',data)
  
        await this.submitServiceAgreement();
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
      },
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
      firSession(val){
        if (val) {
          this.adm = val;
        }
      },
      checker4(val){
        if (val) {
          this.additionalFeeTotal.push(this.additionalFees.one_time.price)
        }
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

        },
        deep: true,
      },

    },
    computed: {
      // autoSelectNeeuroFIt(){
      //   if (this.mocaVal) {
      //     if (this.mocaVal >= 18 && this.ovyearSelected) {
      //       this.neeurofitFeeTotal = this.neeuroFitFees;
      //     }
      //   }
      // },
      transportTotalView(){
        if(this.transport.isIncluded){
          let total_amount = 0;
          total_amount = (this.transport.fixedFee * (1 - (this.subsidyAmount ?? 0) / 100)) + (this.transport.amountToBePaid ? + this.transport.amountToBePaid : 0);
          return total_amount;
        }
        return 0;

      },
      // paynowString(){
      //     let qrcode = new PaynowQR({
      //         uen:'202111519KDSG',           //Required: UEN of company
      //         amount : 100,               //Specify amount of money to pay.
      //         refNumber: 1234567,   //Reference number for Paynow Transaction. Useful if you need to track payments for recouncilation.
      //         company:  'Dementia Singapore Ltd. - Acc 1'   //Company name to embed in the QR code. Optional.               
      //       });
      //       return qrcode.output();
      // },
      // qroptions(){
      //     return{
      //         errorCorrectionLevel:"H",
      //         color:{
      //             dark:"#7C1978"
      //         }
      //     }
      // },
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
        if(this.applicableFeeTotal.length ) {
          let total_amount = 0;
          for(let totalApplicable of this.applicableFeeTotal){
            total_amount = total_amount + totalApplicable.crb5c_price;

          }
        return total_amount;
        }
        return 0;    
      },
      calculateCipCost(){
        return this.totalforCIP ? (this.totalforCIP)*1.08 : 0;
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
      viewamtcollect(){      
        let refundable = this.refundableFeeTotal ? this.refundableDeposit : 0;
        let GSTtotal = this.isCipSelected ? 0 :((this.totalOfAdditional + this.totalOfNeeurofit) * this.GST);
        let dsgsubsidiyval = this.checkdsgsubsidy(GSTtotal);
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
    text-align: center;
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
  </style>
  