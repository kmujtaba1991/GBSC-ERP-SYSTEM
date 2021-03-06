import { Component, OnInit } from '@angular/core';
import { PayrollSetupService } from '../../../../core';
@Component({
    selector: 'app-leavingreason',
    templateUrl: './leavingreason.component.html',
    styleUrls: ['./leavingreason.component.scss']
})
export class LeavingreasonComponent implements OnInit {

    public leavingReason: any;
    constructor(public payrollsetupservice: PayrollSetupService) { }

    async ngOnInit() {

        this.leavingReason = await this.payrollsetupservice.getLeavingReasons();
    }

    async addLeavingReason(value) {
        await this.payrollsetupservice.addLeavingReason(value.data);
        this.leavingReason = await this.payrollsetupservice.getLeavingReasons();
    }

    async updateLeavingReason(value) {
        await this.payrollsetupservice.updateLeavingReason(value);
    }

    async deleteLeavingReason(value) {
        await this.payrollsetupservice.deleteLeavingReason(value.key);
    }

}