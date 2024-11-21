import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Meals } from '../../../interfaces/meals';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from "../progress-bar/progress-bar.component";
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
    selector: 'app-meal-statistics',
    imports: [CommonModule, ProgressBarComponent],
    templateUrl: './meal-statistics.component.html',
    styleUrls: ['./meal-statistics.component.css']
})
export class MealStatisticsComponent implements OnInit, OnChanges {
  @Input() dateRecivedFromNT?: string | null; //meal DATE recibido de my-nutri-track
  meal?: Meals;
  totalCalories: number = 0;
  totalProteins: number = 0;
  totalFats: number = 0;
  totalCarbs: number = 0;

  caloriasNeeded: number = 0;

  constructor(private _localStorageService: LocalStorageService) { }

  //cuando inicia llama al servicio y le pide la meal del dia que le pasa el date picker
  ngOnInit(): void {
    const date = this.getCurrentDate();
    this._localStorageService.getMealByDate(date).subscribe(data => {
      this.meal = data;
      if (this.meal) {
        this.calculateMacros();
      }
    });
  }

  // Cada vez que se cambie la fecha, recalcular los macros
  ngOnChanges(changes: SimpleChanges): void {
    this.totalCalories = 0;
    this.totalProteins = 0;
    this.totalFats = 0;
    this.totalCarbs = 0;
    
    if (this.dateRecivedFromNT) {
      this._localStorageService.getMealByDate(this.dateRecivedFromNT).subscribe(data => {
        this.meal = data;
        this.calculateMacros();
      });
    }
  }

  // Función que calcula todos los macros de la meal
  calculateMacros(): void {
    if (!this.meal) return;

    this.totalCalories = 0;
    this.totalProteins = 0;
    this.totalFats = 0;
    this.totalCarbs = 0;

    this.calculateCalories();
    this.calculateProteins();
    this.calculateFats();
    this.calculateCarbs();
  }

  // Cálculo de calorías
  calculateCalories(): void {
    if (this.meal?.breakfast) {
      for (let food of this.meal.breakfast) {
        this.totalCalories += food.calories_per_g * food.quantity_g;
      }
    }

    if (this.meal?.lunch) {
      for (let food of this.meal.lunch) {
        this.totalCalories += food.calories_per_g * food.quantity_g;
      }
    }

    if (this.meal?.snack) {
      for (let food of this.meal.snack) {
        this.totalCalories += food.calories_per_g * food.quantity_g;
      }
    }

    if (this.meal?.dinner) {
      for (let food of this.meal.dinner) {
        this.totalCalories += food.calories_per_g * food.quantity_g;
      }
    }
  }

  // Cálculo de proteínas
  calculateProteins(): void {
    if (this.meal?.breakfast) {
      for (let food of this.meal.breakfast) {
        this.totalProteins += food.proteins_per_g * food.quantity_g;
      }
    }

    if (this.meal?.lunch) {
      for (let food of this.meal.lunch) {
        this.totalProteins += food.proteins_per_g * food.quantity_g;
      }
    }

    if (this.meal?.snack) {
      for (let food of this.meal.snack) {
        this.totalProteins += food.proteins_per_g * food.quantity_g;
      }
    }

    if (this.meal?.dinner) {
      for (let food of this.meal.dinner) {
        this.totalProteins += food.proteins_per_g * food.quantity_g;
      }
    }
  }

  // Cálculo de grasas
  calculateFats(): void {
    if (this.meal?.breakfast) {
      for (let food of this.meal.breakfast) {
        this.totalFats += food.fats_per_g * food.quantity_g;
      }
    }

    if (this.meal?.lunch) {
      for (let food of this.meal.lunch) {
        this.totalFats += food.fats_per_g * food.quantity_g;
      }
    }

    if (this.meal?.snack) {
      for (let food of this.meal.snack) {
        this.totalFats += food.fats_per_g * food.quantity_g;
      }
    }

    if (this.meal?.dinner) {
      for (let food of this.meal.dinner) {
        this.totalFats += food.fats_per_g * food.quantity_g;
      }
    }
  }

  // Cálculo de carbohidratos
  calculateCarbs(): void {
    if (this.meal?.breakfast) {
      for (let food of this.meal.breakfast) {
        this.totalCarbs += food.carbohydrates_per_g * food.quantity_g;
      }
    }

    if (this.meal?.lunch) {
      for (let food of this.meal.lunch) {
        this.totalCarbs += food.carbohydrates_per_g * food.quantity_g;
      }
    }

    if (this.meal?.snack) {
      for (let food of this.meal.snack) {
        this.totalCarbs += food.carbohydrates_per_g * food.quantity_g;
      }
    }

    if (this.meal?.dinner) {
      for (let food of this.meal.dinner) {
        this.totalCarbs += food.carbohydrates_per_g * food.quantity_g;
      }
    }
  }

  private getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
