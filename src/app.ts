import express from "express";
import cors from "cors";

import apiRoute from "./routes";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json())

app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});

app.use("/api", apiRoute);


app.get('/', (req, res) => res.status(200).send({ success: true, message: 'Welcome to url shortener api' }));

app.use("*", (req, res) =>
  res.status(404).json({
    success: false,
    error: "route not found",
  })
);

export default app
