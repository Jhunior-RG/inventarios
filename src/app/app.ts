import { Component, NgModule, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LucideAngularModule, PenIcon } from "lucide-angular";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [LucideAngularModule, RouterOutlet,RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})

export class App {
  readonly PenIcon = PenIcon;
  protected readonly title = signal('inventarios');
}
