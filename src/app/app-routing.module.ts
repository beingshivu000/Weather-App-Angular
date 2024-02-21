import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Weatherdata } from './components/weatherdata/weatherdata.component';


const routes: Routes = [
  {path: "weather-report", component: Weatherdata},
  { path: '**', redirectTo: "/weather-report", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
