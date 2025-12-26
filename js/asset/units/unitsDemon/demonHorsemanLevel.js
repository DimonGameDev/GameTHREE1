// js/asset/units/unitsOrc/warrior/orcLevel.js
let demonHorsemanImg = "../../img/units/demon/demonHorseman/blue/demonHorsemanBlue.png";
// ельфи - Воїн (8 рівнів)
let demonHorsemanLevels = {
    level1: {
      unitId: "demon501", // Унікальний ID юніта (1XX - орки воїни)
      level: 1,
      name: "Вершник",
      hp: 146,
      armor: 20,
      attack: 64,
      step: 4,
      range: 1,
      coin: 400,
      upgradeCost: 221,
      description: "Сильний воїн з важкою сокирою",
      img: demonHorsemanImg,
      abilities: [
        // { key: "arrowShot", power: 200},
      ],
      effects: []
    },
    level2: {
      unitId: "demon502",
      level: 2,
      name: "Вершник", // Те саме ім'я!
      hp: 156,
      armor: 21,
      attack: 67,
      step: 4,
      range: 1,
      coin: 400,
      upgradeCost: 222,
      description: "Загартований в боях воїн",
      img: demonHorsemanImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        { key: "rage", power: 100},
      ],
      effects: []
    },
    level3: {
      unitId: "demon503",
      level: 3,
      name: "Вершник",
      hp: 166,
      armor: 23,
      attack: 71,
      step: 5,
      range: 1,
      coin: 400,
      upgradeCost: 223,
      description: "Майстер бойової сокири",
      img: demonHorsemanImg,
      abilities: [
        // { key: "arrowShot", power: 300},
        // { key: "rage", power: 150},
      ],
      effects: []
    },
    level4: {
      unitId: "demon504",
      level: 4,
      name: "Вершник", // Те саме ім'я!
      hp: 166,
      armor: 24,
      attack: 74,
      step: 5,
      range: 1,
      coin: 400,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: demonHorsemanImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level5: {
      unitId: "demon505",
      level: 5,
      name: "Вершник", // Те саме ім'я!
      hp: 176,
      armor: 26,
      attack: 77,
      step: 5,
      range: 1,
      coin: 400,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: demonHorsemanImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level6: {
      unitId: "demon506",
      level: 6,
      name: "Вершник", // Те саме ім'я!
      hp: 182,
      armor: 27,
      attack: 80,
      step: 5,
      range: 1,
      coin: 400,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: demonHorsemanImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level7: {
      unitId: "demon507",
      level: 7,
      name: "Вершник", // Те саме ім'я!
      hp: 182,
      armor: 29,
      attack: 82,
      step: 5,
      range: 1,
      coin: 400,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: demonHorsemanImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level8: {
      unitId: "demon508",
      level: 8,
      name: "Вершник",
      hp: 182,
      armor: 30,
      attack: 84,
      step: 5,
      range: 2,
      coin: 400,
      upgradeCost: null,
      description: "Легендарний воїн",
      img: demonHorsemanImg,
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
  Object.values(demonHorsemanLevels).forEach(unit => {
    window.unitsRegistry[unit.unitId] = unit;
  });
  
 