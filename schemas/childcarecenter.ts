import { Schema, model, connect } from 'mongoose';
import { Childcarecenter } from '../interfaces/childcarecenter';

const childcarecenterSchema = new Schema(
  {
    name: { type: String, required: true, index: true },
    cellPhone: String,
    homePageUrl: String,
    childrenCount: Number,
    startAt: String,
    use_naver_coord: Boolean,
    address: String,
    lng: Number,
    lat: Number,
  },
  { timestamps: true },
);

const Childcarecenter = model<Childcarecenter>('Childcarecenter', childcarecenterSchema);

export default Childcarecenter;
