import express from 'express';
import mongoose from 'mongoose';
import router from './mission_C/routes/index';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect('mongodb://localhost:27017/childcarecenter')
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
