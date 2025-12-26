// js/upgrades.js
const upgrades = {
    orcs: {
      rubak: [
        {
          level: 1,
          coin: 100,
          name: "рубак_orcs_1",
          description: "Добавляє всього по троху",
          img: "../../img/nextLevel/orc/voin/shield.jpg",
          bonus: { hp: 5, attack: 5, armor: 12 },
          unlocked: false
        },
        {
          level: 2,
          coin: 200,
          name: "рубак_orcs_2",
          description: "Добавляє всього по 2 і тд",
          img: "../../img/nextLevel/orc/voin/shield.jpg",
          bonus: { armor: 5, step: 1 },
          unlocked: false
        },
        {
          level: 3,
          coin: 300,
          name: "рубак_orcs_3",
          description: "Добавляє всього 3 рази",
          img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: 10, armor: 10 },
          unlocked: false
        },
        {
          level: 4,
          coin: 400,
          name: "рубак_orcs_4",
          description: "Добавляє всього 4 рази",
          img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: 14, range: 1 },
          unlocked: false
        },
     {
          level: 1, 
          coin: 500,
       name: "рубак_orcs_5",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2, 
          coin: 600,
       name: "рубак_orcs_6",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,   
          coin: 700,
         name: "рубак_orcs_7",
         description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false
        },
      {
          level: 4,
          coin: 800,
        name: "рубак_orcs_8",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        }
      ],
  
      luchnik: [
        {
          level: 1,
          coin: 100,
          name: "лучник_orcs_1",
          description: "Перший апгрейд лучника",
          img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: 3 },
          unlocked: false
        },
        {
          level: 2, 
          coin: 200,
          name: "лучник_orcs_2",
          description: "Другий апгрейд лучника",
          img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { range: 1 },
          unlocked: false
        },
     {
          level: 3,
          coin: 300,
        name: "luchnik orcs 3",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false
        },
      {
          level: 4,
          coin: 400,
        name: "luchnik orcs 4",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        },
     {
          level: 1,
          coin: 500,
       name: "luchnik orcs 5",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600,
       name: "luchnik orcs 6",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700,
        name: "luchnik orcs 7",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false
        },
      {
          level: 4,
          coin: 800,
        name: "luchnik orcs 8",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        }
      ],
    //шаман
    Shaman: [
        {
          level: 1,
          coin: 100,
          name: "Shaman orcs 1",
          description: "Перший апгрейд лучника",
          img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: 3 },
          unlocked: false
        },
        {
          level: 2,
          coin: 200,
          name: "Shaman orcs 2",
          description: "Другий апгрейд лучника",
          img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { range: 1 },
          unlocked: false
        },
     {
          level: 3,
          coin: 300,
        name: "Shaman orcs 3",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false
        },
      {
          level: 4,
          coin: 400,
        name: "Shaman orcs 4",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        },
     {
          level: 1,
          coin: 500,
       name: "Shaman orcs 5",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600,
       name: "Shaman orcs 6",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700,
        name: "Shaman orcs 7",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false
        },
      {
          level: 4,
          coin: 800,
        name: "Shaman orcs 8",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        }
      ],
    //Wolf
    Wolf: [
        {
          level: 1,
          coin: 100,
          name: "Wolf orcs 1",
          description: "Перший апгрейд лучника",
          img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: 3 },
          unlocked: false
        },
        {
          level: 2,
          coin: 200,
          name: "Wolf orcs 2",
          description: "Другий апгрейд лучника",
          img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { range: 1 },
          unlocked: false
        },
     {
          level: 3,
          coin: 300,
        name: "Wolf orcs 3",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false
        },
      {
          level: 4,
          coin: 400,
        name: "Wolf orcs 4",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        },
     {
          level: 1,
          coin: 500,
       name: "Wolf orcs 5",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600,
       name: "Wolf orcs 6",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700,
        name: "Wolf orcs 7",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false
        },
      {
          level: 4,
          coin: 800,
        name: "Wolf orcs 8",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        }
      ]
      ,
      //Bear (Ведмідь)
      Bear: [
          {
            level: 1,
            coin: 100,
            name: "Bear orcs 1",
            description: "Перший апгрейд ведмедя",
            img: "../../img/nextLevel/orc/voin/voin2.jpg",
            bonus: { attack: 3, hp: 10 },
            unlocked: false
          },
          {
            level: 2,
            coin: 200,
            name: "Bear orcs 2",
            description: "Другий апгрейд ведмедя",
            img: "../../img/nextLevel/orc/voin/voin2.jpg",
            bonus: { armor: 2, step: 1 },
            unlocked: false
          },
       {
            level: 3,
            coin: 300,
          name: "Bear orcs 3",
         description: "Добавляє всього 3 рази",
         img: "../../img/nextLevel/orc/voin/voin2.jpg",
            bonus: { attack: +10 },
            unlocked: false
          },
        {
            level: 4,
            coin: 400,
          name: "Bear orcs 4",
         description: "Добавляє всього 4 рази",
         img: "../../img/nextLevel/orc/voin/voin2.jpg",
            bonus: { attack: +14, range: +1 },
            unlocked: false
          },
       {
            level: 1,
            coin: 500,
         name: "Bear orcs 5",
         description: "Добавляє всього по троху",
         img: "../../img/nextLevel/orc/voin/voin2.jpg",
            bonus: { hp: +20, 
             attack: +5,
             armor: +12 },
            unlocked: false
          },
         {
            level: 2,
            coin: 600,
         name: "Bear orcs 6",
         description: "Добавляє всього по 2 і тд",
         img: "../../img/nextLevel/orc/voin/voin2.jpg",
            bonus: { armor: +5, step: +1 },
            unlocked: false
         },
          {
            level: 3,
            coin: 700,
          name: "Bear orcs 7",
         description: "Добавляє всього 3 рази",
         img: "../../img/nextLevel/orc/voin/voin2.jpg",
            bonus: { attack: +10 },
            unlocked: false
          },
        {
            level: 4,
            coin: 800,
          name: "Bear orcs 8",
         description: "Добавляє всього 4 рази",
         img: "../../img/nextLevel/orc/voin/voin2.jpg",
            bonus: { attack: +14, range: +1 },
            unlocked: false
          }
        ],
        Mag: [
          {
            level: 1,
            coin: 100,
            name: "Mag orcs 1",
            description: "Перший апгрейд ведмедя",
            img: "../../img/nextLevel/orc/voin/voin2.jpg",
            bonus: { attack: 3, hp: 10 },
            unlocked: false
          },
          {
            level: 2,
            coin: 200,
            name: "Mag orcs 2",
            description: "Другий апгрейд ведмедя",
            img: "../../img/nextLevel/orc/voin/voin2.jpg",
            bonus: { armor: 2, step: 1 },
            unlocked: false
          },
       {
            level: 3,
            coin: 300,
          name: "Mag orcs 3",
         description: "Добавляє всього 3 рази",
         img: "../../img/nextLevel/orc/voin/voin2.jpg",
            bonus: { attack: +10 },
            unlocked: false
          },
        {
            level: 4,
            coin: 400,
          name: "Mag orcs 4",
         description: "Добавляє всього 4 рази",
         img: "../../img/nextLevel/orc/voin/voin2.jpg",
            bonus: { attack: +14, range: +1 },
            unlocked: false
          },
       {
            level: 1,
            coin: 500,
         name: "Mag orcs 5",
         description: "Добавляє всього по троху",
         img: "../../img/nextLevel/orc/voin/voin2.jpg",
            bonus: { hp: +20, 
             attack: +5,
             armor: +12 },
            unlocked: false
          },
         {
            level: 2,
            coin: 600,
         name: "Mag orcs 6",
         description: "Добавляє всього по 2 і тд",
         img: "../../img/nextLevel/orc/voin/voin2.jpg",
            bonus: { armor: +5, step: +1 },
            unlocked: false
         },
          {
            level: 3,
            coin: 700,
          name: "Mag orcs 7",
         description: "Добавляє всього 3 рази",
         img: "../../img/nextLevel/orc/voin/voin2.jpg",
            bonus: { attack: +10 },
            unlocked: false
          },
        {
            level: 4,
            coin: 800,
          name: "Mag orcs 8",
         description: "Добавляє всього 4 рази",
         img: "../../img/nextLevel/orc/voin/voin2.jpg",
            bonus: { attack: +14, range: +1 },
            unlocked: false
          }
        ],
        Minotaur: [
          {
            level: 1,
            coin: 100,
            name: "Minotaur orcs 1",
            description: "Перший апгрейд ведмедя",
            img: "../../img/nextLevel/orc/voin/voin2.jpg",
            bonus: { attack: 3, hp: 10 },
            unlocked: false
          },
          {
            level: 2,
            coin: 200,
            name: "Minotaur orcs 2",
            description: "Другий апгрейд ведмедя",
            img: "../../img/nextLevel/orc/voin/voin2.jpg",
            bonus: { armor: 2, step: 1 },
            unlocked: false
          },
       {
            level: 3,
            coin: 300,
          name: "Minotaur orcs 3",
         description: "Добавляє всього 3 рази",
         img: "../../img/nextLevel/orc/voin/voin2.jpg",
            bonus: { attack: +10 },
            unlocked: false
          },
        {
            level: 4,
            coin: 400,
          name: "Minotaur orcs 4",
         description: "Добавляє всього 4 рази",
         img: "../../img/nextLevel/orc/voin/voin2.jpg",
            bonus: { attack: +14, range: +1 },
            unlocked: false
          },
       {
            level: 1,
            coin: 500,
         name: "Minotaur orcs 5",
         description: "Добавляє всього по троху",
         img: "../../img/nextLevel/orc/voin/voin2.jpg",
            bonus: { hp: +20, 
             attack: +5,
             armor: +12 },
            unlocked: false
          },
         {
            level: 2,
            coin: 600,
         name: "Minotaur orcs 6",
         description: "Добавляє всього по 2 і тд",
         img: "../../img/nextLevel/orc/voin/voin2.jpg",
            bonus: { armor: +5, step: +1 },
            unlocked: false
         },
          {
            level: 3,
            coin: 700,
          name: "Minotaur orcs 7",
         description: "Добавляє всього 3 рази",
         img: "../../img/nextLevel/orc/voin/voin2.jpg",
            bonus: { attack: +10 },
            unlocked: false
          },
        {
            level: 4,
            coin: 800,
          name: "Minotaur orcs 8",
         description: "Добавляє всього 4 рази",
         img: "../../img/nextLevel/orc/voin/voin2.jpg",
            bonus: { attack: +14, range: +1 },
            unlocked: false
          }
        ]
    },
  
    // сюди можеш додати інші раси, наприклад elves, humans тощо
    elves: {
      voin: [
        {
          level: 1,
          coin: 100,
          name: "elves voin 1",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 200,
       name: "elves voin 2",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 300,
        name: "elves voin 3",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false,
        },
      {
          level: 4,
          coin: 400,
        name: "elves voin 4",
        description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        },
      {
          level: 1,
          coin: 500,
       name: "elves voin 5",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600,
       name: "elves voin 6",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700,
        name: "elves voin 7",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false
        },
      {
          level: 4,
          coin: 800,
        name: "elves voin 8",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        }
      ],
     luchnik: [
        {
          level: 1,
          coin: 100,
       name: "elves luchnik 1",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 200,
       name: "elves luchnik 2",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 300,
        name: "суп 3 рівн elves luchnik 3",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false,
        },
      {
          level: 4,
          coin: 400,
        name: "суп 4 рівн elves luchnik 4",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        },
      {
          level: 1,
          coin: 500,
       name: "ельф лучниця elves luchnik 5",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600,
       name: "суп 2 рів elves luchnik 6",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700,
          name: "суп 3 рівн elves luchnik 7",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false
        },
      {
          level: 4,
          coin: 800,
        name: "суп 4 рівн elves luchnik 8",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        },
      ],
     druit: [
        {
          level: 1,
          coin: 100,
       name: "супер друід elves druit 1",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 200,
       name: "суп 2 рів elves druit 2",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 300,
        name: "суп 3 рівн elves druit 3",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false,
        },
      {
          level: 4,
          coin: 400,
        name: "суп 4 рівн elves druit 4",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        },
      {
          level: 1,
          coin: 500,
       name: "друідиха elves druit 5",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },unlocked: false
        },
       {
          level: 2,
          coin: 600,
       name: "суп 2 рів elves druit 6",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700,
        name: "суп 3 рівн elves druit 7",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false
        },
      {
          level: 4,
          coin: 800,
        name: "суп 4 рівн elves druit 8",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        }
      ],
     elfHorse: [
        {
          level: 1,
          coin: 100,
       name: "супер єдиноріг elves elfHorse 1",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600,
       name: "суп 2 рів elves elfHorse 2",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700,
          name: "суп 3 рівн elves elfHorse 3",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false,
        },
      {
          level: 4,
          coin: 800,
        name: "суп 4 рівн elves elfHorse 4",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        },
      {
          level: 1,
          coin: 100,
       name: "єдиноріггг elves elfHorse 5",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600,
       name: "суп 2 рів elves elfHorse 6",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700,
        name: "суп 3 рівн elves elfHorse 7",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false
        },
      {
          level: 4,
          coin: 800,
        name: "суп 4 рівн elves elfHorse 8",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        }
      ],
       elfHorse: [
        {
          level: 1,
          coin: 100,
       name: "супер єдиноріг elves elfHorse 1",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600,
       name: "суп 2 рів elves elfHorse 2",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700,
          name: "суп 3 рівн elves elfHorse 3",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false,
        },
      {
          level: 4,
          coin: 800,
        name: "суп 4 рівн elves elfHorse 4",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        },
      {
          level: 1,
          coin: 100,
       name: "єдиноріггг elves elfHorse 5",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600,
       name: "суп 2 рів elves elfHorse 6",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700,
        name: "суп 3 рівн elves elfHorse 7",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false
        },
      {
          level: 4,
          coin: 800,
        name: "суп 4 рівн elves elfHorse 8",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        }
      ],
      elfHorse: [
        {
          level: 1,
          coin: 100,
       name: "супер єдиноріг elves elfHorse 1",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600,
       name: "суп 2 рів elves elfHorse 2",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700,
          name: "суп 3 рівн elves elfHorse 3",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false,
        },
      {
          level: 4,
          coin: 800,
        name: "суп 4 рівн elves elfHorse 4",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        },
      {
          level: 1,
          coin: 100,
       name: "єдиноріггг elves elfHorse 5",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600,
       name: "суп 2 рів elves elfHorse 6",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700,
        name: "суп 3 рівн elves elfHorse 7",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false
        },
      {
          level: 4,
          coin: 800,
        name: "суп 4 рівн elves elfHorse 8",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        }
      ],
      elfDarkelf: [
        {
          level: 1,
          coin: 100,
       name: "супер єдиноріг elves elfDarkelf 1",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600,
       name: "суп 2 рів elves elfDarkelf 2",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700,
          name: "суп 3 рівн elves elfDarkelf 3",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false,
        },
      {
          level: 4,
          coin: 800,
        name: "суп 4 рівн elves elfDarkelf 4",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        },
      {
          level: 1,
          coin: 100,
       name: "єдиноріггг elves elfDarkelf 5",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600,
       name: "суп 2 рів elves elfDarkelf 6",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700,
        name: "суп 3 рівн elves elfDarkelf 7",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false
        },
      {
          level: 4,
          coin: 800,
        name: "суп 4 рівн elves elfDarkelf 8",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        }
      ]
    },
   
   //люди
   
   humans: {
      voin: [
        {
          level: 1,
          coin: 100,
       name: "супер людина humans voin 1",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600,
       name: "суп 2 рів humans voin 2",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700,
        name: "суп 3 рівн humans voin 3",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false,
        },
      {
          level: 4,
          coin: 800,
        name: "суп 4 рівн humans voin 4",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        },
      {
          level: 1,
          coin: 100,
       name: "людський humans voin 5",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600,
       name: "суп 2 рів humans voin 6",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700,
          name: "суп 3 рівн humans voin 7",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false
        },
      {
          level: 4,
          coin: 800,
        name: "суп 4 рівн humans voin 8",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        }
      ],
     luchnik: [
        {
          level: 1,
          coin: 100,
       name: "лучниця людина humans luchnik 1",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600,
       name: "суп 2 рів humans luchnik 2",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700,
        name: "суп 3 рівн humans luchnik 3",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false,
        },
      {
          level: 4,
          coin: 800,
        name: "суп 4 рівн humans luchnik 4",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        },
      {
          level: 1,
          coin: 100,
       name: "людина лучниця humans luchnik 5",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600,
       name: "суп 2 рів humans luchnik 6",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700,
        name: "суп 3 рівн humans luchnik 7",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false
        },
      {
          level: 4,
          coin: 800,
        name: "суп 4 рівн humans luchnik 8",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        },
      ],
     shaman: [
        {
          level: 1,
          coin: 100,
       name: "супер шаман humans shaman 1",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600,
       name: "суп 2 рів humans shaman 2",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700, 
          name: "суп 3 рівн humans shaman 3",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false,
        },
      {
          level: 4,   
          coin: 800,
        name: "суп 4 рівн humans shaman 4",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        },
      {
          level: 1,
          coin: 100,
       name: "шаманиха humans shaman 5",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600, 
       name: "суп 2 рів humans shaman 6",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700,
        name: "суп 3 рівн humans shaman 7",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false
        },
      {
          level: 4,
          coin: 800,
        name: "суп 4 рівн humans shaman 8",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        }
      ],
     horse: [
        {
          level: 1,
          coin: 100,
       name: "супер кінь humans horse 1",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600,
       name: "суп 2 рів humans horse 2",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700,
        name: "суп 3 рівн humans horse 3",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false,
        },
      {
          level: 4,
          coin: 800,
        name: "суп 4 рівн humans horse 4",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        },
      {
          level: 1,
          coin: 100,
       name: "супер кінь humans horse 5",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600,
       name: "суп 2 рів humans horse 6",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3, 
          coin: 700,
        name: "суп 3 рівн humans horse 7",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false
        },
      {
          level: 4,
          coin: 800,
        name: "суп 4 рівн humans horse 8",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        }
      ]
    },
   
   
   //жуки 
   
   
   beetles: {
      voin: [
        {
          level: 1,
          coin: 100,
       name: "супер жук beetles voin 1",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: {hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600,
       name: "суп 2 рів beetles voin 2",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700,
        name: "суп 3 рівн beetles voin 3",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false,
        },
      {
          level: 4,
          coin: 800,
        name: "суп 4 рівн beetles voin 4",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        },
      {
          level: 1,
          coin: 100,
       name: "жучара beetles voin 5",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600,
       name: "суп 2 рів beetles voin 6",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700,
        name: "суп 3 рівн beetles voin 7",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false
        },
      {
          level: 4,
          coin: 800,
        name: "суп 4 рівн beetles voin 8",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        }
      ],
     luchnik: [
        {
          level: 1,
          coin: 100,
       name: "лучниця жук beetles luchnik 1",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600,
       name: "суп 2 рів beetles luchnik 2",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700,
        name: "суп 3 рівн beetles luchnik 3",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false,
        },
      {
          level: 4,
          coin: 800,
        name: "суп 4 рівн beetles luchnik 4",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        },
      {
          level: 1,
          coin: 100,
       name: "жук лучниця beetles luchnik 5",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600,
        name: "суп 2 рів beetles luchnik 6",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700,
        name: "суп 3 рівн beetles luchnik 7",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false
        },
      {
          level: 4,
          coin: 800,
        name: "суп 4 рівн beetles luchnik 8",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        },
      ],
     shaman: [
        {
          level: 1,
          coin: 100,
       name: "супер жук маг beetles shaman 1",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600,
       name: "суп 2 рів beetles shaman 2",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700,
        name: "суп 3 рівн beetles shaman 3",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false,
        },
      {
          level: 4,
          coin: 800,
        name: "суп 4 рівн beetles shaman 4",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        },
      {
          level: 1,
          coin: 100,
       name: "жучиха маг beetles shaman 5",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600,
       name: "суп 2 рів beetles shaman 6",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700,
        name: "суп 3 рівн beetles shaman 7",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false
        },
      {
          level: 4,
          coin: 800,
        name: "суп 4 рівн beetles shaman 8",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        }
      ],
     horse: [
        {
          level: 1,
          coin: 100,
       name: "супер жук кінь beetles horse 1",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600,
        name: "суп 2 рів beetles horse 2",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3, 
          coin: 700,
        name: "суп 3 рівн beetles horse 3",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false,
        },
      {
          level: 4, 
          coin: 800,
        name: "суп 4 рівн beetles horse 4",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        },
      {
          level: 1,
          coin: 100,
       name: "жуккк кінь beetles horse 5",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600,
       name: "суп 2 рів beetles horse 6",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700,
        name: "суп 3 рівн beetles horse 7",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false
        },
      {
          level: 4,
          coin: 800,
        name: "суп 4 рівн beetles horse 8",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        }
      ]
    },
   
   //демони
   
   demons: {
      voin: [
        {
          level: 1,
          coin: 140,
       name: "супер демон demons voin 1",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600,
       name: "суп 2 рів demons voin 2",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700,
        name: "суп 3 рівн demons voin 3",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false,
        },
      {
          level: 4,
          coin: 800,
        name: "суп 4 рівн demons voin 4",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        },
      {
          level: 5,
          coin: 100,
       name: "демоніще demons voin 5",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 6,
          coin: 600,
       name: "demons voin 6",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 7,
          coin: 700,
        name: "demons voin 7",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false
        },
      {
          level: 8,
          coin: 800,
        name: "demons voin 8",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        }
      ],
     luchnik: [
        {
          level: 1,
          coin: 100,
       name: "лучниця демон demons luchnik 1",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600,
       name: "demons luchnik 2",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700,
        name: "demons luchnik 3",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false,
        },
      {
          level: 4,
          coin: 800,
        name: "demons luchnik 4",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        },
      {
          level: 1,
          coin: 100,
       name: "demons luchnik 5",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {level: 2,
          coin: 600,
       name: "суп 2 рів demons luchnik 6",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700,
        name: "demons luchnik 7",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false
        },
      {
          level: 4,
          coin: 800,
        name: "demons luchnik 8",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        },
      ],
     shaman: [
        {
          level: 1,
          coin: 100,
       name: "demons shaman 1",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600,
       name: "demons shaman 2",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700,
          name: "demons shaman 3",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false,
        },
      {
          level: 4,
          coin: 800,
        name: "demons shaman 4",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        },
      {
          level: 1,
          coin: 100,
       name: "demons shaman 5",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600,
       name: "demons shaman 6",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700,
        name: "demons shaman 7",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false
        },
      {
          level: 4,
          coin: 800,
        name: "demons shaman 8",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        }
      ],
     horse: [
        {
          level: 1,
          coin: 100,
       name: "demons horse 1",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600,
       name: "demons horse 2",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700,
        name: "demons horse 3",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false,
        },
      {
          level: 4,
          coin: 800,
        name: "demons horse 4",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        },
      {
          level: 1,
          coin: 100,
       name: "demons horse 5",
       description: "Добавляє всього по троху",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { hp: +20, 
           attack: +5,
           armor: +12 },
          unlocked: false
        },
       {
          level: 2,
          coin: 600,
       name: "demons horse 6",
       description: "Добавляє всього по 2 і тд",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { armor: +5, step: +1 },
          unlocked: false
       },
        {
          level: 3,
          coin: 700,
          name: "demons horse 7",
       description: "Добавляє всього 3 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +10 },
          unlocked: false
        },
      {
          level: 4,
          coin: 800,
        name: "demons horse 8",
       description: "Добавляє всього 4 рази",
       img: "../../img/nextLevel/orc/voin/voin2.jpg",
          bonus: { attack: +14, range: +1 },
          unlocked: false
        }
      ]
    },
   
   
  }; // <- ось остання закриваюча дужка для upgrades
  
  window.upgrades = upgrades;