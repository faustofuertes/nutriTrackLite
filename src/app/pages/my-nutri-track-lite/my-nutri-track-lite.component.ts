import { Component, OnInit } from '@angular/core';
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
  standalone: true,
  imports: [MealListComponent, FormsModule, DatePickerComponent, MealStatisticsComponent],
  templateUrl: './my-nutri-track-lite.component.html',
  styleUrl: './my-nutri-track-lite.component.css'
})
export class MyNutriTrackLiteComponent implements OnInit {

  addMode = false; //muestra o no el modo add-food
  foodNameToAdd: string = ''; //nombre de la comida que quiero agregar
  foodToAdd?: Food; //comida que se va a agregar
  foodQuantity: number = 0; //cantidad de comida seleccionada para agregar
  mealTypeRecived: 'breakfast' | 'lunch' | 'snack' | 'dinner' = 'dinner'; //mealType q se recibe de meal-list
  mealIdRecived?: string; //mealId que se recibe del meal-list
  dateRecivedFromDP?: string; //date que recibimos del datePicker (DP)

  meals1: Meals[] = [
    {
      id: "meal-1",
      date: "2024-11-16",
      breakfast: [
        {
          id: "food-1",
          name: "Eggs",
          proteins_per_g: 6,
          fats_per_g: 5,
          carbohydrates_per_g: 1,
          calories_per_g: 70,
          quantity_g: 100
        }
      ],
      lunch: [
        {
          id: "food-2",
          name: "Chicken Breast",
          proteins_per_g: 31,
          fats_per_g: 3.6,
          carbohydrates_per_g: 0,
          calories_per_g: 165,
          quantity_g: 150
        }
      ],
      snack: [
        {
          id: "food-3",
          name: "Almonds",
          proteins_per_g: 21,
          fats_per_g: 49,
          carbohydrates_per_g: 22,
          calories_per_g: 575,
          quantity_g: 30
        }
      ],
      dinner: [
        {
          id: "food-4",
          name: "Salmon",
          proteins_per_g: 25,
          fats_per_g: 14,
          carbohydrates_per_g: 0,
          calories_per_g: 208,
          quantity_g: 200
        }
      ]
    }
  ];
  meals: Meals[] = [];

  constructor(private _foodApiService: ApiServiceService, private _localStorageService: LocalStorageService) { }

  //cuando se ejecuta la app se fija que exista en el local storage los meals, sino los crea (serviria para la primera vez que abris la app)
  ngOnInit(): void {
    const storedMeals = localStorage.getItem('meals');

    if (storedMeals) {
      this.meals = JSON.parse(storedMeals);
    } else {
      localStorage.setItem('meals', JSON.stringify(this.meals1));
    }
  }

  //recibe de meal-list la mealType
  mealTypeReciver(mealType: 'breakfast' | 'lunch' | 'snack' | 'dinner') {
    this.mealTypeRecived = mealType;
  }

  //recibe de meal-list la mealId
  mealIdReciver(mealId: string) {
    this.mealIdRecived = mealId;
  }

  //recibe el date del deate picker
  dateReciver(date: string) {
    this.dateRecivedFromDP = date;
  }

  //activa o desactiva el add-food-mode
  changeAddMode() {
    this.addMode = !this.addMode;
  }

  //tendria que llamar al servicio del localStorage y agregar la comida
  addFoodToMeal() {
    this._foodApiService.getNutritionInfo(this.foodNameToAdd).subscribe(data => {
      this.foodToAdd = data;
      this.foodToAdd.quantity_g = this.foodQuantity;
      console.log(this.foodToAdd);

      this._localStorageService.addFoodToMeal(this.mealIdRecived, this.foodToAdd, this.mealTypeRecived).subscribe();
    })
  }

}
