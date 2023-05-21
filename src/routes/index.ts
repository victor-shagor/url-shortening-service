import { Router, Request, Response } from "express";

const router = Router();

router.post(
  "/encode",
  function (req: Request, res: Response) {
    res.send(true)
  }
);

export default router
