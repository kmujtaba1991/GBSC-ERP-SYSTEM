import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../core';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

    public emp: any;
    public userId: any;


    constructor(public employee: EmployeeService, public router: Router) { }

    async ngOnInit() {

        await this.employee.GetAllEmployees();
        this.emp = this.employee.employeereg;
    }


    onToolbarPreparing(e) {
        e.toolbarOptions.items.unshift(
            {
                location: 'after',
                widget: 'dxButton',
                options: {
                    icon: 'add',
                    onClick: this.onadd.bind(this)
                }
            });
    }

    onadd() {
        this.router.navigate(['hrm/employee/registration'])
    }


    getCurrentRowData(d) {
        this.userId = d.key;
        this.router.navigate(['hrm/employee/updateemployee/' + this.userId]);

    }
}
