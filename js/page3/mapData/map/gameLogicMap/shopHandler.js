// ============================================
// ЛОГІКА МАГАЗИНУ ЗАМКУ
// ============================================

// Глобальна змінна для збереження обробника
let shopClickHandler = null;
/**
 * Відкриває модальне вікно магазину
 */
function openShop() {
    if (!selectedCastle) {
        return;
    }
    
    const currentPlayer = players[currentPlayerIndex];
    
    if (!currentPlayer) {
        return;
    }
    
    // Скидаємо вибір юніта при відкритті магазину
    if (typeof selectedUnit !== 'undefined') {
        selectedUnit = null;
    }
    
    // Ховаємо кнопку відкриття магазину
    hideCastleShopButton();
    
    // Показуємо модальне вікно
    if (ModalWindowsShop) {
        ModalWindowsShop.style.display = "block";
    }
    
    // Оновлюємо назву раси в шапці магазину
    const modalNameRace = document.querySelector(".modalNameRace");
    if (modalNameRace) {
        modalNameRace.innerText = currentPlayer.race;
    }
    
    // Ховаємо кнопку покупки при відкритті
    if (ModalBtnBuyUnits) {
        ModalBtnBuyUnits.style.display = "none";
    }
    
    // Заповнюємо магазин юнітами
    fillShopWithUnits(currentPlayer.race);
    
    // ⬇️ ДОДАЄМО ОБРОБНИК КЛІКУ ПОЗА ВІКНОМ
    setTimeout(() => {
        shopClickHandler = function(e) {
            // Перевіряємо чи клік був НЕ всередині магазину
           // Прибираємо картинки, залишаємо тільки текст
upgradeSlots.forEach((slot, index) => {
    if (!slot || !slot.container) return;

    const upgrade = currentUpgradeList[index];
    slot.container.dataset.upgradeIndex = upgrade ? index : "";
    // slot.img видаляємо, бо прибрали <img> з HTML
    if (slot.name) slot.name.textContent = upgrade?.name || "";
    if (slot.number) slot.number.textContent = upgrade ? `${upgrade.level} рівень` : "";  // Більш читабельно
    if (slot.description) slot.description.textContent = upgrade?.description || "";
    
    // Ховаємо порожні слоти
    if (slot.container) {
        slot.container.style.display = upgrade ? 'block' : 'none';
    }
});
        };
        document.addEventListener('click', shopClickHandler);
        console.log('✅ Обробник закриття магазину додано');
    }, 50);
}
/**
 * Закриває модальне вікно магазину
 */
function closeShop() {
    if (ModalWindowsShop) {
        ModalWindowsShop.style.display = "none";
    }
    
    // Скидаємо вибір юніта при закритті
    if (typeof selectedUnit !== 'undefined') {
        selectedUnit = null;
    }
    
    // Ховаємо кнопку покупки
    if (ModalBtnBuyUnits) {
        ModalBtnBuyUnits.style.display = "none";
    }
    
    // ⬇️ ВИДАЛЯЄМО ОБРОБНИК КЛІКУ
    if (shopClickHandler) {
        document.removeEventListener('click', shopClickHandler);
        shopClickHandler = null;
        console.log('✅ Обробник закриття магазину видалено');
    }
}

/**
 * Заповнює магазин юнітами для вибраної раси
 */
/**
 * Заповнює магазин юнітами для вибраної раси
 */
function fillShopWithUnits(raceName) {
    const currentPlayer = players[currentPlayerIndex];
    
    if (!currentPlayer) {
        console.error('❌ Поточний гравець не знайдений!');
        return;
    }
    
    // ⬇️ ЗМІНЕНО: Використовуємо availableUnits гравця замість races[raceKey]
    const units = currentPlayer.availableUnits;
    
    if (!units || units.length === 0) {
        console.error(`❌ У гравця немає доступних юнітів!`);
        return;
    }
    
    // Очищаємо контейнер
    if (!scrollWrapper) {
        console.error('❌ scrollWrapper не знайдений!');
        return;
    }
    
    scrollWrapper.innerHTML = '';
    scrollWrapper.parentElement.scrollLeft = 0;
    
    // Створюємо карточку для кожного юніта
    units.forEach((unit, index) => {
        const modalItem = createUnitCard(unit, index);
        scrollWrapper.appendChild(modalItem);
    });
    
    //console.log(`✅ Створено ${units.length} карточок юнітів для гравця ${currentPlayerIndex + 1}`);
}

/**
 * Створює карточку юніта
 */
function createUnitCard(unit, index) {
    const modalItem = document.createElement('div');
    modalItem.classList.add('modalItem');
    modalItem.dataset.unitIndex = index;
    
    modalItem.innerHTML = `
    <div class="unitLevelNow">${unit.level}</div>
    <div class="imgBoxModal">
        <img src="${unit.img}" alt="${unit.name}"/>
    </div>
    
    <!-- Назва -->
    <div class="unitNameModal">${unit.name}</div>
    
    <!-- Характеристики сіткою -->
    <div class="statsModalGrid">
        <div class="statModalItem">
            <img src="../../img/map/infoTablo/swords/swords.png" title="Атака"/>
            <span>${unit.attack}</span>
        </div>
        <div class="statModalItem">
            <img src="../../img/map/infoTablo/armor/armor.png" title="Броня"/>
            <span>${unit.armor}</span>
        </div>
        <div class="statModalItem">
            <img src="../../img/map/infoTablo/HP/hp.png" title="HP"/>
            <span>${unit.hp}</span>
        </div>
        <div class="statModalItem">
            <span class="statIcon">👟</span>
            <span>${unit.step}</span>
        </div>
        <div class="statModalItem">
            <span class="statIcon">🎯</span>
            <span>${unit.range}</span>
        </div>
        <div class="statModalItem gold">
            <img src="../../img/map/infoTablo/gold/gold.png" title="Ціна"/>
            <span>${unit.coin}</span>
        </div>
    </div>
`;
    
    // Додаємо обробник кліку на карточку (для вибору юніта)
    modalItem.addEventListener('click', () => {
        selectUnitCard(modalItem);
    });
    
    return modalItem;
}


/**
 * Ініціалізація обробників магазину
 */
function initShopHandlers() {
    // Обробник кнопки відкриття магазину
    if (btnBuyCastle) {
        btnBuyCastle.addEventListener('click', () => {
            openShop();
        });
    }
    
    // Обробник кнопки закриття магазину
const modalBtnLineClose = document.querySelector('.modalBtnLineClose');
if (modalBtnLineClose) {
    modalBtnLineClose.addEventListener('click', (e) => {
        e.stopPropagation(); // ← Додайте це, щоб зупинити спливання
        closeShop();
    });
}
    
    // За замовчуванням магазин закритий
    closeShop();
}

// Ініціалізуємо після завантаження DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initShopHandlers, 200);
    });
} else {
    setTimeout(initShopHandlers, 200);
}

