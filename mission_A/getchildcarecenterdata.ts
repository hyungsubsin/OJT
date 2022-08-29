import '../env';
import axios from 'axios';
import mongoose, { AnyExpression } from 'mongoose';
import Childcarecenter from '../schemas/childcarecenter';

const getChildCareCenterData = async () => {
  try {
    const baseURL = process.env.baseUrl!;
    const size = 10000;
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
    let updateData: any = [];
    let insertData: any = [];
    let i = 0;
    console.time('time');
    while (dataList.data.next) {
      let cursor = dataList.data.next;
      dataList = await axios.get(`${dataListURL}/?cursor=${cursor}&size=${size}`);
      const centerList = dataList.data.results;
      for (const value of centerList) {
        const existData = await Childcarecenter.findOne({ lng: value.lng, lat: value.lat });
        if (existData) {
          await updateData.push(existData);
        } else {
          await insertData.push(value);
          i++;
          console.log(i);
        }
      }
    }

    await Childcarecenter.insertMany(insertData);
    for (const value of updateData) {
      await Childcarecenter.findOneAndUpdate({ lng: value.lng, lat: value.lat }, value);
    }
    console.timeEnd('time');
    // const existData = await Childcarecenter.find()

    // await Childcarecenter.bulkWrite(updateList);
  } catch (error) {
    console.error(error);
  }
};

export default { getChildCareCenterData };
