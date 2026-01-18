// js/asset/units/unitsOrc/warrior/orcLevel.js
let demonArcherImg = "../../img/units/demon/demonArcher/blue/demonArcherBlue.png";
// ельфи - Воїн (8 рівнів)
let demonArcherLevels = {
    level1: {
      unitId: "demon201", // Унікальний ID юніта (1XX - орки воїни)
      level: 1,
      name: "Лучник",
      hp: 90,
      armor: 5,
      attack: 55,
      step: 3,
      range: 2,
      coin: 250,
      upgradeCost: 221,
      description: "Сильний воїн з важкою сокирою",
      img: demonArcherImg,
      abilities: [
        // { key: "arrowShot", power: 200},
      ],
      effects: []
    },
    level2: {
      unitId: "demon202",
      level: 2,
      name: "Лучник", // Те саме ім'я!
      hp: 95,
      armor: 7,
      attack: 58,
      step: 3,
      range: 2,
      coin: 250,
      upgradeCost: 222,
      description: "Загартований в боях воїн",
      img: demonArcherImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level3: {
      unitId: "demon203",
      level: 3,
      name: "Лучник",
      hp: 110,
      armor: 9,
      attack: 64,
      step: 4,
      range: 3,
      coin: 250,
      upgradeCost: 223,
      description: "Майстер бойової сокири",
      img: demonArcherImg,
      abilities: [
        // { key: "arrowShot", power: 300},
        // { key: "rage", power: 150},
      ],
      effects: []
    },
    level4: {
      unitId: "demon204",
      level: 4,
      name: "Лучник", // Те саме ім'я!
      hp: 120,
      armor: 12,
      attack: 67,
      step: 4,
      range: 3,
      coin: 250,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: demonArcherImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level5: {
      unitId: "demon205",
      level: 5,
      name: "Лучник", // Те саме ім'я!
      hp: 130,
      armor: 15,
      attack: 70,
      step: 4,
      range: 3,
      coin: 250,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: demonArcherImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level6: {
      unitId: "demon206",
      level: 6,
      name: "Лучник", // Те саме ім'я!
      hp: 140,
      armor: 18,
      attack: 72,
      step: 4,
      range: 3,
      coin: 250,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: demonArcherImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level7: {
      unitId: "demon207",
      level: 7,
      name: "Лучник", // Те саме ім'я!
      hp: 140,
      armor: 20,
      attack: 74,
      step: 4,
      range: 3,
      coin: 250,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: demonArcherImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level8: {
      unitId: "demon208",
      level: 8,
      name: "Лучник",
      hp: 140,
      armor: 20,
      attack: 75,
      step: 4,
      range: 3,
      coin: 250,
      upgradeCost: null,
      description: "Легендарний воїн",
      img: demonArcherImg,
      abilities: [
        // { key: "arrowShot", power: 600},
        // { key: "rage", power: 500},
        // { key: "berserk", power: 300},
      ],
      effects: []
    }
  };
  
  // Створюємо глобальний реєстр всіх юнітів за ID
  window.unitsRegistry = window.unitsRegistry || {};
  Object.values(demonArcherLevels).forEach(unit => {
    window.unitsRegistry[unit.unitId] = unit;
  });
  
  window.unitsRegistry = window.unitsRegistry || {};

  window.unitsRegistry["demon:archer"] = {
    baseUnitKey: "demon:archer",
    race: "demon",
    role: "archer",
    name: "Лучник",
    img: "../../img/units/demon/demonArcher/blue/demonArcherBlue.png",
  
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