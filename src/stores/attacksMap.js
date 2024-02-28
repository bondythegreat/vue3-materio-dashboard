
import { defineStore } from 'pinia';

const locationsData = [
  {
    id: 0,
    name: "Jakarta",
    lngLat: [106.886684, -6.203189], //jkt
  },
  {
    id: 1,
    name: "Surabaya",
    lngLat: [112.625297, -7.337780], //sby
  },
  {
    id: 2,
    name: "Padang",
    lngLat: [100.455900, -0.888183], //pdg
  },
  {
    id: 3,
    name: "Jogjakarta",
    lngLat: [110.371832, -7.777483], //jog
  },
  {
    id: 4,
    name: "Labuan Bajo",
    lngLat: [119.897568, -8.604954], //lbj
  },
  {
    id: 5,
    name: "Balikpapan",
    lngLat: [116.831393, -1.234536], //bpp
  },
]

const attackListData = [
  {
    from: 0,
    to: 3,
  },
  {
    from: 0,
    to: 4,
  },
  {
    from: 0,
    to: 5,
  },
  {
    from: 1,
    to: 4,
  },
  {
    from: 2,
    to: 5,
  },
];

export const useAttackMapStore = defineStore('attackMap', () => {
  const locations = ref(locationsData)
  const attackList = ref(attackListData)

  const getFinalAttackList = () => {
    return attackList.value.map(item => {
      console.log(item)
      
      return {
        from: locationsData[item.from],
        to: locationsData[item.to],
      }
    });
  };

  return { locations, attackList, getFinalAttackList }
})
