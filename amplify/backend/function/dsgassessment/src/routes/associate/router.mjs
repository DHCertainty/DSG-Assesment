import express from 'express';
import post from "./post.mjs";
const router = express.Router({mergeParams:true});

router.route("/")
.post(post)


export default router