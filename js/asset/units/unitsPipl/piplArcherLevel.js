// js/asset/units/unitsOrc/warrior/orcLevel.js
let piplArcherImg = "../../img/units/pipl/piplArcher/blue/piplArcherBlue.png";
// // ОРКИ - Воїн (8 рівнів)
// let piplArcherLevels = {
//     level1: {
//       unitId: "pipl201", // Унікальний ID юніта (1XX - орки воїни)
//       level: 1,
//       name: "Лучник",
//       hp: 108,
//       armor: 4,
//       attack: 50,
//       step: 3,
//       range: 2,
//       coin: 250,
//       upgradeCost: 221,
//       description: "Сильний воїн з важкою сокирою",
//       img: piplArcherImg,
//       abilities: [
//         // { key: "arrowShot", power: 200},
//       ],
//       effects: []
//     },
//     level2: {
//       unitId: "pipl202",
//       level: 2,
//       name: "Лучник", // Те саме ім'я!
//       hp: 113,
//       armor: 6,
//       attack: 53,
//       step: 3,
//       range: 2,
//       coin: 250,
//       upgradeCost: 222,
//       description: "Загартований в боях воїн",
//       img: piplArcherImg,
//       abilities: [
//         // { key: "arrowShot", power: 250},
//         // { key: "rage", power: 100},
//       ],
//       effects: []
//     },
//     level3: {
//       unitId: "pipl203",
//       level: 3,
//       name: "Лучник",
//       hp: 128,
//       armor: 8,
//       attack: 59,
//       step: 4,
//       range: 3,
//       coin: 250,
//       upgradeCost: 223,
//       description: "Майстер бойової сокири",
//       img: piplArcherImg,
//       abilities: [
//         // { key: "arrowShot", power: 300},
//         // { key: "rage", power: 150},
//       ],
//       effects: []
//     },
//     level4: {
//       unitId: "pipl204",
//       level: 4,
//       name: "Лучник", // Те саме ім'я!
//       hp: 138,
//       armor: 11,
//       attack: 62,
//       step: 4,
//       range: 3,
//       coin: 250,
//       upgradeCost: 400,
//       description: "Загартований в боях воїн",
//       img: piplArcherImg,
//       abilities: [
//         // { key: "arrowShot", power: 250},
//         // { key: "rage", power: 100},
//       ],
//       effects: []
//     },
//     level5: {
//       unitId: "pipl205",
//       level: 5,
//       name: "Лучник", // Те саме ім'я!
//       hp: 148,
//       armor: 14,
//       attack: 65,
//       step: 4,
//       range: 1,
//       coin: 250,
//       upgradeCost: 400,
//       description: "Загартований в боях воїн",
//       img: piplArcherImg,
//       abilities: [
//         // { key: "arrowShot", power: 250},
//         // { key: "rage", power: 100},
//       ],
//       effects: []
//     },
//     level6: {
//       unitId: "pipl206",
//       level: 6,
//       name: "Лучник", // Те саме ім'я!
//       hp: 152,
//       armor: 17,
//       attack: 65,
//       step: 4,
//       range: 3,
//       coin: 250,
//       upgradeCost: 400,
//       description: "Загартований в боях воїн",
//       img: piplArcherImg,
//       abilities: [
//         // { key: "arrowShot", power: 250},
//         // { key: "rage", power: 100},
//       ],
//       effects: []
//     },
//     level7: {
//       unitId: "pipl207",
//       level: 7,
//       name: "Лучник", // Те саме ім'я!
//       hp: 152,
//       armor: 20,
//       attack: 69,
//       step: 4,
//       range: 3,
//       coin: 250,
//       upgradeCost: 400,
//       description: "Загартований в боях воїн",
//       img: piplArcherImg,
//       abilities: [
//         // { key: "arrowShot", power: 250},
//         // { key: "rage", power: 100},
//       ],
//       effects: []
//     },
//     level8: {
//     unitId: "pipl208",
//       level: 8,
//       name: "Лучник",
//       hp: 152,
//       armor: 22,
//       attack: 70,
//       step: 4,
//       range: 3,
//       coin: 250,
//       upgradeCost: null,
//       description: "Легендарний воїн",
//       img: piplArcherImg,
//       abilities: [
//         // { key: "arrowShot", power: 600},
//         // { key: "rage", power: 500},
//         // { key: "berserk", power: 300},
//       ],
//       effects: []
//     }
//   };
  
  // Створюємо глобальний реєстр всіх юнітів за ID
  // window.unitsRegistry = window.unitsRegistry || {};
  // Object.values(piplArcherLevels).forEach(unit => {
  //   window.unitsRegistry[unit.unitId] = unit;
  // });
  
  // Для магазину показуємо тільки 1 рівень
  window.unitsRegistry = window.unitsRegistry || {};

  window.unitsRegistry["pipl:archer"] = {
    baseUnitKey: "pipl:archer",
    race: "pipl",
    role: "archer",
    name: "Лучник",
    img: "../../img/units/pipl/piplArcher/blue/piplArcherBlue.png",
  
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