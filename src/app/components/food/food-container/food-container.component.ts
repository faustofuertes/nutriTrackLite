import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { Food } from '../../../interfaces/food';

@Component({
  selector: 'app-food-container',
  standalone: true,
  imports: [CommonModule, FormsModule, CommonModule],
  templateUrl: './food-container.component.html',
  styleUrl: './food-container.component.css'
})
export class FoodContainerComponent {
  @Input() foodRecived: Food = {id:'', name:'', proteins_per_g:0, fats_per_g:0, carbohydrates_per_g:0, calories_per_g:0, quantity_g:0};
}
