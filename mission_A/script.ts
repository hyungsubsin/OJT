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
    let updateList: any = [];

    while (dataList.data.next) {
      let cursor = dataList.data.next;
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
      await Childcarecenter.bulkWrite(updateList);
    }
  } catch (error) {
    console.error(error);
  }
};

export default { getChildCareCenterData };
