import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { CoinService } from '../../_services/coin.service';

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.css']
})
export class ValuesComponent implements OnInit {
loading: boolean = true;
//Coin data from server:
bitcoins:any;
//Coin data for charts:
bitCoinChart;
//Coin max and min:
bitCoinMax; bitCoinMin;

  constructor(private coinService: CoinService) { }

  ngOnInit() {
    this.getBitCoin().then(() => this.buildBitCoinChart()) 
  }

getBitCoin(){
  let promise = new Promise((resolve,reject) => {
    this.coinService.getBitCoinValues().subscribe((res: any) =>{
      this.bitcoins = res;
      if(!res){
        reject();
        console.log('Something is wrong with BitCoin Data')
      }
      else{
        resolve();
      }
    })
  });
  return promise;
}

  buildBitCoinChart(){
    let bitCoinValuesPerH = [];
    let timePerH = [];

    for(let i = 0;  i < this.bitcoins.length; i++){
      if(i % 60 == 0){
        bitCoinValuesPerH.push(this.bitcoins[i].average);
        timePerH.push(this.bitcoins[i].time.toString().slice(11));
    }
    }  
    this.loading = false;
    this.bitCoinChart = new Chart('bitCoin', {
      type: 'line',
      data:{
        labels: timePerH.reverse().slice(4),
        datasets: [{
            label:'BitCoin',
            data: bitCoinValuesPerH.reverse().slice(4),
            backgroundColor: 'green',
            fill: false
        }],
      },
    },
    this.bitCoinMax = bitCoinValuesPerH.sort((a,b) => {return b-a}).slice(0,1),
    this.bitCoinMin = bitCoinValuesPerH.sort((a,b) => {return a-b}).slice(0,1)
  );}  
}
