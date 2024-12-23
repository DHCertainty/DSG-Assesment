import express from 'express';
import init from "./init/router.mjs";
import cara from "./cara/router.mjs";
import nric from "./nric/router.mjs";
import associate from "./associate/router.mjs"
import invoice from './invoice/router.mjs'
import email from './email/router.mjs'

const router = express.Router({mergeParams:true});

router.use("/init",init);
router.use("/cara",cara);
router.use("/nric",nric);
router.use("/associate",associate);
router.use("/invoice",invoice);
router.use("/sendEmail",email)

export default router