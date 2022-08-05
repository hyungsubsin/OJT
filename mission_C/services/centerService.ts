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
const addChildCareCenter = async (data: ChildcarecenterDTO) => {
  try {
    const center = new Childcarecenter(data);
    return center.save();
  } catch (err) {
    console.error(err);
  }
};
const modifyChildCareCenter = async (id: string, data: any) => {
  try {
    const objectId = new mongoose.Types.ObjectId(id);
    return await Childcarecenter.findByIdAndUpdate({ _id: objectId }, data);
  } catch (err) {
    console.error(err);
  }
};

const deleteChildCareCenter = async (id: string) => {
  try {
    const objectId = new mongoose.Types.ObjectId(id);
    return await Childcarecenter.deleteOne({ _id: objectId });
  } catch (err) {
    console.error(err);
  }
};

export default { getChildCareCenter, addChildCareCenter, modifyChildCareCenter, deleteChildCareCenter };
