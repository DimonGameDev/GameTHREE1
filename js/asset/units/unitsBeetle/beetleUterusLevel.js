// js/asset/units/unitsOrc/warrior/orcLevel.js
let beetleUterusImg = "../../img/units/beetle/beetleUterus/blue/beetleUterusBlue.png";
// ельфи - Воїн (8 рівнів)
// let beetleUterusLevels = {
//     level1: {
//       unitId: "beetle901", // Унікальний ID юніта (1XX - орки воїни)
//       level: 1,
//       name: "Матка",
//       hp: 151,
//       armor: 13,
//       attack: 50,
//       step: 4,
//       range: 1,
//       coin: 500,
//       upgradeCost: 200,
//       description: "Сильний воїн з важкою сокирою",
//       img: beetleUterusImg,
//       abilities: [
//         { key: "parasite", power: 20 },
//       ],
//       effects: []
//     },
//     level2: {
//       unitId: "beetle902",
//       level: 2,
//       name: "Матка", // Те саме ім'я!
//       hp: 161,
//       armor: 14,
//       attack: 52,
//       step: 4,
//       range: 1,
//       coin: 500,
//       upgradeCost: 203,
//       description: "Загартований в боях воїн",
//       img: beetleUterusImg,
//       abilities: [
//         { key: "parasite", power: 8 },
//       ],
//       effects: []
//     },
//     level3: {
//       unitId: "beetle903",
//       level: 3,
//       name: "Матка",
//       hp: 170,
//       armor: 16,
//       attack: 55,
//       step: 5,
//       range: 1,
//       coin: 500,
//       upgradeCost: 203,
//       description: "Майстер бойової сокири",
//         img: beetleUterusImg,
//       abilities: [
//         { key: "parasite", power: 10 },
//       ],
//       effects: []
//     },
//     level4: {
//       unitId: "beetle904",
//       level: 4,
//       name: "Матка", // Те саме ім'я!
//       hp: 170,
//       armor: 17,
//       attack: 57,
//       step: 5,
//       range: 1,
//       coin: 500,
//       upgradeCost: 400,
//       description: "Загартований в боях воїн",
//       img: beetleUterusImg,
//       abilities: [
//         { key: "parasite", power: 10 },
//       ],
//       effects: []
//     },
//     level5: {
//         unitId: "beetle905",
//       level: 5,
//       name: "Матка", // Те саме ім'я!
//       hp: 170,
//       armor: 18,
//       attack: 59,
//       step: 5,
//       range: 1,
//       coin: 500,
//       upgradeCost: 400,
//       description: "Загартований в боях воїн",
//       img: beetleUterusImg,
//       abilities: [
//         { key: "parasite", power: 10 },
//       ],
//       effects: []
//     },
//     level6: {
//       unitId: "beetle906",
//       level: 6,
//       name: "Матка", // Те саме ім'я!
//       hp: 170,
//       armor: 19,
//       attack: 61,
//       step: 5,
//       range: 1,
//       coin: 500,
//       upgradeCost: 400,
//       description: "Загартований в боях воїн",
//       img: beetleUterusImg,
//       abilities: [
//         { key: "parasite", power: 12 },
//       ],
//       effects: []
//     },
//     level7: {
//       unitId: "beetle907",
//       level: 7,
//       name: "Матка", // Те саме ім'я!
//       hp: 170,
//       armor: 20,
//       attack: 63,
//       step: 5,
//       range: 1,
//       coin: 500,
//       upgradeCost: 400,
//       description: "Загартований в боях воїн",
//       img: beetleUterusImg,
//       abilities: [
//         { key: "parasite", power: 12 },
//       ],
//       effects: []
//     },
//     level8: {
//       unitId: "beetle908",
//       level: 8,
//       name: "Матка",
//       hp: 170,
//       armor: 21,
//       attack: 65,
//       step: 5,
//       range: 1,
//       coin: 500,
//       upgradeCost: null,
//       description: "Легендарний воїн",
//       img: beetleUterusImg,
//       abilities: [
//         { key: "parasite", power: 14 },
//       ],
//       effects: []
//     }
//   };
  
//   // Створюємо глобальний реєстр всіх юнітів за ID
//   window.unitsRegistry = window.unitsRegistry || {};
//   Object.values(beetleUterusLevels).forEach(unit => {
//     window.unitsRegistry[unit.unitId] = unit;
//   });
  
window.unitsRegistry = window.unitsRegistry || {};

window.unitsRegistry["beetle:uterus"] = {
  baseUnitKey: "beetle:uterus",
  race: "beetle",
  role: "mage",
  name: "Матка",
  img: "../../img/units/beetle/beetleUterus/blue/beetleUterusBlue.png",

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
    { key: "parasite", power: 20 },
  ]
};