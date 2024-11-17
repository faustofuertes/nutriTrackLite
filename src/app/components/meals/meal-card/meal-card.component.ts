import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Food } from '../../../interfaces/food';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FoodContainerComponent } from '../../food/food-container/food-container.component';

@Component({
  selector: 'app-meal-card',
  standalone: true,
  imports: [CommonModule, FormsModule, FoodContainerComponent],
  templateUrl: './meal-card.component.html',
  styleUrl: './meal-card.component.css'
})
export class MealCardComponent implements OnChanges {
  @Input() arrayFood?: Food[]; //array de comidas que renderiza
  @Output() deleteEmmiter = new EventEmitter(); //envia el evento del delete para meal list
  @Output() modifyEmitter = new EventEmitter(); //envia el evento de update para meal list
  @Input() mealType?: 'breakfast' | 'lunch' | 'snack' | 'dinner'; //recibe el mealtype
  @Output() mealTypeEmitter = new EventEmitter(); //envia el mealType a meal list
  @Output() addModeEmmiter = new EventEmitter(); //envia el addMode event a meal list

  totalCalories: number = 0;
  isExpanded = false;
  editMode = false;
  newGramQuantity = 0; //variable de la cantidad de gramos cuando lo modificas
  foodToModified: Food = {id:'', name:'', proteins_per_g:0, fats_per_g:0, carbohydrates_per_g:0, calories_per_g:0, quantity_g:0}; //variable de la food modificada que hay que emitir

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateCalories();
  }

  emitDelete(food: Food) {
    this.deleteEmmiter.emit(food);
  }

  emitMealType() {
    this.mealTypeEmitter.emit(this.mealType);
  }

  emitAddMode() {
    this.addModeEmmiter.emit();
  }

  emitFoodModified() {
    this.foodToModified.quantity_g = this.newGramQuantity;
    this.modifyEmitter.emit(this.foodToModified);
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  calculateCalories() {
    this.totalCalories = 0;
    if (this.arrayFood) {
      for (let food of this.arrayFood) {
        this.totalCalories += food.calories_per_g * food.quantity_g;
      }
    }
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  saveFoodToUpdate(food: Food) {
    this.foodToModified = food;
  }

}
