// js/asset/units/unitsOrc/warrior/orcLevel.js
let piplShamanImg = "../../img/units/pipl/piplShaman/blue/piplShamanBlue.png";
// ОРКИ - Воїн (8 рівнів)
// let piplShamanLevels = {
//     level1: {
//       unitId: "pipl301", // Унікальний ID юніта (1XX - орки воїни)
//       level: 1,
//       name: "Шаман",
//       hp: 118,
//       armor: 5,
//       attack: 45,
//       step: 3,
//       range: 3,
//       coin: 300,
//       upgradeCost: 221,
//       description: "Сильний воїн з важкою сокирою",
//       img: piplShamanImg,
//       abilities: [
//         { key: "allyHeal", power: 30 },
   
//       ],
//       effects: []
//     },
//     level2: {
//       unitId: "pipl302",
//       level: 2,
//       name: "Шаман", // Те саме ім'я!
//       hp: 134,
//       armor: 8,
//       attack: 48,
//       step: 3,
//       range: 3,
//       coin: 300,
//       upgradeCost: 222,
//       description: "Загартований в боях воїн",
//       img: piplShamanImg,
//       abilities: [
//         { key: "allyHeal", power: 30 },
//       ],
//       effects: []
//     },
//     level3: {
//       unitId: "pipl303",
//       level: 3,
//       name: "Шаман",
//       hp: 144,
//       armor: 12,
//       attack: 56,
//       step: 4,
//       range: 3,
//       coin: 300,
//       upgradeCost: 223,
//       description: "Майстер бойової сокири",
//       img: piplShamanImg,
//       abilities: [
//         { key: "allyHeal", power: 30 },
//       ],
//       effects: []
//     },
//     level4: {
//       unitId: "pipl304",
//       level: 4,
//       name: "Шаман", // Те саме ім'я!
//       hp: 144,
//       armor: 14,
//       attack: 59,
//       step: 4,
//       range: 3,
//       coin: 300,
//       upgradeCost: 400,
//       description: "Загартований в боях воїн",
//       img: piplShamanImg,
//       abilities: [
//         { key: "allyHeal", power: 30 },
//       ],
//       effects: []
//     },
//     level5: {
//       unitId: "pipl305",
//       level: 5,
//       name: "Шаман", // Те саме ім'я!
//       hp: 144,
//       armor: 16,
//       attack: 63,
//       step: 4,
//       range: 3,
//       coin: 300,
//       upgradeCost: 400,
//       description: "Загартований в боях воїн",
//       img: piplShamanImg,
//       abilities: [
//         { key: "allyHeal", power: 50 },
//       ],
//       effects: []
//     },
//     level6: {
//       unitId: "pipl306",
//       level: 6,
//       name: "Шаман", // Те саме ім'я!
//       hp: 144,
//       armor: 18,
//       attack: 63,
//       step: 4,
//       range: 3,
//       coin: 300,
//       upgradeCost: 400,
//       description: "Загартований в боях воїн",
//       img: piplShamanImg,
//       abilities: [
//         { key: "allyHeal", power: 50 },
//       ],
//       effects: []
//     },
//     level7: {
//       unitId: "pipl307",
//       level: 7,
//       name: "Шаман", // Те саме ім'я!
//       hp: 144,
//       armor: 19,
//       attack: 63,
//       step: 4,
//       range: 3,
//       coin: 300,
//       upgradeCost: 400,
//       description: "Загартований в боях воїн",
//       img: piplShamanImg,
//       abilities: [
//         { key: "allyHeal", power: 50 },
//       ],
//       effects: []
//     },
//     level8: {
//     unitId: "pipl308",
//       level: 8,
//       name: "Шаман",
//       hp: 144,
//       armor: 20,
//       attack: 63,
//       step: 4,
//       range: 3,
//       coin: 300,
//       upgradeCost: null,
//       description: "Легендарний воїн",
//       img: piplShamanImg,
//       abilities: [
//         { key: "allyHeal", power: 50 },
//       ],
//       effects: []
//     }
//   };
  
//   // Створюємо глобальний реєстр всіх юнітів за ID
//   window.unitsRegistry = window.unitsRegistry || {};
//   Object.values(piplShamanLevels).forEach(unit => {
//     window.unitsRegistry[unit.unitId] = unit;
//   });
  
window.unitsRegistry = window.unitsRegistry || {};

window.unitsRegistry["pipl:shaman"] = {
  baseUnitKey: "pipl:shaman",
  race: "pipl",
  role: "shaman",
  name: "Шаман",
  img: "../../img/units/pipl/piplShaman/blue/piplShamanBlue.png",

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