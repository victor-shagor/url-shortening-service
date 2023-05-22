import { Router, Request, Response } from "express";
import { encode } from "../controllers/urlShortner";
import { validateUrl } from "../utils/validations";

const router = Router();

router.post("/encode", async (req: Request, res: Response) => {
  try {
    const { originalUrl } = req.body;
    
    //validate url provided
    if (!validateUrl(originalUrl)) {
      return res.status(400).json({
        message: "kindly provide a valid url",
        error: true,
      });
    }

    //create and return short url
    const shortUrl = await encode(originalUrl);
    return res
      .status(201)
      .json({ message: "short url created succesfully", data: {shortUrl} });
  } catch (error) {
    //catch and return error
    return res.status(500).json({
      message: "error creating a short url, try again later",
      error: true,
    });
  }
});

export default router;
