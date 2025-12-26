// ============================================
// ОБРОБКА КЛІКІВ ПО ЗАМКАХ
// ============================================

let selectedCastle = null; // Вибраний замок

/**
 * Перевіряє чи клітинка є замком
 */
function isCastle(x, y) {
    return castles.find(castle => castle.x === x && castle.y === y);
}

/**
 * Показує кнопку магазину замку
 */
function showCastleShopButton() {
    if (btnBuyCastle) {
        btnBuyCastle.style.display = "block";
        // console.log('🏰 Кнопка магазину показана');
    }
}

/**
 * Ховає кнопку магазину замку
 */
function hideCastleShopButton() {
    if (btnBuyCastle) {
        btnBuyCastle.style.display = "none";
        // console.log('🏰 Кнопка магазину схована');
    }
}

/**
 * Обробляє клік по замку
 */
function handleCastleClick(x, y) {
    // Перевіряємо чи це замок
    const castle = isCastle(x, y);
    
    if (!castle) {
        // Це не замок - ховаємо кнопку
        selectedCastle = null;
        hideCastleShopButton();
        return false;
    }
    
    // console.log(`🏰 Клік на замок на позиції (${x}, ${y})`);
    // console.log(`   Замок належить гравцю ${castle.playerIndex + 1}`);
    
    // Перевіряємо чи це замок поточного активного гравця
    const currentPlayer = players[currentPlayerIndex];
    
    if (!currentPlayer) {
        // console.error('❌ Поточний гравець не знайдений');
        return false;
    }
    
    
    // Порівнюємо originalIndex замку з originalIndex поточного гравця
    if (castle.playerIndex === currentPlayer.originalIndex) {
        // Це замок поточного гравця - показуємо кнопку
        selectedCastle = castle;
        showCastleShopButton();
        // console.log(`✅ Відкрито магазин замку гравця ${currentPlayer.originalIndex + 1}`);
        return true;
    } else {
        // Це чужий замок - ховаємо кнопку
        selectedCastle = null;
        hideCastleShopButton();
        // console.log(`⚠️ Це замок іншого гравця (гравець ${castle.playerIndex + 1})`);
        return false;
    }
}

/**
 * Ініціалізація обробника кліків на замки
 */
function initCastleClickHandler() {
    if (!map) {
        // console.error('❌ Елемент карти не знайдено!');
        return;
    }
    
    // Додаємо обробник кліку на карту
    map.addEventListener("click", (e) => {
        // Перевіряємо чи клік по клітинці
        if (!e.target.classList.contains("cell")) {
            // Якщо клік не по клітинці - можливо клік десь інде, ховаємо кнопку
            return;
        }
        
        // Отримуємо координати клітинки
        const x = parseInt(e.target.dataset.x);
        const y = parseInt(e.target.dataset.y);
        
        // Обробляємо клік по замку
        handleCastleClick(x, y);
    });
    
    // За замовчуванням ховаємо кнопку
    hideCastleShopButton();
    
    // console.log('✅ Обробник кліків на замки ініціалізовано');
}

// Ініціалізуємо після завантаження DOM і даних гри
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initCastleClickHandler, 150);
    });
} else {
    setTimeout(initCastleClickHandler, 150);
}