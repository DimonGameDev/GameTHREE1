// js/asset/units/unitsOrc/warrior/orcLevel.js
let piplAssassinImg = "../../img/units/pipl/piplAssassin/blue/piplAssassinBlue.png";
// ОРКИ - Воїн (8 рівнів)
let piplAssassinLevels = {
    level1: {
      unitId: "pipl1001", // Унікальний ID юніта (1XX - орки воїни)
      level: 1,
      name: "Ассасін",
      hp: 150,
      armor: 20,
      attack: 60,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 200,
      description: "Сильний воїн з важкою сокирою",
      img: piplAssassinImg,
      abilities: [
        { key: "attackAura", power: 3 }
      ],
      effects: []
    },
    level2: {
      unitId: "pipl1002",
      level: 2,
      name: "Ассасін", // Те саме ім'я!
      hp: 155,
      armor: 21,
      attack: 65,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 202,
      description: "Загартований в боях воїн",
      img: piplAssassinImg,
      abilities: [
        { key: "attackAura", power: 3 }
       
      ],
      effects: []
    },
    level3: {
      unitId: "pipl1003",
      level: 3,
      name: "Ассасін",
      hp: 165,
      armor: 22,
      attack: 65,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 203,
      description: "Майстер бойової сокири",
      img: piplAssassinImg,
      abilities: [
        { key: "attackAura", power: 3 }
        
      ],
      effects: []
    },
    level4: {
      unitId: "pipl1004",
      level: 4,
      name: "Ассасін", // Те саме ім'я!
      hp: 170,
      armor: 23,
      attack: 67,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: piplAssassinImg,
      abilities: [
        { key: "attackAura", power: 5 }
        
      ],
      effects: []
    },
    level5: {
        unitId: "pipl1005",
      level: 5,
      name: "Ассасін", // Те саме ім'я!
      hp: 170,
      armor: 24,
      attack: 69,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: piplAssassinImg,
      abilities: [
        { key: "attackAura", power: 5 }
        
      ],
      effects: []
    },
    level6: {
      unitId: "pipl1006",
      level: 6,
      name: "Ассасін", // Те саме ім'я!
      hp: 170,
      armor: 25,
      attack: 71,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: piplAssassinImg,
      abilities: [
        { key: "attackAura", power: 5 }
        
      ],
      effects: []
    },
    level7: {
      unitId: "pipl1007",
      level: 7,
      name: "Ассасін", // Те саме ім'я!
      hp: 170,
      armor: 26,
      attack: 73,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: 400,
      description: "Загартований в боях воїн",
      img: piplAssassinImg,
      abilities: [
        { key: "attackAura", power: 5 }
        
      ],
      effects: []
    },
    level8: {
    unitId: "pipl1008",
      level: 8,
      name: "Ассасін",
      hp: 170,
      armor: 27,
      attack: 75,
      step: 4,
      range: 1,
      coin: 500,
      upgradeCost: null,
      description: "Легендарний воїн",
      img: piplAssassinImg,
      abilities: [
        { key: "attackAura", power: 5 }
        
      ],
      effects: []
    }
  };
  
  // Створюємо глобальний реєстр всіх юнітів за ID
  window.unitsRegistry = window.unitsRegistry || {};
  Object.values(piplAssassinLevels).forEach(unit => {
    window.unitsRegistry[unit.unitId] = unit;
  });
  
  // Для магазину показуємо тільки 1 рівень
 