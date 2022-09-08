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
    hash: { type: String, required: true, index: true },
  },
  { timestamps: true },
);

const Childcarecenter = model<Childcarecenter>('Childcarecenter', childcarecenterSchema);
export default Childcarecenter;
