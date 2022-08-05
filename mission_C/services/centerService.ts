import Childcarecenter from '../../schemas/Childcarecenter';
import { ChildcarecenterDTO } from '../../interfaces/Childcarecenter';
import mongoose from 'mongoose';

const getChildCareCenter = async () => {
  try {
    return await Childcarecenter.find({});
  } catch (err) {
    console.error(err);
  }
};

export default { getChildCareCenter };
