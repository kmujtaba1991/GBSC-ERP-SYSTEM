import { Component, OnInit, ViewChild } from '@angular/core';
import { AttendancesetupService, EmployeeService } from '../../../../core';
import { Employee } from '../../../../core/Models/HRM/employee';
import { DxTreeViewComponent } from 'devextreme-angular';

@Component({
    selector: 'app-assignroster',
    templateUrl: './assignroster.component.html',
    styleUrls: ['./assignroster.component.scss']
})
export class AssignrosterComponent implements OnInit {
    @ViewChild(DxTreeViewComponent) treeView;

    public updatingModel: any;
    public shifts: any;
    public employee: any;
    popupVisible = false;
    public assignrosters: any;
    public rosterAsign: any;
    public rosterData: any = {};
    public roster: any;
    selectedRows: number[];
    prefix: string;
    selectionChangedBySelectbox: boolean;
    public selectedUsers = [];

    constructor(public attendancesetupservice: AttendancesetupService,
        public empservice: EmployeeService) { }

    async ngOnInit() {

        this.assignrosters = await this.attendancesetupservice.getAsignRosters();

        this.rosterAsign = await this.attendancesetupservice.getAsignRoster(20);

        this.roster = await this.attendancesetupservice.getRosters();

        this.employee = await this.empservice.GetAllEmployees();

        this.shifts = await this.attendancesetupservice.getShifts();

    }

    showInfo(employee) {
        this.popupVisible = true;
    }


    selectionChangedHandler(e) {
        console.log(e);
        this.rosterData.UserAssignRosters = e.selectedRowsData.map(u => {
            return {
                userId: u.userId,

            };
        });
        if (!this.selectionChangedBySelectbox) {
            this.prefix = null;
        }

        this.selectionChangedBySelectbox = false;
    }

    addselecteduser() {
        this.popupVisible = false;
    }

    async addassignroster(value) {
        this.rosterData = { ...this.rosterData, ...value.data };
        await this.attendancesetupservice.addAsignRoster(this.rosterData);
        this.assignrosters = await this.attendancesetupservice.getAsignRosters();
    }

    async updatingAssignroster(value) {

        this.updatingModel = { ...value.oldData, ...value.newData };
    }

    async updateassignroster() {
        await this.attendancesetupservice.updateAsignRoster(this.updatingModel);
    }

    async deleteassignroster(value) {
        await this.attendancesetupservice.DeleteAsignRoster(value.key);
    }

}
