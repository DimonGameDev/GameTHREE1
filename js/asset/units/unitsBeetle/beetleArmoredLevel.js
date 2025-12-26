// js/asset/units/unitsOrc/warrior/orcLevel.js
let beetleArmoredImg = "../../img/units/beetle/beetleArmored/blue/beetleArmoredBlue.png";
// ельфи - Воїн (8 рівнів)
let beetleArmoredLevels = {
    level1: {
      unitId: "beetle801", // Унікальний ID юніта (1XX - орки воїни)
      level: 1,
      name: "Панцерний жук",
      hp: 148,
      armor: 25,
      attack: 50,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 200,
      description: "Сильний воїн з важкою сокирою",
      img: beetleArmoredImg,
      abilities: [
        { key: "armorAura", power: 3 }
      ],
      effects: []
    },
    level2: {
      unitId: "beetle802",
      level: 2,
      name: "Панцерний жук", // Те саме ім'я!
      hp: 158,
      armor: 26,
      attack: 53,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 201,
      description: "Загартований в боях воїн",
      img: beetleArmoredImg,
      abilities: [
        { key: "armorAura", power: 3 }
      ],
      effects: []
    },
    level3: {
      unitId: "beetle803",
      level: 3,
      name: "Панцерний жук",
      hp: 168,
      armor: 29,
      attack: 56,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 203,
      description: "Майстер бойової сокири",
        img: beetleArmoredImg,
      abilities: [
        { key: "armorAura", power: 3 }
      ],
      effects: []
    },
    level4: {
      unitId: "beetle804",
      level: 4,
      name: "Панцерний жук", // Те саме ім'я!
      hp: 174,
      armor: 30,
      attack: 59,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: beetleArmoredImg,
      abilities: [
        { key: "armorAura", power: 5 }
      ],
      effects: []
    },
    level5: {
      unitId: "beetle805",
      level: 5,
      name: "Панцерний жук", // Те саме ім'я!
      hp: 174,
      armor: 31,
      attack: 62,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: beetleArmoredImg,
      abilities: [
        { key: "armorAura", power: 5 }
      ],
      effects: []
    },
    level6: {
      unitId: "beetle806",
      level: 6,
      name: "Панцерний жук", // Те саме ім'я!
      hp: 174,
      armor: 32,
      attack: 65,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: beetleArmoredImg,
      abilities: [
        { key: "armorAura", power: 5 }
      ],
      effects: []
    },
    level7: {
      unitId: "beetle807",
      level: 7,
      name: "Панцерний жук", // Те саме ім'я!
      hp: 174,
      armor: 33,
      attack: 68,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: beetleArmoredImg,
      abilities: [
        { key: "armorAura", power: 5 }
      ],
      effects: []
    },
    level8: {
      unitId: "beetle808",
      level: 8,
      name: "Панцерний жук",
      hp: 174,
      armor: 34,
      attack: 70,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: null,
      description: "Легендарний воїн",
      img: beetleArmoredImg,
      abilities: [
        { key: "armorAura", power: 5 }
      ],
      effects: []
    }
  };
  
  // Створюємо глобальний реєстр всіх юнітів за ID
  window.unitsRegistry = window.unitsRegistry || {};
  Object.values(beetleArmoredLevels).forEach(unit => {
    window.unitsRegistry[unit.unitId] = unit;
  });
  
