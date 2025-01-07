import express from 'express';
import init from "./init/router.mjs";
import cara from "./cara/router.mjs";
import nric from "./nric/router.mjs";
import associate from "./associate/router.mjs"
import invoice from './invoice/router.mjs'
import sharepoint from './sharepoint/router.mjs'

const router = express.Router({mergeParams:true});

router.use("/init",init);
router.use("/cara",cara);
router.use("/nric",nric);
router.use("/associate",associate);
router.use("/invoice",invoice);
router.use("/sharepoint",sharepoint);

export default router