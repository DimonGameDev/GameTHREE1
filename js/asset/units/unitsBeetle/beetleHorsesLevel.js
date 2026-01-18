// js/asset/units/unitsOrc/warrior/orcLevel.js
let beetleHorsesImg = "../../img/units/beetle/beetleHorse/blue/beetleHorseBlue.png";
// ельфи - Воїн (8 рівнів)
// let beetleHorsesLevels = {
//     level1: {
//       unitId: "beetle401", // Унікальний ID юніта (1XX - орки воїни)
//       level: 1,
//       name: "Атаран",
//       hp: 129,
//       armor: 22,
//       attack: 61,
//       step: 4,
//       range: 1,
//       coin: 350,
//       upgradeCost: 100,
//       description: "Сильний воїн з важкою сокирою",
//       img: beetleHorsesImg,
//       abilities: [],
//       effects: []
//     },
//     level2: {
//       unitId: "beetle402",
//       level: 2,
//       name: "Атаран", // Те саме ім'я!
//       hp: 139,
//       armor: 23,
//       attack: 64,
//       step: 4,
//       range: 1,
//       coin: 350,
//       upgradeCost: 140,
//       description: "Загартований в боях воїн",
//       img: beetleHorsesImg,
//       abilities: [],
//       effects: []
//     },
//     level3: {
//       unitId: "beetle403",
//       level: 3,
//       name: "Атаран",
//       hp: 149,
//       armor: 25,
//       attack: 71,
//       step: 5,
//       range: 1,
//       coin: 350,
//       upgradeCost: 223,
//       description: "Майстер бойової сокири",
//       img: beetleHorsesImg,
//       abilities: [],
//       effects: []
//     },
//     level4: {
//       unitId: "beetle404",
//       level: 4,
//       name: "Атаран", // Те саме ім'я!
//       hp: 149,
//       armor: 27,
//       attack: 74,
//       step: 5,
//       range: 1,
//       coin: 350,
//       upgradeCost: 400,
//       description: "Загартований в боях воїн",
//       img: beetleHorsesImg,
//       abilities: [],
//       effects: []
//     },
//     level5: {
//       unitId: "beetle405",
//       level: 5,
//       name: "Атаран", // Те саме ім'я!
//       hp: 159,
//       armor: 29,
//       attack: 77,
//       step: 5,
//       range: 1,
//       coin: 350,
//       upgradeCost: 400,
//       description: "Загартований в боях воїн",
//       img: beetleHorsesImg,
//       abilities: [],
//       effects: []
//     },
//     level6: {
//       unitId: "beetle406",
//       level: 6,
//       name: "Атаран", // Те саме ім'я!
//       hp: 168,
//       armor: 31,
//       attack: 80,
//       step: 5,
//       range: 1,
//       coin: 350,
//       upgradeCost: 400,
//       description: "Загартований в боях воїн",
//       img: beetleHorsesImg,
//       abilities: [],
//       effects: []
//     },
//     level7: {
//       unitId: "beetle407",
//       level: 7,
//       name: "Атаран", // Те саме ім'я!
//       hp: 168,
//       armor: 33,
//       attack: 83,
//       step: 5,
//       range: 1,
//       coin: 350,
//       upgradeCost: 400,
//       description: "Загартований в боях воїн",
//       img: beetleHorsesImg,
//       abilities: [],
//       effects: []
//     },
//     level8: {
//       unitId: "beetle408",
//       level: 8,
//       name: "Атаран",
//       hp: 168,
//       armor: 35,
//       attack: 83,
//       step: 5,
//       range: 1,
//       coin: 350,
//       upgradeCost: null,
//       description: "Легендарний воїн",
//       img: beetleHorsesImg,
//       abilities: [],
//       effects: []
//     }
//   };
  
//   // Створюємо глобальний реєстр всіх юнітів за ID
//   window.unitsRegistry = window.unitsRegistry || {};
//   Object.values(beetleHorsesLevels).forEach(unit => {
//     window.unitsRegistry[unit.unitId] = unit;
//   });
  
window.unitsRegistry = window.unitsRegistry || {};

window.unitsRegistry["beetle:horse"] = {
  baseUnitKey: "beetle:horse",
  race: "beetle",
  role: "horse",
  name: "Кінь",
  img: "../../img/units/beetle/beetleHorse/blue/beetleHorseBlue.png",

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