import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MealListComponent } from "../../components/meals/meal-list/meal-list.component";
import { Food } from '../../interfaces/food';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from "../../components/meals/date-picker/date-picker.component";
import { MealStatisticsComponent } from "../../components/meals/meal-statistics/meal-statistics.component";
import { ApiServiceService } from '../../services/api-service.service';
import { Meals } from '../../interfaces/meals';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-my-nutri-track-lite',
  imports: [MealListComponent, FormsModule, DatePickerComponent, MealStatisticsComponent],
  templateUrl: './my-nutri-track-lite.component.html',
  styleUrl: './my-nutri-track-lite.component.css'
})
export class MyNutriTrackLiteComponent implements OnInit, OnChanges {

  addMode = false; //muestra o no el modo add-food
  foodNameToAdd: string = ''; //nombre de la comida que quiero agregar
  foodToAdd?: Food; //comida que se va a agregar
  foodQuantity: number = 0; //cantidad de comida seleccionada para agregar
  mealTypeRecived: 'breakfast' | 'lunch' | 'snack' | 'dinner' = 'dinner'; //mealType q se recibe de meal-list
  mealIdRecived?: string; //mealId que se recibe del meal-list
  dateRecivedFromDP?: string; //date que recibimos del datePicker (DP)

  meals: Meals[] = [];

  constructor(private _foodApiService: ApiServiceService, private _localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    const macros = localStorage.getItem('macros');
    if (macros) {
      console.log('macros existen');
    }
    else{
      console.log('macros no existen');
    }
    
    const date = this.getCurrentDate();
    this._localStorageService.checkMeal(date).subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.dateRecivedFromDP);
    // this._localStorageService.checkMeal(this.dateRecivedFromDP).subscribe();
  }

  //recibe de meal-list la mealType
  mealTypeReciver(mealType: 'breakfast' | 'lunch' | 'snack' | 'dinner') {
    this.mealTypeRecived = mealType;
  }

  //recibe de meal-list la mealId
  mealIdReciver(mealId: string) {
    this.mealIdRecived = mealId;
  }

  //recibe el date del date picker
  dateReciver(date: string) {
    this.dateRecivedFromDP = date;
  }

  //activa o desactiva el add-food-mode
  changeAddMode() {
    this.addMode = !this.addMode;
  }

  //llama al servicio del localStorage y agregar la comida
  addFoodToMeal() {
    this._foodApiService.getNutritionInfo(this.foodNameToAdd).subscribe(data => {
      this.foodToAdd = data;
      this.foodToAdd.quantity_g = this.foodQuantity;

      this._localStorageService.addFoodToMeal(this.mealIdRecived, this.foodToAdd, this.mealTypeRecived).subscribe();
    })
  }

  private getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  focusInput() {
    const inputElement = document.querySelector('input');
    if (inputElement) {
      inputElement.focus();
    }
  }
}
