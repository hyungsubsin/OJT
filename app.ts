import './env';
import express from 'express';
import mongoose from 'mongoose';
import router from './mission_C/routes/index';
import './mission_A/scheduler';
import path from 'path';
import Childcarecenter from './schemas/childcarecenter';

const app = express();
const mongoUrl = process.env.mongoUrl!;
const port = process.env.port!;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

mongoose
  .connect(mongoUrl, { autoIndex: false })
  .then(() => {
    console.log('connected to mongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(router);

// app.get('/', (req, res) => {
//   res.render('index');
// });

// app.get('/:id', async (req, res, next) => {
//   const { id } = req.params;
//   const data = await Childcarecenter.findOne({ id });
//   if (!data) {
//     next(new Error('Data notfound!'));
//     return;
//   }
//   res.render('/data', { data });
// });

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
