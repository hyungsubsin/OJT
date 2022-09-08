import '../../../env';
import axios from 'axios';
import mongoose, { AnyExpression } from 'mongoose';
import Childcarecenter from '../schemas/childcarecenter';
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
        const hash = await hashed(value);
        value.hash = hash;
        await updateList.push({
          updateOne: {
            filter: { hash: value.hash },
            update: value,
            upsert: true,
          },
        });
      }
    }
    await Childcarecenter.bulkWrite(updateList);
  } catch (error) {
    console.error(error);
  }
};

const hashed = async (data: any) => {
  return crypto.createHmac('sha256', 'mysecretkey').update(`${data.name}${data.lng}${data.lat}`).digest('hex');
};

export default { getChildCareCenterData };
