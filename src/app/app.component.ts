import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiServiceService } from './services/api-service.service';
import { Food } from './interfaces/food';
import { HttpClient } from '@angular/common/http';
import { MyNutriTrackLiteComponent } from "./pages/my-nutri-track-lite/my-nutri-track-lite.component";
import { NavBarComponent } from "./sharedComponents/nav-bar/nav-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MyNutriTrackLiteComponent, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent   {

}
