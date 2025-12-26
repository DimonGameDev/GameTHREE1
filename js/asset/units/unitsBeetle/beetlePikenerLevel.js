// js/asset/units/unitsOrc/warrior/orcLevel.js
let beetlePikenerImg = "../../img/units/beetle/beetlePikener/red/beetlePikenerRed.png";
// ельфи - Воїн (8 рівнів)
let beetlePikenerLevels = {
    level1: {
      unitId: "beetle701", // Унікальний ID юніта (1XX - орки воїни)
      level: 1,
      name: "Пікінер",
      hp: 150,
      armor: 25,
      attack: 60,
      step: 3,
      range: 1,
      coin: 100,
      upgradeCost: 200,
      description: "Сильний воїн з важкою сокирою",
      img: beetlePikenerImg,
      abilities: [
        // { key: "arrowShot", power: 200},
      ],
      effects: []
    },
    level2: {
      unitId: "beetle702",
      level: 2,
      name: "Пікінер", // Те саме ім'я!
      hp: 160,
      armor: 27,
      attack: 62,
      step: 3,
      range: 1,
      coin: 0,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: beetlePikenerImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level3: {
      unitId: "beetle703",
      level: 3,
      name: "Пікінер",
      hp: 170,
      armor: 29,
      attack: 65,
      step: 3,
      range: 1,
      coin: 0,
      upgradeCost: 800,
      description: "Майстер бойової сокири",
      img: beetlePikenerImg,
      abilities: [
        // { key: "arrowShot", power: 300},
        // { key: "rage", power: 150},
      ],
      effects: []
    },
    level4: {
      unitId: "beetle704",
      level: 4,
      name: "Пікінер", // Те саме ім'я!
      hp: 180,
      armor: 31,
      attack: 67,
      step: 4,
      range: 1,
      coin: 0,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: beetlePikenerImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level5: {
      unitId: "beetle705",
      level: 5,
      name: "Пікінер", // Те саме ім'я!
      hp: 185,
      armor: 33,
      attack: 69,
      step: 4,
      range: 1,
      coin: 0,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: beetlePikenerImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level6: {
      unitId: "beetle706",
      level: 6,
      name: "Пікінер", // Те саме ім'я!
      hp: 185,
      armor: 34,
      attack: 71,
      step: 4,
      range: 1,
      coin: 0,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: beetlePikenerImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level7: {
      unitId: "beetle707",
      level: 7,
      name: "Пікінер", // Те саме ім'я!
      hp: 185,
      armor: 35,
      attack: 73,
      step: 4,
      range: 1,
      coin: 0,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: beetlePikenerImg,
      abilities: [
        // { key: "arrowShot", power: 250},
        // { key: "rage", power: 100},
      ],
      effects: []
    },
    level8: {
      unitId: "beetle708",
      level: 8,
      name: "Пікінер",
      hp: 185,
      armor: 35,
      attack: 75,
      step: 4,
      range: 1,
      coin: 0,
      upgradeCost: null,
      description: "Легендарний воїн",
      img: beetlePikenerImg,
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
  Object.values(beetlePikenerLevels).forEach(unit => {
    window.unitsRegistry[unit.unitId] = unit;
  });
  
  // Для магазину показуємо тільки 1 рівень
