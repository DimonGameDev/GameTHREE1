// js/asset/units/unitsOrc/warrior/orcLevel.js
// ведмідь
let orcMinotaurImg = "../../img/units/orc/orcMinotaur/blue/orcMinotaurBlue.png";
// ОРКИ - Воїн (8 рівнів)
let orcMinotaurLevels = {
    level1: {
      unitId: "orc901", // Унікальний ID юніта (1XX - орки воїни)
      level: 1,
      name: "Мінотавр",
      hp: 150,
      armor: 20,
      attack: 60,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 200,
      description: "Сильний воїн з гарною атакою",
    img: orcMinotaurImg,
      abilities: [
        { key: "attackAura", power: 3 } 
      ],
      effects: []
    },
    level2: {
      unitId: "orc902",
      level: 2,
      name: "Мінотавр", // Те саме ім'я!
      hp: 155,
      armor: 21,
      attack: 62,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 202,
      description: "Сильний воїн з гарною атакою",
      img: orcMinotaurImg,
      abilities: [
        { key: "attackAura", power: 3 } 
      ],
      effects: []
    },
    level3: {
      unitId: "orc903",
      level: 3,
      name: "Мінотавр",
      hp: 165,
      armor: 22,
      attack: 65,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 203,
      description: "Сильний воїн з гарною атакою",
      img: orcMinotaurImg,
      abilities: [
        { key: "attackAura", power: 3 } 
      ],
      effects: []
    },
    level4: {
      unitId: "orc904",
      level: 4,
      name: "Мінотавр", // Те саме ім'я!
      hp: 170,
      armor: 23,
      attack: 67,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований воїн з гарною атакою",
      img: orcMinotaurImg,
      abilities: [
        { key: "attackAura", power: 5 } 
      ],
      effects: []
    },
    level5: {
    unitId: "orc905",
      level: 5,
      name: "Мінотавр", // Те саме ім'я!
      hp: 170,
      armor: 24,
      attack: 69,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований воїн з гарною атакою",
      img: orcMinotaurImg,
      abilities: [
        { key: "attackAura", power: 5 } 
      ],
      effects: []
    },
    level6: {
      unitId: "orc906",
      level: 6,
      name: "Мінотавр", // Те саме ім'я!
      hp: 170,
      armor: 25,
      attack: 71,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований воїн з гарною атакою",
      img: orcMinotaurImg,
      abilities: [
        { key: "attackAura", power: 5 } 
      ],
      effects: []
    },
    level7: {
      unitId: "orc907",
      level: 7,
      name: "Мінотавр", // Те саме ім'я!
      hp: 170,
      armor: 26,
      attack: 73,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований воїн з гарною атакою",
      img: orcMinotaurImg,
      abilities: [
        { key: "attackAura", power: 5 } 
      ],
      effects: []
    },
    level8: {
      unitId: "orc908",
      level: 8,
      name: "Мінотавр",
      hp: 170,
      armor: 27,
      attack: 75,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: null,
      description: "Легендарний воїн з гарною атакою",
      img: orcMinotaurImg,
      abilities: [
        { key: "attackAura", power: 5 } 
      ],
      effects: []
    }
  };
  
  // Створюємо глобальний реєстр всіх юнітів за ID
  window.unitsRegistry = window.unitsRegistry || {};
  Object.values(orcMinotaurLevels).forEach(unit => {
    window.unitsRegistry[unit.unitId] = unit;
  });
  
  // Для магазину показуємо тільки 1 рівень
 