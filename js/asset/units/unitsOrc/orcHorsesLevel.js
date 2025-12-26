// js/asset/units/unitsOrc/warrior/orcLevel.js
let orcHorsesImg = "../../img/units/orc/orcHorse/blue/orcHorseBlue.png";
// ОРКИ - Воїн (8 рівнів)
let orcHorsesLevels = {
    level1: {
      unitId: "orc401", // Унікальний ID юніта (1XX - орки воїни)
      level: 1,
      name: "Кавард",
      hp: 123,
      armor: 22,
      attack: 63,
      step: 4,
      range: 1,
      coin: 350,
      upgradeCost: 221,
      description: "Воїн який швидко зближається з ворогом",
      img: orcHorsesImg,
      abilities: [
        // { key: "arrowShot", power: 200},
      ],
      effects: []
    },
    level2: {
      unitId: "orc402",
      level: 2,
      name: "Кавард", // Те саме ім'я!
      hp: 133,
      armor: 23,
      attack: 66,
      step: 4,
      range: 1,
      coin: 350,
      upgradeCost: 222,
      description: "Воїн який швидко зближається з ворогом",
      img: orcHorsesImg,
      abilities: [
            // { key: "arrowShot", power: 250},
            // { key: "rage", power: 100},
      ],
      effects: []
    },
    level3: {
      unitId: "orc403",
      level: 3,
      name: "Кавард",
      hp: 143,
      armor: 25,
      attack: 73,
      step: 5,
      range: 1,
      coin: 350,
      upgradeCost: 223,
      description: "Воїн який швидко зближається з ворогом",
      img: orcHorsesImg,
      abilities: [
        // { key: "arrowShot", power: 300},
        // { key: "rage", power: 150},
      ],
      effects: []
    },
    level4: {
      unitId: "orc404",
      level: 4,
      name: "Кавард", // Те саме ім'я!
      hp: 143,
      armor: 27,
      attack: 76,
      step: 5,
      range: 1,
      coin: 350,
      upgradeCost: 400,
      description: "Загартований воїн який швидко зближається з ворогом",
      img: orcHorsesImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level5: {
      unitId: "orc405",
      level: 5,
      name: "Кавард", // Те саме ім'я!
      hp: 153,
      armor: 29,
      attack: 79,
      step: 5,
      range: 1,
      coin: 350,
      upgradeCost: 400,
      description: "Загартований воїн який швидко зближається з ворогом",
      img: orcHorsesImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level6: {
      unitId: "orc406",
      level: 6,
      name: "Кавард", // Те саме ім'я!
      hp: 160,
      armor: 31,
      attack: 82,
      step: 5,
      range: 1,
      coin: 350,
      upgradeCost: 400,
      description: "Загартований воїн який швидко зближається з ворогом",
      img: orcHorsesImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level7: {
      unitId: "orc407",
      level: 7,
      name: "Кавард", // Те саме ім'я!
      hp: 160,
      armor: 33,
      attack: 85,
      step: 5,
      range: 1,
      coin: 350,
      upgradeCost: 400,
      description: "Загартований воїн який швидко зближається з ворогом",
      img: orcHorsesImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level8: {
      unitId: "orc408",
      level: 8,
      name: "Кавард",
      hp: 160,
      armor: 35,
      attack: 85,
      step: 5,
      range: 1,
      coin: 350,
      upgradeCost: null,
      description: "Легендарний воїн який швидко зближається з ворогом",
      img: orcHorsesImg,
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
  Object.values(orcHorsesLevels).forEach(unit => {
    window.unitsRegistry[unit.unitId] = unit;
  });
  
  // Для магазину показуємо тільки 1 рівень
 