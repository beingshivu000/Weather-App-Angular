import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import{HttpClientModule} from '@angular/common/http';
import { WservicesService } from './services/wservices.service';
import { LucideAngularModule} from 'lucide-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Weatherdata } from './components/weatherdata/weatherdata.component';
import { AheadCardsComponent } from './components/ahead-cards/ahead-cards.component';


@NgModule({
  declarations: [
    AppComponent,
    Weatherdata,
    AheadCardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    LucideAngularModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [WservicesService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
