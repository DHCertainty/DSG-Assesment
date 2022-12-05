import express from 'express';
import get from "./get.mjs";
const router = express.Router({mergeParams:true});

router.use("/:nric", get);

export default router