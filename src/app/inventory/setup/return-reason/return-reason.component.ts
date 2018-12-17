import { Component, OnInit } from '@angular/core';
import { InventorysystemService } from '../../../core';

@Component({
    selector: 'app-return-reason',
    templateUrl: './return-reason.component.html',
    styleUrls: ['./return-reason.component.scss']
})
export class ReturnReasonComponent implements OnInit {
    public ReturnReasons: any;
    public UpdatedModel: any;

    constructor(public InventoryService: InventorysystemService) {

    }

    async ngOnInit() {
        this.ReturnReasons = await this.InventoryService.GetReturnReasons();
    }

    async AddReturnReason(value) {
        await this.InventoryService.AddReturnReason(value.data);
        this.ReturnReasons = await this.InventoryService.GetReturnReasons();
    }

    UpdateModel(value) {
        this.UpdatedModel = { ...value.oldData, ...value.newData };
    }

    async UpdateReturnReason() {
        return await this.InventoryService.UpdateReturnReason(this.UpdatedModel);
    }

    async DeleteReturnReason(value) {
        return await this, this.InventoryService.DeleteReturnReason(value.key);
    }

}