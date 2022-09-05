import { Schema, model, connect } from 'mongoose';
import { Childcarecenter } from '../interfaces/childcarecenter';
import bcrypt from 'bcrypt';

const childcarecenterSchema = new Schema(
  {
    name: { type: String, required: true },
    cellPhone: String,
    homePageUrl: String,
    childrenCount: Number,
    startAt: String,
    use_naver_coord: Boolean,
    address: String,
    lng: { type: Number, required: true, index: true },
    lat: { type: Number, required: true, index: true },
    hash: String,
  },
  { timestamps: true },
);

childcarecenterSchema.pre<Childcarecenter>('save', function (next) {
  console.log('hello');
  const childcarecenter: any = this;
  const saltRounds = 10;
  const value = `${childcarecenter.name}${childcarecenter.lng}${childcarecenter.lat}`;
  bcrypt.hash(value, saltRounds, (err, hash) => {
    if (err) {
      next(err);
    } else {
      childcarecenter.hash = hash;
      next();
    }
  });
});

const hash = async (value: string, saltRounds: number) => {
  try {
    return await bcrypt.hash(value, saltRounds);
  } catch (err) {
    console.error(err);
  }
};
const Childcarecenter = model<Childcarecenter>('Childcarecenter', childcarecenterSchema);

export default Childcarecenter;
