// js/asset/units/unitsBeetle/beetleWispLevel.js
let piplWispImg = "../../img/units/pipl/piplWisp/blue/piplWispBlue.png";

// 
window.unitsRegistry = window.unitsRegistry || {};

window.unitsRegistry["pipl:wisp"] = {
  baseUnitKey: "pipl:wisp",
  race: "pipl",
  role: "wisp",
  name: "Вісп",
  img: "../../img/units/pipl/piplWisp/blue/piplWispBlue.png",

  maxLevel: 8,

  levels: {
    1: { hp: 1000, armor: 7, attack: 60, step: 6, range: 1, coin: 250, upgradeCost: 55 },
    2: { hp: 1000, armor: 9, attack: 60, step: 6, range: 1, coin: 250, upgradeCost: 68 },
    3: { hp: 134, armor: 11, attack: 54, step: 4, range: 3, coin: 250, upgradeCost: 223 },
    4: { hp: 144, armor: 14, attack: 57, step: 4, range: 3, coin: 250, upgradeCost: 400 },
    5: { hp: 154, armor: 17, attack: 60, step: 4, range: 3, coin: 250, upgradeCost: 400 },
    6: { hp: 156, armor: 20, attack: 62, step: 4, range: 3, coin: 250, upgradeCost: 400 },
    7: { hp: 156, armor: 23, attack: 65, step: 4, range: 3, coin: 250, upgradeCost: 400 },
    8: { hp: 156, armor: 26, attack: 65, step: 4, range: 3, coin: 250, upgradeCost: null }
  },

  abilities: [
    // { key: "arrowShot", power: 200}
  ]
};