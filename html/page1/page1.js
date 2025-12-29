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
  // Перевіряємо чи є хоча б одне збереження
  if (typeof window.hasAnySave === 'function' && window.hasAnySave()) {
    // Викликаємо модальне вікно вибору слота
    if (typeof window.showLoadModalForPage1 === 'function') {
      window.showLoadModalForPage1();
    } else {
      console.error('❌ Функція showLoadModalForPage1 не знайдена');
      alert('❌ Система завантаження не доступна!');
    }
  } else {
    // Немає збережених ігор
    alert('❌ Немає збережених ігор!\n\nСпочатку створіть нову гру.');
    console.log('ℹ️ Немає збережених ігор');
  }
}