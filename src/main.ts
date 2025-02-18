import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1 class="title">Hola.. 😊</h1>
      
      <p class="message">
       Por este medio, me tomo el atrevimiento de hacerle una invitación a Correr/Caminar al parque metropolitano el día 19 de febrero <br>
        ¿Te gustaría ir? 
      </p>

      <div class="buttons">
      <button class="yes-btn" (click)="onYes()" (touchstart)="onYes()">Acepto</button>

    
      </div>
<p style="color: black;   font-weight: bold; font-size:14px ;" >Atte: <span>Daniel Bombela ©</span></p>
      <div class="celebration">
        <div class="heart-rain"></div>
        <div class="confetti-container"></div>
      </div>
    </div>

    <div *ngFor="let heart of hearts" 
         class="heart"
         [style.left]="heart.x + 'px'"
         [style.top]="heart.y + 'px'">
    </div>
  `,
})
export class App implements OnInit {
  hearts: { x: number; y: number }[] = [];

  ngOnInit() {
    this.createHearts();
    this.animateEntrance();
  }

  createHearts() {
    for (let i = 0; i < 20; i++) {
      this.hearts.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      });
    }
  }

  animateEntrance() {
    gsap.to('.title', {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.5,
    });

    gsap.to('.message', {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 1,
    });

    gsap.to('.buttons', {
      opacity: 1,
      scale: 1,
      duration: 1,
      delay: 1.5,
    });
  }

  createConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#db7093', '#ffb6c1', '#ffd1dc', '#fff'];
    const shapes = ['square', 'circle', 'heart'];
    const confettiContainer = document.querySelector('.confetti-container') as HTMLElement;
    
    if (!confettiContainer) return;
    
    // Create confetti explosion
    for (let i = 0; i < 150; i++) {
      const confetti = document.createElement('div');
      confetti.className = `confetti ${shapes[Math.floor(Math.random() * shapes.length)]}`;
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = '50%';
      confetti.style.top = '50%';
      confettiContainer.appendChild(confetti);

      const angle = Math.random() * Math.PI * 2;
      const velocity = 300 + Math.random() * 200;
      const x = Math.cos(angle) * velocity;
      const y = Math.sin(angle) * velocity;

      gsap.fromTo(confetti, 
        { opacity: 0, scale: 0 },
        {
          x: x,
          y: y,
          rotation: Math.random() * 1000 - 500,
          opacity: 1,
          scale: 1,
          duration: 2 + Math.random(),
          ease: 'power2.out',
          onComplete: () => {
            gsap.to(confetti, {
              opacity: 0,
              duration: 0.5,
              onComplete: () => confetti.remove()
            });
          }
        }
      );
    }
  }

  moveNoButton(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    const container = document.querySelector('.container') as HTMLElement;
    
    const newX = Math.random() * (container.offsetWidth - button.offsetWidth);
    const newY = Math.random() * (container.offsetHeight - button.offsetHeight);
    
    gsap.to(button, {
      x: newX,
      y: newY,
      duration: 0.3,
      ease: 'power2.out',
    });
  }

  onYes() {
    this.createConfetti();
    
    gsap.to('.celebration', {
      opacity: 1,
      duration: 0.5,
    });

    const messageElement = document.querySelector('.message') as HTMLElement;
    if (messageElement) {
      gsap.to(messageElement, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          messageElement.textContent = 'Bueno, no había boton de "no" jaja pero aún asi no es compromiso. Solo una condición... iremos por un caramel machiatto despues. 😉';
          gsap.to(messageElement, {
            opacity: 1,
            duration: 0.5
          });
        }
      });
    }
  }
}

bootstrapApplication(App, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule)
  ]
}).catch(err => console.error(err));