import Childcarecenter from '../../schemas/childcarecenter';
import { ChildcarecenterDTO } from '../../interfaces/childcarecenter';
import mongoose from 'mongoose';
import * as terraformer from 'terraformer-wkt-parser';
import script from '../../mission_A/script';
import { AnyAaaaRecord } from 'dns';

mongoose.Schema.Types.Boolean.convertToFalse.add('');

const getRecentData = async () => {
  try {
    return await script.getChildCareCenterData();
  } catch (err) {
    console.error(err);
  }
};

const getNumberOfChildCareCenterIn = async (city: string) => {
  try {
    const number = await Childcarecenter.countDocuments({
      address: { $regex: `.*${city}.*` },
    });
    return number;
  } catch (err) {
    console.error(err);
  }
};

const getCenterInCoordinate = async (lng: number, lat: number, distance: number) => {
  try {
    const data = await Childcarecenter.aggregate([
      {
        $addFields: {
          location: ['$lng', '$lat'],
        },
      },
      {
        $match: {
          location: {
            $geoWithin: {
              $centerSphere: [[lng, lat], distance / 6378.1],
            },
          },
        },
      },
    ]);
    return data;
  } catch (err) {
    console.error(err);
  }
};

const getCenterInMultiPolygon = async (multiPolygon: any) => {
  try {
    const geoJson = terraformer.parse(multiPolygon);
    const type = Object.values(geoJson)[0];
    const coordinates = Object.values(geoJson)[1];
    const centerData = await Childcarecenter.aggregate([
      {
        $addFields: {
          lct: ['$lng', '$lat'],
        },
      },
      {
        $match: {
          lct: {
            $geoWithin: {
              $geometry: {
                type: type,
                coordinates: coordinates,
              },
            },
          },
        },
      },
    ]);
    return centerData;
  } catch (err) {
    console.error(err);
  }
};

const getChildCareCenter = async () => {
  try {
    return await Childcarecenter.find({}).limit(10).lean();
  } catch (err) {
    console.error(err);
  }
};

const getOneChildCareCenter = async (id: string) => {
  try {
    const objectId = new mongoose.Types.ObjectId(id);
    return await Childcarecenter.findById(objectId);
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

export default {
  getRecentData,
  getNumberOfChildCareCenterIn,
  getCenterInCoordinate,
  getCenterInMultiPolygon,
  getChildCareCenter,
  getOneChildCareCenter,
  addChildCareCenter,
  modifyChildCareCenter,
  deleteChildCareCenter,
};
