const abilities = {
    // stability: {
    //   name: "Стійкість",
    //   mode: "passive",               // 🟢 постійний ефект
    //   actionType: "buff",
    //   type: "armor",
    //   basePower: 24,
    //   duration: 3,
    //   description: "Дає супер броню.",
    //   img: "../../img/nextLevel/orc/voin/shield.jpg"
    // },
  
    // rage: {
    //   name: "Лють",
    //   mode: "passive",               // 🟢 діє автоматично при певних умовах
    //   actionType: "buff",
    //   type: "attack",
    //   basePower: 43,
    //   condition: "lowHp",
    //   duration: 2,
    //   description: "Збільшує атаку, коли мало здоров’я.",
    //   img: "../../img/nextLevel/orc/voin/shield.jpg"
    // },
  
    // arrowShot: {
    //   name: "Постріл стрілою",
    //   mode: "active",                // 🔴 гравець активує вручну
    //   actionType: "attack",
    //   range: 3,
    //   damage: 30,
    //   description: "Стріляє в ворога на відстані.",
    //   img: "../../img/nextLevel/orc/voin/voin2.jpg"
    // },
  
    // immobilize: {
    //   name: "Знерухомлення",
    //   mode: "active",                // 🔴 це активна дія
    //   actionType: "special",
    //   effect: "immobilize",
    //   duration: 2,
    //   description: "Робить ціль нерухомою на 2 ходи.",
    //   img: "../../img/nextLevel/orc/voin/voin2.jpg"
    // },
  
    // teleport: {
    //   name: "Телепорт",
    //   mode: "active",                // 🔴 активується вручну
    //   actionType: "move",
    //   range: 5,
    //   description: "Переміщає юніта на іншу клітинку.",
    //   img: "../../img/nextLevel/orc/voin/voin2.jpg"
    // },
  
    // auraHeal: {
    //   name: "Аура лікування",
    //   mode: "passive",               // 🟢 постійно діє
    //   actionType: "aura",
    //   type: "hp",
    //   basePower: 601,
    //   perTurn: true,
    //   radius: 2,
    //   targets: "allies",
    //   duration: null,
    //   description: "Відновлює здоров’я союзників у радіусі 2 клітин.",
    //   img: "../../img/nextLevel/orc/voin/shield.jpg"
    // },
 // 👇 НОВА ЗДІБНІСТЬ
 allyHeal: {
  name: "Лікування союзника",
  mode: "active",                // 🔴 активна здібність
  actionType: "heal",
  type: "hp",
  healAmount: 50,                // Скільки HP відновлює (базове значення)
  healPercent: null,             // або можна в % від макс HP (наприклад 20)
  range: 3,                      // На якій відстані може лікувати
  targets: "ally",               // Тільки союзників
  cooldown: 4,                   // Перезарядка 4 ходи
  manaCost: 0,                   // Вартість використання (якщо буде мана)
  duration: null,                // Миттєвий ефект
  description: "Відновлює здоров'я вибраному союзнику на відстані до 3 клітинок. +30 HP,а з 5рівня +50 HP",
  img: "../../img/nextLevel/auraHealth.jpeg"  // 👈 Замініть на свою іконку
},
armorAura: {
  name: "Аура захисту",
  mode: "passive",               // 🟢 постійно діє
  actionType: "aura",
  type: "armor",
  armorBonus: 5,                 // +5 до броні
  radius: 1,                     // Тільки сусідні клітинки (1 клітинка навколо)
  targets: "allies",             // Всі союзники
  // perTurn: false,                // Не на хід, а постійно поки в радіусі
  duration: 1,                // Безстроково поки в радіусі
  description: "Всі союзники на сусідніх клітинках отримують +3, а з 4 рівня +5 до броні.",
  img: "../../img/nextLevel/plusArmor.jpeg"  // 👈 Замініть на іконку щита/аури
},
  // 👇 НОВА АУРА АТАКИ
  attackAura: {
    name: "Аура сили",
    mode: "passive",               // 🟢 постійно діє
    actionType: "aura",
    type: "attack",
    attackBonus: 5,                // +5 до атаки
    radius: 1,                     // Тільки сусідні клітинки (1 клітинка навколо)
    targets: "allies",             // Всі союзники
    // perTurn: false,                // Не на хід, а постійно поки в радіусі
    duration: 1,                // Безстроково поки в радіусі
    description: "Всі союзники на сусідніх клітинках отримують +3, а з 4 рівня +5 до  атаки.",
    img: "../../img/nextLevel/plusAttack.jpeg"  // 👈 Замініть на іконку меча/аури
  },
  hasteAlly: {
    name: "Прискорення",
    mode: "active",                // 🔴 активна здібність
    actionType: "buff",
    type: "step",
    stepBonus: 2,                  // +2 до кроку
    range: 4,                      // На відстані до 3 клітинок
    targets: "ally",               // Один союзник
    cooldown: 4,                   // Перезарядка 4 ходи
    duration: 1,                   // Діє 2 ходи
    description: "Дає вибраному союзнику +1, а з 4 рівня +2, до кроку на 1 хід.",
    img: "../../img/nextLevel/speed.jpeg"  // 👈 Замініть на іконку швидкості
  },
  handcuffs: {  // Замість placeMine
    name: "Наручники",
    mode: "active",
    actionType: "control",        // Тип контролю (як entangle)
    type: "disarm",
    effect: "disarm",             // Новий ефект
    range: 4,
    targets: "enemy",
    cooldown: 4,
    duration: 1,                  // Діє 1 раунд
    description: "Надіває наручники на ворога, не даючи йому атакувати протягом 1 раунду.",
    img: "../../img/nextLevel/handcuffs.jpeg"  // 👈 Іконка наручників
  },
  entangle: {
    name: "Коріння",
    mode: "active",                // 🔴 активна здібність
    actionType: "control",
    type: "root",
    effect: "immobilize",          // Знерухомлення
    range: 4,                      // Дальність 4 клітинки
    targets: "enemy",              // Один ворог
    cooldown: 4,                   // Перезарядка 4 ходи
    duration: 1,                   // Діє 1 хід
    stepReduction: 999,            // Крок стає 0 (не може рухатись)
    description: "Коріння обплутує ворога, не даючи йому рухатись протягом 1 ходу. Дальність 4 клітинки.",
    img: "../../img/nextLevel/roots.jpeg"  
		// 👈 Замініть на іконку коріння/ліан
  },

  markTarget: {
    name: "Мітка",
    mode: "active",                // 🔴 активна здібність
    actionType: "debuff",
    type: "armor",
    effect: "armorReduction",
    armorReduction: 5,             // Базове значення (буде перезаписано через power)
    range: 4,                      // Дальність 4 клітинки
    targets: "enemy",              // Один ворог
    cooldown: 3,                   // Перезарядка 3 ходи
    duration: 1,                   // Діє 1 хід
    description: "Помічає ворога, зменшуючи його броню на 1 хід. Дальність 4 клітинки.",
    img: "../../img/nextLevel/minusArmor.jpeg"  // 👈 Замініть на іконку мітки/ока
  },
  parasite: {
    name: "Паразіт",
    mode: "active",                // 🔴 активна здібність
    actionType: "debuff",
    type: "attack",
    effect: "attackReduction",
    attackReduction: 10,           // Базове значення (буде перезаписано через power)
    range: 4,                      // Дальність 4 клітинки
    targets: "enemy",              // Один ворог
    cooldown: 3,                   // Перезарядка 3 ходи
    duration: 2,                   // Діє 1 хід
    description: "Паразит заражає ворога, зменшуючи його атаку на 1 хід. Дальність 4 клітинки.",
    img: "../../img/nextLevel/minusAttack.jpeg"  // 👈 Замініть на іконку паразита/черв'яка
  },
  supportAura: {
    name: "Аура підтримки",
    mode: "passive",               // 🟢 постійно діє
    actionType: "aura",
    type: "mixed",                 // Комбінований ефект (атака + броня + хп)
    attackBoost: 5,         // Буде перезаписано через power
    armorBoost: 3,                 // Буде перезаписано через power
    hpRegenPercent: 10,            // Буде перезаписано через power
    radius: 2,                     // 2 клітинки навколо
    targets: "allies",             // Всі союзники
    duration: 1,                   // Діє 1 хід
    description: "Дає додаткові бонуси союзникам на 2 клітинки: +3 до атаки, +2 до броні та +20% реген HP. А з 6го рівня +5 до атаки, +4 до броні та +30% реген HP.",
    img: "../../img/nextLevel/auraBonus.jpeg"
  },
  };
  
  window.abilities = abilities;