// js/asset/units/unitsOrc/warrior/orcLevel.js
let beetleShamanImg = "../../img/units/beetle/beetleMag/blue/beetleShamanBlue.png";
// ельфи - Воїн (8 рівнів)
// let beetleShamanLevels = {
//     level1: {
//       unitId: "beetle301", // Унікальний ID юніта (1XX - орки воїни)
//       level: 1,
//       name: "Шаман",
//       hp: 115,
//       armor: 6,
//       attack: 45,
//       step: 3,
//       range: 3,
//       coin: 300,
//       upgradeCost: 221,
//       description: "Сильний воїн з важкою сокирою",
//       img: beetleShamanImg,
//       abilities: [
//         { key: "allyHeal", power: 30 },

//       ],
//       effects: []
//     },
//     level2: {
//       unitId: "beetle302",
//       level: 2,
//       name: "Шаман", // Те саме ім'я!
//       hp: 130,
//       armor: 9,
//       attack: 48,
//       step: 3,
//       range: 3,
//       coin: 300,
//       upgradeCost: 222,
//       description: "Загартований в боях воїн",
//       img: beetleShamanImg,
//       abilities: [
//         { key: "allyHeal", power: 30 },
//       ],
//       effects: []
//     },
//     level3: {
//       unitId: "beetle303",
//       level: 3,
//       name: "Шаман",
//       hp: 140,
//       armor: 13,
//       attack: 56,
//       step: 4,
//       range: 3,
//       coin: 300,
//       upgradeCost: 223,
//       description: "Майстер бойової сокири",
//       img: beetleShamanImg,
//       abilities: [
//         { key: "allyHeal", power: 30 },
//       ],
//       effects: []
//     },
//     level4: {
//       unitId: "beetle304",
//       level: 4,
//       name: "Шаман", // Те саме ім'я!
//       hp: 140,
//       armor: 15,
//       attack: 59,
//       step: 4,
//       range: 3,
//       coin: 300,
//       upgradeCost: 400,
//       description: "Загартований в боях воїн",
//       img: beetleShamanImg,
//       abilities: [
//         { key: "allyHeal", power: 30 },
//       ],
//       effects: []
//     },
//     level5: {
//       unitId: "beetle305",
//       level: 5,
//       name: "Шаман", // Те саме ім'я!
//       hp: 140,
//       armor: 17,
//       attack: 63,
//       step: 4,
//       range: 3,
//       coin: 300,
//       upgradeCost: 400,
//       description: "Загартований в боях воїн",
//       img: beetleShamanImg,
//       abilities: [
//         { key: "allyHeal", power: 50 },
//       ],
//       effects: []
//     },
//     level6: {
//       unitId: "beetle306",
//       level: 6,
//       name: "Шаман", // Те саме ім'я!
//       hp: 140,
//       armor: 19,
//       attack: 63,
//       step: 4,
//       range: 3,
//       coin: 300,
//       upgradeCost: 400,
//       description: "Загартований в боях воїн",
//       img: beetleShamanImg,
//       abilities: [
//         { key: "allyHeal", power: 50 },
//       ],
//       effects: []
//     },
//     level7: {
//       unitId: "beetle307",
//       level: 7,
//       name: "Шаман", // Те саме ім'я!
//       hp: 140,
//       armor: 20,
//       attack: 63,
//       step: 4,
//       range: 3,
//       coin: 300,
//       upgradeCost: 400,
//       description: "Загартований в боях воїн",
//       img: beetleShamanImg,
//       abilities: [
//         { key: "allyHeal", power: 50 },
//       ],
//       effects: []
//     },
//     level8: {
//       unitId: "beetle308",
//       level: 8,
//       name: "Шаман",
//       hp: 140,
//       armor: 21,
//       attack: 63,
//       step: 4,
//       range: 3,
//       coin: 300,
//       upgradeCost: null,
//       description: "Легендарний воїн",
//       img: beetleShamanImg,
//       abilities: [
//         { key: "allyHeal", power: 50 },
//       ],
//       effects: []
//     }
//   };
  
//   // Створюємо глобальний реєстр всіх юнітів за ID
//   window.unitsRegistry = window.unitsRegistry || {};
//   Object.values(beetleShamanLevels).forEach(unit => {
//     window.unitsRegistry[unit.unitId] = unit;
//   });
  
  // Для магазину показуємо тільки 1 рівень
  window.unitsRegistry = window.unitsRegistry || {};

  window.unitsRegistry["beetle:shaman"] = {
  baseUnitKey: "beetle:shaman",
  race: "beetle",
  role: "shaman",
  name: "Шаман",
  img: "../../img/units/beetle/beetleShaman/blue/beetleShamanBlue.png",

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
    { key: "allyHeal", power: 30 },
  ]
};