import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WservicesService  {
  apiKey:string = "f24e782942cf5fba812fe928b586a31f"

  constructor( private http:HttpClient) { }
 

  getLatLong(cityName:string) {
    return this.http.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${this.apiKey}`)
  }

  getWeatherData(lat:number,lon:number) {
    return  this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`)
  }
}
// function getUrl() {
//   throw new Error('Function not implemented.');
// }

