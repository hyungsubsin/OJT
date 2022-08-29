import './env.ts';
import express from 'express';
import mongoose from 'mongoose';
import router from './mission_C/routes/index';
import './mission_A/scheduler';
import path from 'path';
import Childcarecenter from './schemas/childcarecenter';
import methodOverride from 'method-override';

const app = express();
const mongoUrl = process.env.mongoUrl!;
const port = process.env.port!;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

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
