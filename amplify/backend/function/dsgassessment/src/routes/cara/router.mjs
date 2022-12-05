import express from 'express';
import get from "./get.mjs";
const router = express.Router({mergeParams:true});

router.use("/:cara_id", get);

export default router