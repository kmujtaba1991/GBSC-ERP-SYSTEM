import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EmployeeService, SetupService } from '../../../core';
import { Employee } from '../../../core/Models/HRM/employee';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeDependant } from '../../../core/Models/HRM/employeeDependant';

@Component({
    selector: 'app-emergencycontact',
    templateUrl: './emergencycontact.component.html',
    styleUrls: ['./emergencycontact.component.css']
})
export class EmergencycontactComponent implements OnInit {


    public relations: any;

    @Input('employeeId') id: number;


    constructor(public employeeService: EmployeeService, private SetupServiceobj: SetupService,
        public router: Router, private route: ActivatedRoute) {

    }

    async ngOnInit() {

        this.employeeService.GetRelationsByUserId(this.id).subscribe(resp => this.relations = resp);

    }
<<<<<<< HEAD
    private updatingModel: EmployeeDependant;

    async updatingDependant(value) {
        this.updatingModel = { ...value.oldData, ...value.newData }
        console.log(value);

    }

    async updateDependant() {
        await this.employeeService.Updaterelation(this.updatingModel);
        console.log(this.updatingModel);

=======

    addRelation(value) {
        value.data.userId = this.id;

        this.employeeService.addUserRelation(value.data).subscribe(resp => console.log(resp));
>>>>>>> master
    }

    updateRelation(value) {

        let relation = this.relations.find(r => r.relationId == value.key);

        relation = { ...relation, ...value.data };

        this.employeeService.updateUserRelation(relation).subscribe(resp => console.log(resp));
    }

}
