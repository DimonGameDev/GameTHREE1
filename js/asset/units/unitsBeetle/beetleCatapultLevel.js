// js/asset/units/unitsOrc/warrior/orcLevel.js
let beetleCatapultImg = "../../img/units/beetle/beetleCatapult/blue/beetleCatapultBlue.png";
// ельфи - Воїн (8 рівнів)
let beetleCatapultLevels = {
    level1: {
      unitId: "beetle601", // Унікальний ID юніта (1XX - орки воїни)
      level: 1,
      name: "Катапульта",
      hp: 115,
      armor: 10,
      attack: 65,
      step: 3,
      range: 5,
      coin: 600,
      upgradeCost: 200,
      description: "Сильний воїн з важкою сокирою",
      img: beetleCatapultImg,
      abilities: [
        // { key: "arrowShot", power: 200},
      ],
      effects: []
    },
    level2: {
      unitId: "beetle602",
      level: 2,
      name: "Жук-катапульта", // Те саме ім'я!
      hp: 125,
      armor: 11,
      attack: 67,
      step: 3,
      range: 5,
      coin: 600,
      upgradeCost: 210,
      description: "Загартований в боях воїн",
      img: beetleCatapultImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level3: {
      unitId: "beetle603",
      level: 3,
      name: "Жук-катапульта",
      hp: 135,
      armor: 13,
      attack: 70,
      step: 4,
      range: 6,
      coin: 600,
      upgradeCost: 200,
      description: "Майстер бойової сокири",
      img: beetleCatapultImg,
      abilities: [
        // { key: "arrowShot", power: 300},
        // { key: "rage", power: 150},
      ],
      effects: []
    },
    level4: {
      unitId: "beetle604",
      level: 4,
      name: "Жук-катапульта", // Те саме ім'я!
      hp: 140,
      armor: 14,
      attack: 72,
      step: 4,
      range: 6,
      coin: 600,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: beetleCatapultImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level5: {
      unitId: "beetle605",
      level: 5,
      name: "Жук-катапульта", // Те саме ім'я!
      hp: 140,
      armor: 16,
      attack: 74,
      step: 4,
      range: 6,
      coin: 600,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: beetleCatapultImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level6: {
      unitId: "beetle606",
      level: 6,
      name: "Жук-катапульта", // Те саме ім'я!
      hp: 140,
      armor: 16,
      attack: 76,
      step: 4,
      range: 6,
      coin: 600,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: beetleCatapultImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level7: {
      unitId: "beetle607",
      level: 7,
      name: "Жук-катапульта", // Те саме ім'я!
      hp: 140,
      armor: 18,
      attack: 78,
      step: 4,
      range: 6,
      coin: 600,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: beetleCatapultImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level8: {
      unitId: "beetle608",
      level: 8,
      name: "Жук-катапульта",
      hp: 140,
      armor: 18,
      attack: 80,
      step: 4,
      range: 6,
      coin: 600,
      upgradeCost: null,
      description: "Легендарний воїн",
      img: beetleCatapultImg,
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
  Object.values(beetleCatapultLevels).forEach(unit => {
    window.unitsRegistry[unit.unitId] = unit;
  });
  
