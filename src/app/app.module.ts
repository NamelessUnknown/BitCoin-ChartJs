import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CoinService } from './_services/coin.service';
import { ValuesComponent } from './values/values/values.component';
import { SpinnerComponent } from './values/loading-spinner/spinner/spinner.component';



@NgModule({
  declarations: [
    AppComponent,
    ValuesComponent,
    SpinnerComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,

  ],
  providers: [
    CoinService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
