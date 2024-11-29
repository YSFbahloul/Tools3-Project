// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // For common directives like NgIf, NgFor, etc.
import { RouterModule } from '@angular/router'; // If using router-outlet and routing

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule], // Include necessary modules here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Component logic here
}
