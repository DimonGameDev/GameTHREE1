let orcs = [
    orcWarriorLevels.level1,
    orcArcherLevels.level1, 
    orcShamanLevels.level1, 
    orcHorsesLevels.level1,
    orcPikenerLevels.level1,
    orcHorsemanLevels.level1,
    orcCatapultLevels.level1,
    orcBearLevels.level1,
    orcMagLevels.level1,
    orcMinotaurLevels.level1,
    orcWispLevels.level1,
    ];


    let pipls = [
        piplWarriorLevels.level1,
        piplArcherLevels.level1, 
        piplShamanLevels.level1,  
        piplHorsesLevels.level1,
        piplPikenerLevels.level1,    
        piplHorsemanLevels.level1,
        piplCatapultLevels.level1, 
        piplWerewolfLevels.level1,
        piplEngineerLevels.level1,
        piplAssassinLevels.level1,
        piplWispLevels.level1,
    ];

    let elfs = [
        elfWarriorLevels.level1,
        elfArcherLevels.level1, 
        elfShamanLevels.level1, 
        elfHorsesLevels.level1,     
        elfPikenerLevels.level1,    
        elfHorsemanLevels.level1,
        elfCatapultLevels.level1, 
        elfDarkelfLevels.level1,
        elfWitchLevels.level1,
        elfGolemLevels.level1,
        elfWispLevels.level1,
    ];   
    
    let demons = [
        demonWarriorLevels.level1,
        demonArcherLevels.level1, 
        demonShamanLevels.level1,  
        demonHorsesLevels.level1,    
        demonPikenerLevels.level1,    
        demonHorsemanLevels.level1,
        demonCatapultLevels.level1,    
        demonCerberusLevels.level1,
        demonSpiritLevels.level1,
        demonSupervisorLevels.level1,
        demonWispLevels.level1,
    ];

    let beetles = [
        beetleWarriorLevels.level1,
        beetleArcherLevels.level1, 
        beetleShamanLevels.level1,  
        beetleHorsesLevels.level1,     
        beetlePikenerLevels.level1,    
        beetleHorsemanLevels.level1,
        beetleCatapultLevels.level1,    
        beetleScarabLevels.level1,
        beetleUterusLevels.level1,
        beetleArmoredLevels.level1,
        beetleWispLevels.level1,
    ];   

    let races = {
        orcs: orcs,
        elves: elfs,
        humans: pipls,
        undead: beetles,
        demons: demons
    };
    
    // ⬇️ ДОДАТИ ЦЕ В КІНЕЦЬ ФАЙЛУ:
    
   // Автоматично додаємо масив upgrades до кожного level1 для відображення в магазині
function addUpgradesToLevel1(unitLevelsObject) {
    if (!unitLevelsObject || !unitLevelsObject.level1) return;
    
    const upgrades = [];
    for (let i = 1; i <= 8; i++) {  // ✅ Починаємо з 1, а не з 2
        const levelKey = `level${i}`;
        if (unitLevelsObject[levelKey]) {
            const level = unitLevelsObject[levelKey];
            upgrades.push({
                level: i,  // ✅ Тепер буде 1, 2, 3...8
                name: `Рівень ${i}`,
                img: level.img || "",
                description: `HP: ${level.hp} | Броня: ${level.armor} | Атака: ${level.attack} | Крок: ${level.step}`
            });
        }
    }
    
    unitLevelsObject.level1.upgrades = upgrades;
}

    
    
    // Додаємо upgrades для всіх рас
    addUpgradesToLevel1(orcWarriorLevels);
    addUpgradesToLevel1(orcArcherLevels);
    addUpgradesToLevel1(orcShamanLevels);
    addUpgradesToLevel1(orcHorsesLevels);
    addUpgradesToLevel1(orcPikenerLevels);
    addUpgradesToLevel1(orcHorsemanLevels);
    addUpgradesToLevel1(orcCatapultLevels);
    addUpgradesToLevel1(orcBearLevels);
    addUpgradesToLevel1(orcMagLevels);
    addUpgradesToLevel1(orcMinotaurLevels);
    addUpgradesToLevel1(orcWispLevels);
    addUpgradesToLevel1(piplWarriorLevels);
    addUpgradesToLevel1(piplArcherLevels);
    addUpgradesToLevel1(piplShamanLevels);
    addUpgradesToLevel1(piplHorsesLevels);
    addUpgradesToLevel1(piplPikenerLevels);
    addUpgradesToLevel1(piplHorsemanLevels);
    addUpgradesToLevel1(piplCatapultLevels);
    addUpgradesToLevel1(piplWerewolfLevels);
    addUpgradesToLevel1(piplEngineerLevels);
    addUpgradesToLevel1(piplAssassinLevels);
    addUpgradesToLevel1(piplWispLevels);

    
    addUpgradesToLevel1(elfWarriorLevels);
    addUpgradesToLevel1(elfArcherLevels);
    addUpgradesToLevel1(elfShamanLevels);
    addUpgradesToLevel1(elfHorsesLevels);
    addUpgradesToLevel1(elfPikenerLevels);
    addUpgradesToLevel1(elfHorsemanLevels);
    addUpgradesToLevel1(elfCatapultLevels);
    addUpgradesToLevel1(elfDarkelfLevels);
    addUpgradesToLevel1(elfWitchLevels);
    addUpgradesToLevel1(elfGolemLevels);
    addUpgradesToLevel1(elfWispLevels);
    
    addUpgradesToLevel1(demonWarriorLevels);
    addUpgradesToLevel1(demonArcherLevels);
    addUpgradesToLevel1(demonShamanLevels);
    addUpgradesToLevel1(demonHorsesLevels);
    addUpgradesToLevel1(demonPikenerLevels);
    addUpgradesToLevel1(demonHorsemanLevels);
    addUpgradesToLevel1(demonCatapultLevels);
    addUpgradesToLevel1(demonCerberusLevels);
    addUpgradesToLevel1(demonSpiritLevels);
    addUpgradesToLevel1(demonSupervisorLevels);
    addUpgradesToLevel1(demonWispLevels);
    
    addUpgradesToLevel1(beetleWarriorLevels);
    addUpgradesToLevel1(beetleArcherLevels);
    addUpgradesToLevel1(beetleShamanLevels);
    addUpgradesToLevel1(beetleHorsesLevels);
    addUpgradesToLevel1(beetlePikenerLevels);
    addUpgradesToLevel1(beetleHorsemanLevels);
    addUpgradesToLevel1(beetleCatapultLevels);
    addUpgradesToLevel1(beetleScarabLevels);
    addUpgradesToLevel1(beetleUterusLevels);
    addUpgradesToLevel1(beetleArmoredLevels);
    addUpgradesToLevel1(beetleWispLevels);
   // console.log("✅ Upgrades додано до всіх юнітів!");

    // ============================================
// ЕКСПОРТ РІВНІВ В WINDOW ДЛЯ ДОСТУПУ
// ============================================

// Орки
window.orcWarriorLevels = orcWarriorLevels;
window.orcArcherLevels = orcArcherLevels;
window.orcShamanLevels = orcShamanLevels;
window.orcHorsesLevels = orcHorsesLevels;
window.orcPikenerLevels = orcPikenerLevels;
window.orcHorsemanLevels = orcHorsemanLevels;
window.orcCatapultLevels = orcCatapultLevels;
window.orcBearLevels = orcBearLevels;
window.orcMagLevels = orcMagLevels;
window.orcMinotaurLevels = orcMinotaurLevels;
window.orcWispLevels = orcWispLevels;
// Люди
window.piplWarriorLevels = piplWarriorLevels;
window.piplArcherLevels = piplArcherLevels;
window.piplShamanLevels = piplShamanLevels;
window.piplHorsesLevels = piplHorsesLevels;
window.piplPikenerLevels = piplPikenerLevels;
window.piplHorsemanLevels = piplHorsemanLevels;
window.piplCatapultLevels = piplCatapultLevels;
window.piplWerewolfLevels = piplWerewolfLevels;
window.piplEngineerLevels = piplEngineerLevels;
window.piplAssassinLevels = piplAssassinLevels;
window.piplWispLevels = piplWispLevels;
// Ельфи
window.elfWarriorLevels = elfWarriorLevels;
window.elfArcherLevels = elfArcherLevels;
window.elfShamanLevels = elfShamanLevels;
window.elfHorsesLevels = elfHorsesLevels;
window.elfPikenerLevels = elfPikenerLevels;
window.elfHorsemanLevels = elfHorsemanLevels;
window.elfCatapultLevels = elfCatapultLevels;
window.elfDarkelfLevels = elfDarkelfLevels;
window.elfWitchLevels = elfWitchLevels;
window.elfGolemLevels = elfGolemLevels;
window.elfWispLevels = elfWispLevels;


// Жуки
window.beetleWarriorLevels = beetleWarriorLevels;
window.beetleArcherLevels = beetleArcherLevels;
window.beetleShamanLevels = beetleShamanLevels;
window.beetleHorsesLevels = beetleHorsesLevels;
window.beetlePikenerLevels = beetlePikenerLevels;
window.beetleHorsemanLevels = beetleHorsemanLevels;
window.beetleCatapultLevels = beetleCatapultLevels;
window.beetleScarabLevels = beetleScarabLevels;
window.beetleUterusLevels = beetleUterusLevels;
window.beetleArmoredLevels = beetleArmoredLevels;
window.beetleWispLevels = beetleWispLevels;
// Демони
window.demonWarriorLevels = demonWarriorLevels;
window.demonArcherLevels = demonArcherLevels;
window.demonShamanLevels = demonShamanLevels;
window.demonHorsesLevels = demonHorsesLevels;
window.demonPikenerLevels = demonPikenerLevels;
window.demonHorsemanLevels = demonHorsemanLevels;
window.demonCatapultLevels = demonCatapultLevels;
window.demonCerberusLevels = demonCerberusLevels;
window.demonSpiritLevels = demonSpiritLevels;
window.demonSupervisorLevels = demonSupervisorLevels;
window.demonWispLevels = demonWispLevels;


//console.log('✅ Рівні юнітів експортовані в window');
window.races = races;