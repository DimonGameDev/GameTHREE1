window.heroesAbilities = {
  // ----------------------------------------------------------------------------1
    // Здібності для Артеміс (Лучниця)
    tuveran: [
      {
        id: 1,
        name: "Мультипостріл",
        type: "active",
        img: "../../img/heroes/heroesAbilities/tuveran/efectOne.jpeg",
        description: "Атакує 3 найближчих ворогів одночасно, кожен постріл наносе деякий відсоток від урону.",
        // shortDesc: "Шкода + отрута",
        currentLevel: 1, // Поточний рівень здібності
        maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий) ТТ
          {
            levelId: 101,
            level: 1,
            descripLevel: "Кожен постріл 40% від урону.",
            damagePercent: 40,
            cooldown: 6,
            upgradeCost: 100 // Вартість покращення до наступного рівня (мана)
          },
          // Рівень 2
          {
            levelId: 102,
            level: 2,
            descripLevel: "Кожен постріл 50% від урону.",
            damagePercent: 50,
            cooldown: 6,
            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 103,
            level: 3,
            descripLevel: "Кожен постріл 60% від урону.",
            damagePercent: 60,
            // poisonDuration: 3,    // +1 хід отрути
            cooldown: 5,         
            upgradeCost: 300
          }
        ]
      },
      {
        id: 2,
        name: "Отруєна стріла", //TT
        type: "active",
        img: "../../img/heroes/heroesAbilities/tuveran/efectTwo.jpeg",
        description: "Випускає отруєну стрілу, яка завдає шкоди та накладає отруту на 3 ходи.",
        poisonDuration: 3,
        currentLevel: 1,
        maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 201,
            level: 1,
            descripLevel: "Шкода 25 урону, шкода 10 урону кожного кроку від отрути.",
            damage: 25,
            
            poisonDamage: 10,
            cooldown: 6,
            upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 202,
            level: 2,
            descripLevel: "Шкода 32 урону, шкода 12 урону кожного кроку від отрути.",
            damage: 32,
            poisonDamage: 12,
            cooldown: 5,
            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 203,
            level: 3,
            descripLevel: "Шкода 39 урону, шкода 15 урону кожного кроку від отрути.",
            damage: 39,
            poisonDamage: 15,
            cooldown: 5,          // -1 до перезарядки
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 204,
            level: 4,
            descripLevel: "Шкода 45 урону, шкода 20 урону кожного кроку від отрути.",
            damage: 45,
            poisonDamage: 20,
            cooldown: 5,          // -1 до перезарядки
            upgradeCost: 400     // Немає наступного рівня
          }
        ]
      },
      {
        id: 3,
          name: "Серія пострілів",
          type: "passive",
              img: "../../img/heroes/heroesAbilities/tuveran/efectThree.jpeg",
          description: "Якщо атакувати одного й тогож ворога, то йде додатковий відсоток від урону.",
          // shortDesc: "Магічна шкода + підпал",
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 301,
            level: 1,
            descripLevel: "2га атака наносить додаткові 10% від урону.",
            damagePercent: 10,
            upgradeCost: 100 // Вартість покращення до наступного рівня (мана)
          },
          // Рівень 2
          {
            levelId: 302,
            level: 2,
            descripLevel: "3тя атака наносить додаткові 20% від урону.",
            damagePercent: 20,
            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 303,
            level: 3,
            descripLevel: "4та атака наносить додаткові 30% від урону.",
            damagePercent: 30,
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 304,
            level: 4,
            descripLevel: "5та атака наносить додаткові 40% від урону.",
            damagePercent: 40,
            upgradeCost: 400     // Немає наступного рівня
          }
        ]
      }
    ],
    // ----------------------------------------------------------------------------2
    // Здібності для Леон (Лицар)
    timer: [
      {
        id: 4,
        name: "Канат захоплення",
        type: "active",
        img: "../../img/heroes/heroesAbilities/timer/efectOne.jpeg",
        description: "Стріляє канатом в точку на карті, якщо захопить ворога, то він буде притягнутий до найближчої видимої клітинки.",
        currentLevel: 1,
        maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 401,
            level: 1,
            descripLevel: "Канат захоплює ворога на відстані 10 клітинок.",
            distance: 10,
            cooldown: 5,
            upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 402,
            level: 2,
            descripLevel: "Канат захоплює ворога на відстані 15 клітинок і наносить 35 урону.",
            distance: 15,
            damage: 35,
            cooldown: 5,
            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 403,
            level: 3,
            descripLevel: "Канат захоплює ворога на відстані 20 клітинок і наносить 50 урону.",
            distance: 20,
            damage: 50,
            cooldown: 5,          // -1 до перезарядки
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 404,
            level: 4,
            descripLevel: "Канат захоплює ворога на відстані 25 клітинок і наносить 60 урону.",
            distance: 25,
            damage: 60,
            cooldown: 5,
            upgradeCost: 400     // Немає наступного рівня
          }
        ]
      },
      {
        id: 5,
        name: "Кров'яний лють",
        type: "active",
        img: "../../img/heroes/heroesAbilities/timer/efectTwo.jpeg",
        description: "За кожні 10% втраченого здоров'я, герой отримує додатковий відсоток до атаки.",
        hpPercentForDamage: 10,
        currentLevel: 1,
        maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 501,
            level: 1,
            descripLevel: "Герой отримує додаткові 5% до атаки.",
            damagePercent: 5,
            cooldown: 5,
            upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 502,
            level: 2,
            descripLevel: "Герой отримує додаткові 10% до атаки.",
            damagePercent: 10,
            cooldown: 5,
            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 503,
            level: 3,
            descripLevel: "Герой отримує додаткові 15% до атаки.",
            damagePercent: 15,
            cooldown: 5,          // -1 до перезарядки
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 504,
            level: 4,
            descripLevel: "Герой отримує додаткові 20% до атаки.",
            damagePercent: 20,
            cooldown: 5,
            upgradeCost: 400     // Немає наступного рівня
          }
        ]
      },
      {
        id: 6,
        name: "Збільшений кріт",
        type: "passive",
        img: "../../img/heroes/heroesAbilities/timer/efectThree.jpeg",
        description: "Збільшений шанс криту та множник шкоди при криті.",
        currentLevel: 1,
        maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 601,
            level: 1,
            descripLevel: "Шанс криту +9%, множник шкоди від 1.2 до 1.4 .",
            critChancePercent: 9,
            critDamageMin: 1.2,
            critDamageMax: 1.4,
            upgradeCost: 100 // Вартість покращення до наступного рівня (мана)
          },
          // Рівень 2
          {
            levelId: 602,
            level: 2,
            descripLevel: "Шанс криту +10%, множник шкоди від 1.4 до 1.6.",
            critChancePercent: 10,
            critDamageMin: 1.4,
            critDamageMax: 1.6,
            upgradeCost: 200 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 3
          {
            levelId: 603,
            level: 3,
            descripLevel: "Шанс криту +12%, множник шкоди від 1.5 до 1.7 .",
            critChancePercent: 12,
            critDamageMin: 1.5,
            critDamageMax: 1.7,
            upgradeCost: 200
          },
          // Рівень 4 (максимальний)
          {
            levelId: 604,
            level: 4,
            descripLevel: "Шанс криту +14%, множник шкоди від 1.6 до 1.8 .",
            critChancePercent: 14,
            critDamageMin: 1.6,
            critDamageMax: 1.8,          // -1 до перезарядки
            upgradeCost: 300
          },
          
        ]
      },
 
    ],
     // ----------------------------------------------------------------------------3
    // Здібності для Міра (Маг)
    darest: [
      {
        id: 7,
        name: "Запуск стріли", //TT
        type: "active",
        img: "../../img/heroes/heroesAbilities/darest/efectOne.jpeg",
        description: "Запускає стрілу яка летить поки не попаде в ціль.",
        
        currentLevel: 1,
        maxLevel: 4,     // Максимальний рівень
        // Параметри для кожного рівня
      levels: [
        // Рівень 1 (базовий)
        {
          levelId: 701,
          level: 1,
          descripLevel: "Попавши у ворога наносе 20% атаки",
          damagePercent: 20,
          cooldown: 5,
          upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
        },
        // Рівень 2
        {
          levelId: 702,
          level: 2,
          descripLevel: "Попавши у ворога наносе 30% атаки і віднімає 1 клітинку від кроку",
          damagePercent: 30,
          minusStep: 1,
          cooldown: 5,
          upgradeCost: 200
        },
        // Рівень 3
        {
          levelId: 703,
          level: 3,
          descripLevel: "Попавши у ворога наносе 40% атаки і віднімає 2 клітинку від кроку",
          damagePercent: 40,
          minusStep: 2,
          cooldown: 5,          // -1 до перезарядки
          upgradeCost: 300
        },
        // Рівень 4 (максимальний)
        {
          levelId: 704,
          level: 4,
          descripLevel: "Попавши у ворога наносе 50% атаки і віднімає 3 клітинку від кроку",
          damagePercent: 50,
          minusStep: 3,
          cooldown: 5,
          upgradeCost: 400     // Немає наступного рівня
        }
      ]
      },
      {
        id: 8,
        name: "Полювання",
        type: "active",
        img: "../../img/heroes/heroesAbilities/darest/efectTwo.jpeg",
        description: "Якщо герой атакував ворожого героя і залишив йому менше 60% здоров'я, то він отримує додаткові клітинки кроку.",
        currentLevel: 1,
        maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий) ТТ
          {
            levelId: 801,
            level: 1,
            descripLevel: "Якщо герой атакував ворожого героя і залишив йому менше 60% здоров'я, то він отримує 2 клітинки кроку.",
            stepPlus: 2,
            cooldown: 5,
            upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 802,
            level: 2,
            descripLevel: "Якщо герой атакував ворожого героя і залишив йому менше 60% здоров'я, то він отримує 3 клітинки кроку.",
            stepPlus: 3,          
            cooldown: 5,
            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 803,
            level: 3,
            descripLevel: "Якщо герой атакував ворожого героя і залишив йому менше 60% здоров'я, то він отримує 4 клітинки кроку.",
            stepPlus: 4,           
            cooldown: 5,          // -1 до перезарядки
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 804,
            level: 4,
            descripLevel: "Якщо герой атакував ворожого героя і залишив йому менше 60% здоров'я, то він отримує 5 клітинки кроку.",
            stepPlus: 5,          
            cooldown: 5,
            upgradeCost: 400     // Немає наступного рівня
          }
        ]
      },
      {
        id: 9,
        name: "Мале здоров'я", //TT
        type: "passive",
          img: "../../img/heroes/heroesAbilities/darest/efectThree.jpeg",
        description: "Якщо здоров'я героя менше деякого відсотка, то він отримує додаткові бонуси.",
        currentLevel: 1,
        maxLevel: 4,     // Максимальний рівень
        // Параметри для кожного рівня
      levels: [
        // Рівень 1 (базовий)
        {
          levelId: 901,
          level: 1,
          descripLevel: "Якщо здоров'я героя менше 45%, то він отримує додаткові 1 клітинку кроку і 5 броні.",
          hpPercent: 45,
          stepPlus: 1,
          armorBoost: 5,
          upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
        },
        // Рівень 2
        {
          levelId: 902,
          level: 2,
          descripLevel: "Якщо здоров'я героя менше 40%, то він отримує додаткові 2 клітинку кроку і 7 броні.",
          hpPercent: 40,
          stepPlus: 2,
          armorPlus: 7,
          upgradeCost: 200
        },
        // Рівень 3
        {
          levelId: 903,
          level: 3,       
          descripLevel: "Якщо здоров'я героя менше 40%, то він отримує додаткові 3 клітинку кроку і 9 броні.",
          hpPercent: 40,
          stepPlus: 3,
          armorPlus: 9,         
          upgradeCost: 300
        },
        // Рівень 4 (максимальний)
        {
          levelId: 904,
          level: 4,
          descripLevel: "Якщо здоров'я героя менше 40%, то він отримує додаткові 4 клітинку кроку і 10 броні.",
          hpPercent: 40,
          stepPlus: 4,
          armorPlus: 10,
          upgradeCost: 400     // Немає наступного рівня
        }
      ]
      }
    ],
  // ----------------------------------------------------------------------------4
    kriver: [
        {
          id: 10,
          name: "Стрибок", //TT
          type: "active",
              img: "../../img/heroes/heroesAbilities/kriver/efectOne.jpeg",
          description: "Стрибок через одну клітинку, навіть через ворога, дає бонуси.",
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 1001,
            level: 1,
            descripLevel: "Перестрибує через будь-що.",
            cooldown: 5,
            upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 1002,
            level: 2,
            descripLevel: "Перестрибує через будь-що і отримує додаткову 1 клітинку атаки.",
            cellAttackPlus: 1,
            cooldown: 5,
            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 1003,
            level: 3,
            descripLevel: "Перестрибує через будь-що і отримує додаткову 1 клітинку атаки і шанс кріта +15%.",
            cellAttackPlus: 1,
            critChancePercent: 15,
            cooldown: 5,          // -1 до перезарядки
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 1004,
            level: 4,
            descripLevel: "Перестрибує через будь-що і отримує додаткову 1 клітинку атаки і шанс кріта +15% і +20% броні.",
            cellAttackPlus: 1,
            critChancePercent: 15,
            armorPlusPercent: 20,
            cooldown: 5,
            upgradeCost: 400     // Немає наступного рівня
          }
        ]
        },
        {
          id: 11,
          name: "Стрибок до ворога",
          type: "active",
          img: "../../img/heroes/heroesAbilities/kriver/efectTwo.jpeg",
          description: "Стрибає до ворога і отримує бонуси.",
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 1101,
            level: 1,
            descripLevel: "Стрибає до ворога на 6 клітинок і отримує додаткові 35% атаки.",
            attackPercent: 35,
            cellDistance: 6,
            cooldown: 5,
            upgradeCost: 500 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 1102,
            level: 2,
            descripLevel: "Стрибає до ворога на 7 клітинок і отримує додаткові 35% атаки і броню +5.",
            attackPercent: 35,
            cellDistance: 7,
            armorPlus: 5,
            cooldown: 5,
            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 1103,
            level: 3,
            descripLevel: "Стрибає до ворога на 7 клітинок і отримує додаткові 40% атаки і броню +6.",
            attackPercent: 40,
            cellDistance: 7,
            armorPlus: 6,
            cooldown: 5,          // -1 до перезарядки
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 1104,
            level: 4,
            descripLevel: "Стрибає до ворога на 7 клітинок і отримує додаткові 45% атаки і броню +7.",
            attackPercent: 45,
            cellDistance: 7,
            armorPlus: 7,
            cooldown: 5,
            upgradeCost: 400     // Немає наступного рівня
          }
        ]
        },
        {
          id: 12,
          name: "Вампірізм", //tt
          type: "passive",
            img: "../../img/heroes/heroesAbilities/kriver/efectThree.jpeg",
          description: "Повертає якийсь відсоток від завданого урону в здоров'я.",
          currentLevel: 1,
          maxLevel: 5,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 1201,
            level: 1,
            descripLevel: "Повертає 10% від завданого урону в здоров'я.",
            hpPercent: 10,
            upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 1202,
            level: 2,
            descripLevel: "Повертає 13% від завданого урону в здоров'я.",
            hpPercent: 13,
            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 1203,
            level: 3,
            descripLevel: "Повертає 16% від завданого урону в здоров'я.",
            hpPercent: 16,          // -1 до перезарядки
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 1204,
            level: 4,
            descripLevel: "Повертає 19% від завданого урону в здоров'я.",
            hpPercent: 19, 
            upgradeCost: 400     // Немає наступного рівня
          }
        ]
        },
      ],
      // ----------------------------------------------------------------------------5
      // Здібності для Леон (Лицар)
      spetri: [
        {
          id: 13,
          name: "Збирач душ", 
          type: "passive",
            img: "../../img/heroes/heroesAbilities/spetri/efectOne.jpeg",
          description: "За кожну смерть ворога, герой отримує бонуси. При смерті, всі душі зникають.",
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 1301,
            level: 1,
            descripLevel: "За кожну смерть ворога, герой отримує +2 атаки (Максимум 10 душ).",
            attackBoost: 2,
            soulCount: 0,
            soulMaxCount: 10,
            upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 1302,
            level: 2,
            descripLevel: "За кожну смерть ворога, герой отримує +3 атаки (Максимум 12 душ).",
            attackBoost: 3,
            soulCount: 0,
            soulMaxCount: 12,
            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 1303,
            level: 3,       
            descripLevel: "За кожну смерть ворога, герой отримує +3 атаки (Максимум 15 душ).",
            attackBoost: 3,
            soulCount: 0,
            soulMaxCount: 15,          // -1 до перезарядки
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 1304,
            level: 4,
            descripLevel: "За кожну смерть ворога, герой отримує +3 атаки (Максимум 20 душ).",
            attackBoost: 3,
            soulCount: 0,
            soulMaxCount: 20,
            upgradeCost: 400     // Немає наступного рівня
          }
        ]
        },
        {
          id: 14,
          name: "Атака душами", //tt
          type: "active",
                img: "../../img/heroes/heroesAbilities/spetri/efectTwo.jpeg",
          description: "Атакує область навколо себе і завдає шкоди всім ворогам у ній.",
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 1401,
            level: 1,
            descripLevel: "Кожна душа -3 чистого урону.",
            damage: 3,
            cooldown: 6,
            upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 1402,
            level: 2,
            descripLevel: "Кожна душа -4 чистого урону.",
            damage: 4,
            cooldown: 6,
            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 1403,
            level: 3,
            descripLevel: "Кожна душа -4 чистого урону.",
            damage: 5,
            cooldown: 5,          // -1 до перезарядки
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 1404,
            level: 4,
            descripLevel: "Кожна душа -5 чистого урону.",
            damage: 5,
            cooldown: 5,  
            upgradeCost: 400     // Немає наступного рівня
          }
        ]
        },
        {
          id: 15, 
          name: "Берсерк", //tt
          type: "passive",
              img: "../../img/heroes/heroesAbilities/spetri/efectThree.jpeg",
          description: "Коли здоров'я героя менше 50%, він отримує додаткові бонуси.",
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 1501,
            level: 1,
            descripLevel: "Атака +10% і броню +5.",
            attackPercent: 10,
            armorPlus: 5,
            upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 1502,
            level: 2,
            descripLevel: "Атака +13% і броню +6.",
            attackPercent: 13,
            armorPlus: 6,
            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 1503,
            level: 3,
            descripLevel: "Атака +15% і броню +7.",
            attackPercent: 15,
            armorPlus: 7,          // -1 до перезарядки
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 1504,
            level: 4,
            descripLevel: "Атака +17% і броню +8.",
            attackPercent: 17,
            armorPlus: 8, 
            upgradeCost: 400     // Немає наступного рівня
          }
        ]
        },
      ],
      // ----------------------------------------------------------------------------6
      // Здібності для Міра (Маг)
      artemis: [
        {
          id: 16,
          name: "Шипи", //tt
          type: "active",
            img: "../../img/heroes/heroesAbilities/artemis/efectOne.jpeg",
          description: "Випускає шипи які повертають ворогу частину урону який він наніс.",
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 1601,
            level: 1,
            descripLevel: "Шипи повертають 10% урону.",
            damagePercent: 10,
            cooldown: 5,
            upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 1602,
            level: 2,
            descripLevel: "Шипи повертають 15% урону.",
            damagePercent: 15,
            cooldown: 5,
            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 1603,
            level: 3,
            descripLevel: "Шипи повертають 20% урону.",
            damagePercent: 20,
            cooldown: 5,          // -1 до перезарядки
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 1604,
            level: 4,
            descripLevel: "Шипи повертають 25% урону.",
            damagePercent: 25,
            cooldown: 5,
            upgradeCost: 400     // Немає наступного рівня
          }
        ]
        },
        {
          id: 17,
          name: "Непохитність", //tt
          type: "active",
            img: "../../img/heroes/heroesAbilities/artemis/efectTwo.jpeg",
          description: "Герой стає майже не вразливий до декількох фізичних атак, але втрачає кількість кроків.",
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 1701,
            level: 1,
            descripLevel: "Поглинає 70% урону від 1 фізичної атаки.",
            damagePercentBlock: 70,
            attackMinus: 1,
            cooldown: 6,
            upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 1702,
            level: 2,
            descripLevel: "Поглинає 80% урону від 1 фізичної атаки і втрачає 1 крок.",
            damagePercentBlock: 80,
            stepMinus: 1,
            attackMinus: 1,
            cooldown: 6,
            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 1703,
            level: 3,
            descripLevel: "Поглинає 80% урону від 2 фізичної атаки і втрачає 2 крок.",
            damagePercentBlock: 80,
            stepMinus: 2,
            attackMinus: 2,
            cooldown: 5,
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 1704,
            level: 4,
            descripLevel: "Поглинає 90% урону від 2 фізичної атаки і втрачає 3 крок.",
            damagePercentBlock: 90,
            stepMinus: 3,
            attackMinus: 2,
            cooldown: 5,
            upgradeCost: 400     // Немає наступного рівня
          }
        ]
        },
        {
          id: 18,
          name: "Баш", //tt
          type: "passive",
          img: "../../img/heroes/heroesAbilities/artemis/efectThree.jpeg",
          description: "Коли герой атакує, є шанс що він оглушить ворога на 1 хід.",
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 1801,
            level: 1,
            descripLevel: "Шанс оглушення 10% і ворог втрачає 2 кроків.",
            stunChancePercent: 10,
            stepMinus: 2,
            upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 1802,
            level: 2,
            descripLevel: "Шанс оглушення 12% і ворог втрачає 2 кроків і -2 броні.",
            stunChancePercent: 12,
            stepMinus: 2,
            armorMinus: 2,
            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 1803,
            level: 3,
            descripLevel: "Шанс оглушення 14% і ворог втрачає -3 кроків і -4 броні.",
            stunChancePercent: 14,
            stepMinus: 3,
            armorMinus: 4,      // -1 до перезарядки
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 1804,
            level: 4,
            descripLevel: "Шанс оглушення 16% і ворог втрачає -4 кроків і -6 броні.",
            stunChancePercent: 16,
            stepMinus: 4,
            armorMinus: 6,
            upgradeCost: 400     // Немає наступного рівня
          }
        ]
        },
      ],
      // ----------------------------------------------------------------------------7
      enagra: [
        {
          id: 19,
          name: "Відштовхування",
          type: "active",
            img: "../../img/heroes/heroesAbilities/enagra/efectOne.jpeg",
          description: "Відштовхує ворога назад.",
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 1901, //tt
            level: 1,
            descripLevel: "Відштовхує ворога на 1 клітинку назад і завдає 20% урону і зменшує йому броню на 10%.",
           cellDown: 1,
           damagePercent: 20,
           armorMinusPercent: 10,
            cooldown: 5, 
            upgradeCost: 500 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 1902,
            level: 2,
            descripLevel: "Відштовхує ворога на 2 клітинку назад і завдає 30% урону і зменшує йому броню на 15%.",
            cellDown: 2,
           damagePercent: 30,
           armorMinusPercent: 15,
            
            cooldown: 5,
            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 1903,
            level: 3,
            descripLevel: "Відштовхує ворога на 2 клітинку назад і завдає 35% урону і зменшує йому броню на 20%.",
            cellDown: 2,
           damagePercent: 35,
           armorMinusPercent: 20,
						
            cooldown: 5,          
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 1904,
            level: 4,
            descripLevel: "Відштовхує ворога на 2 клітинку назад і завдає 40% урону і зменшує йому броню на 25%.",
            cellDown: 2,
            damagePercent: 40,
            armorMinusPercent: 25,
            cooldown: 5,
            upgradeCost: 400     // Немає наступного рівня
          }
        ]
        },
        {
          id: 20,
          name: "Телепорт", //tt
          type: "active",
          img: "../../img/heroes/heroesAbilities/enagra/efectTwo.jpeg",
          description: "Герой може телепортуватися у відкриту зону.",
          
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 2001,
            level: 1,
            descripLevel: "Герой може телепортуватися на 5 клітинок.",
            cellTeleport: 5,
            cooldown: 5,
              upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 2002,
            level: 2,
            descripLevel: "Герой може телепортуватися на 6 клітинок.",
            cellTeleport: 6,
            cooldown: 5,
            upgradeCost: 200
          },
          // Рівень 3
          {
              levelId: 2003,
            level: 3,
            descripLevel: "Герой може телепортуватися на 7 клітинок.",
            cellTeleport: 7,
            
            cooldown: 5,          
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 2004,
            level: 4,
            descripLevel: "Герой може телепортуватися на 8 клітинок.",
            cellTeleport: 8,
            
            cooldown: 5,
            upgradeCost: 400     // Немає наступного рівня
          }
        ]
        },
        {
          id: 21,
          name: "Аура бонусів", //tt
          type: "passive",
          img: "../../img/heroes/heroesAbilities/enagra/efectThree.jpeg",
          description: "Всім союзникам поряд дає атаку і броню.",
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 2101,
            level: 1,
            descripLevel: "+5 атаки і +2 броні.",
            damageBoost: 5,
            armorBoost: 2,

            upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 2102,
            level: 2,
            descripLevel: "+7 атаки і +3 броні.", 
            damageBoost: 7, 
            armorBoost: 3,

            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 2103,
            level: 3,
            descripLevel: "+8 атаки і +4 броні.",
            damageBoost: 8,
            armorBoost: 4,
          upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 2104,
            level: 4,
            descripLevel: "+9 атаки і +5 броні.",
            step: 0,
            damageBoost: 9,
            armorBoost: 5,
            upgradeCost: 400     // Немає наступного рівня
          }
        ]
        },
      ],
      // ----------------------------------------------------------------------------8
      // Здібності для Леон (Лицар)
      blister: [
        {
          id: 22,
          name: "Лінія оборони", //tt
          type: "active",
            img: "../../img/heroes/heroesAbilities/blister/efectOne.jpeg",
          description: "Ставить стіну на якій союзники отримують додаткову броню.",
          
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 2201,
            level: 1,
            descripLevel: "Ставить 1 клітинку стіни і та дає 20% броні.",
            wallCount: 1,
            armorBoostPercent: 20,
            cooldown: 5,
            upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 2202,
            level: 2,
            descripLevel: "Ставить 3 клітинку стіни і кожна дає +15% броні.",
            wallCount: 3,
            armorBoostPercent: 15,
            cooldown: 5,
            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 2203,
            level: 3,
            descripLevel: "Ставить 3 клітинку стіни і кожна дає +20% броні.",
            wallCount: 3,
            armorBoostPercent: 20,
            cooldown: 5,          
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 2204,
            level: 4,
            descripLevel: "Ставить 3 клітинку стіни і кожна дає +25% броні.",
            wallCount: 3,
            armorBoostPercent: 25,
            cooldown: 5,
            upgradeCost: 400     // Немає наступного рівня
          }
        ]
        },
        {
            id: 23,
          name: "Удар по землі", //tt
          type: "active",
              img: "../../img/heroes/heroesAbilities/blister/efectTwo.jpeg",
          description: "Наносе удар по землі і відбирає броню і клітинки ходу.",
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 2301,
            level: 1,
            descripLevel: "Удар по 1 клітинці. у ворога - 1 крок і -10% броні.",
            cellBlow: 1,
            armorMinusPercent: 10,
            minusStep: 1,
            cooldown: 5,
              upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 2302,
            level: 2,
            descripLevel: "Удар по 3(+2м боковим) клітинкам. У ворогів - 1 крок і -10% броні.",
            cellBlow: 3,
            armorMinusPercent: 10,
            minusStep: 1,
            cooldown: 5,
            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 2303,
            level: 3,
            descripLevel: "Удар по 3(+2м боковим) клітинкам. У ворогів - 2 крок і -15% броні.",
            cellBlow: 3,
            armorMinusPercent: 15,
            minusStep: 2,
            cooldown: 5, 
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 2304,
            level: 4,
            descripLevel: "Удар по 3(+2м боковим) клітинкам. У ворогів - 3 крок і -20% броні.",
            cellBlow: 3,
            armorMinusPercent: 20,
            minusStep: 3,
            cooldown: 5,
              upgradeCost: 400     // Немає наступного рівня
          }
        ]
        },
        {
          id: 24,
          name: "Контроль здоровʼя",
          type: "passive",
              img: "../../img/heroes/heroesAbilities/blister/efectThree.jpeg",
          description: "Якщо здоровʼя падає надто низько то герой отримує додаткові характеристики.",
          currentLevel: 1,

          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 2401,
            level: 1,
            descripLevel: "Якщо нижче 30% то + 5 броні.",
            armorBoost: 5,
            healthPercent: 30,
            upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 2402,
            level: 2,
						descripLevel: "Якщо нижче 35% то + 6 броні +1 крок ходу.",
            armorBoost: 6,
            healthPercent: 35,
            step: 1,
            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 2403,
            level: 3,
						descripLevel: "Якщо нижче 40% то + 6 броні +2 крок ходу.",
            armorBoost: 6,
            healthPercent: 40,
            step: 2,          // -1 до перезарядки
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 2404,
            level: 4,
						descripLevel: "Якщо нижче 40% то + 7 броні +3 крок ходу.",
            armorBoost: 7,
            healthPercent: 40,
            step: 3,
            upgradeCost: 400     // Немає наступного рівня
          }
        ]
        },
      ],
      // ----------------------------------------------------------------------------9
      // Здібності для Міра (Маг)
      henri: [
        {
          id: 25,
          name: "Невидима мішень", //tt
          type: "active",
          img: "../../img/heroes/heroesAbilities/henri/efectOne.jpeg",
          description: "На героя не можна навестися щоб атакувати його. Збивається якщо герой атакує сам.",
          
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 2501,
            level: 1,
            descripLevel: "На один хід стає невидимою мішенʼю.",
            duration: 1,
            upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
              levelId: 2502,
            level: 2,
            descripLevel: "На 2 хіди стає невидимою мішенʼю.",
            duration: 2,
            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 2503,
            level: 3,
            descripLevel: "На 2 хіди стає невидимою мішенʼю і + 2 кроки.",
            duration: 2,
            step: 2,
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 2504,
            level: 4,
            descripLevel: "На 2 хіди стає невидимою мішенʼю і + 3 кроки.",
            duration: 2,
            step: 3,
            upgradeCost: 400     // Немає наступного рівня
          }
        ]
        },
        {
          id: 26,
          name: "Щит",
          type: "active",
            img: "../../img/heroes/heroesAbilities/henri/efectTwo.jpeg",
          description: "На один хід збільшує собі броню.",
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 2601,
            level: 1,
						descripLevel: "На 45%.",
            armorBoostPercent: 45,
            cooldown: 6,
            upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 2602,
            level: 2,
						descripLevel: "На 50%.",
            armorBoostPercent: 50,
            cooldown: 6,
            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 2603,
            level: 3,
						descripLevel: "На 55%.",
            armorBoostPercent: 55,
            cooldown: 6,
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 2604,
            level: 4,
						descripLevel: "На 60%.",
            armorBoostPercent: 60,
            cooldown: 6,
            upgradeCost: 400    
          }
        ]
        },
        {
          id: 27,
          name: "Друге дихання",
          type: "passive",
            img: "../../img/heroes/heroesAbilities/henri/efectThree.jpeg",
          description: "При падінні здоровʼя до 0 автоматично поновлюється.Здібність поновлюється при регені здоровʼя.",
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 2701,
            level: 1,
						descripLevel: "Відновлює 25% здоровʼя, поновлюється при 100% здоровʼя.",
            healthBoost: 25,
            healthPercent: 100,
            upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 2702,
            level: 2,
            descripLevel: "Відновлює 30% здоровʼя, поновлюється при 90% здоровʼя.",
            healthBoost: 30,
            healthPercent: 90,
            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 2703,
            level: 3,
            descripLevel: "Відновлює 35% здоровʼя, поновлюється при 80% здоровʼя.",
            healthBoost: 35,
            healthPercent: 80,
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
              levelId: 2704,
            level: 4,
            descripLevel: "Відновлює 40% здоровʼя, поновлюється при 70% здоровʼя.",
            healthBoost: 40,
            healthPercent: 70,
            upgradeCost: 400     // Немає наступного рівня
          }
        ]
        },
      ],
      // ----------------------------------------------------------------------------10
      savagar: [
        {
          id: 28,
          name: "Тактичний підступ", //tt
          type: "active",
          img: "../../img/heroes/heroesAbilities/savagar/efectOne.jpeg",
          description: "Телепортується на 3 клітинки і у всіг ворогів поряд відбирає характеристики.",
          
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 2801,
            level: 1,
						descripLevel: "-1 крок ходу.",
            stepMinus: 1,
            cooldown: 5,
              upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 2802,
            level: 2,
            descripLevel: "-1 крок ходу і -5% броні.",
            stepMinus: 1,
            armorMinusPercent: 5,
            cooldown: 5,
            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 2803,
            level: 3,
            descripLevel: "-2 крок ходу і -5% броні.",
            stepMinus: 2,
            armorMinusPercent: 5,
            cooldown: 5,          // -1 до перезарядки
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 2804,
            level: 4,
            descripLevel: "-2 крок ходу і -10% броні.",
            stepMinus: 2,
            armorMinusPercent: 10,
            cooldown: 5,
            upgradeCost: 400     // Немає наступного рівня
          }
        ]
        },
        {
          id: 29,
          name: "Заміна місцями",
          type: "active",
          img: "../../img/heroes/heroesAbilities/savagar/efectTwo.jpeg",
          description: "Міняється місцями з кимось.",
          
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 2901, //tt
            level: 1,
            descripLevel: "На відстані 5 клітинок.",
            rangeCount: 5,
            cooldown: 5,  
            upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 2902,
            level: 2,
            descripLevel: "На відстані 6 клітинок.",
            rangeCount: 6,
            cooldown: 5,
            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 2903,
            level: 3,
            descripLevel: "На відстані 7 клітинок.",       
            rangeCount: 7,
            cooldown: 5,          
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 2904,
            level: 4,
            descripLevel: "На відстані 8 клітинок.",
            rangeCount: 8,
            cooldown: 5,
            upgradeCost: 400     // Немає наступного рівня
          }
        ]
        },
        {
          id: 30,
          name: "Додаткова броня",
          type: "passive",
          img: "../../img/heroes/heroesAbilities/savagar/efectThree.jpeg",
          description: "Чим більше ворогів поряд, тим більша броня.",
          shortDesc: "Гарантований кріт",
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
              levelId: 3001,
            level: 1,
            descripLevel: "Кожен ворог дає 8% броні.",
            armorPlusPercent: 8,
            upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 3002,
            level: 2,
            descripLevel: "Кожен ворог дає 13% броні.",
            armorPlusPercent: 13,
            upgradeCost: 1000
          },
          // Рівень 3
          {
            levelId: 3003,
            level: 3,
            descripLevel: "Кожен ворог дає 17% броні.",
            armorPlusPercent: 17,
            upgradeCost: 2000
          },
          // Рівень 4 (максимальний)
          {
            levelId: 3004,
            level: 4,
            descripLevel: "Кожен ворог дає 20% броні.",
            armorPlusPercent: 20,
            upgradeCost: null       
          }
        ]
        },
      ],
      // ----------------------------------------------------------------------------11
      // Здібності для Леон (Лицар)
      mayden: [
        {
          id: 31,
          name: "Ланцюгова блискавка", //tt
          type: "active",
          img: "../../img/heroes/heroesAbilities/mayden/efectOne.jpeg",
          description: "Атакує ворогів по черзі блискавкою.",
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 3101,
            level: 1,
            descripLevel: "Перший 70% урону, другий 50%, третій 30%.",
            OneDamagePercent: 70,
            TwoDamagePercent: 50,
            ThreeDamagePercent: 30,
            cooldown: 5,
            upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 3102,
            level: 2,
            descripLevel: "Перший 80% урону, другий 60%, третій 40%.",      
            OneDamagePercent: 80,
            TwoDamagePercent: 60,
            ThreeDamagePercent: 40,
            cooldown: 5,
            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 3103,
            level: 3,
            descripLevel: "Перший 90% урону, другий 70%, третій 60%.",
            OneDamagePercent: 90,
            TwoDamagePercent: 70,
            ThreeDamagePercent: 60,
            cooldown: 5,
            upgradeCost: 2000
          },
          // Рівень 4 (максимальний)
          {
            levelId: 3104,
            level: 4,
            descripLevel: "Перший 100% урону, другий 80%, третій 70%.",
            OneDamagePercent: 100,
            TwoDamagePercent: 80,
            ThreeDamagePercent: 70,
            cooldown: 5,
            upgradeCost: null        
          }
        ]
        },
        {
          id: 32,
          name: "Благословення", //tt
          type: "active",
          img: "../../img/heroes/heroesAbilities/mayden/efectTwo.jpeg",
          description: "Дає додаткові характеристики союзникам в радіусі 2х клітинок.",
          cellCount: 2,
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 3201,
            level: 1,
            descripLevel: "+5% атаки + 5% броні.",
            attackBoostPercent: 5,
            armorBoostPercent: 5,
            cooldown: 5,
            upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 3202,
            level: 2,
            descripLevel: "+10% атаки + 8% броні.",
            attackBoostPercent: 10,
            armorBoostPercent: 8,
            cooldown: 5,
            upgradeCost: 1000
          },
          // Рівень 3
          {
              levelId: 3203,
            level: 3,
            descripLevel: "+15% атаки + 11% броні.",
            attackBoostPercent: 15,
            armorBoostPercent: 11,
            cooldown: 5,          // -1 до перезарядки
            upgradeCost: 2000
          },
          // Рівень 4 (максимальний)
          {
            levelId: 3204,
            level: 4,
            descripLevel: "+20% атаки + 15% броні.",
            attackBoostPercent: 20,
            armorBoostPercent: 15,
            cooldown: 5,
            upgradeCost: null     // Немає наступного рівня
          }
        ]
        },
        {
          id: 33,
          name: "Мітка",
          type: "active",
          img: "../../img/heroes/heroesAbilities/mayden/efectThree.jpeg",
          description: "Ставить мітку на ворога і його видно на карті і віднімає характеристики",
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 3301,
            level: 1,
            descripLevel: "Видно на карті 2 хода.",
            cellCount: 2,
            cooldown: 5,
              upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 3302,
            level: 2,
            descripLevel: "Видно на карті 2 хода і - 5% броні.",
            cellCount: 2,
            armorMinusPercent: 5,
            cooldown: 5,
                upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 3303,
            level: 3,
            descripLevel: "Видно на карті 2 хода і - 10% броні.",
            cellCount: 2,
            armorMinusPercent: 10,
            cooldown: 5,          // -1 до перезарядки
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 3304,
            level: 4,
            descripLevel: "Видно на карті 2 хода і - 15% броні.",
            cellCount: 2,
            armorMinusPercent: 15,
            cooldown: 5,
                upgradeCost: 400     // Немає наступного рівня
          }
        ]
        },
      ],
      // ----------------------------------------------------------------------------12
      // Здібності для Міра (Маг)
      elder: [
        {
          id: 34,
          name: "Отруєна територія", //tt
          type: "active",
          img: "../../img/heroes/heroesAbilities/elder/efectOne.jpeg",
          description: "Ставить територію 3х3, всі хто в ній отримують відсотокурону.",
          
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 3401,
            level: 1,
            descripLevel: "Отримують 15% урону.",
              damagePercent: 15,
            cooldown: 5,
            upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 3402,
            level: 2,
            descripLevel: "На 2 хода, всі хто в ній отримують 15% урону.",
            damagePercent: 15,
            moveCount: 2,
            cooldown: 5,
            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 3403,
            level: 3,
            descripLevel: "На 2 хода,всі хто в ній отримують 20% урону.",
            damagePercent: 20,
            moveCount: 2,
            cooldown: 5,         
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 3404,
            level: 4,
            descripLevel: "На 2 хода, всі хто в ній отримують 20% урону і - 2 кроки.",
            damagePercent: 20,
            moveCount: 2,
            stepMinus: 2,
            cooldown: 5,
            upgradeCost: 400     
          }
        ]
        },
        {
            id: 35,
          name: "Додаткові бонуси", //tt
          type: "active",
          img: "../../img/heroes/heroesAbilities/elder/efectTwo.jpeg",
          description: "Дає додаткові бонуси союзникам на 2 клітинки",
          cellCount: 2,
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
              levelId: 3501,
            level: 1,
            descripLevel: "+5% урону, + 3 броні.",
            attackBoostPercent: 5,
            armorBoost: 3,
            cooldown: 6,
            upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 3502,
            level: 2,
            descripLevel: "+5% урону, + 3 броні + 10% регену здоровʼя.",
            attackBoostPercent: 5,
            armorBoost: 3,
            hpRegenPercent: 10,
            cooldown: 6,
            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 3503,
            level: 3,
            descripLevel: "+5% урону, + 3 броні + 10% регену здоровʼя.",
            attackBoostPercent: 5,
            armorBoost: 3,
            hpRegenPercent: 10,
            cooldown: 5,         
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 3504,
            level: 4,
            descripLevel: "+10% урону, + 5 броні + 15% регену здоровʼя.",
            attackBoostPercent: 10,
            armorBoost: 5,
            hpRegenPercent: 15,
            cooldown: 5,
                upgradeCost: 400     // Немає наступного рівня
          }
        ]
        },
        {
          id: 36,
          name: "Згусток енергії",
          type: "active",
          img: "../../img/heroes/heroesAbilities/elder/efectThree.jpeg",
          description: "Випускає згусток енергії в туман війни і видкриває карту",
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 3601,
            level: 1,
            descripLevel: "Видкриває 9 клітинок.",
            cellCount: 9,
            cooldown: 5,
            upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 3602,
            level: 2,
            descripLevel: "Видкриває 10 клітинок.",
            cellCount: 10,
            cooldown: 5,
            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 3603,
            level: 3,
            descripLevel: "Видкриває 11 клітинок.",
            cellCount: 11,
            cooldown: 5,          // -1 до перезарядки
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 3604,
            level: 4,
            descripLevel: "Видкриває 12 клітинок.",
            cellCount: 12,
            cooldown: 5,
            upgradeCost: 400     // Немає наступного рівня
          }
        ]
        },
      ],
      // ----------------------------------------------------------------------------13
        dazara: [
        {
          id: 37,
          name: "Удар по площі", //tt
          type: "active",
          img: "../../img/heroes/heroesAbilities/dazara/efectOne.jpeg",
          description: "Нанасе всім в радіусі 3х3 відсоток урону.",
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 3701,
            level: 1,
            descripLevel: "Нанасе всім 40% урону і -1 крок.",
            damagePercent: 40,
            stepMinus: 1,
            cooldown: 5,
            upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
              levelId: 3702,
            level: 2,
            descripLevel: "Нанасе всім 45% урону і -1 крок.",
            damagePercent: 45,
            stepMinus: 1,
            cooldown: 5,
            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 3703,
            level: 3,
            descripLevel: "Нанасе всім 45% урону і -2 крок.",
            damagePercent: 45,
            stepMinus: 2,
            cooldown: 5, 
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 3704,
            level: 4,
            descripLevel: "Нанасе всім 50% урону і -2 крок.",
            damagePercent: 50,
            stepMinus: 2,
            cooldown: 5, 
            upgradeCost: 400     // Немає наступного рівня
          }
        ]
        },
        {
          id: 38,
          name: "Розвід-куля",
          type: "active",
          img: "../../img/heroes/heroesAbilities/dazara/efectTwo.jpeg",
          description: "Запускає розвід кулю яка відкриває територію 3х3.",
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 3801,
            level: 1,
            descripLevel: "На 1 хід.",
            moveCount: 1,
            cooldown: 5,
            upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 3802,
            level: 2,
            descripLevel: "На 2 хіди.",
            moveCount: 2,
            cooldown: 5,
                upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 3803,
            level: 3,
            descripLevel: "На 3 хіди.",
            moveCount: 3,
            cooldown: 5,          // -1 до перезарядки
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 3804,
            level: 4,
            descripLevel: "На 4 хіди.",
            moveCount: 4,
            cooldown: 5,
            upgradeCost: 400     // Немає наступного рівня
          }
        ]
        },
        {
          id: 39,
          name: "Телепорт юніта",
          type: "active",
          img: "../../img/heroes/heroesAbilities/dazara/efectThree.jpeg",
          description: "Телепортуює свого юніта.",
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 3901,
            level: 1,
            descripLevel: "Телепортує на 3 клітинки.",
            cellCount: 3,
            cooldown: 5,
            upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 3902,
            level: 2,
            descripLevel: "Телепортує на 4 клітинки.",
            cellCount: 4,
            cooldown: 5,
            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 3903,
            level: 3,
            descripLevel: "Телепортує на 5 клітинки.",
            cellCount: 5,
            cooldown: 5,          // -1 до перезарядки
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
              levelId: 3904,
            level: 4,
            descripLevel: "Телепортує на 6 клітинки.",
            cellCount: 6,
            cooldown: 5,
            upgradeCost: 400     // Немає наступного рівня
          }
        ]
        },
      ],
      // ----------------------------------------------------------------------------14
      // Здібності для Леон (Лицар)
      sniper: [
        {
          id: 40,
          name: "Централізований удар",
          type: "active",
          img: "../../img/heroes/heroesAbilities/sniper/efectOne.jpeg",
          description: "Бʼє магією по площі 3х3.",
          
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 4001,
            level: 1,
            descripLevel: "Наносе 35% урону,віднімає 10% броні.",
            damagePercent: 35,
            armorMinusPercent: 10,
            cooldown: 5,
            upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 4002,
            level: 2,
            descripLevel: "Наносе 40% урону,віднімає 14% броні.",
            damagePercent: 40,
            armorMinusPercent: 14,
            cooldown: 5,
            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 4003,
            level: 3,
            descripLevel: "Наносе 45% урону,віднімає 18% броні.",
            damagePercent: 45,
            armorMinusPercent: 18,
            cooldown: 5,          // -1 до перезарядки
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 4004,
            level: 4,
            descripLevel: "Наносе 50% урону,віднімає 22% броні.",
            damagePercent: 50,
            armorMinusPercent: 22,
            cooldown: 5,
                upgradeCost: 400     // Немає наступного рівня
          }
        ]
        },
        {
          id: 41,
          name: "Знерухомлення цілі",
          type: "active",
          img: "../../img/heroes/heroesAbilities/sniper/efectTwo.jpeg",
          description: "Знерухомлює ціль на 1 хід і відбирає характерстики.",
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 4101,
            level: 1,
            descripLevel: "Дальність атаки стає 1.",
            attackCellCount: 1,
            cooldown: 6,
            upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 4102,
            level: 2,
            descripLevel: "Дальність атаки стає 1, - 10% атаки.",
            attackCellCount: 1,
            attackMinusPercent: 10,
            cooldown: 6,
            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 4103,
            level: 3,
            descripLevel: "Дальність атаки стає 1, - 10% атаки, перезарядка -1",
            attackCellCount: 1,
            attackMinusPercent: 10,
            cooldown: 5,          // -1 до перезарядки
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 4104,
            level: 4,
            descripLevel: "Дальність атаки стає 1, - 15% атаки, - 10% броні.",
            attackCellCount: 1,
            attackMinusPercent: 15,
            armorMinusPercent: 10,
            cooldown: 5,
            upgradeCost: 400     // Немає наступного рівня
          }
        ]
        },
        {
          id: 42,
          name: "Реген союзників",
          type: "active",
          img: "../../img/heroes/heroesAbilities/sniper/efectThree.jpeg",
          description: "Ставить територію 3х3 з посохом в середині і всі хто там регеняться.",
          
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
              levelId: 4201,
            level: 1,
            descripLevel: "Регенить по 10% здоровʼя.",
            hpRegenPercent: 10,
            cooldown: 5,
            upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 4202,
            level: 2,
            descripLevel: "Регенить по 15% здоровʼя.",
            hpRegenPercent: 15,
            cooldown: 5,
            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 4203,
            level: 3,
            descripLevel: "Регенить по 20% здоровʼя.",
            hpRegenPercent: 20,
            cooldown: 5,          // -1 до перезарядки
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 4204,
            level: 4,
            descripLevel: "Регенить по 25% здоровʼя.",
            hpRegenPercent: 25,
            cooldown: 5,
            upgradeCost: 400     // Немає наступного рівня
          }
        ]
        },
      ],
      // ----------------------------------------------------------------------------15
      // Здібності для Міра (Маг)
      nekropius: [
        {
          id: 43,
          name: "Магічний портал",
          type: "active",
          img: "../../img/heroes/heroesAbilities/nekropius/efectOne.jpeg",
          description: "Ставить телепорт,герой вибирає точку входу, потім точку виходу, на 2 ходи.",
          
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 4301,
            level: 1,
            descripLevel: "Відстань між точками порталу 5 клітинок.",
            cellCount: 5,
            cooldown: 5,
            upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 4302,
            level: 2,
            descripLevel: "Відстань між точками порталу 6 клітинок.",
            cellCount: 6,
            cooldown: 5,
              upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 4303,
            level: 3,
            descripLevel: "Відстань між точками порталу 7 клітинок.",
            cellCount: 7,
            cooldown: 5,          // -1 до перезарядки
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 4304,
            level: 4,
            descripLevel: "Відстань між точками порталу 8 клітинок.",
            cellCount: 8,
            cooldown: 5,
            upgradeCost: 400     // Немає наступного рівня
          }
        ]
        },
        {
          id: 44,
          name: "Ставить стіну",
          type: "active",
          img: "../../img/heroes/heroesAbilities/nekropius/efectTwo.jpeg",
          description: "Ставить стіну з трьох кубиків,перпендикулярно собі. Сюзників вона регенить,а ворогів зупиняє.",
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 4401,
            level: 1,
            descripLevel: "Союзникам регенить 10% здоровʼя. У ворогів відбирає 1 крок ходу.",
            hpRegenPercent: 10,
            stepMinus: 1,
            cooldown: 5,
            upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 4402,
            level: 2,
            descripLevel: "Союзникам регенить 13% здоровʼя. У ворогів відбирає 2 крок ходу.",
            hpRegenPercent: 13,
            stepMinus: 2,
            cooldown: 5,
            upgradeCost: 200
          },
          // Рівень 3
          {
              levelId: 4403,
            level: 3,
            descripLevel: "Союзникам регенить 16% здоровʼя. У ворогів відбирає 3 крок ходу.",
            hpRegenPercent: 16,
            stepMinus: 3,
            cooldown: 5,          // -1 до перезарядки
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
            levelId: 4404,
            level: 4,
            descripLevel: "Союзникам регенить 19% здоровʼя. У ворогів відбирає 4 крок ходу.",
            hpRegenPercent: 19,
            stepMinus: 4,
            cooldown: 5,
            upgradeCost: 400     // Немає наступного рівня
          }
        ]
        },
        {
          id: 45,
          name: "Підготовлений удар",
          type: "active",
          img: "../../img/heroes/heroesAbilities/nekropius/efectThree.jpeg",
          description: "На цей хід ставить точку куди буде стриляти, а на початку наступного ходу туда стриляє енергією.",
          
          currentLevel: 1,
          maxLevel: 4,     // Максимальний рівень
          // Параметри для кожного рівня
        levels: [
          // Рівень 1 (базовий)
          {
            levelId: 4501,
            level: 1,
            descripLevel: "Бʼє 80% від урону",
            damagePercent: 80,
            cooldown: 6,
            upgradeCost: 100 // Вартість покращення до наступного рівня (золото)
          },
          // Рівень 2
          {
            levelId: 4502,
            level: 2,
            descripLevel: "Бʼє 85% від урону",
            damagePercent: 85,
            cooldown: 6,
            upgradeCost: 200
          },
          // Рівень 3
          {
            levelId: 4503,
            level: 3,
            descripLevel: "Бʼє 90% від урону",
            damagePercent: 90,
            cooldown: 5,          // -1 до перезарядки
            upgradeCost: 300
          },
          // Рівень 4 (максимальний)
          {
              levelId: 4504,
            level: 4,
            descripLevel: "Бʼє 95% від урону",
            damagePercent: 95,
            cooldown: 5,
              upgradeCost: 400     // Немає наступного рівня
          }
        ]
        },
        
      ]
  };
  
  // Функція для отримання здібностей героя за ім'ям
  window.getHeroAbilities = function(heroName) {
    const abilityMap = {
      // Нові герої
      "Туверан": heroesAbilities.tuveran,
      "Тімер": heroesAbilities.timer,
      "Дарест": heroesAbilities.darest,
      "Крівер": heroesAbilities.kriver,
      "Спетрі": heroesAbilities.spetri,
      "Артеміс": heroesAbilities.artemis,
      "Енагра": heroesAbilities.enagra,
      "Блістер": heroesAbilities.blister,
      "Генрі": heroesAbilities.henri,
      "Савагар": heroesAbilities.savagar,
      "Майден": heroesAbilities.mayden,
      "Елдер": heroesAbilities.elder,
      "Дазара": heroesAbilities.dazara,
      "Сніпер": heroesAbilities.sniper,
      "Некропіус": heroesAbilities.nekropius
    };
    return abilityMap[heroName] || [];
  };
  
  // console.log("Здібності героїв завантажено");