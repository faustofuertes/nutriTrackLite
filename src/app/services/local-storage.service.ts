import { Injectable } from '@angular/core';
import { Meals } from '../interfaces/meals';
import { Observable, of } from 'rxjs';
import { Food } from '../interfaces/food';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private meals: Meals[] = [];

  constructor() {
    const storedMeals = localStorage.getItem('meals');
    if (storedMeals) {
      this.meals = JSON.parse(storedMeals);
    }
    else {
      localStorage.setItem('meals', JSON.stringify([]));
    }
  }

  checkMeal(date: string | undefined | null): Observable<Meals | undefined> {
    var oldMeal: Meals | undefined;
    this.getMealByDate(date).subscribe(data => {
      oldMeal = data;
    });

    if (oldMeal === undefined) {

      var newId = this.generateId();
      while (!this.isIdUnique(newId)) {
        newId = this.generateId();
      }

      const newMeal: Meals = {
        id: newId,
        date: date,
        breakfast: [],
        lunch: [],
        snack: [],
        dinner: []
      }

      this.postMeal(newMeal).subscribe();
      return of(newMeal);
    } else {
      return of(oldMeal);
    }
  }

  postMeal(meal: Meals): Observable<Meals> {
    this.meals.push(meal);
    localStorage.setItem('meals', JSON.stringify(this.meals));
    return of(meal);
  }

  getMealByDate(date: string | undefined | null): Observable<Meals | undefined> {
    const meal = this.meals.find((meal) => meal.date === date);

    return of(meal);
  }

  addFoodToMeal(id: string | undefined, food: Food, mealType: 'breakfast' | 'lunch' | 'snack' | 'dinner'): Observable<Meals | undefined> {
    // Buscar la meal por ID
    const mealIndex = this.meals.findIndex((meal) => meal.id === id);
    if (mealIndex === -1) {
      console.error('Meal not found');
      return of(undefined); // Retornamos undefined si no se encuentra la meal
    }

    // Agregar la comida al tipo de meal correspondiente
    const meal = this.meals[mealIndex];
    if (!meal[mealType]) {
      meal[mealType] = []; // Inicializamos el array si no existe
    }
    meal[mealType]?.push(food);

    // Actualizar el arreglo y guardar en localStorage
    this.meals[mealIndex] = meal;
    localStorage.setItem('meals', JSON.stringify(this.meals));

    // Retornar la meal actualizada como Observable
    return of(meal);
  }

  deleteFoodOnMeal() {
    //recibe el arreglo de meals, y el id de la meal, y el id de la comida a eliminar y el mealtype
    //elimina y lo sube a localstorge
  }

  generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }

  isIdUnique(id: string): boolean {
    return !this.meals.some(meal => meal.id === id);
  }

}
