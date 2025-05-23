import { Component } from '@angular/core';
import { BudgetsService } from '../../../../_services/budgets.service';
import { BudgetExecutionFilter } from '../../../../_models/budget-execution-filter';
import { DxButtonModule, DxDataGridModule, DxDateBoxModule, DxFormModule } from 'devextreme-angular';
import { Router } from '@angular/router';
import { BudgetVsExecuted } from '../../../../_models/budget-vs-executed';

@Component({
  selector: 'app-budget-vs-executed',
  standalone: true,
  imports: [
    DxFormModule,
    DxDateBoxModule,
    DxButtonModule,
    DxDataGridModule
  ],
  templateUrl: './budget-vs-executed.component.html',
  styleUrl: './budget-vs-executed.component.scss'
})
export class BudgetVsExecutedComponent {
  budgetVsExecuted: BudgetVsExecuted[];
  constructor(private budgetService: BudgetsService, private router: Router){}

  filter: BudgetExecutionFilter={
    from: new Date(),
    to: new Date()
  }

   onSubmit() {
    this.budgetService.budgetVsExecuted(this.filter).subscribe({
      next: (response) =>{
        this.budgetVsExecuted = response;
        console.log(response);
      },
      error: console.log
    })
  }

}
