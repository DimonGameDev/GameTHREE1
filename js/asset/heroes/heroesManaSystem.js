// ========================================
// СИСТЕМА МАНИ ДЛЯ ГЕРОЇВ
// ========================================

window.heroesMana = {
    // Спільна "банка" мани для всіх героїв гравця
    players: {
      player1: { 
        current: 0,      // Поточна мана
        total: 0,        // Всього зібрано за гру
        spent: 0         // Всього витрачено
      },
      player2: { current: 0, total: 0, spent: 0 },
      player3: { current: 0, total: 0, spent: 0 },
      player4: { current: 0, total: 0, spent: 0 }
    },
  
    // Налаштування отримання мани
    settings: {
      manaPerDamage: 1,        // 1 мана за 1 урон (можна змінити на 0.5, 2 тощо)
      manaPerKill: 50,         // Бонус за вбивство
      manaPerCritical: 25,     // Бонус за критичний удар
      showNotifications: true  // Показувати повідомлення про отримання мани
    }
  };
  
  /**
   * Додати ману за нанесений урон
   * @param {number} playerIndex - індекс гравця (0-3)
   * @param {number} damage - кількість нанесеного урону
   * @param {boolean} isCritical - чи був критичний удар
   * @returns {number} кількість отриманої мани
   */
  window.addHeroesMana = function(playerIndex, damage, isCritical = false) {
    const playerKey = `player${playerIndex + 1}`;
    
    // Базова мана за урон
    let manaGained = Math.floor(damage * window.heroesMana.settings.manaPerDamage);
    
    // Бонус за критичний удар
    if (isCritical) {
      manaGained += window.heroesMana.settings.manaPerCritical;
    }
    
    // Додаємо ману
    window.heroesMana.players[playerKey].current += manaGained;
    window.heroesMana.players[playerKey].total += manaGained;
    
    // Оновлюємо UI
    updateHeroesManaDisplay(playerIndex);
    
    // Показуємо нотифікацію
    if (window.heroesMana.settings.showNotifications) {
      const critText = isCritical ? ' (⚡ КРИТ!)' : '';
      // console.log(`🔮 +${manaGained} мани героїв (урон: ${damage})${critText}`);
    }
    
    return manaGained;
  };
  
  /**
   * Додати бонусну ману за вбивство
   * @param {number} playerIndex - індекс гравця (0-3)
   */
  window.addManaForKill = function(playerIndex) {
    const playerKey = `player${playerIndex + 1}`;
    const bonus = window.heroesMana.settings.manaPerKill;
    
    window.heroesMana.players[playerKey].current += bonus;
    window.heroesMana.players[playerKey].total += bonus;
    
    updateHeroesManaDisplay(playerIndex);
    
    if (window.heroesMana.settings.showNotifications) {
      // console.log(`💀 +${bonus} мани за вбивство!`);
    }
    
    return bonus;
  };
  
  /**
   * Перевірити чи достатньо мани
   * @param {number} playerIndex - індекс гравця (0-3)
   * @param {number} cost - вартість
   * @returns {boolean}
   */
  window.hasEnoughMana = function(playerIndex, cost) {
    const playerKey = `player${playerIndex + 1}`;
    return window.heroesMana.players[playerKey].current >= cost;
  };
  
  /**
   * Витратити ману на покращення здібності
   * @param {number} playerIndex - індекс гравця (0-3)
   * @param {number} cost - вартість покращення
   * @returns {boolean} чи вдалося витратити
   */
  window.spendHeroesMana = function(playerIndex, cost) {
    const playerKey = `player${playerIndex + 1}`;
    
    if (!window.hasEnoughMana(playerIndex, cost)) {
      return false;
    }
    
    window.heroesMana.players[playerKey].current -= cost;
    window.heroesMana.players[playerKey].spent += cost;
    
    updateHeroesManaDisplay(playerIndex);
    
    return true;
  };
  
  /**
   * Отримати поточну кількість мани
   * @param {number} playerIndex - індекс гравця (0-3)
   * @returns {number}
   */
  window.getHeroesMana = function(playerIndex) {
    const playerKey = `player${playerIndex + 1}`;
    return window.heroesMana.players[playerKey].current;
  };
  
/**
* Оновити відображення мани в UI
* @param {number} playerIndex - індекс гравця (0-3)
*/
window.updateHeroesManaDisplay = function(playerIndex) {
  const playerKey = `player${playerIndex + 1}`;
  const manaValue = window.heroesMana.players[playerKey].current;
  
  // Оновлюємо основний дисплей мани
  // 🔮 Оновлюємо menuMana (з globals3.js)
  if (typeof menuMana !== 'undefined' && menuMana) {
    menuMana.textContent = manaValue;
    
    // Додаємо анімацію (якщо є CSS для цього)
    menuMana.classList.add('mana-updated');
    setTimeout(() => menuMana.classList.remove('mana-updated'), 500);
  }
  
  // 🔮 Оновлюємо ManaHeroesTablo - постійне відображення
  if (typeof ManaHeroesTablo !== 'undefined' && ManaHeroesTablo) {
    ManaHeroesTablo.textContent = `🔮 ${manaValue}`;
    
    // Додаємо анімацію
    ManaHeroesTablo.classList.add('mana-updated');
    setTimeout(() => ManaHeroesTablo.classList.remove('mana-updated'), 500);
  }
  
  // console.log(`🔮 Мана гравця ${playerIndex + 1}: ${manaValue}`);
};
  
/**
 * Оновити ману для поточного активного гравця
 */
window.updateCurrentPlayerMana = function() {
  if (typeof currentPlayerIndex !== 'undefined') {
    window.updateHeroesManaDisplay(currentPlayerIndex);
  }
};
  // console.log("✨ Система мани героїв ініціалізована!");