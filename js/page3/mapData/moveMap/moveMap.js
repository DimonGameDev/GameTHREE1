// ========================================
// МОДУЛЬ ПЕРЕСУВАННЯ ПО КАРТІ
// ========================================

class MapMovement {
    constructor(mapElement, viewportElement) {
      this.map = mapElement;
      this.viewport = viewportElement;
      
      this.viewportRect = this.viewport.getBoundingClientRect();

      // Поточна позиція карти
      this.mapX = 0;
      this.mapY = 0;
      
      // Параметри для touch/mouse
      this.isDragging = false;
      this.startX = 0;
      this.startY = 0;
      this.lastX = 0;
      this.lastY = 0;
      
      // Швидкість пересування клавіатурою (пікселів за раз)
      this.keyboardSpeed = 30;
      
      // Межі карти
      this.mapWidth = 1740;  // 29 клітинок * 60px
      this.mapHeight = 1740;
      
      // Початкова позиція (центр карти)
      this.centerMap();
      
      // Ініціалізація обробників
      this.initTouchEvents();
      this.initKeyboardEvents();
      window.addEventListener('resize', () => {
        this.updateViewportRect();
        this.updateMapPosition();
      });
      
    }
    
    // ========================================
    // ЦЕНТРУВАННЯ КАРТИ
    // ========================================
    centerMap() {
      this.updateViewportRect();
const viewportRect = this.viewportRect;

      // Центруємо карту
      this.mapX = -(this.mapWidth / 2) + (viewportRect.width / 2);
      this.mapY = -(this.mapHeight / 2) + (viewportRect.height / 2);
      
      this.updateMapPosition();
      
    }
    
    // ========================================
    // ОНОВЛЕННЯ ПОЗИЦІЇ КАРТИ
    // ========================================
    updateMapPosition() {
      const viewportRect = this.viewportRect;
      const minX = -(this.mapWidth - viewportRect.width);
      const maxX = 0;
      const minY = -(this.mapHeight - viewportRect.height);
      const maxY = 0;
      
      // Обмежуємо значення
      this.mapX = Math.max(minX, Math.min(maxX, this.mapX));
      this.mapY = Math.max(minY, Math.min(maxY, this.mapY));
      
      // Застосовуємо трансформацію
      this.map.style.transform = `translate(${this.mapX}px, ${this.mapY}px)`;
      
      
    }
    
    // ========================================
    // TOUCH / MOUSE EVENTS
    // ========================================
    initTouchEvents() {
      // Touch events
      this.viewport.addEventListener('touchstart', (e) => this.handleStart(e));
      this.viewport.addEventListener('touchmove', (e) => this.handleMove(e));
      this.viewport.addEventListener('touchend', () => this.handleEnd());
      
      // Mouse events (для тестування на ПК)
      this.viewport.addEventListener('mousedown', (e) => this.handleStart(e));
      this.viewport.addEventListener('mousemove', (e) => this.handleMove(e));
      this.viewport.addEventListener('mouseup', () => this.handleEnd());
      this.viewport.addEventListener('mouseleave', () => this.handleEnd());
    }
    
    handleStart(e) {
      this.isDragging = true;
      
      // Отримуємо координати
      const point = e.touches ? e.touches[0] : e;
      this.startX = point.clientX - this.mapX;
      this.startY = point.clientY - this.mapY;
      this.lastX = point.clientX;
      this.lastY = point.clientY;
      
      // Змінюємо курсор
      this.viewport.style.cursor = 'grabbing';

      
    }
    updateViewportRect() {
      this.viewportRect = this.viewport.getBoundingClientRect();
    }
    
    handleMove(e) {
      if (!this.isDragging) return;
      
      e.preventDefault(); // Запобігаємо прокрутці сторінки
      
      const point = e.touches ? e.touches[0] : e;
      
      // Обчислюємо нову позицію
      this.mapX = point.clientX - this.startX;
      this.mapY = point.clientY - this.startY;
      
      this.updateMapPosition();
    }
    
    handleEnd() {
      this.isDragging = false;
      this.viewport.style.cursor = 'grab';
    }
    
    // ========================================
    // KEYBOARD EVENTS
    // ========================================
    initKeyboardEvents() {
      document.addEventListener('keydown', (e) => {
        // Ігноруємо, якщо фокус на input/textarea
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
          return;
        }
        
        let moved = false;
        
        switch(e.key) {
          case 'ArrowUp':
          case 'w':
          case 'W':
            this.mapY += this.keyboardSpeed;
            moved = true;
            break;
            
          case 'ArrowDown':
          case 's':
          case 'S':
            this.mapY -= this.keyboardSpeed;
            moved = true;
            break;
            
          case 'ArrowLeft':
          case 'a':
          case 'A':
            this.mapX += this.keyboardSpeed;
            moved = true;
            break;
            
          case 'ArrowRight':
          case 'd':
          case 'D':
            this.mapX -= this.keyboardSpeed;
            moved = true;
            break;
            
          case ' ': // Пробіл - повернутися до центру
            this.centerMap();
            moved = true;
            break;
        }
        
        if (moved) {
          e.preventDefault(); // Запобігаємо прокрутці сторінки
          this.updateMapPosition();
        }
      });
    }
    
    // ========================================
    // ПУБЛІЧНІ МЕТОДИ
    // ========================================
    
    // Перемістити карту на конкретні координати
    moveTo(x, y) {
      this.mapX = x;
      this.mapY = y;
      this.updateMapPosition();
    }
    
    // Перемістити карту на delta
    moveBy(deltaX, deltaY) {
      this.mapX += deltaX;
      this.mapY += deltaY;
      this.updateMapPosition();
    }
    
    // Отримати поточну позицію
    getPosition() {
      return { x: this.mapX, y: this.mapY };
    }
    centerOnCell(cellX, cellY, cellSize = 60) {
      // const viewportRect = this.viewport.getBoundingClientRect();
      const viewportRect = this.viewportRect;

      // Конвертуємо координати клітинки в піксельні координати
      const unitPixelX = cellX * cellSize;
      const unitPixelY = cellY * cellSize;
      
      // Обчислюємо позицію карти так, щоб юніт був в центрі viewport
      this.mapX = -(unitPixelX - viewportRect.width / 2 + cellSize / 2);
      this.mapY = -(unitPixelY - viewportRect.height / 2 + cellSize / 2);
      
      this.updateMapPosition();
      
      console.log(`📹 Камера центрована на клітинці (${cellX}, ${cellY})`);
    }

  }

  
  
  // Експортуємо для використання
  //console.log('✅ MapMovement module loaded');

  document.addEventListener('DOMContentLoaded', () => {
    const mapMovement = new MapMovement(map, viewport);
    //console.log('🎮 Map movement initialized');
    
    // Зберігаємо в глобальній змінній для доступу з інших модулів
    window.mapMovement = mapMovement;
  });
  