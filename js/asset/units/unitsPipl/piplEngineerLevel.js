// js/asset/units/unitsOrc/warrior/orcLevel.js
let piplEngineerImg = "../../img/units/pipl/piplEngineer/blue/piplEngineerBlue.png";
// ОРКИ - Воїн (8 рівнів)
let piplEngineerLevels = {
    level1: {
      unitId: "pipl901", // Унікальний ID юніта (1XX - орки воїни)
      level: 1,
      name: "Інженер",
      hp: 148,
      armor: 14,
      attack: 50,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 200,
      description: "Сильний воїн з важкою сокирою",
      img: piplEngineerImg,
      abilities: [
        { key: "handcuffs", power: 0 },
      ],
      effects: []
    },
    level2: {
      unitId: "pipl902",
      level: 2,
      name: "Інженер", // Те саме ім'я!
      hp: 158,
      armor: 15,
      attack: 52,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 202,
      description: "Загартований в боях воїн",
      img: piplEngineerImg,
      abilities: [
        { key: "handcuffs", power: 0 },
      ],
      effects: []
    },
    level3: {
      unitId: "pipl903",
      level: 3,
      name: "Інженер",
      hp: 166,
      armor: 17,
      attack: 65,
      step: 5,
      range: 1,
      coin: 500,
      upgradeCost: 203,
      description: "Майстер бойової сокири",
      img: piplEngineerImg,
      abilities: [
        { key: "handcuffs", power: 0 },
      ],
      effects: []
    },
    level4: {
      unitId: "pipl904",
      level: 4,
      name: "Інженер", // Те саме ім'я!
      hp: 166,
      armor: 18,
      attack: 57,
      step: 5,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: piplEngineerImg,
      abilities: [
        { key: "handcuffs", power: 0 },
      ],
      effects: []
    },
    level5: {
        unitId: "pipl905",
      level: 5,
      name: "Інженер", // Те саме ім'я!
      hp: 166,
      armor: 19,
      attack: 59,
      step: 5,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: piplEngineerImg,
      abilities: [
        { key: "handcuffs", power: 0 },
      ],
      effects: []
    },
    level6: {
      unitId: "pipl906",
      level: 6,
      name: "Інженер", // Те саме ім'я!
      hp: 166,
      armor: 20,
      attack: 61,
      step: 5,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: piplEngineerImg,
      abilities: [
        { key: "handcuffs", power: 0 },
      ],
      effects: []
    },
    level7: {
      unitId: "pipl907",
      level: 7,
      name: "Інженер", // Те саме ім'я!
      hp: 166,
      armor: 21,
      attack: 63,
      step: 5,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: piplEngineerImg,
      abilities: [
        { key: "handcuffs", power: 0 },
      ],
      effects: []
    },
    level8: {
    unitId: "pipl908",
      level: 8,
      name: "Інженер",
      hp: 166,
      armor: 22,
      attack: 65,
      step: 5,
      range: 1,
      coin: 500,
      upgradeCost: null,
      description: "Легендарний воїн",
      img: piplEngineerImg,
      abilities: [
        { key: "handcuffs", power: 0 },
      ],
      effects: []
    }
  };
  
  // Створюємо глобальний реєстр всіх юнітів за ID
  window.unitsRegistry = window.unitsRegistry || {};
  Object.values(piplEngineerLevels).forEach(unit => {
    window.unitsRegistry[unit.unitId] = unit;
  });
  
  // Для магазину показуємо тільки 1 рівень
 