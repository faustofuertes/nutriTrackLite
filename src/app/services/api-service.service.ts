import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { Food } from '../interfaces/food';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private apiUrl = 'https://api.api-ninjas.com/v1/nutrition';
  private apiKey = 'wYV8Zrn/WK4uGjoK4K+BeQ==qVCNvcWI3H8EIRHG'; // Tu API Key

  constructor(private http: HttpClient) {}

  getNutritionInfo(query: string): Observable<Food> {
    const headers = new HttpHeaders({
      'X-Api-Key': this.apiKey,
    });

    return this.http.get<any[]>(this.apiUrl, {
      headers: headers,
      params: { query: query },
    }).pipe(
      map((data) => {
        const item = data[0]; // Solo se toma el primer (y único) elemento del arreglo
        return {
          id: crypto.randomUUID(), // Genera un ID único
          name: item.name || 'Unknown',
          proteins_per_g: this.parseToNumber(item.protein_g),
          fats_per_g: this.parseToNumber(item.fat_total_g),
          carbohydrates_per_g: this.parseToNumber(item.carbohydrates_total_g),
          calories_per_g: this.parseToNumber(item.calories),
          quantity_g: 0, // Esto lo define el usuario luego
        };
      })
    );
  }

  private parseToNumber(value: string | number): number {
    return typeof value === 'number' ? value : parseFloat(value) || 0;
  }
}
