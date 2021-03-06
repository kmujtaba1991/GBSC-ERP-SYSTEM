import { Component, OnInit } from '@angular/core';
import { InventorysystemService, AuthService } from '../../../core';
import { Tax } from '../../../core/Models/Inventory/Setup/Tax';

@Component({
    selector: 'app-tax',
    templateUrl: './tax.component.html',
    styleUrls: ['./tax.component.scss']
})
export class TaxComponent implements OnInit {
    public Taxes: any;
    public UpdatedModel: any;
    private CompanyId: number;

    constructor(public InventoryService: InventorysystemService, private AuthService: AuthService) {

    }

    ngOnInit() {
        this.AuthService.getUserCompanyId().subscribe((res: number) => {
            this.CompanyId = res;
        });
        this.InventoryService.GetTaxesByCompany(this.CompanyId).subscribe((res: Tax) => {
            this.Taxes = res;
        });
    }

    AddTax(value) {
        this.InventoryService.AddTax(value.data).subscribe(res => {
            this.InventoryService.GetTaxesByCompany(this.CompanyId).subscribe((res: Tax) => {
                this.Taxes = res;
            });
        });
    }

    UpdateModel(value) {
        this.UpdatedModel = { ...value.oldData, ...value.newData };
    }

    UpdateTax() {
        return this.InventoryService.UpdateTax(this.UpdatedModel).subscribe();
    }

    Deletetax(value) {
        return this.InventoryService.DeleteTax(value.key).subscribe();
    }

}