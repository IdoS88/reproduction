import express from 'express';
import fileUpload from "express-fileupload";
import cors from "cors";
import bodyParser from "body-parser";

import project from "./routes/project";

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.use(fileUpload({
  createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(morgan('dev'));

app.use("/project", project);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
