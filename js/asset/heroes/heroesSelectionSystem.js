// ========================================
// СИСТЕМА ПОСЛІДОВНОГО ВИБОРУ ГЕРОЇВ
// ========================================

window.heroesSelectionSystem = {
    // Поточний гравець який вибирає
    currentPlayer: 1,
    
    // Список АКТИВНИХ гравців (тільки ті хто грають)
    activePlayers: [1, 2, 3, 4], // За замовчуванням всі, але буде перезаписано
    
    // Скільки героїв потрібно вибрати
    heroesPerPlayer: 3,
    
    // Збережені вибори всіх гравців
    selectedHeroes: {
      player1: [],
      player2: [],
      player3: [],
      player4: []
    },
    
    // Звідки прийшли (для повернення назад)
    returnUrl: '../page2/page2.html'
  };
  
  /**
   * Ініціалізація системи вибору героїв
   */
  window.initHeroesSelection = function() {
    // ✅ ДОДАНО: Отримуємо список активних гравців
    const savedActivePlayers = localStorage.getItem('activePlayers');
    if (savedActivePlayers) {
      window.heroesSelectionSystem.activePlayers = JSON.parse(savedActivePlayers);
      //console.log('✅ Завантажено активних гравців:', window.heroesSelectionSystem.activePlayers);
    }
    
    // Отримуємо поточного гравця з localStorage (якщо є)
    const savedPlayer = localStorage.getItem('currentPlayerSelecting');
    if (savedPlayer) {
      window.heroesSelectionSystem.currentPlayer = parseInt(savedPlayer);
    }
    
    // ✅ Перевірка чи поточний гравець в списку активних
    if (!window.heroesSelectionSystem.activePlayers.includes(window.heroesSelectionSystem.currentPlayer)) {
      console.warn(`⚠️ Гравець ${window.heroesSelectionSystem.currentPlayer} не активний!`);
      // Переходимо до першого активного
      window.heroesSelectionSystem.currentPlayer = window.heroesSelectionSystem.activePlayers[0];
    }
    
    // Отримуємо вже вибраних героїв (якщо є)
    const savedSelections = localStorage.getItem('heroesSelections');
    if (savedSelections) {
      window.heroesSelectionSystem.selectedHeroes = JSON.parse(savedSelections);
    }
    
    // Оновлюємо UI
    updatePlayerIndicator();
    restoreCurrentPlayerSlots();
    highlightCurrentPlayerHeroes();
    updateReadyButton();
    
    // console.log(`🎮 Зараз вибирає: Гравець ${window.heroesSelectionSystem.currentPlayer}`);
    // console.log(`✅ Активні гравці: [${window.heroesSelectionSystem.activePlayers.join(', ')}]`);
  };
  

  /*
   * Оновити індикатор поточного гравця
   */
  function updatePlayerIndicator() {
    const playerIndicator = document.querySelector('.boxNamePlayer');
    if (playerIndicator) {
      playerIndicator.textContent = `Гравець ${window.heroesSelectionSystem.currentPlayer}`;
    }
  }
  
  /**
   * Відновити слоти поточного гравця
   */
  function restoreCurrentPlayerSlots() {
    const currentPlayerKey = `player${window.heroesSelectionSystem.currentPlayer}`;
    const selectedHeroes = window.heroesSelectionSystem.selectedHeroes[currentPlayerKey];
    
    // Очищаємо всі слоти спочатку
    for (let i = 1; i <= 3; i++) {
      const slot = document.querySelector(`#hero-${i}`);
      if (slot) slot.src = '';
    }
    
    // Відновлюємо вибраних героїв
    selectedHeroes.forEach((heroIndex, slotIndex) => {
      const slot = document.querySelector(`#hero-${slotIndex + 1}`);
      if (slot && window.heroes && window.heroes[heroIndex]) {
        slot.src = window.heroes[heroIndex].img;
      }
    });
    
    // console.log(`🔄 Відновлено ${selectedHeroes.length} героїв поточного гравця`);
  }
  
  /**
   * Підсвітити героїв які вибрав ПОТОЧНИЙ гравець
   */
  function highlightCurrentPlayerHeroes() {
    // Спочатку прибираємо всі підсвітки
    for (let i = 4; i <= 18; i++) {
      const heroElement = document.querySelector(`#hero-${i}`);
      if (heroElement) {
        heroElement.style.border = '';
        heroElement.style.boxShadow = '';
        heroElement.title = '';
      }
    }
    
    // Підсвічуємо героїв поточного гравця
    const currentPlayerKey = `player${window.heroesSelectionSystem.currentPlayer}`;
    const currentPlayerHeroes = window.heroesSelectionSystem.selectedHeroes[currentPlayerKey];
    
    currentPlayerHeroes.forEach(heroIndex => {
      const heroId = heroIndex + 4; // hero-4 = heroes[0]
      const heroElement = document.querySelector(`#hero-${heroId}`);
      
      if (heroElement) {
        heroElement.style.border = '4px solid #43e97b';
        heroElement.style.boxShadow = '0 0 20px rgba(67, 233, 123, 0.8)';
        heroElement.title = '✅ Ви вибрали цього героя';
      }
    });
  }
  
  /**
   * Перевірити чи вибрано достатньо героїв
   */
  window.checkHeroesCount = function() {
    const currentPlayerKey = `player${window.heroesSelectionSystem.currentPlayer}`;
    const selectedCount = window.heroesSelectionSystem.selectedHeroes[currentPlayerKey].length;
    
    updateReadyButton();
    
    return selectedCount === window.heroesSelectionSystem.heroesPerPlayer;
  };
  
  /**
   * Оновити видимість кнопки ГОТОВО
   */
  function updateReadyButton() {
    const readyBtn = document.querySelector('.ChoiceHeroesBtnYes');
    const currentPlayerKey = `player${window.heroesSelectionSystem.currentPlayer}`;
    const selectedCount = window.heroesSelectionSystem.selectedHeroes[currentPlayerKey].length;
    
    if (readyBtn) {
      if (selectedCount === window.heroesSelectionSystem.heroesPerPlayer) {
        readyBtn.style.display = 'block';
        readyBtn.style.opacity = '1';
        readyBtn.style.pointerEvents = 'auto';
      } else {
        readyBtn.style.display = 'none';
        readyBtn.style.opacity = '0.3';
        readyBtn.style.pointerEvents = 'none';
      }
    }
  }
  
  /**
   * Додати героя до вибору поточного гравця
   */
  window.addHeroToSelection = function(heroIndex) {
    const currentPlayerKey = `player${window.heroesSelectionSystem.currentPlayer}`;
    const selectedHeroes = window.heroesSelectionSystem.selectedHeroes[currentPlayerKey];
    
    // Перевіряємо чи не вибрано вже максимум
    if (selectedHeroes.length >= window.heroesSelectionSystem.heroesPerPlayer) {
      alert(`⚠️ Ви вже вибрали максимальну кількість героїв (${window.heroesSelectionSystem.heroesPerPlayer})!`);
      return false;
    }
    
    // Перевіряємо чи не вибраний вже цей герой ПОТОЧНИМ гравцем
    if (selectedHeroes.includes(heroIndex)) {
      alert('⚠️ Ви вже вибрали цього героя!');
      return false;
    }
    
    // Додаємо героя
    selectedHeroes.push(heroIndex);
    
    const heroName = window.heroes && window.heroes[heroIndex] ? window.heroes[heroIndex].name : heroIndex;
    // console.log(`✅ Гравець ${window.heroesSelectionSystem.currentPlayer} вибрав героя: ${heroName}`);
    
    // Зберігаємо в localStorage
    saveSelections();
    
    // Оновлюємо UI
    checkHeroesCount();
    highlightCurrentPlayerHeroes();
    
    return true;
  };
  
  /**
   * Видалити героя з вибору (якщо гравець передумав)
   */
  window.removeHeroFromSelection = function(heroIndex) {
    const currentPlayerKey = `player${window.heroesSelectionSystem.currentPlayer}`;
    const selectedHeroes = window.heroesSelectionSystem.selectedHeroes[currentPlayerKey];
    
    const index = selectedHeroes.indexOf(heroIndex);
    if (index > -1) {
      selectedHeroes.splice(index, 1);
      
      const heroName = window.heroes && window.heroes[heroIndex] ? window.heroes[heroIndex].name : heroIndex;
      // console.log(`🔄 Гравець ${window.heroesSelectionSystem.currentPlayer} скасував вибір героя: ${heroName}`);
      
      // Зберігаємо
      saveSelections();
      
      // Оновлюємо UI
      checkHeroesCount();
      highlightCurrentPlayerHeroes();
      
      return true;
    }
    
    return false;
  };
  
  /**
   * Підтвердити вибір і перейти до наступного гравця
   */
  /**
 * Підтвердити вибір і перейти до наступного гравця
 */
window.confirmSelection = function() {
  const currentPlayerKey = `player${window.heroesSelectionSystem.currentPlayer}`;
  const selectedCount = window.heroesSelectionSystem.selectedHeroes[currentPlayerKey].length;
  
  // Перевірка чи вибрано достатньо героїв
  if (selectedCount !== window.heroesSelectionSystem.heroesPerPlayer) {
    alert(`❌ Потрібно вибрати ${window.heroesSelectionSystem.heroesPerPlayer} героїв!\nВибрано: ${selectedCount}`);
    return false;
  }
  
  // console.log(`✅ Гравець ${window.heroesSelectionSystem.currentPlayer} підтвердив вибір:`, 
              // window.heroesSelectionSystem.selectedHeroes[currentPlayerKey]);
  
  // ✅ Знаходимо індекс поточного гравця в списку активних
  const currentIndex = window.heroesSelectionSystem.activePlayers.indexOf(
    window.heroesSelectionSystem.currentPlayer
  );
  
  // console.log(`📍 Індекс поточного гравця в activePlayers: ${currentIndex}`);
  
  // Перевіряємо чи це останній АКТИВНИЙ гравець
  if (currentIndex === window.heroesSelectionSystem.activePlayers.length - 1) {
    // console.log('🏁 Це останній активний гравець!');
    finishSelection();
  } else {
    // console.log('➡️ Є ще активні гравці, переходимо далі');
    nextPlayer(currentIndex);
  }
  
  return true;
};

/**
 * Перейти до наступного АКТИВНОГО гравця
 */
function nextPlayer(currentIndex) {
  // Беремо наступного з списку активних
  const nextPlayerNumber = window.heroesSelectionSystem.activePlayers[currentIndex + 1];
  window.heroesSelectionSystem.currentPlayer = nextPlayerNumber;
  
  // Зберігаємо поточного гравця
  localStorage.setItem('currentPlayerSelecting', nextPlayerNumber.toString());
  
  // console.log(`➡️ Перехід до Гравця ${nextPlayerNumber}`);
  
  // Перезавантажуємо сторінку для наступного гравця
  location.reload();
}

  
  /**
   * Завершити вибір всіх гравців
   */
  function finishSelection() {
    // console.log('🎉 Всі гравці вибрали героїв!');
    // console.log('Фінальний вибір:', window.heroesSelectionSystem.selectedHeroes);
    
    // Зберігаємо фінальний вибір
    localStorage.setItem('finalHeroesSelection', JSON.stringify(window.heroesSelectionSystem.selectedHeroes));
    
    // Очищаємо тимчасові дані
    localStorage.removeItem('currentPlayerSelecting');
    localStorage.removeItem('heroesSelections');
    
    // Показуємо повідомлення
    alert('✅ Всі гравці вибрали героїв!\n\nПовертаємось до налаштувань...');
    
    // Повертаємось назад
    window.location.href = window.heroesSelectionSystem.returnUrl;
  }
  
  /**
   * Зберегти вибори в localStorage
   */
  function saveSelections() {
    localStorage.setItem('heroesSelections', JSON.stringify(window.heroesSelectionSystem.selectedHeroes));
  }
  
  /**
   * Скинути всю систему вибору (для тестування)
   */
  window.resetHeroesSelection = function() {
    localStorage.removeItem('heroesSelections');
    localStorage.removeItem('currentPlayerSelecting');
    localStorage.removeItem('finalHeroesSelection');
    
    window.heroesSelectionSystem.currentPlayer = 1;
    window.heroesSelectionSystem.selectedHeroes = {
      player1: [],
      player2: [],
      player3: [],
      player4: []
    };
    
    // console.log('🔄 Система вибору героїв скинута');
    location.reload();
  };
  
  // console.log('✨ Система вибору героїв завантажена');