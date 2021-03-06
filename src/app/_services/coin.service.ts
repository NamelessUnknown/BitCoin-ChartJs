import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CoinService {
bitCoin = "https://apiv2.bitcoinaverage.com/indices/global/history/BTCUSD?period=daily&format=json";

constructor(private http: HttpClient) { }

getBitCoinValues(): Observable<any[]>{
   return this.http.get<any[]>(this.bitCoin);
}
}
