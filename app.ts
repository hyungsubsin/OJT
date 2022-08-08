import './env';
import express from 'express';
import mongoose from 'mongoose';
import router from './mission_C/routes/index';

const app = express();
const mongoUrl = process.env.mongoUrl!;
const port = process.env.port!;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('connected to mongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(router);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
