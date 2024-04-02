import { Component, OnInit } from '@angular/core';
import { LucideContact, Search } from 'lucide-angular';
import { LucideIconData } from 'lucide-angular/icons/types';
import { WservicesService } from '../../services/wservices.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-weatherdata',
  templateUrl: './weatherdata.component.html',
  styleUrls: ['./weatherdata.component.css']
})
export class Weatherdata implements OnInit {
  icons: LucideIconData = Search;
  myForm!: FormGroup
  weatherApp!: any;
  cityName!: string;
  countryName!: string;
  latitude!: number;
  longitude!: number;
  isDataAvailable: boolean = false;
  wData!: any;
  showModel: boolean = false;
  modelCityName!: string;
  private _currentTime: Date = new Date();
  public get currentTime(): Date {
    return this._currentTime;
  }
  public set currentTime(value: Date) {
    this._currentTime = value;
  }
  LocalDate:string=new Date().toLocaleString();

  constructor(private formBuilder: FormBuilder, private WeatherService: WservicesService) {
    // this.updateTime();

  }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      cityName: ['', [Validators.required]]
    })

  }

  onSubmit(form: FormGroup) {
    this.sendCityName(form.value.cityName);
    this.modelCityName = form.value.cityName;
  }

  sendCityName(cityName: string) {
    this.WeatherService.getLatLong(cityName).subscribe((data: any) => {
      console.log(data);
      const result = data[0];
      if (result) {
        this.cityName = result?.name;
        // console.log(this.cityName);
        this.countryName = result?.country;
        // console.log(this.countryName);
        this.latitude = result.lat;
        this.longitude = result.lon;
        this.isDataAvailable = true;
        this.getWeatherDetails(this.latitude, this.longitude);
      } else {
        this.showModel = true;
        setTimeout(() => {
          this.showModel = false;
        }, 3000)
        this.isDataAvailable = false;
        // this.isLoading = false; 
      }
    })

  }

  getWeatherDetails(lat: number, lon: number) {
    this.WeatherService.getWeatherData(lat, lon).subscribe(
      (data: any) => {
        // console.log(data);
        this.wData = data;
        console.log(this.wData.main?.temp)
        // Set flag indicating that data is available
        this.isDataAvailable = true;
      },
      (error: any) => {
        console.error('Error fetching weather data:', error);
        // Check if error status is 404
        if (error.status === 404) {
          this.showModel = true;
          // Set flag indicating that data is not available
          this.isDataAvailable = false;
        }
      }
    );
  }


  convertKelvinToCelsius(tempInKelvin: number): string {
    return (tempInKelvin - 273.15).toFixed(2);
  }

  // updateTime() {
  //   const currentTime = new Date();
  //   this.currentTime = currentTime.toLocaleTimeString();
  //   setTimeout(() => {
  //     this.updateTime(); // Update the time every second
  //   }, 1000);
  // }
}
