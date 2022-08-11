import './env';
import express from 'express';
import mongoose from 'mongoose';
import router from './mission_C/routes/index';
import './mission_A/scheduler';

const app = express();
const mongoUrl = process.env.mongoUrl!;
const port = process.env.port!;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', './views');

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('connected to mongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(router);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
