import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Day } from '../models/Day';

@Injectable({
  providedIn: 'root'
})
//מיועד לקריאות http בלבד
export class ApiService {
private readonly url="https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=demo"
allDays:Day[]
getAllPrice(){
  const result=this.http.get<any>(this.url);
  
  return result;

  
}

constructor(private http:HttpClient ) { }
}
