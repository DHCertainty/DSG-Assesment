/* eslint-disable */

import * as html2pdf from 'html2pdf.js';
import logo from '../assets/logo.png';

export default function generatePDF(data) {
    console.log(data);
    const printContent = `
        <html>
        <head>
            <meta charset="UTF-8">
            <title>${data.name}</title>
            <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap" rel="stylesheet">
            <style>
                body {
                    font-family: 'Noto Sans', Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }

                .header {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 100px;
                    background-color:white;
                    color: black;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                 
                }

                .header img {
                    width: 100px;
                }

                .header h1 {
                    margin-top: 10px;
                    font-size: 15px;
                    font-weight: bold;
                }

                .content {
                    padding: 20px;
                }

                .section {
                    margin-top: 20px;
                    padding: 10px;
                    page-break-inside: avoid;
                }

                .section-header {
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 10px;
                    background-color: #f9f9f9;
                    padding: 5px;
                    color: #333;
                    border-bottom: 1px solid #ccc;
                }
                .section:nth-child(3) .section-header {
                    background-color: #f9f9f9;
                    padding: 5px;
                    color: #333;
                    margin-top: 100px;
                }
                .section:nth-child(4) .section-header {
                    margin-top: 100px;
                }
                .section:nth-child(5) .section-header {
                    margin-top: 100px;
                }
                .section:nth-child(6) .section-header {
                    margin-top: 100px;
                }
                  

                
                .section p {
                    margin: 0;
                    padding: 5px 0;
                    border: 1px solid #ccc;
                }
                .uploaded-image-moca {
                    width:120px;
                    height: auto;
                    margin: 10px 0;
                }
                .signature-cont {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .signature {
                    width: 200px;
                    height: 100px;
                    text-align: center;
                }
                .signature img {
                    width: 100%;
                    height: auto;
                }
                .signature-caption {
                    margin-top: 5px;
                    font-size: 12px;
                    font-weight: bold;
                }

                .footer {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 30px;
                    background-color: white;
                    border-top: 1px solid #ccc;
                    text-align: center;
                    font-size: 10px;
                    padding: 5px 0;
                    z-index: 1000;
                }

                @media print {
                    @page {
                        margin: 20mm;
                        
                    }

                    .header {
                        position: fixed;
                        top: 0;
                        border-bottom: 1px solid #ccc;
                        margin-top: 0;
                        margin-bottom: 20px;
                    }

                    .footer {
                        position: fixed;
                        bottom: 0;
                    }

                    body {
                        margin: 0;
                    }

                    .content {
                        margin-top: 100px; 
                    }
                    @page {
                        @bottom-left {
                            content: counter(page) ' of ' counter(pages);
                            }
                    }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <img src="${logo}" alt="logo" />
                <h1>${data.name} for ${data.clientName}</h1>
            </div>
            <div class="content">
                <div class="section">
                    <div class="section-header">General Details</div>
                    <p>Client Name: ${data.clientName}</p>
                    <p>Client NRIC: ${data.clientNRIC}</p>
                    <p>Caregiver Name: ${data.caregiverName?.crb5c_name}</p>
                    <p>Caregiver Relationship: ${data.caregiverRelationship}</p>
                    <p>Date of Assessment: ${data.dateofassessment}</p>
                    <p>Admission Date: ${data.admissiondate}</p>
                </div>
                <div class="section">
                    <div class="section-header">Assessment Details</div>
                    <p>Type of Dementia: ${data.typeofdementia}</p>
                    <p>Stage of Dementia: ${data.stageofdementia}</p>
                    <p>AMT Score: ${data.amtscore}</p>
                   <p>MOCA Score: ${data.mocascore}</p>
                    <p>MMSE Score: ${data.mmsescore}</p>
                    <p>Date Done: ${data.datedone}</p>
                    <p>Shared Centre Objectives Programme: ${data.sharedcentreobjectivesprogramme ? 'Yes':'No'}</p>
                    <p>Watched Centre Video: ${data.watchedcentrevideo ? 'Yes' : 'No'}</p>
                    <p>Played Tabletop Game: ${data.playedtabletopgame ? 'Yes' : 'No'}</p>
                </div>
                <div class="section">
                    <div class="section-header">Score of Neurofit</div>
                    <p>Attention Game: ${data.attentiongame}</p>
                    <p>Attention Level: ${data.attentionlevel}</p>
                    <p>Spatial Game: ${data.spatialgame}</p>
                    <p>Spatial Level: ${data.spatiallevel}</p>
                    <p>Decision Game: ${data.decisiongame}</p>
                    <p>Decision Level: ${data.decisionlevel}</p>
                    <p>Memory Game: ${data.memorygame}</p>
                    <p>Memory Level: ${data.memorylevel}</p>
                    <p>Flexibility Game: ${data.flexibilitygame}</p>
                    <p>Flexibility Level: ${data.Flexibilitylevel}</p>
                </div>
                <div class="section">
                    <div class="section-header">Moca Score</div>
                    <p>Education Level: ${data.educationlevel}</p>
                    <p>Education Year: ${data.educationYear}</p>
                    ${data.uploadedImageTrailMaking ? `<img class="uploaded-image-moca" src="${data.uploadedImageTrailMaking}" alt="Trail Making" />` : ''}
                    <p>Trail Making: ${data.trailMaking}</p>
                    ${data.uploadedImageCopyCube ? `<img class="uploaded-image-moca" src="${data.uploadedImageCopyCube}" alt="Copy Cube" />` : ''}
                    <p>Copy Cube: ${data.copyCube}</p>
                    ${data.uploadedImageDrawClock ? `<img class="uploaded-image-moca" src="${data.uploadedImageDrawClock}" alt="Draw Clock" />` : ''}
                    <p>Draw Clock: ${data.drawClock}</p>
                    <p>Named Lion: ${data.nameLion}</p>
                    <p>Named Elephant: ${data.nameElephant}</p>
                    <p>Named Camel: ${data.nameCamel}</p>
                    
                    
                </div>
                <div class="section">
                    <div class="section-header">Moca Score</div>
                    <h6>Attention Game</h6>
                    <p>Repeat Forward: ${data.attentionGame.repeatForward}</p>
                    <p>Repeat Backward: ${data.attentionGame.repeatBackward}</p>
                    <p>Able to Tap: ${data.attentionGame.ableToTap}</p>
                    <p>Serial 7 Subtraction: ${data.attentionGame.serial7Subtraction}</p>
                    <h6>Language Game</h6>
                    <p>Repeat First Sentence: ${data.languageGame.repeatFirstSentence}</p>
                    <p>Repeat Second Sentence: ${data.languageGame.repeatSecondSentence}</p>
                    <p>Fluency: ${data.languageGame.fluency}</p>
                    <h6>Abstraction Game</h6>
                    <p>Similarity Train Bicycle: ${data.abstractionGame.similarityTrainBicycle}</p>
                    <p>Similarity Watch Ruler: ${data.abstractionGame.similarityWatchRuler}</p>
                    <p>Delayed Recall: ${data.delayedRecall}</p>
                    <p>Orientation: ${data.orientation}</p>
                </div>

                    
                    

                <div class="section">
                    <div class="section-header">EQ5D5L Score</div>
                    <p>EQ Mobility: ${data.eqmobility}</p>
                    <p>EQ Self Care: ${data.eqselfcare}</p>
                    <p>EQ Usual Activities: ${data.equsualactivities}</p>
                    <p>EQ Pain/Discomfort: ${data.eqpaindiscomfort}</p>
                    <p>EQ Anxiety/Depression: ${data.eqanxietydepression}</p>
                    <p>EQ Health Scale: ${data.eqhealthscale}</p>
                </div>
                <div class="section">
                    <div class="section-header">Comments</div>
                    <p>${data.commentsaboutclient}</p>
                </div>
                <!--
                <div class="section ">
                    <div class="section-header">Signature</div>
                    <div class="signature-cont">
                        <div class="signature">
                            <img src="${data.staffSignature}" alt="Staff Signature" />
                            <p>Staff Signature</p>
                        </div>
                        <div class="signature">
                            <img src="${data.caregiverSignature}" alt="Caregiver Signature" />
                            <p>Caregiver Signature</p>
                        </div>
                    </div>
                </div>
                -->
            </div>
            <div class="footer">
                
            </div>
        </body>
        </html>
    `;

    const printWindow = window.open("", "_blank", "width=800,height=600");
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    
}

