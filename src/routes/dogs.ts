import { Router, RequestHandler } from "express";

const router = Router();

import { getDogs } from "../controller/dog";

router.get('/', getDogs);


export default router;