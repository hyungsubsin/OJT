import { Schema, model, connect } from 'mongoose';
import { Childcarecenter } from '../interfaces/childcarecenter';

const childcarecenterSchema = new Schema({
  name: { type: String, required: true },
  cellPhone: { type: String, required: true },
  homePageUrl: String,
  childrenCount: Number,
  startAt: String,
  use_naver_coord: { type: Boolean, required: true },
  address: String,
  lng: { type: Number, required: true },
  lat: { type: Number, required: true },
});

const Childcarecenter = model<Childcarecenter>('Childcarecenter', childcarecenterSchema);

export default Childcarecenter;
