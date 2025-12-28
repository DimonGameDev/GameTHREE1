let btNcompani = document.querySelector(".compani")
let btNlocalGame = document.querySelector(".localGame")
let btNonlineGame = document.querySelector(".onlineGame")
let btNload = document.querySelector(".load")
let btNinform = document.querySelector(".inform")
let text = document.querySelector(".text")

btNcompani.onclick = () => textBlock()
btNonlineGame.onclick = () => textBlock()
btNinform.onclick = () => textBlock()

function textBlock() {
  text.style.display = "block"
}

// ======================================
// НОВА ГРА - перехід на page2
// ======================================
btNlocalGame.onclick = () => {
  window.location.href = '../page2/page2_2.html'
}

// ======================================
// ЗАВАНТАЖЕННЯ ЗБЕРЕЖЕНОЇ ГРИ
// ======================================
btNload.onclick = () => {
  // Перевіряємо чи є збережена гра
  if (typeof window.hasSavedGame === 'function' && window.hasSavedGame()) {
    // Якщо є - питаємо підтвердження
    const userChoice = confirm(
      '🎮 Знайдено збережену гру!\n\n' +
      'Продовжити гру?\n\n' +
      '✅ OK - Завантажити гру\n' +
      '❌ Скасувати - повернутися в меню'
    );
    
    if (userChoice) {
      // Користувач підтвердив - переходимо на page3
      console.log('📂 Завантаження збереженої гри...');
      window.location.href = '../page3/page3.html';
    } else {
      console.log('⏸️ Користувач скасував завантаження');
    }
  } else {
    // Немає збереженої гри
    alert('❌ Немає збереженої гри!\n\nСпочатку створіть нову гру.');
    console.log('ℹ️ Немає збереженої гри');
  }
}