// js/asset/units/unitsOrc/warrior/orcLevel.js
// ведмідь
let orcBearImg = "../../img/units/orc/orcBear/blue/orcBearBlue.png";
// ОРКИ - Воїн (8 рівнів)
let orcBearLevels = {
    level1: {
      unitId: "orc801", // Унікальний ID юніта (1XX - орки воїни)
      level: 1,
      name: "Бойовий ведмідь",
      hp: 145,
      armor: 26,
      attack: 50,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 200,
      description: "Сильний воїн з дуже важкою броньою.",
      img: orcBearImg,
      abilities: [
        { key: "armorAura", power: 3 }
      ],
      effects: []
    },
    level2: {
      unitId: "orc802",
      level: 2,
      name: "Бойовий ведмідь", // Те саме ім'я!
      hp: 155,
      armor: 27,
      attack: 53,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Сильний воїн з дуже важкою броньою.",
      img: orcBearImg,
      abilities: [
        { key: "armorAura", power: 3 }
      ],
      effects: []
    },
    level3: {
      unitId: "orc803",
      level: 3,
      name: "Бойовий ведмідь",
      hp: 165,
      armor: 30,
      attack: 56,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 800,
      description: "Сильний воїн з дуже важкою броньою.",
      img: orcBearImg,
      abilities: [
        { key: "armorAura", power: 3 }
      ],
      effects: []
    },
    level4: {
      unitId: "orc804",
      level: 4,
      name: "Бойовий ведмідь", // Те саме ім'я!
      hp: 170,
      armor: 31,
      attack: 59,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований воїн з дуже важкою броньою.",
      img: orcBearImg,
      abilities: [
        { key: "armorAura", power: 5 }
      ],
      effects: []
    },
    level5: {
      unitId: "orc805",
      level: 5,
      name: "Бойовий ведмідь", // Те саме ім'я!
      hp: 170,
      armor: 32,
      attack: 62,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований воїн з дуже важкою броньою.",
      img: orcBearImg,
      abilities: [
        { key: "armorAura", power: 5 }
      ],
      effects: []
    },
    level6: {
      unitId: "orc806",
      level: 6,
      name: "Бойовий ведмідь", // Те саме ім'я!
      hp: 170,
      armor: 33,
      attack: 65,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований воїн з дуже важкою броньою.",
      img: orcBearImg,
      abilities: [
        { key: "armorAura", power: 5 }
      ],
      effects: []
    },
    level7: {
      unitId: "orc807",
      level: 7,
      name: "Бойовий ведмідь", // Те саме ім'я!
      hp: 170,
      armor: 34,
      attack: 68,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований воїн з дуже важкою броньою.",
      img: orcBearImg,
      abilities: [
        { key: "armorAura", power: 5 }
      ],
      effects: []
    },
    level8: {
      unitId: "orc808",
      level: 8,
      name: "Бойовий ведмідь",
      hp: 170,
      armor: 35,
      attack: 70,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: null,
      description: "Легендарний воїн з дуже важкою броньою.",
      img: orcBearImg,
      abilities: [
        { key: "armorAura", power: 5 }
      ],
      effects: []
    }
  };
  
  // Створюємо глобальний реєстр всіх юнітів за ID
  window.unitsRegistry = window.unitsRegistry || {};
  Object.values(orcBearLevels).forEach(unit => {
    window.unitsRegistry[unit.unitId] = unit;
  });
  
  // Для магазину показуємо тільки 1 рівень
 