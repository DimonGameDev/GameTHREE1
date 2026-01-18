// js/asset/units/unitsOrc/warrior/orcLevel.js
let demonCatapultImg = "../../img/units/demon/demonCatapult/blue/demonCatapultBlue.png";  
// ельфи - Воїн (8 рівнів)
// let demonCatapultLevels = {
//     level1: {
//       unitId: "demon601", // Унікальний ID юніта (1XX - орки воїни)
//       level: 1,
//       name: "Демон-катапульта",
//       hp: 115,
//       armor: 10,
//       attack: 65,
//       step: 3,
//       range: 5,
//       coin: 600,
//       upgradeCost: 200,
//       description: "Сильний воїн з важкою сокирою",
//       img: demonCatapultImg,
//       abilities: [
//         // { key: "arrowShot", power: 200},
//       ],
//       effects: []
//     },
//     level2: {
//       unitId: "demon602",
//       level: 2,
//       name: "Демон-катапульта", // Те саме ім'я!
//       hp: 125,
//       armor: 11,
//       attack: 67,
//       step: 3,
//       range: 5,
//       coin: 600,
//       upgradeCost: 201,
//       description: "Загартований в боях воїн",
//       img: demonCatapultImg,
//       abilities: [
//         // { key: "arrowShot", power: 250},
//         { key: "rage", power: 100},
//       ],
//       effects: []
//     },
//     level3: {
//       unitId: "demon603",
//       level: 3,
//       name: "Демон-катапульта",
//       hp: 135,
//       armor: 13,
//       attack: 70,
//       step: 4,
//       range: 6,
//       coin: 600,
//       upgradeCost: 203,
//       description: "Майстер бойової сокири",
//       img: demonCatapultImg,
//       abilities: [
//         // { key: "arrowShot", power: 300},
//         // { key: "rage", power: 150},
//       ],
//       effects: []
//     },
//     level4: {
//       unitId: "demon604",
//       level: 4,
//       name: "Демон-катапульта", // Те саме ім'я!
//       hp: 140,
//       armor: 14,
//       attack: 72,
//       step: 4,
//       range: 6,
//       coin: 600,
//       upgradeCost: 400,
//       description: "Загартований в боях воїн",
//       img: demonCatapultImg,
//       abilities: [
//         // { key: "arrowShot", power: 250},
//         // { key: "rage", power: 100},
//       ],
//       effects: []
//     },
//     level5: {
//       unitId: "demon605",
//       level: 5,
//       name: "Демон-катапульта", // Те саме ім'я!
//       hp: 140,
//       armor: 16,
//       attack: 74,
//       step: 4,
//       range: 6,
//       coin: 600,
//       upgradeCost: 400,
//       description: "Загартований в боях воїн",
//       img: demonCatapultImg,
//       abilities: [
//         // { key: "arrowShot", power: 250},
//         // { key: "rage", power: 100},
//       ],
//       effects: []
//     },
//     level6: {
//       unitId: "demon606",
//       level: 6,
//       name: "Демон-катапульта", // Те саме ім'я!
//       hp: 140,
//       armor: 17,
//       attack: 76,
//       step: 4,
//       range: 6,
//       coin: 600,
//       upgradeCost: 400,
//       description: "Загартований в боях воїн",
//       img: demonCatapultImg,
//       abilities: [
//         // { key: "arrowShot", power: 250},
//         // { key: "rage", power: 100},
//       ],
//       effects: []
//     },
//     level7: {
//       unitId: "demon607",
//       level: 7,
//       name: "Демон-катапульта", // Те саме ім'я!
//       hp: 140,
//       armor: 18,
//       attack: 78,
//       step: 4,
//       range: 6,
//       coin: 600,
//       upgradeCost: 400,
//       description: "Загартований в боях воїн",
//       img: demonCatapultImg,
//       abilities: [
//         // { key: "arrowShot", power: 250},
//         // { key: "rage", power: 100},
//       ],
//       effects: []
//     },
//     level8: {
//       unitId: "demon608",
//       level: 8,
//       name: "Демон-катапульта",
//       hp: 140,
//       armor: 18,
//       attack: 80,
//       step: 4,
//       range: 6,
//       coin: 600,
//       upgradeCost: null,
//       description: "Легендарний воїн",
//       img: demonCatapultImg,
//       abilities: [
//         // { key: "arrowShot", power: 600},
//         // { key: "rage", power: 500},
//         // { key: "berserk", power: 300},
//       ],
//       effects: []
//     }
//   };
  
//   // Створюємо глобальний реєстр всіх юнітів за ID
//   window.unitsRegistry = window.unitsRegistry || {};
//   Object.values(demonCatapultLevels).forEach(unit => {
//     window.unitsRegistry[unit.unitId] = unit;
//   });
  
window.unitsRegistry = window.unitsRegistry || {};

window.unitsRegistry["demon:catapult"] = {
  baseUnitKey: "demon:catapult",
  race: "demon",
  role: "catapult",
  name: "Катапульта",
  img: "../../img/units/demon/demonCatapult/blue/demonCatapultBlue.png",

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