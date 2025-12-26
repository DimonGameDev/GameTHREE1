// ============================================
// ЛОГІКА МОДАЛЬНОГО ВІКНА ГЕРОЇВ
// ============================================

/**
 * Відкриває модальне вікно героїв
 */
/**
 * Відкриває модальне вікно героїв
 */
function openHeroesModal() {
    const currentPlayer = players[currentPlayerIndex];
    
    if (!currentPlayer) {
        alert("⚠️ Гравця не знайдено!");
        return;
    }
    
    // Перевіряємо, чи є герої у гравця
    const playerHeroes = unitsOnMap.filter(unit => 
        unit.isHero && unit.playerIndex === currentPlayerIndex
    );
    
    if (playerHeroes.length === 0) {
        alert("⚠️ У вас ще немає героїв!");
        return;
    }
    
    // Відображаємо модальне вікно
    if (modalEfectHeroes) {
        // Показуємо backdrop
        const backdrop = document.querySelector('.modalEfectHeroes-backdrop');
        if (backdrop) {
            backdrop.classList.add('active');
            backdrop.addEventListener('touchmove', preventScroll, { passive: false });
        }
        
        modalEfectHeroes.style.display = "flex";
        
        // СПОЧАТКУ зберігаємо список героїв
        window.currentPlayerHeroes = playerHeroes;
        window.currentHeroIndex = 0;
        
        // ПОТІМ відображаємо інформацію
        displayHeroInfo(playerHeroes[0]); // Показуємо першого героя
        
        updateHeroesManaInModal();
        // Блокуємо скрол body на мобільних
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
    }
}

/**
 * Закриває модальне вікно героїв
 */
function closeHeroesModal() {
    if (modalEfectHeroes) {
        // Ховаємо backdrop
        const backdrop = document.querySelector('.modalEfectHeroes-backdrop');
        if (backdrop) {
            backdrop.classList.remove('active');
            backdrop.removeEventListener('touchmove', preventScroll);
        }
        
        modalEfectHeroes.style.display = "none";
        
        // Відновлюємо скрол body
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
    }
}

/**
 * Відображає інформацію про героя
 */
function displayHeroInfo(hero) {
    if (!hero) return;
    
    window.currentAbilityIndex = 0;

    // Оновлюємо ім'я героя
    if (modEfeHerNameHeroes) {
        modEfeHerNameHeroes.textContent = hero.name || "Герой";
    }
    
    // Оновлюємо головне зображення героя
    if (modEfeHerImg) {
        modEfeHerImg.src = hero.img || "";
    }
    
    // Оновлюємо статистику
    if (modEfeHerItemStep) modEfeHerItemStep.textContent = hero.step || 0;
    if (modEfeHerItemRange) modEfeHerItemRange.textContent = hero.range || 0;
    if (modEfeHerItemAttack) modEfeHerItemAttack.textContent = hero.attack || 0;
    if (modEfeHerItemArmor) modEfeHerItemArmor.textContent = hero.armor || 0;
    if (modEfeHerItemHp) modEfeHerItemHp.textContent = hero.newhp || hero.hp || 0;
    if (modEfeHerItemHpNew) modEfeHerItemHpNew.textContent = hero.hp || 0;
    
    // Критичний удар (якщо є)
if (modEfeHerItemCriticalStrike) {
    modEfeHerItemCriticalStrike.textContent = hero.critChance ? `${hero.critChance}%` : "0%"; // Змінено з criticalChance на critChance
}
if (modEfeHerItemCriticalBlow) {
    modEfeHerItemCriticalBlow.textContent = hero.critBlow ? `x${hero.critBlow}` : "x0"; // Змінено з criticalDamage на critBlow, додано "x"
}
    
updateHeroesManaInModal();
    // Оновлюємо іконки вибору героїв (якщо є кілька)
    updateHeroSelection();
    
    // Відображаємо здібності героя
    displayHeroAbilities(hero);
}

/**
 * Оновлює іконки вибору героїв
 */
function updateHeroSelection() {
    const playerHeroes = window.currentPlayerHeroes || [];
    const heroImages = [modalEfectHeroes1, modalEfectHeroes2, modalEfectHeroes3];
    
    heroImages.forEach((img, index) => {
        if (img) {
            if (playerHeroes[index]) {
                // Встановлюємо картинку та ЯВНО скидаємо opacity
                img.src = playerHeroes[index].img;
                img.style.opacity = "1"; // ВАЖЛИВО: скидаємо opacity на повну видимість
                img.style.cursor = "pointer";
                
                // Виділяємо активного героя рамкою
                if (index === window.currentHeroIndex) {
                    img.style.border = "3px solid gold";
                    img.style.boxShadow = "0 0 10px gold";
                } else {
                    img.style.border = "1px solid rgba(255, 255, 255, 0.3)";
                    img.style.boxShadow = "none";
                }
                
                // Додаємо обробник кліку
                img.onclick = () => {
                    window.currentHeroIndex = index;
                    displayHeroInfo(playerHeroes[index]);
                };
            } else {
                // Порожній слот - робимо тьмяним
                img.style.opacity = "0.2";
                img.style.cursor = "default";
                img.onclick = null;
            }
        }
    });
}

/**
 * Відображає здібності героя
 */
function displayHeroAbilities(hero) {
    if (!hero.abilitiesProgress || hero.abilitiesProgress.length === 0) {
        return;
    }
    
    // 🆕 ВИПРАВЛЕНО: Перевіряємо чи є база здібностей
    if (!window.heroesAbilities) {
        console.error("❌ window.heroesAbilities не знайдено!");
        return;
    }
    
    // Іконки здібностей
    const abilityImages = [heroImgEfect1, heroImgEfect2, heroImgEfect3];
    
    // Спочатку очищаємо ВСІ іконки
    abilityImages.forEach(img => {
        if (img) {
            img.src = "";
            img.style.opacity = "0.2";
            img.style.cursor = "default";
            img.style.border = "1px solid rgba(255, 255, 255, 0.3)";
            img.style.boxShadow = "none";
            img.onclick = null;
        }
    });
    
    // 🆕 ВИПРАВЛЕНО: Шукаємо здібності напряму по ID з abilitiesProgress
    hero.abilitiesProgress.forEach((progress, index) => {
        // Отримуємо здібність напряму по ID
        const ability = window.heroesAbilities[progress.abilityId];
        
        if (ability && abilityImages[index]) {
            abilityImages[index].src = ability.img || "";
            abilityImages[index].style.cursor = "pointer";
            abilityImages[index].style.opacity = "1";
            
            // Підсвічуємо активну здібність
            if (index === window.currentAbilityIndex) {
                abilityImages[index].style.border = "3px solid gold";
                abilityImages[index].style.boxShadow = "0 0 10px gold";
            } else {
                abilityImages[index].style.border = "1px solid rgba(255, 255, 255, 0.3)";
                abilityImages[index].style.boxShadow = "none";
            }
            
            // Додаємо обробник кліку для відображення деталей
            abilityImages[index].onclick = () => {
                try {
                    window.currentAbilityIndex = index;
                    displayHeroAbilityDetails(ability, progress.currentLevel, index);
                    updateAbilitiesHighlight(abilityImages, index);
                } catch (error) {
                    console.error("❌ ПОМИЛКА при виклику displayHeroAbilityDetails:", error);
                }
            };
        } else {
            console.warn(`⚠️ Здібність з ID ${progress.abilityId} не знайдена`);
        }
    });
    
    // Автоматично показуємо першу здібність
    if (hero.abilitiesProgress.length > 0) {
        const firstAbility = window.heroesAbilities[hero.abilitiesProgress[0].abilityId];
        if (firstAbility) {
            displayHeroAbilityDetails(firstAbility, hero.abilitiesProgress[0].currentLevel, 0);
        }
    }
}

/**
 * Відображає деталі конкретної здібності
 */
function displayHeroAbilityDetails(ability, currentLevel, abilityIndex) {
    // console.log("🔍 displayAbilityDetails викликано:", ability.name, "currentLevel:", currentLevel);
    
    // Назва здібності
    if (modEfeHerTextLineTitle) {
        modEfeHerTextLineTitle.textContent = ability.name || "";
        // console.log("✅ Назва встановлена:", ability.name);
    } else {
        // console.error("❌ modEfeHerTextLineTitle не знайдено!");
    }
    
    // Опис здібності
    if (modEfeHerTextLineDescription) {
        modEfeHerTextLineDescription.textContent = ability.description || "";
        // console.log("✅ Опис встановлено:", ability.description);
    } else {
        console.error("❌ modEfeHerTextLineDescription не знайдено!");
    }

    // Опис здібності
if (modEfeHerTextLineDescription) {
    modEfeHerTextLineDescription.textContent = ability.description || "";
    // console.log("✅ Опис встановлено:", ability.description);
} else {
    console.error("❌ modEfeHerTextLineDescription не знайдено!");
}

// Тип здібності (ДОДАЙТЕ ЦЕЙ БЛОК)
if (typeAbility) {
    let typeText = "";
    if (ability.type === "active") {
        typeText = "⚡ Активна";
    } else if (ability.type === "passive" || ability.type === "pasive") {
        typeText = "🔮 Пасивна";
    }
    typeAbility.textContent = typeText;
}
    
    // Відображаємо інформацію про рівні
    const levelTexts = [efectHeroText1, efectHeroText2, efectHeroText3, efectHeroText4];
    const levelButtons = [efectHeroBtn1, efectHeroBtn2, efectHeroBtn3, efectHeroBtn4];
    
    // console.log("📋 Рівнів у здібності:", ability.levels?.length);
    // console.log("📋 levelTexts:", levelTexts.map(t => t ? "OK" : "NULL"));
    // console.log("📋 levelButtons:", levelButtons.map(b => b ? "OK" : "NULL"));
    
    if (ability.levels) {
        ability.levels.forEach((levelData, index) => {
            if (levelTexts[index] && levelButtons[index]) {
                // Формуємо опис рівня
                // const desc = formatLevelDescription(levelData);
                // // console.log(`  Рівень ${levelData.level}: ${desc}`);
                // levelTexts[index].textContent = desc;
                levelTexts[index].textContent = levelData.descripLevel || "Опис відсутній";
                // Налаштовуємо кнопку
                if (levelData.level <= currentLevel) {
                    // ✅ Вже активовано
                    levelButtons[index].textContent = "✓ Активовано";
                    levelButtons[index].style.backgroundColor = "#28a745"; // зелений
                    levelButtons[index].style.cursor = "default";
                    levelButtons[index].onclick = null;
                } else if (levelData.level === currentLevel + 1) {
                    // 🔓 Можна купити (наступний рівень)
                    const cost = ability.levels[currentLevel - 1]?.upgradeCost || 0;
                    levelButtons[index].textContent = `🔮 ${cost} мани`;
                    levelButtons[index].style.backgroundColor = "#ff9800"; // помаранчевий
                    levelButtons[index].style.cursor = "pointer";
                    
                    // 👇 ОБРОБНИК ПОКРАЩЕННЯ
                    levelButtons[index].onclick = () => {
                        const hero = window.currentPlayerHeroes[window.currentHeroIndex];
                        if (window.upgradeHeroAbility(hero, abilityIndex)) {
                            // Оновлюємо відображення після покращення
                            displayHeroInfo(hero);
                        }
                    };
                } else {
                    // 🔒 Заблоковано
                    levelButtons[index].textContent = "🔒 Заблоковано";
                    levelButtons[index].style.backgroundColor = "#6c757d"; // сірий
                    levelButtons[index].style.cursor = "not-allowed";
                    levelButtons[index].onclick = null;
                }
            }
        });
    } else {
        console.error("❌ ability.levels відсутні!");
    }
}
// console.log("ssss");
/**
 * Форматує опис рівня здібності
 */
// function formatLevelDescription(levelData) {
//     let desc = [];
    
//     if (levelData.damage) desc.push(`Шкода: ${levelData.damage}`);
//     if (levelData.poisonDamage) desc.push(`Отрута: ${levelData.poisonDamage}/хід`);
//     if (levelData.poisonDuration) desc.push(`Тривалість: ${levelData.poisonDuration} ходів`);
//     if (levelData.cooldown) desc.push(`Перезарядка: ${levelData.cooldown} ходів`);
//     if (levelData.heal) desc.push(`Лікування: ${levelData.heal}`);
//     if (levelData.shield) desc.push(`Щит: ${levelData.shield}`);
    
//     return desc.join(", ") || "Опис відсутній";
// }

/**
 * Визначає ключ героя за його ID
 */
function getHeroKeyById(heroId) {
    const heroMap = {
        1: "tuveran",     // Туверан
        2: "timer",       // Тімер
        3: "darest",      // Дарест
        4: "kriver",      // Крівер
        5: "spetri",      // Спетрі
        6: "artemis",     // Артеміс
        7: "enagra",      // Енагра
        8: "blister",     // Блістер
        9: "henri",       // Генрі
        10: "savagar",    // Савагар
        11: "mayden",     // Майден
        12: "elder",      // Елдер
        13: "dazara",     // Дазара
        14: "sniper",     // Сніпер
        15: "nekropius"   // Некропіус
    };
    
    return heroMap[heroId];
}

/**
 * Ініціалізація обробників
 */
/**
 * Ініціалізація обробників
 */
function initHeroesModal() {
    // Обробник кнопки відкриття модального вікна
    if (BtnEfectHeroesTablo) {
        BtnEfectHeroesTablo.addEventListener('click', () => {
            openHeroesModal();
        });
    }
    
    // Обробник кнопки закриття
    if (BoxModEfeHerCloseBtn) {
        BoxModEfeHerCloseBtn.addEventListener('click', () => {
            closeHeroesModal();
        });
    }
    
    // Закриття при кліку на backdrop
    const backdrop = document.querySelector('.modalEfectHeroes-backdrop');
    if (backdrop) {
        backdrop.addEventListener('click', () => {
            closeHeroesModal();
        });
    }
}

// Ініціалізація після завантаження DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initHeroesModal, 200);
    });
} else {
    setTimeout(initHeroesModal, 200);
}

// Функція для блокування скролу
function preventScroll(e) {
    e.preventDefault();
}

/**
 * Оновлює підсвічування здібностей
 */
function updateAbilitiesHighlight(abilityImages, selectedIndex) {
    abilityImages.forEach((img, index) => {
        if (img && img.src) {
            if (index === selectedIndex) {
                img.style.border = "3px solid gold";
                img.style.boxShadow = "0 0 10px gold";
            } else {
                img.style.border = "1px solid rgba(255, 255, 255, 0.3)";
                img.style.boxShadow = "none";
            }
        }
    });
}

/**
 * Оновлює відображення мани героїв в модальному вікні
 */
function updateHeroesManaInModal() {
    if (!manaHeroesNow) return;
    
    const playerKey = `player${currentPlayerIndex + 1}`;
    
    // Перевіряємо чи існує система мани
    if (window.heroesMana && window.heroesMana.players && window.heroesMana.players[playerKey]) {
        const currentMana = window.heroesMana.players[playerKey].current;
        manaHeroesNow.textContent = currentMana;
    } else {
        manaHeroesNow.textContent = "0";
    }
}