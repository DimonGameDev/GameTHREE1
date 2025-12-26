// js/asset/units/unitsOrc/warrior/orcLevel.js
let beetleShamanImg = "../../img/units/beetle/beetleMag/blue/beetleShamanBlue.png";
// ельфи - Воїн (8 рівнів)
let beetleShamanLevels = {
    level1: {
      unitId: "beetle301", // Унікальний ID юніта (1XX - орки воїни)
      level: 1,
      name: "Шаман",
      hp: 115,
      armor: 6,
      attack: 45,
      step: 3,
      range: 3,
      coin: 100,
      upgradeCost: 221,
      description: "Сильний воїн з важкою сокирою",
      img: beetleShamanImg,
      abilities: [
        { key: "allyHeal", power: 30 },

      ],
      effects: []
    },
    level2: {
      unitId: "beetle302",
      level: 2,
      name: "Шаман", // Те саме ім'я!
      hp: 130,
      armor: 9,
      attack: 48,
      step: 3,
      range: 3,
      coin: 0,
      upgradeCost: 222,
      description: "Загартований в боях воїн",
      img: beetleShamanImg,
      abilities: [
        { key: "allyHeal", power: 30 },
      ],
      effects: []
    },
    level3: {
      unitId: "beetle303",
      level: 3,
      name: "Шаман",
      hp: 140,
      armor: 13,
      attack: 56,
      step: 4,
      range: 3,
      coin: 0,
      upgradeCost: 223,
      description: "Майстер бойової сокири",
      img: beetleShamanImg,
      abilities: [
        { key: "allyHeal", power: 30 },
      ],
      effects: []
    },
    level4: {
      unitId: "beetle304",
      level: 4,
      name: "Шаман", // Те саме ім'я!
      hp: 140,
      armor: 15,
      attack: 59,
      step: 4,
      range: 3,
      coin: 0,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: beetleShamanImg,
      abilities: [
        { key: "allyHeal", power: 30 },
      ],
      effects: []
    },
    level5: {
      unitId: "beetle305",
      level: 5,
      name: "Шаман", // Те саме ім'я!
      hp: 140,
      armor: 17,
      attack: 63,
      step: 4,
      range: 3,
      coin: 0,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: beetleShamanImg,
      abilities: [
        { key: "allyHeal", power: 50 },
      ],
      effects: []
    },
    level6: {
      unitId: "beetle306",
      level: 6,
      name: "Шаман", // Те саме ім'я!
      hp: 140,
      armor: 19,
      attack: 63,
      step: 4,
      range: 3,
      coin: 0,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: beetleShamanImg,
      abilities: [
        { key: "allyHeal", power: 50 },
      ],
      effects: []
    },
    level7: {
      unitId: "beetle307",
      level: 7,
      name: "Шаман", // Те саме ім'я!
      hp: 140,
      armor: 20,
      attack: 63,
      step: 4,
      range: 3,
      coin: 0,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: beetleShamanImg,
      abilities: [
        { key: "allyHeal", power: 50 },
      ],
      effects: []
    },
    level8: {
      unitId: "beetle308",
      level: 8,
      name: "Шаман",
      hp: 140,
      armor: 21,
      attack: 63,
      step: 4,
      range: 3,
      coin: 0,
      upgradeCost: null,
      description: "Легендарний воїн",
      img: beetleShamanImg,
      abilities: [
        { key: "allyHeal", power: 50 },
      ],
      effects: []
    }
  };
  
  // Створюємо глобальний реєстр всіх юнітів за ID
  window.unitsRegistry = window.unitsRegistry || {};
  Object.values(beetleShamanLevels).forEach(unit => {
    window.unitsRegistry[unit.unitId] = unit;
  });
  
  // Для магазину показуємо тільки 1 рівень
  