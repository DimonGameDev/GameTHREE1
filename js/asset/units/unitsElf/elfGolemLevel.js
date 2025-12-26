// js/asset/units/unitsOrc/warrior/orcLevel.js
let elfGolemImg = "../../img/units/elf/elfGolem/blue/elfGolemBlue.png";
// ельфи - Воїн (8 рівнів)
let elfGolemLevels = {
    level1: {
      unitId: "elf801", // Унікальний ID юніта (1XX - орки воїни)
      level: 1,
      name: "Голем",
      hp: 154,
      armor: 24,
      attack: 49,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 200,
      description: "Сильний воїн з важкою сокирою",
      img: elfGolemImg,
      abilities: [
        { key: "armorAura", power: 3 }
      ],
      effects: []
    },
    level2: {
      unitId: "elf802",
      level: 2,
      name: "Голем", // Те саме ім'я!
      hp: 164,
      armor: 25,
      attack: 52,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 201,
      description: "Загартований в боях воїн",
      img: elfGolemImg,
      abilities: [
        { key: "armorAura", power: 3 }
      ],
      effects: []
    },
    level3: {
      unitId: "elf803",
      level: 3,
      name: "Голем",
      hp: 174,
      armor: 28,
      attack: 55,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 203,
      description: "Майстер бойової сокири",
      img: elfGolemImg,
      abilities: [
        { key: "armorAura", power: 3 }
      ],
      effects: []
    },
    level4: {
      unitId: "elf804",
      level: 4,
      name: "Голем", // Те саме ім'я!
      hp: 182,
      armor: 29,
      attack: 58,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: elfGolemImg,
      abilities: [
        { key: "armorAura", power: 5 }
      ],
      effects: []
    },
    level5: {
        unitId: "elf805",
      level: 5,
      name: "Голем", // Те саме ім'я!
      hp: 182,
      armor: 30,
      attack: 61,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: elfGolemImg,
      abilities: [
        { key: "armorAura", power: 5 }
      ],
      effects: []
    },
    level6: {
      unitId: "elf806",
      level: 6,
      name: "Голем", // Те саме ім'я!
      hp: 182,
      armor: 31,
      attack: 64,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: elfGolemImg,
      abilities: [
        { key: "armorAura", power: 5 }
      ],
      effects: []
    },
    level7: {
      unitId: "elf807",
      level: 7,
      name: "Голем", // Те саме ім'я!
      hp: 182,
      armor: 32,
      attack: 67,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: elfGolemImg,
      abilities: [
        { key: "armorAura", power: 5 }
      ],
      effects: []
    },
    level8: {
      unitId: "elf808",
      level: 8,
      name: "Голем",
      hp: 182,
      armor: 33,
      attack: 69,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: null,
      description: "Легендарний воїн",
      img: elfGolemImg,
      abilities: [
        { key: "armorAura", power: 5 }
      ],
      effects: []
    }
  };
  
  // Створюємо глобальний реєстр всіх юнітів за ID
  window.unitsRegistry = window.unitsRegistry || {};
  Object.values(elfGolemLevels).forEach(unit => {
    window.unitsRegistry[unit.unitId] = unit;
  });
  
 