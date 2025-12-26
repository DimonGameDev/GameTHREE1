// js/asset/units/unitsOrc/warrior/orcLevel.js
let orcArcherImg = "../../img/units/orc/orcArcher/blue/orcArcherBlue.png";
// ОРКИ - Воїн (8 рівнів)
let orcArcherLevels = {
    level1: {
      unitId: "orc201", // Унікальний ID юніта (1XX - орки воїни)
      level: 1,
      name: "Лучник",
      hp: 114,
      armor: 7,
      attack: 45,
      step: 3,
      range: 2,
      coin: 250,
      upgradeCost: 221,
      description: "Сильний воїн з луком. Перевага - дальня атака.",
      img: orcArcherImg,
      abilities: [
        // { key: "arrowShot", power: 200},
				// { key: "berserk", power: 300},
      ],
      effects: []
    },
    level2: {
      unitId: "orc202",
      level: 2,
      name: "Лучник", // Те саме ім'я!
      hp: 119,
      armor: 9,
      attack: 48,
      step: 3,
      range: 2,
      coin: 250,
      upgradeCost: 222,
      description: "Сильний воїн з луком. Перевага - дальня атака.",
      img: orcArcherImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level3: {
      unitId: "orc203",
      level: 3,
      name: "Лучник",
      hp: 134,
      armor: 11,
      attack: 54,
      step: 4,
      range: 3,
      coin: 250,
      upgradeCost: 223,
      description: "Сильний воїн з луком. Перевага - дальня атака.",
      img: orcArcherImg,
      abilities: [
        // { key: "arrowShot", power: 300},
        // { key: "rage", power: 150},
      ],
      effects: []
    },
    level4: {
      unitId: "orc204",
      level: 4,
      name: "Лучник", // Те саме ім'я!
      hp: 144,
      armor: 14,
      attack: 57,
      step: 4,
      range: 3,
      coin: 250,
      upgradeCost: 400,
      description: "Загартований воїн з луком. Перевага - дальня атака.",
      img: orcArcherImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level5: {
      unitId: "orc205",
      level: 5,
      name: "Лучник", // Те саме ім'я!
      hp: 154,
      armor: 17,
      attack: 60,
      step: 4,
      range: 3,
      coin: 250,
      upgradeCost: 400,
      description: "Загартований воїн з луком. Перевага - дальня атака.",
      img: orcArcherImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level6: {
      unitId: "orc206",
      level: 6,
      name: "Лучник", // Те саме ім'я!
      hp: 156,
      armor: 20,
      attack: 62,
      step: 4,
      range: 3,
      coin: 250,
      upgradeCost: 400,
      description: "Загартований воїн з луком. Перевага - дальня атака.",
      img: orcArcherImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level7: {
      unitId: "orc207",
      level: 7,
      name: "Лучник", // Те саме ім'я!
      hp: 156,
      armor: 23,
      attack: 65,
      step: 4,
      range: 3,
      coin: 250,
      upgradeCost: 400,
      description: "Загартований воїн з луком. Перевага - дальня атака.",
      img: orcArcherImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level8: {
      unitId: "orc208",
      level: 8,
      name: "Лучник",
      hp: 156,
      armor: 26,
      attack: 65,
      step: 4,
      range: 3,
      coin: 250,
      upgradeCost: null,
      description: "Легендарний воїн з луком. Перевага - дальня атака.",
      img: orcArcherImg,
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
  Object.values(orcArcherLevels).forEach(unit => {
    window.unitsRegistry[unit.unitId] = unit;
  });
  
 