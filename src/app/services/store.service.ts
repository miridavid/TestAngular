import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import {Day} from '../models/Day'
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
//מיועד לשמירת הנתונים
export class StoreService {
allDays1:Day[]=[];
allDays2;
MaxBuysubject = new Subject<Day>();
MaxSalesubject = new Subject<Day>();
result$;
day:Day;
private maxBuyP:Day;
private maxSaleP:Day;


public get allDays() : Day[] {
  return this.allDays1;
}

constructor(private api:ApiService) { }
s;
getAllPrice(){
this.api.getAllPrice().pipe(
    map(items=> 
    this.allDays2=items['Time Series (Daily)'],
    )).subscribe((el)=>{
     this.convert(this.allDays2)
     }
    )
}


convert(allDays){
  debugger
for(var i in allDays){
this.day=new Day();
this.day.title=new Date(i);
this.day.open=allDays[i]['1. open']
this.day.high=allDays[i]['2. high']
this.day.low=allDays[i]['3. low']
this.day.close=allDays[i]['4. close']
this.day.adjustedClose=allDays[i]['adjusted close']
this.day.volume=allDays[i]['6. volume']
this.day.dividendAmount=allDays[i]['7. dividend amount']
this.day.splitCoefficient=allDays[i]['8. split coefficient']
this.day.difference=this.day.close-this.day.open
this.allDays1.push(this.day)    
    }
    this.setProfit()

}

setProfit(){
  debugger
  var lowest = Number.POSITIVE_INFINITY;
  var highest = Number.NEGATIVE_INFINITY;
  var tmp; 
  for (var i=0;i<=this.allDays1.length-1;  i++) {
    tmp = this.allDays1[i].close;
    if (tmp < lowest){
      lowest = tmp;
      this.maxBuyP=this.allDays1[i]
    } }
  
  for (var i=0;i<=this.allDays1.length-1;  i++) {
      tmp = this.allDays1[i].close;
      if (tmp > highest && this.allDays1[i].title>this.maxBuyP.title) {
        highest = tmp;
        this.maxSaleP=this.allDays1[i]
        
      }
  }
  this.MaxBuysubject.next(this.maxBuyP);
  this.MaxSalesubject.next(this.maxSaleP);

  console.log(this.maxBuyP);
  // this.maxSale=highest
  // this.maxBuy=lowest
}
}
  
    


 



 
