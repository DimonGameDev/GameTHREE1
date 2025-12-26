// js/asset/units/unitsOrc/warrior/orcLevel.js
let elfCatapultImg = "../../img/units/elf/elfCatapult/blue/elfCatapultBlue.png";
// ельфи - Воїн (8 рівнів)
let elfCatapultLevels = {
    level1: {
      unitId: "elf601", // Унікальний ID юніта (1XX - орки воїни)
      level: 1,
      name: "Катапульта",
      hp: 115,
      armor: 10,
      attack: 65,
      step: 3,
      range: 5,
      coin: 600,
      upgradeCost: 221,
      description: "Сильний воїн з важкою сокирою",
      img: elfCatapultImg,
      abilities: [
        // { key: "arrowShot", power: 200},
      ],
      effects: []
    },
    level2: {
      unitId: "elf602",
      level: 2,
      name: "Катапульта", // Те саме ім'я!
      hp: 125,
      armor: 11,
      attack: 67,
      step: 3,
      range: 5,
      coin: 600,
      upgradeCost: 222,
      description: "Загартований в боях воїн",
      img: elfCatapultImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level3: {
      unitId: "elf603",
      level: 3,
      name: "Катапульта",
      hp: 135,
      armor: 13,
      attack: 70,
      step: 4,
      range: 6,
      coin: 600,
      upgradeCost: 223,
      description: "Майстер бойової сокири",
      img: elfCatapultImg,
      abilities: [
        // { key: "arrowShot", power: 300},
        // { key: "rage", power: 150},
      ],
      effects: []
    },
    level4: {
      unitId: "elf604",
      level: 4,
      name: "Катапульта", // Те саме ім'я!
      hp: 140,
      armor: 14,
      attack: 72,
      step: 4,
      range: 6,
      coin: 600,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: elfCatapultImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level5: {
      unitId: "elf605",
      level: 5,
      name: "Катапульта", // Те саме ім'я!
      hp: 140,
      armor: 16,
      attack: 76,
      step: 4,
      range: 6,
      coin: 600,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: elfCatapultImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level6: {
      unitId: "elf606",
      level: 6,
      name: "Катапульта", // Те саме ім'я!
      hp: 140,
      armor: 17,
      attack: 76,
      step: 4,
      range: 6,
      coin: 600,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: elfCatapultImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level7: {
      unitId: "elf607",
      level: 7,
      name: "Катапульта", // Те саме ім'я!
      hp: 140,
      armor: 18,
      attack: 78,
      step: 4,
      range: 6,
      coin: 600,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: elfCatapultImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level8: {
      unitId: "elf608",
      level: 8,
      name: "Катапульта",
      hp: 140,
      armor: 18,
      attack: 80,
      step: 4,
      range: 6,
      coin: 600,
      upgradeCost: null,
      description: "Легендарний воїн",
      img: elfCatapultImg,
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
  Object.values(elfCatapultLevels).forEach(unit => {
    window.unitsRegistry[unit.unitId] = unit;
  });
  
 