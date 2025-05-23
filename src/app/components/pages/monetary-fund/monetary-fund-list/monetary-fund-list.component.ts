import { Component, OnInit } from '@angular/core';
import { MonetaryFund } from '../../../../_models/monetary-fund';
import { MonetaryFundService } from '../../../../_services/monetary-fund.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-monetary-fund-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './monetary-fund-list.component.html',
  styleUrl: './monetary-fund-list.component.scss'
})
export class MonetaryFundListComponent implements OnInit {
  monetaryFunds: MonetaryFund[];

  constructor(private monetaryFundService: MonetaryFundService){}

  ngOnInit(): void {
    this.loadMonetaryFunds();
  }

  loadMonetaryFunds(){
    this.monetaryFundService.getMonetaryFunds().subscribe({
      next: (response)=>{
        this.monetaryFunds = response;
      }
    })
  }

}
