// ============================================
// ЛОГІКА МОДАЛЬНОГО ВІКНА "ЕФЕКТИ ВСІХ"
// ============================================
let healTargetHandlerAttached = false;


let currentSelectedSlotIndex = 0;
let currentSelectedAbility = null;
const originalBtnText = 'ефекти всіх';

// Додайте десь на початку magicUnitsModal.js
function getHealthColorClass(hpPercent) {
    if (hpPercent > 60) return 'health-high';
    if (hpPercent > 30) return 'health-medium';
    if (hpPercent > 15) return 'health-low';
    return 'health-critical';
}
/**
 * Відкриває модальне вікно "ефекти всіх"
 */
function openMagicUnitsModal() {
    // console.log('🔍 selectedUnitForMove:', selectedUnitForMove);
    // Перевіряємо чи вибрано юніта
    if (!selectedUnitForMove) {
        alert("⚠️ Спочатку виберіть юніта або героя на карті!");
        return;
    }

    if (selectedUnitForMove.attacked) {
        alert("⚠️ Цей юніт вже атакував цього ходу і не може використовувати здібності!");
        return;
    }
    
    if (ModalMagicUnits) {
        ModalMagicUnits.style.display = "flex";
        
        // 👇 ДОДАНО: показуємо вікно з описом
        if (modMagicBoxText) {
            modMagicBoxText.style.display = "flex";
        }
        
        // Завантажуємо здібності вибраного юніта/героя
        displayUnitAbilities(selectedUnitForMove);
        
        // Блокуємо скрол body на мобільних
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
    }
}

/**
 * Закриває модальне вікно "ефекти всіх"
 */
function closeMagicUnitsModal() {
    if (ModalMagicUnits) {
        ModalMagicUnits.style.display = "none";
        
        // 👇 ДОДАНО: ховаємо вікно з описом
        if (modMagicBoxText) {
            modMagicBoxText.style.display = "none";
        }
        
        // Відновлюємо скрол body
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
    }
}

/**
 * Перемикає модальне вікно (відкриває/закриває)
 */
function toggleMagicUnitsModal() {
    // Перевіряємо, чи вікно зараз відкрите
    if (ModalMagicUnits && ModalMagicUnits.style.display === 'flex') {
        closeMagicUnitsModal();
    } else {
        openMagicUnitsModal();
    }
}


/**
 * Відображає здібності вибраного юніта або героя
 */
/**
 * Відображає здібності вибраного юніта або героя
 */
function displayUnitAbilities(unit) {
    if (!unit) {
        console.log("❌ Unit is null");
        return;
    }
    
    //console.log("🔍 Вибраний юніт:", unit);
    //console.log("🔍 Це герой?", unit.isHero);
    console.log("🔍 Ім'я:", unit.name);
    
    let abilitiesData = [];
    
    // Перевіряємо чи це герой
    if (unit.isHero) {
        console.log("✅ Викликаю getHeroAbilities");
        abilitiesData = getHeroAbilities(unit);
        //console.log("📋 Отримані здібності героя:", abilitiesData);
    } else {
        // Це звичайний юніт
        console.log("✅ Викликаю getUnitAbilities");
        abilitiesData = getUnitAbilities(unit);
        console.log("📋 Отримані здібності юніта:", abilitiesData);
    }
    
    // Відображаємо здібності в слотах
    renderAbilitiesSlots(abilitiesData);
    
    // Показуємо першу здібність за замовчуванням
    if (abilitiesData.length > 0) {
        displayAbilityDetails(abilitiesData[0], 0);
    } else {
        // Показуємо повідомлення "Немає здібностей"
        // Показуємо повідомлення "Немає здібностей"
        if (ModMagicNameNextLevel) {
            ModMagicNameNextLevel.textContent = "Немає здібностей";
        }

        if (ModMagicNumberLevel) {
            ModMagicNumberLevel.textContent = "";
        }

        if (modMagicBoxTextDescription) {
            modMagicBoxTextDescription.textContent = "У цього юніта немає доступних здібностей.";
        }
    }
}

/**
 * Отримує здібності героя (використовує глобальну функцію)
 */
function getHeroAbilities(hero) {
    console.log("🔍 getHeroAbilities викликано для:", hero.name);
    
    if (!hero.abilitiesProgress) {
        console.log("❌ Немає abilitiesProgress");
        return [];
    }
    
    if (!window.heroesAbilities) {
        console.log("❌ Немає window.heroesAbilities");
        return [];
    }
    
    const abilities = [];
    
    // НОВА ЛОГІКА: просто шукаємо за ID напряму
    hero.abilitiesProgress.forEach(abilityProgress => {
        const abilityId = abilityProgress.abilityId;
        const currentLevel = abilityProgress.currentLevel;
        
        // Прямий доступ за ID!
        const abilityData = window.heroesAbilities[abilityId];
        
        if (abilityData) {
            console.log(`✅ Знайдено здібність: ${abilityData.name}`);
            
            abilities.push({
                abilityId: abilityId,
                name: abilityData.name,
                description: abilityData.description,
                img: abilityData.img,
                level: currentLevel,
                type: abilityData.type,
                typeText: abilityData.type === "active" ? "Активне" : "Пасивне",
                // ⬇️ ДОДАТИ ЦІ ПОЛЯ:
                currentLevel: currentLevel,        // Поточний рівень здібності
                maxLevel: abilityData.maxLevel,    // Максимальний рівень
                levels: abilityData.levels         // Всі рівні здібності
            });
        } else {
            console.log(`❌ Не знайдено здібність з ID: ${abilityId}`);
        }
    });
    
    console.log("📊 Загалом знайдено здібностей:", abilities.length);
    return abilities;
}
/**
 * Отримує здібності звичайного юніта
 */
function getUnitAbilities(unit) {
    if (!unit.abilities || !window.abilities) return [];
    
    const abilities = [];
    
    unit.abilities.forEach(ability => {
        const abilityKey = ability.key;
        const abilityPower = ability.power;
        
        // Шукаємо здібність в базі
        const abilityData = window.abilities[abilityKey];
        
        if (abilityData) {
            abilities.push({
                name: abilityData.name,
                description: abilityData.description,
                img: abilityData.img,
                power: abilityPower,
                type: abilityData.mode === "active" ? "Активне" : "Пасивне"
            });
        }
    });
    
    return abilities;
}

/**
 * Відображає слоти здібностей
 */
/**
 * Відображає слоти здібностей
 */
/**
 * Відображає слоти здібностей
 */
function renderAbilitiesSlots(abilities) {
    //console.log("🎨 renderAbilitiesSlots викликано з", abilities.length, "здібностями");
    //console.log("📋 Здібності:", abilities);
    
    // Ці змінні - це самі IMG елементи, а не контейнери!
    const imgElements = [modMagicItem1, modMagicItem2, modMagicItem3];
    
    imgElements.forEach((img, index) => {
        //console.log(`\n🔍 Обробка IMG ${index + 1}:`, img);
        
        if (!img) {
            //console.log(`❌ IMG ${index + 1} не знайдено!`);
            return;
        }
        
        if (abilities[index]) {
            // Є здібність - показуємо іконку
            //console.log(`✅ Встановлюю іконку для слоту ${index + 1}:`, abilities[index].img);
            img.src = abilities[index].img;
            img.style.opacity = '1';
            img.style.cursor = 'pointer';
            
            //console.log(`✅ IMG.src встановлено:`, img.src);
            
            // Додаємо обробник кліку
            img.onclick = () => displayAbilityDetails(abilities[index], index);
        } else {
            // Немає здібності - показуємо порожній слот
            //console.log(`⚪ Слот ${index + 1} порожній`);
            img.src = '../../img/map/infoTablo/swords/swords.png';
            img.style.opacity = '0.3';
            img.style.cursor = 'default';
            img.onclick = null;
        }
    });
    
    console.log("✅ renderAbilitiesSlots завершено");
}

// function displayAbilityDetails(ability, slotIndex) {
//     console.log('🔍 displayAbilityDetails викликана!', ability?.name);
//     if (!ability) return;
    
//     // Підсвічуємо вибраний слот
//     highlightSelectedSlot(slotIndex);
    
//     // // Назва здібності
//     // const nameElement = document.querySelector(".ModMagicCenNameAbility");
//     // if (nameElement) {
//     //     nameElement.textContent = ability.name;
//     // }
    
//     // // Рівень або сила
//     // const levelElement = document.querySelector(".ModMagicCenNumLevel");
//     // if (levelElement) {
//     //     if (ability.level) {
//     //         levelElement.textContent = `Рівень ${ability.level}`;
//     //     } else if (ability.power) {
//     //         levelElement.textContent = `Сила ${ability.power}`;
//     //     } else {
//     //         levelElement.textContent = '';
//     //     }
//     // }
    
//     // // Опис в правому вікні
//    // 👇 ОНОВЛЕНО: Заповнюємо окремі елементи в зеленому вікні
// if (ModMagicNameNextLevel) {
//     ModMagicNameNextLevel.textContent = ability.name;
// }

// if (ModMagicNumberLevel) {
//     // Для юнітів беремо рівень юніта, для героїв - currentLevel
//     const abilityLevel = ability.currentLevel || selectedUnitForMove.level || 1;
//     ModMagicNumberLevel.textContent = abilityLevel;
// }

// if (modMagicBoxTextDescription) {
//     let description = ability.description || "";
//     console.log('🔍 DEBUG ability для опису:', {
//         name: ability.name,
//         hasLevels: !!ability.levels,
//         currentLevel: ability.currentLevel,
//         hasPower: !!ability.power,
//         power: ability.power,
//         actionType: ability.actionType,
//         armorBonus: ability.armorBonus,
//         attackBonus: ability.attackBonus
//     });
    
//     // ⬇️ ДОДАТИ: Додаємо параметри активного рівня
    
//     // Для героїв - шукаємо в levels
//     if (ability.levels && ability.currentLevel) {
//         const currentLevelData = ability.levels.find(l => l.level === ability.currentLevel);
//         if (currentLevelData) {
//             description += "\n\n📊 Поточний рівень:";
            
//             if (currentLevelData.descripLevel) {
//                 description += `\n${currentLevelData.descripLevel}`;
//             }
            
//             // Додаткові параметри
//             const params = [];
//             if (currentLevelData.damagePercent) params.push(`💥 Урон: ${currentLevelData.damagePercent}%`);
//             if (currentLevelData.attackBoostPercent) params.push(`⚔️ Атака: +${currentLevelData.attackBoostPercent}%`);
//             if (currentLevelData.armorBoost) params.push(`🛡️ Броня: +${currentLevelData.armorBoost}`);
//             if (currentLevelData.hpRegenPercent) params.push(`💚 Реген: ${currentLevelData.hpRegenPercent}%`);
//             if (currentLevelData.healAmount) params.push(`💚 Лікування: ${currentLevelData.healAmount}`);
//             if (currentLevelData.stepBonus) params.push(`👟 Крок: +${currentLevelData.stepBonus}`);
//             if (currentLevelData.armorReduction) params.push(`🔻 Зниж. броні: -${currentLevelData.armorReduction}`);
//             if (currentLevelData.attackReduction) params.push(`🔻 Зниж. атаки: -${currentLevelData.attackReduction}`);
//             if (currentLevelData.cooldown !== undefined) params.push(`⏱️ Перезарядка: ${currentLevelData.cooldown} ходів`);
            
//             if (params.length > 0) {
//                 description += "\n" + params.join("\n");
//             }
            
//             // Вартість покращення
//             if (currentLevelData.upgradeCost && ability.currentLevel < ability.maxLevel) {
//                 description += `\n\n⬆️ Покращення: ${currentLevelData.upgradeCost} мани`;
//             }
//         }
//     }
    
//     // Для юнітів - якщо є power параметри
//     if (ability.power && typeof ability.power === 'object') {
//         description += "\n\n📊 Бонуси:";
//         const params = [];
//         if (ability.power.attackBoostPercent) params.push(`⚔️ +${ability.power.attackBoostPercent}% атаки`);
//         if (ability.power.armorBoost) params.push(`🛡️ +${ability.power.armorBoost} броні`);
//         if (ability.power.hpRegenPercent) params.push(`💚 +${ability.power.hpRegenPercent}% регену HP`);
//         if (ability.power.healAmount) params.push(`💚 +${ability.power.healAmount} HP`);
//         if (ability.power.stepBonus) params.push(`👟 +${ability.power.stepBonus} кроку`);
//         if (params.length > 0) {
//             description += "\n" + params.join("\n");
//         }
//     }
    
//     // Для простих аур юнітів (без power)
//     if (ability.actionType === "aura" && !ability.power) {
//         description += "\n\n📊 Бонуси:";
//         const params = [];
//         if (ability.armorBonus) params.push(`🛡️ +${ability.armorBonus} броні`);
//         if (ability.attackBonus) params.push(`⚔️ +${ability.attackBonus} атаки`);
//         if (ability.stepBonus) params.push(`👟 +${ability.stepBonus} кроку`);
//         if (ability.healAmount) params.push(`💚 +${ability.healAmount} HP`);
//         if (params.length > 0) {
//             description += "\n" + params.join("\n");
//         }
//     }
    
//     modMagicBoxTextDescription.textContent = description;
// }


/**
 * Підсвічує вибраний слот
 */
function highlightSelectedSlot(selectedIndex) {
    // Ці змінні - це самі IMG елементи!
    const imgElements = [modMagicItem1, modMagicItem2, modMagicItem3];
    
    imgElements.forEach((img, index) => {
        if (!img) return;
        
        if (index === selectedIndex) {
            img.style.border = '3px solid gold';
            img.style.boxShadow = '0 0 10px gold';
        } else {
            img.style.border = '1px solid black';
            img.style.boxShadow = 'none';
        }
    });
}

// function displayAbilityDetails(ability, slotIndex) {
//     if (!ability) return;
    
//     // Підсвічуємо вибраний слот
//     highlightSelectedSlot(slotIndex);
    
//     // Назва здібності
//     const nameElement = document.querySelector(".ModMagicCenNameAbility");
//     if (nameElement) {
//         nameElement.textContent = ability.name;
//     }
    
//     // Рівень або сила
//     const levelElement = document.querySelector(".ModMagicCenNumLevel");
//     if (levelElement) {
//         if (ability.level) {
//             levelElement.textContent = `Рівень ${ability.level}`;
//         } else if (ability.power) {
//             levelElement.textContent = `Сила ${ability.power}`;
//         } else {
//             levelElement.textContent = '';
//         }
//     }
    
    // ✅ ДОДАМО РОЗШИРЕНИЙ ОПИС:
    function displayAbilityDetails(ability, slotIndex) {
        if (!ability) return;

        currentSelectedSlotIndex = slotIndex;
        currentSelectedAbility = ability;
        
        // Підсвічуємо вибраний слот
        highlightSelectedSlot(slotIndex);
        
        // Назва здібності
        const nameElement = document.querySelector(".ModMagicCenNameAbility");
        if (nameElement) {
            nameElement.textContent = ability.name;
        }
        
        // Рівень або сила
        const levelElement = document.querySelector(".ModMagicCenNumLevel");
        if (levelElement) {
            if (ability.level) {
                levelElement.textContent = `Рівень ${ability.level}`;
            } else if (ability.power) {
                levelElement.textContent = `Сила ${ability.power}`;
            } else {
                levelElement.textContent = '';
            }
        }
        
        // ✅ ДОДАМО РОЗШИРЕНИЙ ОПИС:
        let detailedDescription = ability.description || '';
        
        // Отримуємо екземпляр здібності для деталей
        if (selectedUnitForMove && selectedUnitForMove.abilityInstances) {
            const abilityInstance = selectedUnitForMove.abilityInstances[slotIndex];
            
            if (abilityInstance) {
                // 🔍 ДЕБАГ:
                console.log("🔍 DEBUG abilityInstance:", abilityInstance);
                console.log("  mode:", abilityInstance.mode);
                console.log("  actionType:", abilityInstance.actionType);
                console.log("  cooldown:", abilityInstance.cooldown);
                console.log("  currentCooldown:", abilityInstance.currentCooldown);
                console.log("  healAmount:", abilityInstance.healAmount);
                console.log("  range:", abilityInstance.range);
                
                // Додаємо параметри здібності
                detailedDescription += '\n\n📊 Параметри:';
                
                // Лікування
                if (abilityInstance.healAmount) {
                    detailedDescription += `\n💚 Лікування: ${abilityInstance.healAmount} HP`;
                }
                
                // Відсоток лікування
                if (abilityInstance.healPercent) {
                    detailedDescription += `\n💚 Лікування: ${abilityInstance.healPercent}% від макс. HP`;
                }
                
                // Радіус дії
                if (abilityInstance.range !== undefined) {
                    detailedDescription += `\n🎯 Радіус: ${abilityInstance.range} клітинок`;
                }
                
                // Перезарядка
                if (abilityInstance.cooldown !== undefined && abilityInstance.cooldown > 0) {
                    const currentCooldown = abilityInstance.currentCooldown || 0;
                    if (currentCooldown > 0) {
                        detailedDescription += `\n⏳ Перезарядка: ${currentCooldown} / ${abilityInstance.cooldown} ходів`;
                    } else {
                        detailedDescription += `\n✅ Готова (кулдаун: ${abilityInstance.cooldown} ходів)`;
                    }
                }
                
                // Режим (перевіряємо різні поля)
                const mode = abilityInstance.mode || abilityInstance.actionType;
                if (mode) {
                    const modeText = (mode === 'active' || mode === 'heal' || mode === 'damage') 
                        ? 'Активне' 
                        : 'Пасивне';
                    detailedDescription += `\n🔘 Режим: ${modeText}`;
                }
            }
        }
        // 🆕 Перевірка статусу "Друге дихання" (ID: 10)
    if (ability.abilityId === 10 && selectedUnitForMove?.isHero) {
        const isUsed = window.heroAuraSystem?.secondBreathUsed?.get(selectedUnitForMove.id);
        if (isUsed) {
            detailedDescription += '\n\n❌ СТАТУС: Неактивна (вже використано)';
            detailedDescription += '\n💡 Відновиться при регені HP до порогу';
        } else {
            detailedDescription += '\n\n✅ СТАТУС: Активна (готова до спрацювання)';
        }
    }
        
        // Опис в правому вікні
        const descElement = document.querySelector(".ModMagicCenDescription");
        if (descElement) {
            descElement.style.whiteSpace = 'pre-line';
            descElement.textContent = detailedDescription;
        }
        
        // Зелене вікно
        if (ModMagicNameNextLevel) {
            ModMagicNameNextLevel.textContent = ability.name;
        }

        if (ModMagicNumberLevel) {
            const abilityLevel = ability.currentLevel || selectedUnitForMove.level || 1;
            ModMagicNumberLevel.textContent = abilityLevel;
        }
        
        if (modMagicBoxTextDescription) {
            modMagicBoxTextDescription.style.whiteSpace = 'pre-line';
            let description = ability.description || "";
            //console.log('🔍 DEBUG зелене вікно:', {
                //abilityName: ability.name,
                //hasLevels: !!ability.levels,
                //currentLevel: ability.currentLevel,
               // hasPower: !!ability.power,
                //power: ability.power,
                //description: description
            //});
            
            // Для героїв - шукаємо в levels
            if (ability.levels && ability.currentLevel) {
                const currentLevelData = ability.levels.find(l => l.level === ability.currentLevel);
                if (currentLevelData) {
                    description += "\n\n📊 Поточний рівень:";
                    
                    if (currentLevelData.descripLevel) {
                        description += `\n${currentLevelData.descripLevel}`;
                    }
                    
                    const params = [];
                    if (currentLevelData.damagePercent) params.push(`💥 Урон: ${currentLevelData.damagePercent}%`);
                    if (currentLevelData.attackBoostPercent) params.push(`⚔️ Атака: +${currentLevelData.attackBoostPercent}%`);
                    if (currentLevelData.armorBoost) params.push(`🛡️ Броня: +${currentLevelData.armorBoost}`);
                    if (currentLevelData.hpRegenPercent) params.push(`💚 Реген: ${currentLevelData.hpRegenPercent}%`);
                    if (currentLevelData.healAmount) params.push(`💚 Лікування: ${currentLevelData.healAmount}`);
                    if (currentLevelData.cooldown !== undefined) params.push(`⏱️ Перезарядка: ${currentLevelData.cooldown} ходів`);
                    
                    if (params.length > 0) {
                        description += "\n" + params.join("\n");
                    }
                    
                    if (currentLevelData.upgradeCost && ability.currentLevel < ability.maxLevel) {
                        description += `\n\n⬆️ Покращення: ${currentLevelData.upgradeCost} мани`;
                    }
                }
            }
            
            // Для юнітів - якщо є power параметри
            if (ability.power && typeof ability.power === 'object') {
                description += "\n\n📊 Бонуси:";
                const params = [];
                if (ability.power.attackBoostPercent) params.push(`⚔️ +${ability.power.attackBoostPercent}% атаки`);
                if (ability.power.armorBoost) params.push(`🛡️ +${ability.power.armorBoost} броні`);
                if (ability.power.hpRegenPercent) params.push(`💚 +${ability.power.hpRegenPercent}% регену HP`);
                if (params.length > 0) {
                    description += "\n" + params.join("\n");
                }
            }
            
            modMagicBoxTextDescription.textContent = description;
        }
        
        // Тип
        const typeElement = document.querySelector(".ModMagicCenNameType");
        if (typeElement) {
            typeElement.textContent = ability.type;
        }
    }


// ============================================
// ЛОГІКА АКТИВАЦІЇ ЗДІБНОСТІ ЛІКУВАННЯ
// ============================================

let isSelectingHealTarget = false; // Чи зараз вибираємо ціль для лікування
let activeHealAbility = null;      // Поточна здібність лікування
let healCaster = null;             // Юніт який лікує

/**
 * Очищає підсвічені цілі для лікування
 */
function clearHealTargets() {
    // Знімаємо підсвітку з юнітів
    document.querySelectorAll(".unit-wrapper").forEach(wrapper => {
        wrapper.style.border = "";
        wrapper.style.boxShadow = "";
        wrapper.style.cursor = "";
        wrapper.style.zIndex = ""; // ✅ ДОДАЙТЕ: Скидаємо z-index
        wrapper.style.pointerEvents = "";
    });
    
    isSelectingHealTarget = false;
    activeHealAbility = null;
    healCaster = null;
}

/**
 * Підсвічує можливі цілі для лікування
 */
function highlightHeroAbilityTargets(targets, targetType) {
    clearHeroAbilityTargets(true);
    
    const colors = {
        'enemy': { border: '#ff0000', shadow: '#ff0000' },
        'ally': { border: '#00ff00', shadow: '#00ff00' },
        'empty_cell': { border: '#00aaff', shadow: '#00aaff' },
        'any_unit': { border: '#ffff00', shadow: '#ffff00' },
        'direction': { border: '#ff8800', shadow: '#ff8800' }
    };
    
    const color = colors[targetType] || colors.enemy;
    
    targets.forEach(target => {
        if (target.unit) {
            // Це юніт - яскраве підсвічування
            const wrapper = document.querySelector(`[data-unit-id="${target.unit.id}"]`);
            if (wrapper) {
                wrapper.style.border = `3px solid ${color.border}`;
                wrapper.style.boxShadow = `0 0 15px ${color.shadow}`;
                wrapper.style.cursor = "pointer";
                wrapper.style.zIndex = "1000";
                wrapper.style.pointerEvents = "auto";
                wrapper.dataset.heroAbilityTarget = "true";
            }
        } else if (target.x !== undefined && target.y !== undefined) {
            // Це клітинка
            const cell = document.querySelector(`.cell[data-x="${target.x}"][data-y="${target.y}"]`);
            if (cell) {
                // 🆕 Пропускаємо СТИЛІ для клітинок з маркерами (але дозволяємо клік)
                const hasSpecialMarker = cell.classList.contains('delayed-strike-marker') || 
                    cell.classList.contains('portal-entry') || 
                    cell.classList.contains('portal-exit');
                
                if (!hasSpecialMarker) {
                    // Змінюємо стиль тільки якщо немає маркера
                    if (target.visualOnly) {
                        cell.style.backgroundColor = '#555588';
                        cell.style.opacity = "0.3";
                    } else {
                        cell.style.backgroundColor = color.border;
                        cell.style.opacity = "0.5";
                    }
                }
                cell.dataset.heroAbilityTarget = "true";  // Завжди додаємо для кліку
            }
        }
    });

    console.log(`✅ Підсвічено ${targets.length} цілей для здібності героя`);
}

/**
 * Підсвічує союзників для лікування та бафів
 */
function highlightHealTargets(caster, ability) {
    clearHealTargets();
    
    isSelectingHealTarget = true;
    activeHealAbility = ability;
    healCaster = caster;
    
    // Знаходимо союзників в радіусі (включаючи самого себе для самолікування)
    const allies = unitsOnMap.filter(unit => 
        unit.playerIndex === caster.playerIndex && unit.id !== caster.id
    );
    
    let targetsFound = 0;
    
    allies.forEach(ally => {
        const distance = ability.calculateDistance(caster, ally);
        
        if (distance <= ability.range) {
            // Знаходимо візуальний елемент юніта
            const wrapper = document.querySelector(`[data-unit-id="${ally.id}"]`);
            
            if (wrapper) {
                // Підсвічуємо зеленим
                wrapper.style.border = "3px solid #00ff00";
                wrapper.style.boxShadow = "0 0 15px #00ff00";
                wrapper.style.cursor = "pointer";
                wrapper.style.zIndex = "1000";
                wrapper.style.pointerEvents = "auto";
                
                targetsFound++;
            }
        }
    });
    
    if (targetsFound === 0) {
        alert(`❌ Немає союзників в радіусі ${ability.range} клітинок`);
        clearHealTargets();
        return false;
    }
    
    console.log(`✅ Підсвічено ${targetsFound} можливих союзників`);
    return true;
}

/**
 * Застосовує лікування до обраної цілі
 */
/**
 * Застосовує активну здібність до обраної цілі
 */
function applyHealToTarget(target) {
    if (!isSelectingHealTarget || !activeHealAbility || !healCaster) {
        return;
    }
    
    console.log("🔍 DEBUG перед застосуванням здібності:");
    console.log("- Здібність:", activeHealAbility.name);
    console.log("- Тип:", activeHealAbility.actionType);
    console.log("- Кастер:", healCaster.name);
    console.log("- Ціль:", target.name);
    
    let result;
    
    // Викликаємо відповідний метод залежно від типу здібності
if (activeHealAbility.actionType === "heal") {
    result = activeHealAbility.applyAllyHeal(healCaster, target);
} else if (activeHealAbility.actionType === "buff") {
    result = activeHealAbility.applyBuff(healCaster, target);
} else if (activeHealAbility.actionType === "control") {
    result = activeHealAbility.applyControl(healCaster, target);
} else if (activeHealAbility.actionType === "debuff") {
    result = activeHealAbility.applyDebuff(healCaster, target);
}
    
    if (result && result.success) {
        console.log(`✅ ${result.message}`);
        
        // Оновлюємо візуалізацію
        const wrapper = document.querySelector(`[data-unit-id="${target.id}"]`);
        if (wrapper) {
            // Для лікування - оновлюємо HP
            if (activeHealAbility.actionType === "heal") {
                const healthBar = wrapper.querySelector('.unit-health-fill');
                if (healthBar) {
                    const healthPercent = (target.newhp / target.maxHp) * 100;
                    healthBar.style.width = healthPercent + '%';
                }
            }
            
            // Показуємо анімацію
            wrapper.classList.add('ability-applied');
            setTimeout(() => wrapper.classList.remove('ability-applied'), 1000);
        }
        
        alert(result.message);
        
        // 🔴 ДОДАТИ: Позначаємо кастера як використаного
        healCaster.moved = true;
        healCaster.attacked = true; // На всякий випадок
        
        // Оновлюємо візуальний стан кастера
        if (window.updateUnitVisualState) {
            updateUnitVisualState(healCaster);
        }
        
        console.log(`✅ ${healCaster.name} використав здібність і завершив хід`);
        if (activeHealAbility.actionType === "control" || activeHealAbility.actionType === "debuff") {
            // Очищаємо підсвічені клітинки руху для цілі
            if (typeof clearMoveCells === 'function') {
                clearMoveCells();
            }
            console.log(`🧹 Очищено клітинки руху для ${target.name}`);
        }
    } else {
        alert(`❌ ${result.message}`);
    }
    
    clearHealTargets();
}

/**
 * Ініціалізує обробник кліків по юнітам для лікування
 */
/**
 * Ініціалізує обробник кліків по юнітам для лікування
 */
function initHealTargetSelection() {
    // Додаємо обробник кліку на карту
    if (map) {
        map.addEventListener('click', (event) => {
            console.log("🖱️ Клік на карті, isSelectingHealTarget:", isSelectingHealTarget);
           
            if (!isSelectingHealTarget) {
                return; // Якщо не вибираємо ціль для лікування - виходимо
            }
let wrapper = event.target.closest('.unit-wrapper');
console.log("📦 Знайдений wrapper (closest):", wrapper);

// Якщо не знайшли через closest, шукаємо всередині клітинки
if (!wrapper) {
    const cell = event.target.closest('.cell');
    if (cell) {
        wrapper = cell.querySelector('.unit-wrapper');
        console.log("📦 Знайдений wrapper (querySelector в cell):", wrapper);
    }
}

if (!wrapper) {
    console.log("❌ Wrapper не знайдено - скасовую вибір");
    // Клік мимо юніта - скасовуємо вибір
    clearHealTargets();
    return;
}
            
            // Отримуємо ID юніта
            const unitId = wrapper.dataset.unitId;
            console.log("🆔 ID юніта:", unitId);
            
            const target = unitsOnMap.find(u => u.id === unitId);
            console.log("🎯 Знайдений юніт:", target);
            
            if (target) {
                console.log("💚 Застосовую лікування до:", target.name);
                applyHealToTarget(target);
            } else {
                console.log("❌ Юніт не знайдений в unitsOnMap");
            }
        });
    } else {
        console.log("❌ map не знайдено!");
    }
}


// ═══════════════════════════════════════════
// 🆕 СИСТЕМА АКТИВНИХ ЗДІБНОСТЕЙ ГЕРОЇВ
// ═══════════════════════════════════════════

/**
 * Обробляє активацію здібності героя
 */
function handleHeroAbilityActivation() {
    const hero = selectedUnitForMove;
    
    if (!currentSelectedAbility || !currentSelectedAbility.abilityId) {
        alert("❌ Оберіть здібність для активації");
        return;
    }
    
    // Перевіряємо чи це активна здібність
    if (currentSelectedAbility.type !== 'active') {
        alert("❌ Це пасивна здібність, вона працює автоматично");
        return;
    }
    
    const abilityId = currentSelectedAbility.abilityId;
    const system = window.heroActiveAbilitySystem;
    
    // Перевіряємо cooldown
    if (system.isOnCooldown(hero, abilityId)) {
        const remaining = system.getCooldown(hero, abilityId);
        alert(`⏳ Перезарядка: ще ${remaining} ходів`);
        return;
    }
    
    // Активуємо здібність
    const result = system.activateAbility(hero, abilityId, unitsOnMap);
    
    if (!result.success) {
        alert(`❌ ${result.message}`);
        return;
    }
    
    // Якщо потрібно вибрати ціль
    if (result.needsTarget) {
        closeMagicUnitsModal();

        if (typeof clearMoveCells === 'function') {
            clearMoveCells();
        }
        // 🆕 Також клонуємо клітинки щоб видалити обробники руху
        document.querySelectorAll(".moveCellMap").forEach(cell => {
            const newCell = cell.cloneNode(true);
            cell.parentNode.replaceChild(newCell, cell);
        });
        highlightHeroAbilityTargets(result.targets, result.targetType);
        
        const messages = {
            'enemy': `⚔️ Оберіть ворога для "${currentSelectedAbility.name}"\n(підсвічено червоним)`,
            'ally': `💚 Оберіть союзника для "${currentSelectedAbility.name}"\n(підсвічено зеленим)`,
            'empty_cell': `📍 Оберіть клітинку для переміщення\n(підсвічено синім)`,
            'any_unit': `🔄 Оберіть юніта для "${currentSelectedAbility.name}"\n(підсвічено жовтим)`
        };
        
        alert(messages[result.targetType] || "Оберіть ціль");
         // 🆕 Змінюємо текст кнопки на "Відмінити"
    if (BtnMagicUnitsTablo) {
        BtnMagicUnitsTablo.querySelector('div').textContent = '❌ Відмінити';
    }
        return;
    }
    
    // Здібність виконана без цілі (self_buff)
    alert(`✅ ${currentSelectedAbility.name}: ${result.message}`);
    
    const actionType = window.heroActiveAbilitySystem.getActionType(abilityId);
    const freeActions = ['self_buff', 'thorns', 'health_swap', 'armor_self', 'armor_per_enemy'];
if (!freeActions.includes(actionType)) {
    hero.attacked = true;
}
    
    // Оновлюємо візуал
    if (typeof updateUnitVisualState === 'function') {
        updateUnitVisualState(hero);
    }
    if (typeof window.updateUnitHealthBar === 'function') {
        window.updateUnitHealthBar(hero);
    }

    // 🔧 ДОДАНО: Оновлюємо табло щоб показати бонус
    if (typeof updateUnitTablo === 'function') {
        updateUnitTablo(hero);
    } else if (typeof window.updateUnitTablo === 'function') {
        window.updateUnitTablo(hero);
    }
     
    // Змінюємо текст кнопки на "Відмінити"
    // if (BtnMagicUnitsTablo) {
    //     BtnMagicUnitsTablo.querySelector('div').textContent = '❌ Відмінити';
    // }
    closeMagicUnitsModal();
}

/**
 * Підсвічує цілі для здібності героя
 */
function highlightHeroAbilityTargets(targets, targetType) {
    clearHeroAbilityTargets(true);  // 🆕 true = не скидати стан
    
    const colors = {
        'enemy': { border: '#ff0000', shadow: '#ff0000' },
        'ally': { border: '#00ff00', shadow: '#00ff00' },
        'empty_cell': { border: '#00aaff', shadow: '#00aaff' },
        'any_unit': { border: '#ffff00', shadow: '#ffff00' },
        'direction': { border: '#ff8800', shadow: '#ff8800' }  // 🆕 Оранжевий для напрямку
    };
    
    const color = colors[targetType] || colors.enemy;
    
    targets.forEach(target => {
        if (target.unit) {
            // Це юніт
            const wrapper = document.querySelector(`[data-unit-id="${target.unit.id}"]`);
            if (wrapper) {
                wrapper.style.border = `3px solid ${color.border}`;
                wrapper.style.boxShadow = `0 0 15px ${color.shadow}`;
                wrapper.style.cursor = "pointer";
                wrapper.style.zIndex = "1000";
                wrapper.style.pointerEvents = "auto";
                wrapper.dataset.heroAbilityTarget = "true";
            }
        } else if (target.x !== undefined && target.y !== undefined) {
            // Це клітинка
            const cell = document.querySelector(`.cell[data-x="${target.x}"][data-y="${target.y}"]`);
            if (cell) {
                // 🆕 Пропускаємо СТИЛІ для клітинок з маркерами (але дозволяємо клік)
                const hasSpecialMarker = cell.classList.contains('delayed-strike-marker') || 
                    cell.classList.contains('portal-entry') || 
                    cell.classList.contains('portal-exit');
                
                if (!hasSpecialMarker) {
                    cell.style.backgroundColor = color.border;
                    cell.style.opacity = "0.5";
                }
                cell.dataset.heroAbilityTarget = "true";  // Завжди додаємо для кліку
            }
        }
    });

    console.log(`✅ Підсвічено ${targets.length} цілей для здібності героя`);
}

/**
 * Очищає підсвічування цілей героя
 */
function clearHeroAbilityTargets(skipStateReset = false) {
    // Юніти
    document.querySelectorAll('[data-hero-ability-target="true"]').forEach(el => {
        el.style.border = "";
        el.style.boxShadow = "";
        el.style.cursor = "";
        el.style.zIndex = "";
        el.style.pointerEvents = "";
        el.style.backgroundColor = "";
        el.style.opacity = "";
        delete el.dataset.heroAbilityTarget;
    });
    
    // Клітинки
    document.querySelectorAll('.cell[data-hero-ability-target="true"]').forEach(cell => {
        cell.style.backgroundColor = "";
        cell.style.opacity = "";
        delete cell.dataset.heroAbilityTarget;
    });
    
    if (!skipStateReset && window.heroActiveAbilitySystem) {
        window.heroActiveAbilitySystem.clearSelection();
    }
        // Повертаємо оригінальний текст кнопки
if (BtnMagicUnitsTablo) {
    BtnMagicUnitsTablo.querySelector('div').textContent = 'ефекти всіх';
}
}

/**
 * Ініціалізує обробник вибору цілі для здібностей героя
 */
function initHeroAbilityTargetSelection() {
    if (!map) return;
    
    map.addEventListener('click', (e) => {
        // console.log("🎯 Hero ability click handler, isSelectingTarget:", window.heroActiveAbilitySystem?.isSelectingTarget);
        // console.log("🎯 e.target:", e.target);
        if (!window.heroActiveAbilitySystem?.isSelectingTarget) return;
        
        const system = window.heroActiveAbilitySystem;
        let target = null;
        
        // Перевіряємо клік по юніту
        const wrapper = e.target.closest('.unit-wrapper[data-hero-ability-target="true"]');
        if (wrapper) {
            const unitId = wrapper.dataset.unitId;
            const unit = unitsOnMap.find(u => u.id === unitId);
            if (unit) {
                target = { unit, x: unit.x, y: unit.y };
            }
        }
        
        // Перевіряємо клік по клітинці
        if (!target && e.target.classList.contains('cell') && e.target.dataset.heroAbilityTarget === 'true') {
            const x = parseInt(e.target.dataset.x);
            const y = parseInt(e.target.dataset.y);
            target = { x, y };
        }
        
        if (target) {
            // 🔧 ВИПРАВЛЕНО: Зберігаємо actionType ДО виконання (бо executeOnTarget очищає activeAbility)
            const actionType = system.activeAbility?.actionType || 
                               system.getActionType(system.activeAbility?.abilityId);
            
            console.log(`🎯 actionType перед виконанням: ${actionType}`);
            
            // Виконуємо здібність
            const result = system.executeOnTarget(target, unitsOnMap);
            
            if (result.success) {
                console.log(`✅ ${result.message}`);
                
                // Здібності переміщення НЕ блокують атаку
                // Здібності переміщення НЕ блокують атаку
const movementAbilities = ['jump', 'teleport', 'teleport_debuff', 'dash_to_enemy', 'swap', 'portal'];

// 🆕 Повністю безкоштовні дії (не блокують ні рух, ні атаку)
const freeAbilities = ['health_swap', 'thorns', 'armor_self', 'armor_per_enemy'];

if (freeAbilities.includes(actionType)) {
    // Повністю безкоштовна дія
    console.log(`🆓 Безкоштовна дія, рух і атака дозволені`);
} else if (movementAbilities.includes(actionType)) {
    // Для переміщень - блокуємо тільки рух
    selectedUnitForMove.moved = true;
    console.log(`🚶 Встановлено moved = true (атака дозволена)`);
} else {
    // Позначаємо що герой діяв (тільки для атакуючих здібностей)
    selectedUnitForMove.attacked = true;
    console.log(`⚔️ Встановлено attacked = true`);
}
                
                // Оновлюємо візуал
                updateAfterHeroAbility(selectedUnitForMove, target);
                 // 🆕 Оновлюємо табло цілі (для бафів)
                 if (target.unit && typeof window.updateUnitTablo === 'function') {
                    window.updateUnitTablo(target.unit);
                }
            } else {
                alert(`❌ ${result.message}`);
            }
            
            clearHeroAbilityTargets();
        } else {
            // 🆕 Клік на недоступну клітинку - скасовуємо здібність
            alert('❌ Ця клітинка недоступна! Здібність скасовано.');
            clearHeroAbilityTargets();
        }
    });
}

/**
 * Оновлює візуал після використання здібності
 */
function updateAfterHeroAbility(hero, target) {
    // Оновлюємо позицію героя (якщо телепорт/стрибок)
    const heroWrapper = document.querySelector(`[data-unit-id="${hero.id}"]`);
    if (heroWrapper) {
        heroWrapper.style.left = `${hero.x * cellSizeAll}px`;
        heroWrapper.style.top = `${hero.y * cellSizeAll}px`;
        
        // 🔧 ДОДАНО: Оновлюємо data-атрибути позиції (важливо для вибору юніта!)
        heroWrapper.dataset.x = hero.x;
        heroWrapper.dataset.y = hero.y;
    }
    
    // Оновлюємо позицію цілі (якщо swap)
    if (target.unit) {
        const targetWrapper = document.querySelector(`[data-unit-id="${target.unit.id}"]`);
        if (targetWrapper) {
            targetWrapper.style.left = `${target.unit.x * cellSizeAll}px`;
            targetWrapper.style.top = `${target.unit.y * cellSizeAll}px`;
            
            // 🔧 ДОДАНО: Оновлюємо data-атрибути позиції для цілі
            targetWrapper.dataset.x = target.unit.x;
            targetWrapper.dataset.y = target.unit.y;
        }
        
        if (typeof updateUnitTablo === 'function') {
            updateUnitTablo(target.unit);
        } else if (typeof window.updateUnitTablo === 'function') {
            window.updateUnitTablo(target.unit);
        }
    }
    
    // Оновлюємо стан героя
    if (typeof updateUnitVisualState === 'function') {
        updateUnitVisualState(hero);
    }
    if (typeof window.updateUnitHealthBar === 'function') {
        window.updateUnitHealthBar(hero);
    }
}

// ═══════════════════════════════════════════

/**
 * Ініціалізація обробників
 */
function initMagicUnitsModal() {
    // Обробник кнопки відкриття/закриття модального вікна
    if (BtnMagicUnitsTablo) {
        BtnMagicUnitsTablo.addEventListener('click', () => {
            // Якщо здібність активована - скасовуємо
            if (window.heroActiveAbilitySystem?.isSelectingTarget) {
                clearHeroAbilityTargets();
                // Повертаємо оригінальний текст
                BtnMagicUnitsTablo.querySelector('div').textContent = 'ефекти всіх';
                console.log('❌ Здібність скасовано');
            } else {
                // Інакше - відкриваємо модальне вікно
                toggleMagicUnitsModal();
            }
        });
    }
     
   
    
       // Обробник кнопки активації ефекту
       if (BtnModalMagicCentralActive) {
        BtnModalMagicCentralActive.addEventListener('click', () => {
            // Отримуємо поточного юніта
            if (!selectedUnitForMove) {
                alert("❌ Юніт не вибраний");
                return;
            }
            
            // ═══════════════════════════════════════════
            // 🆕 ОБРОБКА ГЕРОЇВ
            // ═══════════════════════════════════════════
            if (selectedUnitForMove.isHero && window.heroActiveAbilitySystem) {
                handleHeroAbilityActivation();
                return;
            }
            
            // ═══════════════════════════════════════════
            // ОБРОБКА ЮНІТІВ (старий код)
            // ═══════════════════════════════════════════
            if (!selectedUnitForMove.abilityInstances || selectedUnitForMove.abilityInstances.length === 0) {
                alert("❌ У юніта немає здібностей");
                return;
            }
            
            const activeAbility = selectedUnitForMove.abilityInstances.find(
                ability => ability.mode === "active" && 
                (ability.actionType === "heal" || 
                 ability.actionType === "buff" || 
                 ability.actionType === "control" || 
                 ability.actionType === "debuff")
            );

            if (!activeAbility) {
                alert("❌ Оберіть активну здібність");
                return;
            }

            let targetsHighlighted;
            if (activeAbility.actionType === "heal" || activeAbility.actionType === "buff") {
                targetsHighlighted = highlightHealTargets(selectedUnitForMove, activeAbility);
            } else if (activeAbility.actionType === "control" || activeAbility.actionType === "debuff") {
                targetsHighlighted = highlightEnemyTargets(selectedUnitForMove, activeAbility);
            }

            if (targetsHighlighted) {
                closeMagicUnitsModal();
                
                if (activeAbility.actionType === "heal") {
                    alert("💚 Оберіть союзника для лікування\n(підсвічено зеленим)");
                } else if (activeAbility.actionType === "buff") {
                    alert(`✨ Оберіть союзника для бафу "${activeAbility.name}"\n(підсвічено зеленим)`);
                } else if (activeAbility.actionType === "control") {
                    alert(`🌿 Оберіть ворога для "${activeAbility.name}"\n(підсвічено червоним)`);
                } else if (activeAbility.actionType === "debuff") {
                    alert(`💀 Оберіть ворога для дебафу "${activeAbility.name}"\n(підсвічено червоним)`);
                }
            }
        });
    }
    
    // Закриття при кліку поза модальним вікном
    // Закриття при кліку поза модальним вікном
document.addEventListener('click', (e) => {
    if (ModalMagicUnits && ModalMagicUnits.style.display === 'flex') {
        // Перевіряємо, чи клік був поза модальним вікном
        if (!ModalMagicUnits.contains(e.target) && 
            !modMagicBoxText.contains(e.target) &&  // ✅ ДОДАТИ: перевірка зеленого вікна
            !BtnMagicUnitsTablo.contains(e.target)) {
            closeMagicUnitsModal();
        }
    }
});
initHealTargetSelection();
initHeroAbilityTargetSelection();  // 🆕 Для здібностей героїв
}
if (ModMagicCloseModalMagic) {
    ModMagicCloseModalMagic.addEventListener('click', () => {
        closeMagicUnitsModal();
    });
}

// Ініціалізація після завантаження DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initMagicUnitsModal, 200);
    });
} else {
    setTimeout(initMagicUnitsModal, 200);
}


