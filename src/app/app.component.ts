import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Hr-system';

  isDarkTheme = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkTheme = true
      this.renderer.addClass(document.getElementById('app-container'), 'dark-theme')
    }
  }

   toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;

    const container = document.getElementById('app-container');

    if (this.isDarkTheme) {
      this.renderer.addClass(container, 'dark-theme');
      localStorage.setItem('theme','dark')
    } else {
      this.renderer.removeClass(container, 'dark-theme');
      localStorage.setItem('theme', 'light')
    }
  }
}
