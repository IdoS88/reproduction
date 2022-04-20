import express from 'express';
import project from "./routes/project";

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.use("/project", project);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});