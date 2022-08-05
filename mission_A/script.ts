import axios from 'axios';
import mongoose from 'mongoose';
import Childcarecenter from '../schemas/Childcarecenter';

const getChildCareCenterData = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/childcarecenter');
    const baseURL = 'https://data-api.myfranchise.kr/v1';
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
    let centerList: any[] = [];
    while (dataList.data.next) {
      let cursor = dataList.data.next;
      dataList = await axios.get(`${dataListURL}/?cursor=${cursor}&size=${size}`);
      dataList.data.results.forEach((value: any) => {
        centerList.push({
          name: value.name,
          cellPhone: value.cellPhone,
          homePageUrl: value.homePageUrl,
          childrenCount: value.childrenCount,
          startAt: value.startAt,
          use_naver_coord: value.use_naver_coord,
          address: value.address,
          lng: parseFloat(value.lng),
          lat: parseFloat(value.lat),
        });
      });
    }

    await Childcarecenter.insertMany(centerList).then((error) => console.error(error));
  } catch (error) {
    console.error(error);
  }
};

// getChildCareCenterData();
