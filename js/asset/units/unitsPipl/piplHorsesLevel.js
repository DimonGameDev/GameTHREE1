// js/asset/units/unitsOrc/warrior/orcLevel.js
let piplHorsesImg = "../../img/units/pipl/piplHorse/blue/piplHorseBlue.png";
// ОРКИ - Воїн (8 рівнів)
// let piplHorsesLevels = {
//     level1: {
//       unitId: "pipl401", // Унікальний ID юніта (1XX - орки воїни)
//       level: 1,
//       name: "Кінь",
//       hp: 126,
//       armor: 22,
//       attack: 62,
//       step: 4,
//       range: 1,
//       coin: 350,
//       upgradeCost: 221,
//       description: "Сильний воїн з важкою сокирою",
//       img: piplHorsesImg,
//       abilities: [
//         // { key: "arrowShot", power: 200},
//       ],
//       effects: []
//     },
//     level2: {
//       unitId: "pipl402",
//       level: 2,
//       name: "Кінь", // Те саме ім'я!
//       hp: 136,
//       armor: 23,
//       attack: 65,
//       step: 4,
//       range: 1,
//       coin: 350,
//       upgradeCost: 222,
//       description: "Загартований в боях воїн",
//       img: piplHorsesImg,
//       abilities: [
//         // { key: "arrowShot", power: 250},
//         // { key: "rage", power: 100},
//       ],
//       effects: []
//     },
//     level3: {
//       unitId: "pipl403",
//       level: 3,
//       name: "Кінь",
//       hp: 146,
//       armor: 25,
//       attack: 72,
//       step: 5,
//       range: 1,
//       coin: 350,
//       upgradeCost: 223,
//       description: "Майстер бойової сокири",
//       img: piplHorsesImg,
//       abilities: [
//         // { key: "arrowShot", power: 300},
//         // { key: "rage", power: 150},
//       ],
//       effects: []
//     },
//     level4: {
//       unitId: "pipl404",
//       level: 4,
//       name: "Кінь", // Те саме ім'я!
//       hp: 146,
//       armor: 27,
//       attack: 75,
//       step: 5,
//       range: 1,
//       coin: 350,
//       upgradeCost: 400,
//       description: "Загартований в боях воїн",
//       img: piplHorsesImg,
//       abilities: [
//         // { key: "arrowShot", power: 250},
//         // { key: "rage", power: 100},
//       ],
//       effects: []
//     },
//     level5: {
//       unitId: "pipl405",
//       level: 5,
//       name: "Кінь", // Те саме ім'я!
//       hp: 156,
//       armor: 29,
//       attack: 78,
//       step: 5,
//       range: 1,
//       coin: 350,
//       upgradeCost: 400,
//       description: "Загартований в боях воїн",
//       img: piplHorsesImg,
//       abilities: [
//         // { key: "arrowShot", power: 250},
//         // { key: "rage", power: 100},
//       ],
//       effects: []
//     },
//     level6: {
//       unitId: "pipl406",
//       level: 6,
//       name: "Кінь", // Те саме ім'я!
//       hp: 164,
//       armor: 31,
//       attack: 81,
//       step: 5,
//       range: 1,
//       coin: 350,
//       upgradeCost: 400,
//       description: "Загартований в боях воїн",
//       img: piplHorsesImg,
//       abilities: [
//         // { key: "arrowShot", power: 250},
//         // { key: "rage", power: 100},
//       ],
//       effects: []
//     },
//     level7: {
//       unitId: "pipl407",
//       level: 7,
//       name: "Кінь", // Те саме ім'я!
//       hp: 164,
//       armor: 33,
//       attack: 84,
//       step: 5,
//       range: 1,
//       coin: 350,
//       upgradeCost: 400,
//       description: "Загартований в боях воїн",
//       img: piplHorsesImg,
//       abilities: [
//         // { key: "arrowShot", power: 250},
//         // { key: "rage", power: 100},
//       ],
//       effects: []
//     },
//     level8: {
//     unitId: "pipl408",
//       level: 8,
//       name: "Кінь",
//       hp: 164,
//       armor: 35,
//       attack: 84,
//       step: 5,
//       range: 1,
//       coin: 350,
//       upgradeCost: null,
//       description: "Легендарний воїн",
//       img: piplHorsesImg,
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
//   Object.values(piplHorsesLevels).forEach(unit => {
//     window.unitsRegistry[unit.unitId] = unit;
//   });
  
//   // Для магазину показуємо тільки 1 рівень
window.unitsRegistry = window.unitsRegistry || {};

window.unitsRegistry["pipl:horse"] = {
  baseUnitKey: "pipl:horse",
  race: "pipl",
  role: "horse",
  name: "Кінь",
  img: "../../img/units/pipl/piplHorse/blue/piplHorseBlue.png",

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