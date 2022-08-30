import '../env';
import axios from 'axios';
import mongoose, { AnyExpression } from 'mongoose';
import Childcarecenter from '../schemas/childcarecenter';

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
    console.time('time');
    while (dataList.data.next) {
      let cursor = dataList.data.next;
      dataList = await axios.get(`${dataListURL}/?cursor=${cursor}&size=${size}`);
      const centerList = dataList.data.results;
      await Promise.all(
        centerList.map(async (data: any) => {
          const existData = await findExistData(data);
          if (existData) {
            await updateExistData(data);
            console.log('update 완료');
          } else {
            await insertData(data);
            console.log('insert 완료');
          }
        }),
      );
    }
    console.log('전체 로직 수행 완료');
    console.timeEnd('time');
  } catch (error) {
    console.error(error);
  }
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
