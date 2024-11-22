import { Component, EventEmitter, Input, OnChanges, OnInit, output, Output, SimpleChanges } from '@angular/core';
import { Food } from '../../../interfaces/food';
import { MealCardComponent } from '../meal-card/meal-card.component';
import { Meals } from '../../../interfaces/meals';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
    selector: 'app-meal-list',
    imports: [MealCardComponent],
    templateUrl: './meal-list.component.html',
    styleUrl: './meal-list.component.css'
})
export class MealListComponent implements OnInit, OnChanges {
  @Input() dateRecived?: string | null; //fecha que recibimos del componente de seleccionar fechas
  @Output() addModeEmitter = new EventEmitter(); //emite el evento de add-food a my-nutri-track
  @Output() mealTypeEmmiter = new EventEmitter(); //emite el mealType a my-nutri-track
  @Output() mealIdEmmiter = new EventEmitter(); //emite el mealId a my-nutri-track

  meal?: Meals;
  arrayBreakfast?: Food[];
  arrayLunch?: Food[];
  arraySnack?: Food[];
  arrayDinner?: Food[];
  mealTypeRecived?: 'breakfast' | 'lunch' | 'snack' | 'dinner';

  constructor(private _localStorageService:LocalStorageService) { }


  //cuando se ejecuta se hace un GET de el MEAL de la fecha ACTUAL al local storage
  ngOnInit(): void {
    const date = this.getCurrentDate();

    this._localStorageService.getMealByDate(date).subscribe(data =>{
      this.meal = data;

      this.arrayBreakfast = this.meal?.breakfast;
      this.arrayLunch = this.meal?.lunch;
      this.arraySnack = this.meal?.snack;
      this.arrayDinner = this.meal?.dinner;
    })
  }

  //cuando cambia la fecha se vuelve a traer toda la info pero de la fecha seleccionada del local storage
  ngOnChanges(changes: SimpleChanges): void {
    this.arrayBreakfast = [];
    this.arrayLunch = [];
    this.arraySnack = [];
    this.arrayDinner = [];

    this._localStorageService.getMealByDate(this.dateRecived).subscribe(data =>{
      this.meal = data;
      
      this.arrayBreakfast = this.meal?.breakfast;
      this.arrayLunch = this.meal?.lunch;
      this.arraySnack = this.meal?.snack;
      this.arrayDinner = this.meal?.dinner;
    })
  }

  //Le pasa el mealType y el mealId a my-nutri-track cunado se clickea el boton de + (añadir food)
  emitAddMode(mealType: 'breakfast' | 'lunch' | 'snack' | 'dinner' | undefined) {
    this.mealTypeEmmiter.emit(mealType);
    this.mealIdEmmiter.emit(this.meal?.id);
    this.addModeEmitter.emit()
  }

  reciveMealType(mealType: 'breakfast' | 'lunch' | 'snack' | 'dinner' | undefined) {
    this.mealTypeRecived = mealType;
  }


  deleteFoodFromMeal(food: Food) {

  }

  updateFoodFromMeal(food: Food) {

  }

  //obtiene la fecha actual en formato YYYY-MM-DD
  private getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
