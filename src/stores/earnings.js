import moment from 'moment';
import { defineStore } from 'pinia';

const masterData = [
  ['November 2023', 40],
  ['December 2023', 50],
  ['January 2024',30],
  ['February 2024',70],
];
// todo: calculate total from data/masterData
// this hardcoded total is just to show the state management
const totalEarningDefault = 190; 

export const useEarningsStore = defineStore('earning', () => {
  const totalEarnings = ref(totalEarningDefault)
  const data = reactive(masterData);

  const updateEarning = (earningObj) => {
    // earningObj: {datetime: Date.now(), earning: float}
    // assumption: the last item in data is the last month year, check only the last one
    console.log('pusher new data', earningObj)
    const monthYearFromPusher = moment(earningObj.datetime).format("MMMM YYYY")
    const newEarning = earningObj.earning
    if (data.length) {
      const lastItem = data[data.length-1];
  
      if (lastItem[0] == monthYearFromPusher) {
        lastItem[1] = parseInt(lastItem[1] + newEarning)
      } else {
        data.push([monthYearFromPusher, newEarning])
      }
    } else {
      data.push([monthYearFromPusher, newEarning])
    }
    // update the totalEarnings
    totalEarnings.value = parseInt(totalEarnings.value + newEarning)
  }

  return { totalEarnings, data, updateEarning }
})
