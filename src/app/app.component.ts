import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pit-project';
   router = new Router();
    logout() {
    // Implement your logout logic here
    console.log('User logged out');
    localStorage.removeItem('token'); // Example: remove auth token
    this.router.navigate(['/login']);

  }
}
