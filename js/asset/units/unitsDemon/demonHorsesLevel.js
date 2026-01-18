// js/asset/units/unitsOrc/warrior/orcLevel.js
let demonHorsesImg = "../../img/units/demon/demonHorse/red/demonHorseRed.png";
// ельфи - Воїн (8 рівнів)
  //   let demonHorsesLevels = {
  //   level1: {
  //     unitId: "demon401", // Унікальний ID юніта (1XX - орки воїни)
  //     level: 1,
  //     name: "Гонча",
  //     hp: 135,
  //     armor: 22,
  //     attack: 55,
  //     step: 4,
  //     range: 1,
  //     coin: 350,
  //     upgradeCost: 221,
  //     description: "Сильний воїн з важкою сокирою",
  //     img: demonHorsesImg,
  //     abilities: [
  //       // { key: "arrowShot", power: 200},
  //     ],
  //     effects: []
  //   },
  //   level2: {
  //     unitId: "demon402",
  //     level: 2,
  //     name: "Гонча", // Те саме ім'я!
  //     hp: 145,
  //     armor: 23,
  //     attack: 62,
  //     step: 4,
  //     range: 1,
  //     coin: 350,
  //     upgradeCost: 222,
  //     description: "Загартований в боях воїн",
  //     img: demonHorsesImg,
  //     abilities: [
  //       // { key: "arrowShot", power: 250},
  //       // { key: "rage", power: 100},
  //     ],
  //     effects: []
  //   },
  //   level3: {
  //     unitId: "demon403",
  //     level: 3,
  //     name: "Гонча",
  //     hp: 155,
  //     armor: 25,
  //     attack: 69,
  //     step: 5,
  //     range: 1,
  //     coin: 350,
  //     upgradeCost: 223,
  //     description: "Майстер бойової сокири",
  //     img: demonHorsesImg,
  //     abilities: [
  //       // { key: "arrowShot", power: 300},
  //       // { key: "rage", power: 150},
  //     ],
  //     effects: []
  //   },
  //   level4: {
  //     unitId: "demon404",
  //     level: 4,
  //     name: "Гонча", // Те саме ім'я!
  //     hp: 155,
  //     armor: 27,
  //     attack: 72,
  //     step: 5,
  //     range: 1,
  //     coin: 350,
  //     upgradeCost: 400,
  //     description: "Загартований в боях воїн",
  //     img: demonHorsesImg,
  //     abilities: [
  //       // { key: "arrowShot", power: 250},
  //       // { key: "rage", power: 100},
  //     ],
  //     effects: []
  //   },
  //   level5: {
  //     unitId: "demon405",
  //     level: 5,
  //     name: "Гонча", // Те саме ім'я!
  //     hp: 165,
  //     armor: 29,
  //     attack: 75,
  //     step: 5,
  //     range: 1,
  //     coin: 350,
  //     upgradeCost: 400,
  //     description: "Загартований в боях воїн",
  //     img: demonHorsesImg,
  //     abilities: [
  //       // { key: "arrowShot", power: 250},
  //       // { key: "rage", power: 100},
  //     ],
  //     effects: []
  //   },
  //   level6: {
  //     unitId: "demon406",
  //     level: 6,
  //     name: "Гонча", // Те саме ім'я!
  //     hp: 176,
  //     armor: 31,
  //     attack: 78,
  //     step: 5,
  //     range: 1,
  //     coin: 350,
  //     upgradeCost: 400,
  //     description: "Загартований в боях воїн",
  //     img: demonHorsesImg,
  //     abilities: [
  //       // { key: "arrowShot", power: 250},
  //       // { key: "rage", power: 100},
  //     ],
  //     effects: []
  //   },
  //   level7: {
  //     unitId: "demon407",
  //     level: 7,
  //     name: "Гонча", // Те саме ім'я!
  //     hp: 176,
  //     armor: 33,
  //     attack: 81,
  //     step: 5,
  //     range: 1,
  //     coin: 350,
  //     upgradeCost: 400,
  //     description: "Загартований в боях воїн",
  //     img: demonHorsesImg,
  //     abilities: [
  //       // { key: "arrowShot", power: 250},
  //       // { key: "rage", power: 100},
  //     ],
  //     effects: []
  //   },
  //   level8: {
  //     unitId: "demon408",
  //     level: 8,
  //     name: "Гонча",
  //     hp: 176,
  //     armor: 35,
  //     attack: 81,
  //     step: 5,
  //     range: 1,
  //     coin: 350,
  //     upgradeCost: null,
  //     description: "Легендарний воїн",
  //     img: demonHorsesImg,
  //     abilities: [
  //       // { key: "arrowShot", power: 600},
  //       // { key: "rage", power: 500},
  //       // { key: "berserk", power: 300},
  //     ],
  //     effects: []
  //   }
  // };
  
  // // Створюємо глобальний реєстр всіх юнітів за ID
  // window.unitsRegistry = window.unitsRegistry || {};
  // Object.values(demonHorsesLevels).forEach(unit => {
  //   window.unitsRegistry[unit.unitId] = unit;
  // });window.unitsRegistry = window.unitsRegistry || {};

window.unitsRegistry["demon:horses"] = {
  baseUnitKey: "demon:horses",
  race: "demon",
  role: "horses",
  name: "Гончі",
  img: "../../img/units/demon/demonHorse/red/demonHorseRed.png",

  maxLevel: 8,

  levels: {
    1: { hp: 114, armor: 7, attack: 60, step: 3, range: 2, coin: 250, upgradeCost: 55 },
    2: { hp: 119, armor: 9, attack: 60, step: 3, range: 2, coin: 250, upgradeCost: 68 },
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
 