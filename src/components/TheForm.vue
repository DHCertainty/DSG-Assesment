<template>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <div class="container-xxl">
    <form>
      <section>
        <div class="row">
          <div class="col-sm-6">
            <label class="common gap" for="typeof">Type of Dementia:</label>
            <v-select
              v-model="type"
              :options="[
                'Alzheimer’s Disease',
                'Vascular Dementia',
                'Mixed Dementia',
                'Lewy Body Dementia',
                'Parkinson Dementia',
                'Fronto-temporal Dementia',
                'Others',
              ]"
            ></v-select>
          </div>
          <div class="col-sm-6">
            <label class="common gap" for="stageof">Stage of Dementia:</label>
            <v-select
              v-model="stageof"
              :options="[
                'Mild',
                'Mild to Moderate',
                'Moderate',
                'Moderate to Severe',
                'Severe',
              ]"
            ></v-select>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-3">
            <label class="common gap" for="score">Latest score on:</label>
            <v-select
              v-model="latestscore"
              :options="['AMT', 'MMSE', 'MOCA']"
            ></v-select>
          </div>
          <div class="col-sm-3 gap">
            <input
              v-model="latest"
              class="numbers gap-twice"
              id="score"
              name="score"
              type="number"
              min="0"
              :disabled="!latestscore"
            />
          </div>
          <div class="col-sm-6">
            <label class="common gap" for="score">Date Done : </label>
            <input
              v-model="date"
              class="numbers"
              id="score"
              name="score"
              type="date"
            />
          </div>
        </div>
        <hr />
        <section v-show="type && stageof && latest && latestscore && date">
        <!-- <section> -->
          <div class="formed gap">
            <input
              v-model="checker"
              id="sacop"
              name="part2"
              type="checkbox"
              value="sacop"
            />
            <label class="gapped text-small" for="sacop"
              >Shared about Centre's objectives & program</label
            >
          </div>
          <div class="formed gap">
            <input
              v-model="checker2"
              id="wcv"
              name="part2"
              type="checkbox"
              value="wcv"
            />
            <label class="gapped text-small" for="wcv">Watched Centre's video</label>
          </div>
          <div class="formed gap">
            <input
              id="pnbtg"
              name="the-pnbtg"
              type="checkbox"
              value="pnbtg"
              v-model="neeuro"
            />
            <label class="gapped text-small" for="pnbtg"
              >Played NeeuroFIT brain training game</label
            >
          </div>
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
              <section class="row" v-show="atten">
                <div class="gap-twice col-sm-6">
                  <label class="inside" for="stageof">Game played:</label>
                  <v-select
                    :options="[
                      'Psychic Cyclist',
                      'Mindcopter',
                      'Sushi Recall',
                      'Sitting Ducks',
                      'Multitask Master',
                    ]"
                  ></v-select>
                </div>
                <div class="gap-twice col-sm-6">
                  <label class="inside" for="stageof">Finished Level:</label>
                  <v-select
                    :options="[
                      '1',
                      '2',
                      '3',
                      '4',
                      '5',
                      '6',
                      '7',
                      '8',
                      '9',
                      '10',
                    ]"
                  ></v-select>
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
              <section class="row" v-show="spatial">
                <div class="gap-twice col-sm-6">
                  <label class="inside" for="stageof">Game played:</label>
                  <v-select
                    :options="[
                      'Whats’s this Word ?',
                      'Dot Connect',
                      'Stargazer',
                      'Space 360',
                    ]"
                  ></v-select>
                </div>
                <div class="gap-twice col-sm-6">
                  <label class="inside" for="stageof">Finished Level:</label>
                  <v-select
                    :options="[
                      '1',
                      '2',
                      '3',
                      '4',
                      '5',
                      '6',
                      '7',
                      '8',
                      '9',
                      '10',
                    ]"
                  ></v-select>
                </div>
              </section>
              <div class="gap left">
                <input
                  v-model="decision"
                  id="dec"
                  name="part2ins"
                  type="checkbox"
                  value="dec"
                />
                <label for="dec">&nbsp;Decision</label>
              </div>
              <section class="row" v-show="decision">
                <div class="gap-twice col-sm-6">
                  <label class="inside" for="stageof">Game played:</label>
                  <v-select
                    :options="[
                      'Junction Control',
                      'Pyramid Solitaire',
                      'Supreme Shopper',
                      'Flower Garden',
                    ]"
                  ></v-select>
                </div>
                <div class="gap-twice col-sm-6">
                  <label class="inside" for="stageof">Finished Level:</label>
                  <v-select
                    :options="[
                      '1',
                      '2',
                      '3',
                      '4',
                      '5',
                      '6',
                      '7',
                      '8',
                      '9',
                      '10',
                    ]"
                  ></v-select>
                </div>
              </section>
              <div class="gap left">
                <input
                  v-model="memory"
                  id="mem"
                  name="part2ins"
                  type="checkbox"
                  value="mem"
                />
                <label for="mem">&nbsp;Memory</label>
              </div>
              <section class="row" v-show="memory">
                <div class="gap-twice col-sm-6">
                  <label class="inside" for="stageof">Game played:</label>
                  <v-select
                    :options="[
                      'Farmhouse Friends',
                      'Who’s Who?',
                      'Pyramid Solitaire',
                      'Sushi Recall',
                      'Sitting Ducks',
                    ]"
                  ></v-select>
                </div>
                <div class="gap-twice col-sm-6">
                  <label class="inside" for="stageof">Finished Level:</label>
                  <v-select
                    :options="[
                      '1',
                      '2',
                      '3',
                      '4',
                      '5',
                      '6',
                      '7',
                      '8',
                      '9',
                      '10',
                    ]"
                  ></v-select>
                </div>
              </section>
              <div class="gap left">
                <input
                  v-model="flexibility"
                  id="flexi"
                  name="part2ins"
                  type="checkbox"
                  value="flexi"
                />
                <label for="flexi">&nbsp;Flexibility</label>
              </div>
              <section class="row" v-show="flexibility">
                <div class="gap-twice col-sm-6">
                  <label class="inside" for="stageof">Game played:</label>
                  <v-select
                    :options="['Multitask Master', 'Junction Control']"
                  ></v-select>
                </div>
                <div class="gap-twice col-sm-6">
                  <label class="inside" for="stageof">Finished Level:</label>
                  <v-select
                    :options="[
                      '1',
                      '2',
                      '3',
                      '4',
                      '5',
                      '6',
                      '7',
                      '8',
                      '9',
                      '10',
                    ]"
                  ></v-select>
                </div>
              </section>
            </div>
          </div>
          <div class="formed gap">
            <input
              v-model="checker3"
              id="pttg"
              name="part2"
              type="checkbox"
              value="pttg"
            />
            <label class="gapped text-small" for="pttg">Played Table Top games</label>
          </div>
          <div class="formed gap">
            <input
              v-model="checker4"
              id="mocaform"
              name="mocaform"
              type="checkbox"
              value="mocaform"
            />
            <label class="gapped text-small" for="mocaform">MOCA form</label>
            <div v-show="checker4" class="container left gap">
              <h2 class="moca gapbot">MOCA</h2>
              <p class="common">Version:</p>
              <div>
                <input
                  v-model="cn"
                  id="cn"
                  name="cnbx"
                  type="checkbox"
                  value="cn"
                />
                <label class="gapped" for="cn">Chinese</label>
              </div>
              <div>
                <input
                  v-model="en"
                  id="en"
                  name="enbx"
                  type="checkbox"
                  value="en"
                />
                <label class="gapped" for="en">English</label>
              </div>
              <p class="common gap">Education:</p>
              <div>
                <input
                  v-model="un"
                  id="un"
                  name="unbx"
                  type="checkbox"
                  value="un"
                />
                <label class="gapped" for="un">≤ 6 Years</label>
              </div>
              <div>
                <input
                  v-model="ov"
                  id="ov"
                  name="ovbx"
                  type="checkbox"
                  value="ov"
                />
                <label class="gapped" for="ov">> 6 Years</label>
              </div>
              <div v-show="ov" class="gap row">
                <label class="common">Education Level:</label>
                <v-select
                  v-model="edulev"
                  :options="[
                    'Primary',
                    'Secondary',
                    'Pre-University',
                    'Diploma',
                    'Associate Degree',
                    'Bachelor’s Degree',
                    'Master’s Degree',
                    'Doctorate Degree',
                  ]"
                  class="col-sm-6 gapbot"
                ></v-select>
              </div>
              <div class="row">
                <p class="common gap">Visuospatial/Executive</p>
                <div class="col-sm-6">
                  <label>Alternating Trail Making:</label>
                  <v-select v-model="vis1" :options="['0', '1']" :clearable="false"></v-select>
                </div>
                <div class="col-sm-6">
                  <label>Copy Cube:</label>
                  <v-select v-model="vis2" :options="['0', '1']" :clearable="false"></v-select>
                </div>
              </div>
              <label class="gap">Draw Clock(Ten past eleven) [3 Points]</label>
              <v-select
                multiple
                v-model="vis3"
                :options="[
                  'Contour(1 point)',
                  'Numbers(1 point)',
                  'Hands(1 point)',
                ]"
              ></v-select>
              <div class="row">
                <p class="common gap">Naming</p>
                <div class="col-sm-6">
                  <label>Lion:</label>
                  <v-select v-model="vis4" :options="['0', '1']" :clearable="false"></v-select>
                </div>
                <div class="col-sm-6">
                  <label>Elephant:</label>
                  <v-select v-model="vis5" :options="['0', '1']" :clearable="false"></v-select>
                </div>
                <div class="col-sm-6 gap">
                  <label>Camel:</label>
                  <v-select v-model="vis6" :options="['0', '1']" :clearable="false"></v-select>
                </div>
                <p class="common gap">Memory[0 Point]</p>
                <div class="col-sm-6">
                  <input class="numbers" type="text" value="0" disabled/>
                </div>
              </div>
              <div class="row">
                <p class="common gap">Attention</p>
                <div class="col-sm-6">
                  <label>Repeat Forward order 2 1 8 5 4 :</label>
                  <v-select v-model="vis7" :options="['0', '1']" :clearable="false"></v-select>
                </div>
                <div class="col-sm-6">
                  <label>Able to tap with his hand at each number 1:</label>
                  <v-select v-model="vis8" :options="['0', '1']" :clearable="false"></v-select>
                </div>
                <div class="col-sm-6 gap">
                  <label>Serial 7 subtraction starting at 100:</label>
                  <v-select v-model="vis9" :options="['0', '1']" :clearable="false"></v-select>
                </div>
              </div>
              <div class="row">
                <p class="common gap">Language(Repeat)</p>
                <div class="col-sm-6">
                  <label>First Sentence:</label>
                  <v-select v-model="vis9" :options="['0', '1']" :clearable="false"></v-select>
                </div>
                <div class="col-sm-6">
                  <label>Second Sentence:</label>
                  <v-select v-model="vis10" :options="['0', '1']" :clearable="false"></v-select>
                </div>
                <div class="col-sm-6 gap">
                  <label>Verbal Fluency:</label>
                  <v-select v-model="vis11" :options="['0', '1']" :clearable="false"></v-select>
                </div>
                <div class="col-sm-6 gap">
                  <label>Specify(how many animals)</label>
                  <v-select
                    v-model="vis12"
                    :options="[
                      '0',
                      '1',
                      '2',
                      '3',
                      '4',
                      '5',
                      '6',
                      '7',
                      '8',
                      '9',
                      '10',
                      '11',
                      'more than 11',
                    ]"
                  ></v-select>
                </div>
              </div>
              <div class="row">
                <p class="common gap">Abstraction</p>
                <div class="col-sm-6">
                  <label>Similarity between Train - bicycle:</label>
                  <v-select v-model="vis13" :options="['0', '1']" :clearable="false"></v-select>
                </div>
                <div class="col-sm-6">
                  <label>Similarity between watch - ruler:</label>
                  <v-select v-model="vis14" :options="['0', '1']" :clearable="false"></v-select>
                </div>
              </div>
              <p class="common gap">Delayed Recall[5 Points]</p>
              <v-select
                multiple
                v-model="vis15"
                :options="[
                  'Face(1 point)',
                  'Silk(1 point)',
                  'Church(1 point)',
                  'Rose(1 point)',
                  'Red(1 point)',
                ]"
              ></v-select>
              <p class="common gap">Orientation</p>
              <v-select
                multiple
                v-model="vis16"
                :options="['Date', 'Month', 'Year', 'Day', 'Place', 'Country']"
              ></v-select>
              <div class="row">
                <p class="common gap">Total Score: {{ totalscore }}</p>
              </div>
            </div>
          </div>
          <div class="formed gap">
            <input
              v-model="checker5"
              id="eq5d"
              name="eq5d"
              type="checkbox"
              value="eq5d"
            />
            <label class="gapped text-small" for="eq5d">EQ-5D-5L form</label>
            <div v-show="checker5" class="container">
              <h2 class="moca gapbot">EQ-5D-5L</h2>
              <p class="common">Health Status:</p>
              <div class="row">
                <div class="left col-sm-6">
                  <div class="row gap">
                    <label class="col-lg-4">Mobility:</label>
                    <v-select
                      v-model="eq1"
                      class="col-lg-8"
                      :options="['0', '1', '2', '3', '4', '5']"
                      :clearable="false"
                    ></v-select>
                  </div>
                  <div class="row gap">
                    <label class="col-lg-4">Self-Care:</label>
                    <v-select
                      v-model="eq2"
                      class="col-lg-8"
                      :options="['0', '1', '2', '3', '4', '5']"
                      :clearable="false"
                    ></v-select>
                  </div>
                  <div class="row gap">
                    <label class="col-lg-4">Usual Activities:</label>
                    <v-select
                      v-model="eq3"
                      class="col-lg-8"
                      :options="['0', '1', '2', '3', '4', '5']"
                      :clearable="false"
                    ></v-select>
                  </div>
                  <div class="row gap">
                    <label class="col-lg-4">Pain/Discomfort:</label>
                    <v-select
                      v-model="eq4"
                      class="col-lg-8"
                      :options="['0', '1', '2', '3', '4', '5']"
                      :clearable="false"
                    ></v-select>
                  </div>
                  <div class="row gap">
                    <label class="col-lg-4">Anxiety/Depression:</label>
                    <v-select
                      v-model="eq5"
                      class="col-lg-8"
                      :options="['0', '1', '2', '3', '4', '5']"
                      :clearable="false"
                    ></v-select>
                  </div>
                </div>
                <div class="col-sm-6">
                  <p class="gapbot">Total Score:</p>
                  <div class="sm-container">
                    <br />
                    <h1>{{ eq5dcounter }}/25</h1>
                  </div>
                </div>
                <p class="common gap">Perceived Health Scale:</p>
                <div class="row">
                  <label class="left col-sm-2">Health Scale:</label>
                  <div class="col-sm-4">
                    <input class="numbers" type="number" min="0" max="100" />
                  </div>
                </div>
              </div>
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
            (neeuro ||
              checker ||
              checker2 ||
              checker3 ||
              checker4 ||
              checker5) &&
            latestscore
          "
        >
          <div class="formed">
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
        <section
          v-show="
            type &&
            stageof &&
            latest &&
            date &&
            checking &&
            (neeuro ||
              checker ||
              checker2 ||
              checker3 ||
              checker4 ||
              checker5) &&
            latestscore
          "
        >
          <!-- <section> -->
          <div class="formed">
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
          <div class="formed">
            <label class="common gap" for="admission">Admission date:</label>
            <input
              v-model="adm"
              class="numbers-half"
              id="admission"
              name="admission"
              type="date"
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
            (neeuro ||
              checker ||
              checker2 ||
              checker3 ||
              checker4 ||
              checker5) &&
            ses.length > 0 &&
            adm &&
            latestscore
          "
        >
          <!-- <section> -->
          <label class="common gap">Subsidy:</label>
          <div class="formed gap">
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
          <div class="formed gap gapbot">
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
            <!-- <section> -->
            <main></main>
            <div class="formed">
              <div class="formed gap">
                <input
                  v-model="subs1"
                  id="dsg1"
                  name="subsidy1"
                  type="checkbox"
                  value="dsg1"
                />
                <label class="long" for="dsg1">DSG</label>
              </div>
              <div class="gap">
                <input
                  v-model="subs2"
                  id="dsg2"
                  name="subsidy2"
                  type="checkbox"
                  value="dsg2"
                />
                <label class="long" for="dsg2">Toteboard</label>
                <div v-show="subs2" class="row gap">
                  <div class="col-md-2">
                    <label class="common">Means Test Result</label>
                  </div>
                  <div class="col-md-2">
                    <input
                      class="numbers"
                      id="means"
                      name="means"
                      type="number"
                      min="0"
                    />
                  </div>
                  <div class="col-md-2">
                    <label class="common">% subsidy</label>
                  </div>
                </div>
              </div>
              <div class="formed gap">
                <input
                  v-model="subs3"
                  id="dsg3"
                  name="subsidy3"
                  type="checkbox"
                  value="dsg3"
                />
                <label class="long" for="dsg3">Others</label>
                <div v-show="subs3" class="formed gap">
                  <label class="common" for="others">Specify:</label>
                  <input
                    class="numbers-half"
                    id="others"
                    name="others"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div class="formed gap gapbot">
              <input
                v-model="subs4"
                id="dsg4"
                name="subsidy4"
                type="checkbox"
                value="dsg4"
              />
              <label class="long" for="dsg4">Amount Subsidized</label>
            </div>
            <div v-show="subs4" class="formed gapbot">
              <label class="common" for="subsid">Amount Subsidized:</label>
              <input
                class="numbers-half"
                id="subsid"
                name="subsid"
                type="number"
                min="0"
              />
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
            (neeuro ||
              checker ||
              checker2 ||
              checker3 ||
              checker4 ||
              checker5) &&
            (no || subsidy) &&
            ses.length > 0 &&
            adm &&
            latestscore
          "
        >
          <!-- <section> -->
          <div>
            <label class="common">Applicable Fee (excluding GST):</label>
            <div class="formed">
              <div class="formed gap">
                <input
                  id="80"
                  name="cbfees"
                  type="checkbox"
                  value="80"
                  v-model="fees1"
                />
                <label class="gapped text-small" for="80"
                  >Centre-based 3-HR FOW group session [$80]</label
                >
              </div>
              <div class="formed gap">
                <input
                  id="90"
                  name="cbfees"
                  type="checkbox"
                  value="90"
                  v-model="fees2"
                />
                <label class="gapped text-small" for="90"
                  >Centre-based 1.5-HR one-to-one FOW session [$90]</label
                >
              </div>
              <div class="formed gap">
                <input
                  id="256"
                  name="cbfees"
                  type="checkbox"
                  value="256"
                  v-model="fees3"
                />
                <label class="gapped text-small" for="256"
                  >Centre-based NeeuroFIT 6 months subcription [$240]</label
                >
              </div>
              <div class="formed gap">
                <input
                  id="sgp"
                  name="cbfees"
                  type="checkbox"
                  value="sgp"
                  v-model="fees4"
                />
                <label class="gapped text-small" for="sgp"
                  >Centre-based 3-HR CIP trial run [S'porean]</label
                >
              </div>
              <div class="formed gap gapbot">
                <input
                  id="prfees"
                  name="cbfees"
                  type="checkbox"
                  value="prfees"
                  v-model="fees5"
                />
                <label class="gapped text-small" for="prfees"
                  >Centre-based 3-HR CIP trial run [PR]</label
                >
              </div>
              <div class="formed gap">
                <input
                  id="hb90"
                  name="hbfees"
                  type="checkbox"
                  value="hb90"
                  v-model="fees6"
                />
                <label class="gapped text-small" for="hb90"
                  >Home-based 1-HR one-to-one FOW session(incl. transport)
                  [$90]</label
                >
              </div>
              <div class="formed gap">
                <input
                  id="hb120"
                  name="hbfees"
                  type="checkbox"
                  value="hb120"
                  v-model="fees7"
                />
                <label class="gapped text-small" for="hb120"
                  >Home-based 1.5-HR one-to-one FOW session(incl. transport)
                  [$120]</label
                >
              </div>
              <div class="formed gap">
                <input
                  id="hb150"
                  name="hbfees"
                  type="checkbox"
                  value="hb150"
                  v-model="fees8"
                />
                <label class="gapped text-small" for="hb150"
                  >Home-based 2-HR one-to-one FOW session(incl. transport)
                  [$150]</label
                >
              </div>
              <div class="formed gap gapbot">
                <input
                  id="hb902"
                  name="hbfees"
                  type="checkbox"
                  value="hb902"
                  v-model="fees9"
                />
                <label class="gapped text-small" for="hb902"
                  >Home-based 1-HR FOW session via video calls [$90]</label
                >
              </div>
              <div class="formed gap">
                <input
                  id="50"
                  name="other-fees"
                  type="checkbox"
                  value="50"
                  v-model="fees10"
                />
                <label class="gapped text-small" for="50">One-time Assessment [$50]</label>
              </div>
              <div class="formed gap">
                <input
                  id="refund"
                  name="other-fees"
                  type="checkbox"
                  value="refund"
                  v-model="fees11"
                />
                <label class="gapped text-small" for="refund"
                  >Refundable One-Month Deposit (4 X applicable fee)</label
                >
              </div>
              <div class="gapright row">
                <div class="gap col-sm-6">
                  <label class="common" for="receipt">Official Receipt:</label>
                  <input
                    class="numbers"
                    id="receipt"
                    name="receipt"
                    type="text"
                  />
                </div>
                <div class="gap col-sm-6">
                  <label class="common" for="collect"
                    >Amount Collected [in SGD($)]:</label
                  >
                  <input
                    v-model="amtcollect"
                    class="numbers"
                    id="collect"
                    name="collect"
                    type="text"
                    readonly="readonly"
                  />
                </div>
              </div>
              <label class="common gap" for="cash">Mode of Payment: </label>
              <div class="row">
                <div class="col-md-3">
                  <input id="cash" name="payment" type="radio" value="cash" />
                  <label for="cash">&nbsp;Cash</label>
                </div>
                <div class="col-md-3">
                  <input
                    id="paynow"
                    name="payment"
                    type="radio"
                    value="paynow"
                  />
                  <label for="paynow">&nbsp;PayNow</label>
                </div>
                <div class="col-md-3">
                  <input
                    id="e-bank"
                    name="payment"
                    type="radio"
                    value="e-bank"
                  />
                  <label for="e-bank">&nbsp;Internet Banking</label>
                </div>
                <div class="col-md-3">
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
      subs1: true,
      subs2: false,
      subs3: false,
      subs4: false,
      edulev: "",
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
      un: false,
      unpoint: 0,
      ov: false,
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
      eq1: 0,
      eq2: 0,
      eq3: 0,
      eq4: 0,
      eq5: 0,
    };
  },
  methods: {
    revert() {
      this.subsidy = null;
    },
  },
  watch: {
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
    cn(value){
      if(value === true){
        this.en = false;
      }
    },
    en(value){
      if(value === true){
        this.cn = false;
      }
    },
    un(value){
      if(value === true){
        this.ov = false;
        this.unpoint = 1;
      }
      else{
        this.unpoint = 0;
      }
    },
    ov(value){
      if(value === true){
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
      let length2 = this.vis15.length;
      let length3 = this.vis16.length;
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
        parseInt(this.vis13) +
        parseInt(this.vis14) +
        length2 +
        length3 +
        this.unpoint
      );
    },
    eq5dcounter: function(){
      return (
        parseInt(this.eq1) +
        parseInt(this.eq2) +
        parseInt(this.eq3) +
        parseInt(this.eq4) +
        parseInt(this.eq5) 
      );
    },
  },
};

//font: roboto
</script>

<style lang="scss" scoped>
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
  .text-small{
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
