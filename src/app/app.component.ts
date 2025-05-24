import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Hr-system';

  isDarkTheme = false;

  constructor(private renderer: Renderer2) {}

   toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;

    const container = document.getElementById('app-container');

    if (this.isDarkTheme) {
      this.renderer.addClass(container, 'dark-theme');
    } else {
      this.renderer.removeClass(container, 'dark-theme');
    }
  }
}
