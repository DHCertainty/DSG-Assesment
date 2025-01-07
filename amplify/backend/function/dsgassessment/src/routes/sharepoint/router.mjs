import get from "./get.mjs";
import express from 'express';

const router = express.Router({mergeParams:true});

router.get("/",get);

export default router