// js/asset/units/unitsOrc/warrior/orcLevel.js
let elfWitchImg = "../../img/units/elf/elfWitch/blue/elfWitchBlue.png";
// ельфи - Воїн (8 рівнів)
let elfWitchLevels = {
    level1: {
      unitId: "elf901", // Унікальний ID юніта (1XX - орки воїни)
      level: 1,
      name: "Відьма",
      hp: 148,
      armor: 14,
      attack: 50,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 200,
      description: "Сильний воїн з важкою сокирою",
      img: elfWitchImg,
      abilities: [
        { key: "entangle", power: 0 },
      ],
      effects: []
    },
    level2: {
      unitId: "elf902",
      level: 2,
      name: "Відьма", // Те саме ім'я!
      hp: 158,
      armor: 15,
      attack: 52,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 202,
      description: "Загартований в боях воїн",
      img: elfWitchImg,
      abilities: [
        { key: "entangle", power: 0 },
      ],
      effects: []
    },
    level3: {
      unitId: "elf903",
      level: 3,
      name: "Відьма",
      hp: 165,
      armor: 17,
      attack: 56,
      step: 5,
      range: 1,
      coin: 500,
      upgradeCost: 203,
      description: "Майстер бойової сокири",
      img: elfWitchImg,
      abilities: [
        { key: "entangle", power: 0 },
      ],
      effects: []
    },
    level4: {
      unitId: "elf904",
      level: 4,
      name: "Відьма", // Те саме ім'я!
      hp: 166,
      armor: 18,
      attack: 57,
      step: 5,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: elfWitchImg,
      abilities: [
        { key: "entangle", power: 0 },
      ],
      effects: []
    },
    level5: {
            unitId: "elf905",
      level: 5,
      name: "Відьма", // Те саме ім'я!
      hp: 166,
      armor: 19,
      attack: 59,
      step: 5,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: elfWitchImg,
      abilities: [
        { key: "entangle", power: 0 },
      ],
      effects: []
    },
    level6: {
      unitId: "elf906",
      level: 6,
      name: "Відьма", // Те саме ім'я!
      hp: 166,
      armor: 20,
      attack: 61,
      step: 5,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: elfWitchImg,
      abilities: [
        { key: "entangle", power: 0 },
      ],
      effects: []
    },
    level7: {
      unitId: "elf907",
      level: 7,
      name: "Відьма", // Те саме ім'я!
      hp: 166,
      armor: 21,
      attack: 63,
      step: 5,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: elfWitchImg,
      abilities: [
        { key: "entangle", power: 0 },
      ],
      effects: []
    },
    level8: {
      unitId: "elf908",
      level: 8,
      name: "Відьма",
      hp: 166,
      armor: 22,
      attack: 65,
      step: 5,
      range: 1,
      coin: 500,
      upgradeCost: null,
      description: "Легендарний воїн",
      img: elfWitchImg,
      abilities: [
        { key: "entangle", power: 0 },
      ],
      effects: []
    }
  };
  
  // Створюємо глобальний реєстр всіх юнітів за ID
  window.unitsRegistry = window.unitsRegistry || {};
  Object.values(elfWitchLevels).forEach(unit => {
    window.unitsRegistry[unit.unitId] = unit;
  });
  
 