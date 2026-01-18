// js/asset/units/unitsOrc/warrior/orcLevel.js
let beetlePikenerImg = "../../img/units/beetle/beetlePikener/red/beetlePikenerRed.png";
// ельфи - Воїн (8 рівнів)
// let beetlePikenerLevels = {
//     level1: {
//       unitId: "beetle701", // Унікальний ID юніта (1XX - орки воїни)
//       level: 1,
//       name: "Пікінер",
//       hp: 150,
//       armor: 25,
//       attack: 60,
//       step: 3,
//       range: 1,
//       coin: 600,
//       upgradeCost: 200,
//       description: "Сильний воїн з важкою сокирою",
//       img: beetlePikenerImg,
//       abilities: [],
//       effects: []
//     },
//     level2: {
//       unitId: "beetle702",
//       level: 2,
//       name: "Пікінер", // Те саме ім'я!
//       hp: 160,
//       armor: 27,
//       attack: 62,
//       step: 3,
//       range: 1,
//       coin: 600,
//       upgradeCost: 400,
//       description: "Загартований в боях воїн",
//       img: beetlePikenerImg,
//       abilities: [],
//       effects: []
//     },
//     level3: {
//       unitId: "beetle703",
//       level: 3,
//       name: "Пікінер",
//       hp: 170,
//       armor: 29,
//       attack: 65,
//       step: 3,
//       range: 1,
//       coin: 600,
//       upgradeCost: 800,
//       description: "Майстер бойової сокири",
//       img: beetlePikenerImg,
//       abilities: [],
//       effects: []
//     },
//     level4: {
//       unitId: "beetle704",
//       level: 4,
//       name: "Пікінер", // Те саме ім'я!
//       hp: 180,
//       armor: 31,
//       attack: 67,
//       step: 4,
//       range: 1,
//       coin: 600,
//       upgradeCost: 400,
//       description: "Загартований в боях воїн",
//       img: beetlePikenerImg,
//       abilities: [],
//       effects: []
//     },
//     level5: {
//       unitId: "beetle705",
//       level: 5,
//       name: "Пікінер", // Те саме ім'я!
//       hp: 185,
//       armor: 33,
//       attack: 69,
//       step: 4,
//       range: 1,
//       coin: 600,
//       upgradeCost: 400,
//       description: "Загартований в боях воїн",
//       img: beetlePikenerImg,
//       abilities: [],
//       effects: []
//     },
//     level6: {
//       unitId: "beetle706",
//       level: 6,
//       name: "Пікінер", // Те саме ім'я!
//       hp: 185,
//       armor: 34,
//       attack: 71,
//       step: 4,
//       range: 1,
//       coin: 600,
//       upgradeCost: 400,
//       description: "Загартований в боях воїн",
//       img: beetlePikenerImg,
//       abilities: [],
//       effects: []
//     },
//     level7: {
//       unitId: "beetle707",
//       level: 7,
//       name: "Пікінер", // Те саме ім'я!
//       hp: 185,
//       armor: 35,
//       attack: 73,
//       step: 4,
//       range: 1,
//       coin: 600,
//       upgradeCost: 400,
//       description: "Загартований в боях воїн",
//       img: beetlePikenerImg,
//       abilities: [],
//       effects: []
//     },
//     level8: {
//       unitId: "beetle708",
//       level: 8,
//       name: "Пікінер",
//       hp: 185,
//       armor: 35,
//       attack: 75,
//       step: 4,
//       range: 1,
//       coin: 600,
//       upgradeCost: null,
//       description: "Легендарний воїн",
//       img: beetlePikenerImg,
//       abilities: [],
//       effects: []
//     }
//   };
  
//   // Створюємо глобальний реєстр всіх юнітів за ID
//   window.unitsRegistry = window.unitsRegistry || {};
//   Object.values(beetlePikenerLevels).forEach(unit => {
//     window.unitsRegistry[unit.unitId] = unit;
//   });
  
  // Для магазину показуємо тільки 1 рівень
  window.unitsRegistry = window.unitsRegistry || {};

  window.unitsRegistry["beetle:pikener"] = {
    baseUnitKey: "beetle:pikener",
    race: "beetle",
    role: "pikener",
    name: "Пікінер",
    img: "../../img/units/beetle/beetlePikener/red/beetlePikenerRed.png",
  
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