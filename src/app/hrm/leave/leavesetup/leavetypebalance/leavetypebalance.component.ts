import { Component, OnInit } from '@angular/core';
import { EmployeeService, LeaveSetupService } from '../../../../core';

@Component({
    selector: 'app-leavetypebalance',
    templateUrl: './leavetypebalance.component.html',
    styleUrls: ['./leavetypebalance.component.scss']
})
export class LeavetypebalanceComponent implements OnInit {

    public leavetypebalance: any;
    public LeaveType: any;
    constructor(public leavesetupservice: LeaveSetupService, public employeeservice: EmployeeService) { }

    async ngOnInit() {
        await this.leavesetupservice.getAllleavetypebalance();
        this.leavetypebalance = this.leavesetupservice.leavetypebalance
        console.log(this.leavetypebalance);

        this.LeaveType = await this.leavesetupservice.getAllleavetype();

        await this.employeeservice.GetAllEmployees();
        let employe = this.employeeservice.employeereg;

    }


    async addleavetypebalance(value) {
        this.leavesetupservice.addleavetypebalance(value.data);
    }

    async updateleavetypebalance(value) {
        this.leavesetupservice.updateleavetypebalance(value);

    }

    async deleteleavetypebalance(value) {
        this.leavesetupservice.Deleteleavetypebalance(value.key);
    }

}
