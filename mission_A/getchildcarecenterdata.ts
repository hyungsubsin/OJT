import '../env';
import axios from 'axios';
import mongoose, { AnyExpression } from 'mongoose';
import Childcarecenter from '../schemas/childcarecenter';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const getChildCareCenterData = async () => {
  try {
    const baseURL = process.env.baseUrl!;
    const size = 1000;
    const recentVersionData = await axios.get(`${baseURL}/school/childcare/latest`);
    let version = recentVersionData.data.id;
    const nextVersionData = await axios.get(`${baseURL}/school/childcare/${version}/next`, {
      validateStatus: () => true,
    });
    if (nextVersionData.data.id) {
      version = nextVersionData.data.id;
    } // 업데이트가 있을 시 해당 버전으로 id 변경
    const dataListURL = `${baseURL}/school/childcare/${version}`;
    let dataList = await axios.get(dataListURL);
    let updateList: any = [];
    console.time('time');
    while (dataList.data.next) {
      let cursor = dataList.data.next;
      console.time('array time');
      dataList = await axios.get(`${dataListURL}/?cursor=${cursor}&size=${size}`);
      const centerList = dataList.data.results;

      for (const value of centerList) {
        await updateList.push({
          updateOne: {
            filter: { lng: value.lng, lat: value.lat },
            update: value,
            upsert: true,
          },
        });
      }

      console.timeEnd('array time');
    }
    console.time('write time');
    const saltRounds = 10;
    console.time('hash');
    await Promise.all(
      updateList.map(async (value: any) => {
        const data = value.updateOne.update;
        const hash = await hashed(data);
        value.updateOne.update.hash = hash;
      }),
    );
    console.timeEnd('hash');
    await Childcarecenter.bulkWrite(updateList);
    console.timeEnd('write time');
    console.log('전체 로직 수행 완료');
    console.timeEnd('time');
  } catch (error) {
    console.error(error);
  }
};

const hashed = async (data: any) => {
  return crypto.createHmac('sha256', 'mysecretkey').update(`${data.name}${data.lng}${data.lat}`).digest('hex');
  //   return await bcrypt.hash(`${data.name}${data.lng}${data.lat}`, saltRounds);
};

const findExistData = async (data: any) => {
  try {
    return await Childcarecenter.findOne({ lng: data.lng, lat: data.lat });
  } catch (err) {
    console.error(err);
  }
};

const updateExistData = async (data: any) => {
  try {
    return await Childcarecenter.findOneAndUpdate({ lng: data.lng, lat: data.lat }, data);
  } catch (err) {
    console.error(err);
  }
};

const insertData = async (data: any) => {
  try {
    const newData = new Childcarecenter(data);
    return newData.save();
  } catch (err) {
    console.error(err);
  }
};

export default { getChildCareCenterData };
