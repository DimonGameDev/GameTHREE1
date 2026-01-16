// js/asset/units/unitsOrc/warrior/orcLevel.js
let orcShamanImg = "../../img/units/orc/orcShaman/blue/orcShamanBlue.png";
// ОРКИ - Воїн (8 рівнів)
// let orcShamanLevels = {
//     level1: {
//       unitId: "orc301", // Унікальний ID юніта (1XX - орки воїни)
//       level: 1,
//       name: "Шаман",
//       hp: 115,
//       armor: 5,
//       attack: 46,
//       step: 3,
//       range: 3,
//       coin: 300,
//       upgradeCost: 221,
//       description: "Шаман мундрий",
//       img: orcShamanImg,
//       abilities: [
//         { key: "allyHeal", power: 30 },
//       ],
//       effects: []
//     },
//     level2: {
//       unitId: "orc302",
//       level: 2,
//       name: "Шаман", // Те саме ім'я!
//       hp: 130,
//       armor: 8,
//       attack: 49,
//       step: 3,
//       range: 3,
//       coin: 300,
//       upgradeCost: 222,
//       description: "Шаман мундрий",
//       img: orcShamanImg,
//       abilities: [
//         // { key: "arrowShot", power: 250},
//         { key: "allyHeal", power: 30 },
//       ],
//       effects: []
//     },
//     level3: {
//       unitId: "orc303",
//       level: 3,
//       name: "Шаман",
//       hp: 140,
//       armor: 12,
//       attack: 57,
//       step: 4,
//       range: 3,
//       coin: 300,
//       upgradeCost: 223,
//       description: "Шаман мундрий",
//       img: orcShamanImg,
//       abilities: [
//         { key: "allyHeal", power: 30 },
//       ],
//       effects: []
//     },
//     level4: {
//       unitId: "orc304",
//       level: 4,
//       name: "Шаман", // Те саме ім'я!
//       hp: 140,
//       armor: 14,
//       attack: 60,
//       step: 4,
//       range: 3,
//       coin: 300,
//       upgradeCost: 400,
//       description: "Шаман просвітлений",
//       img: orcShamanImg,
//       abilities: [
//         { key: "allyHeal", power: 30 },
//       ],
//       effects: []
//     },
//     level5: {
//       unitId: "orc305",
//       level: 5,
//       name: "Шаман", // Те саме ім'я!
//       hp: 140,
//       armor: 18,
//       attack: 64,
//       step: 4,
//       range: 3,
//       coin: 300,
//       upgradeCost: 400,
//       description: "Шаман просвітлений",
//       img: orcShamanImg,
//       abilities: [
//         { key: "allyHeal", power: 50 },
//       ],
//       effects: []
//     },
//     level6: {
//       unitId: "orc306",
//       level: 6,
//       name: "Шаман", // Те саме ім'я!
//       hp: 140,
//       armor: 18,
//       attack: 64,
//       step: 4,
//       range: 3,
//       coin: 300,
//       upgradeCost: 400,
//       description: "Шаман просвітлений",
//       img: orcShamanImg,
//       abilities: [
//         { key: "allyHeal", power: 50 },
//       ],
//       effects: []
//     },
//     level7: {
//       unitId: "orc307",
//       level: 7,
//       name: "Шаман", // Те саме ім'я!
//       hp: 140,
//       armor: 19,
//       attack: 64,
//       step: 4,
//       range: 3,
//       coin: 300,
//       upgradeCost: 400,
//       description: "Шаман просвітлений",
//       img: orcShamanImg,
//       abilities: [
//         { key: "allyHeal", power: 50 },
//       ],
//       effects: []
//     },
//     level8: {
//       unitId: "orc308",
//       level: 8,
//       name: "Шаман",
//       hp: 140,
//       armor: 20,
//       attack: 64,
//       step: 4,
//       range: 3,
//       coin: 300,
//       upgradeCost: null,
//       description: "Легендарний шаман",
//       img: orcShamanImg,
//       abilities: [
//         { key: "allyHeal", power: 50 },
//       ],
//       effects: []
//     }
//   };
  
  // Створюємо глобальний реєстр всіх юнітів за ID
  // window.unitsRegistry = window.unitsRegistry || {};
  // Object.values(orcShamanLevels).forEach(unit => {
  //   window.unitsRegistry[unit.unitId] = unit;
  // });
  
  // Для магазину показуємо тільки 1 рівень

// units/orcs/shaman.js
window.unitsRegistry = window.unitsRegistry || {};

window.unitsRegistry["orcs:shaman"] = {
  baseUnitKey: "orcs:shaman",
  race: "orc",
  role: "shaman",
  name: "Шаман",
  img: "../../img/units/orc/orcShaman/blue/orcShamanBlue.png",

  maxLevel: 8,

  levels: {
    1: { hp: 150, armor: 20, attack: 60, step: 4, range: 2, coin: 500, upgradeCost: 200 },
    2: { hp: 160, armor: 22, attack: 62, step: 4, range: 2, coin: 500, upgradeCost: 400 },
    3: { hp: 170, armor: 24, attack: 65, step: 4, range: 2, coin: 500, upgradeCost: 800 },
    4: { hp: 180, armor: 26, attack: 67, step: 4, range: 2, coin: 500, upgradeCost: 400 },
    5: { hp: 185, armor: 28, attack: 69, step: 4, range: 2, coin: 500, upgradeCost: 400 },
    6: { hp: 185, armor: 30, attack: 71, step: 4, range: 2, coin: 500, upgradeCost: 400 },
    7: { hp: 185, armor: 32, attack: 73, step: 4, range: 2, coin: 500, upgradeCost: 400 },
    8: { hp: 185, armor: 34, attack: 75, step: 4, range: 2, coin: 500, upgradeCost: null }
  },

  abilities: [
    // { key: "arrowShot", power: 200}
  ]
};
  