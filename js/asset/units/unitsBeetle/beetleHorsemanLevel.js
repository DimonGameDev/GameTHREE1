// js/asset/units/unitsOrc/warrior/orcLevel.js
let beetleHorsemanImg = "../../img/units/beetle/beetleHorseman/blue/beetleHorsemanBlue.png";
// ельфи - Воїн (8 рівнів)
let beetleHorsemanLevels = {
    level1: {
      unitId: "beetle501", // Унікальний ID юніта (1XX - орки воїни)
      level: 1,
      name: "Вершник",
      hp: 140,
      armor: 20,
      attack: 66,
      step: 4,
      range: 1,
      coin: 400,
      upgradeCost: 221,
      description: "Сильний воїн з важкою сокирою",
      img: beetleHorsemanImg,
      abilities: [
        // { key: "arrowShot", power: 200},
      ],
      effects: []
    },
    level2: {
      unitId: "beetle502",
      level: 2,
      name: "Вершник", // Те саме ім'я!
      hp: 150,
      armor: 21,
      attack: 69,
      step: 4,
      range: 1,
      coin: 400,
      upgradeCost: 222,
      description: "Загартований в боях воїн",
      img: beetleHorsemanImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level3: {
      unitId: "beetle503",
      level: 3,
      name: "Вершник",
      hp: 160,
      armor: 23,
      attack: 73,
      step: 5,
      range: 1,
      coin: 400,
      upgradeCost: 223,
      description: "Майстер бойової сокири",
      img: beetleHorsemanImg,
      abilities: [
        // { key: "arrowShot", power: 300},
        // { key: "rage", power: 150},
      ],
      effects: []
    },
    level4: {
      unitId: "beetle504",
      level: 4,
      name: "Вершник", // Те саме ім'я!
      hp: 160,
      armor: 24,
      attack: 76,
      step: 5,
      range: 1,
      coin: 400,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: beetleHorsemanImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level5: {
      unitId: "beetle505",
      level: 5,
      name: "Вершник", // Те саме ім'я!
      hp: 170,
      armor: 26,
      attack: 79,
      step: 5,
      range: 1,
      coin: 400,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: beetleHorsemanImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level6: {
      unitId: "beetle506",
      level: 6,
      name: "Вершник", // Те саме ім'я!
      hp: 174,
      armor: 27,
      attack: 82,
      step: 5,
      range: 1,
      coin: 400,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: beetleHorsemanImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level7: {
      unitId: "beetle507",
      level: 7,
      name: "Вершник", // Те саме ім'я!
      hp: 174,
      armor: 29,
      attack: 84,
      step: 5,
      range: 1,
      coin: 400,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: beetleHorsemanImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level8: {
      unitId: "beetle508",
      level: 8,
      name: "Вершник",
      hp: 174,
      armor: 30,
      attack: 86,
      step: 5,
      range: 1,
      coin: 400,
      upgradeCost: null,
      description: "Легендарний воїн",
      img: beetleHorsemanImg,
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
  Object.values(beetleHorsemanLevels).forEach(unit => {
    window.unitsRegistry[unit.unitId] = unit;
  });
  
