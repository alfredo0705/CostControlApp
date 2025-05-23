import { Component } from '@angular/core';
import { AuthService } from '../../../../_services/auth.service';
import { ExpenseTypeService } from '../../../../_services/expense-type.service';
import { BudgetsService } from '../../../../_services/budgets.service';
import { BudgetCreate } from '../../../../_models/budget-create';
import { DxButtonModule, DxDataGridModule, DxDateBoxModule, DxFormModule } from 'devextreme-angular';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-budget-create',
  standalone: true,
  imports: [
    DxDataGridModule,
    DxFormModule,
    DxDateBoxModule,
    DxButtonModule
  ],
  templateUrl: './budget-create.component.html',
  styleUrl: './budget-create.component.scss'
})
export class BudgetCreateComponent {

  constructor(
    private authService: AuthService, 
    private expenseTypeService: ExpenseTypeService, 
    private budgetService: BudgetsService,
    private toast: ToastrService){}

form = {
  month: new Date() 
};

presupuestoPorTipoGasto = [];

ngOnInit() {
  this.cargarTiposDeGasto();
}

cargarTiposDeGasto() {
  this.expenseTypeService.getExpenseTypes().subscribe((tipos) => {
    this.presupuestoPorTipoGasto = tipos.map(t => ({
      expenseTypeId: t.id,
      expenseTypeName: t.name,
      amount: 0
    }));
  });
}

guardarPresupuesto() {
  const month = this.form.month.getMonth() + 1;
  const year = this.form.month.getFullYear();

  const body: BudgetCreate[] = this.presupuestoPorTipoGasto.map(p => ({
    expenseTypeId: p.expenseTypeId,
    year,
    month,
    amount: Number(p.amount) || 0
  }));

  this.budgetService.addBudget(body).subscribe({
    next: () =>{
      this.toast.success('Presupuesto guardado')
    }
  });
}
}
