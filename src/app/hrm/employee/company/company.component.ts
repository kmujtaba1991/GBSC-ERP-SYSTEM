import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SetupService, EmployeeService, HrmsService } from '../../../core';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-employeecompany',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.css']
})
export class EmployeeCompanyComponent implements OnInit {

    public isDisabled = true;
    public EmpCompanyForm: any;
    public designation: any;
    public employeetype: any;
    public functions: any;
    public groups: any;
    public managementlevel: any;
    public employeestatus: any;
    public departments: any;
    public employees: any;
    public manager: any;
    public filterdemplyoee: any;

    @Input('employeeId') id: number;

    @Output() updateMessage = new EventEmitter();

    public EmployeeCompany: any;
    public cempstatus: any;

    constructor(public fb: FormBuilder, private SetupServiceobj: SetupService, private hrmService: HrmsService, public employeeService: EmployeeService, public router: Router, private route: ActivatedRoute) {

        this.EmpCompanyForm = this.fb.group({
            ManagementLevelId: [''],
            FunctionId: [''],
            EmployeeStatusId: [''],
            EmployeeTypeId: [''],
            DesignationId: [''],
            ContractStartDate: [''],
            ContractEndDate: [''],
            AppointmentDate: [''],
            NextAppraisalDate: [''],
            ConfirmationDueDate: [''],
            ConfirmationDate: [''],
            LeavingDate: [''],
            ResignDate: [''],
            Approver: [''],
            UserId: [this.id]

        });

    }

    async ngOnInit() {

        this.functions = await this.SetupServiceobj.getAllFunctions();

        this.departments = await this.hrmService.getAllDepartments();

        this.designation = await this.SetupServiceobj.getAllDesignations();

        this.managementlevel = await this.SetupServiceobj.getAllManagementlevels();

        this.groups = await this.SetupServiceobj.getAllGroups();

        this.employeetype = await this.SetupServiceobj.getAllEmployeeTypes();

        this.employees = await this.employeeService.GetAllEmployees();

        this.employeestatus = await this.SetupServiceobj.getEmployeeStatus();


        this.employeeService.getManagers().subscribe(res => {
            this.manager = res;
            console.log(this.manager);
            // this.filterdemplyoee = this.employes.fil
        })

        await this.SetupServiceobj.getEmployeeStatus();

        this.route.params.subscribe((params) => {

            this.id = +params['id'];

            this.employeeService.GetEmployeeCompany(this.id).subscribe(resp => {

                this.EmployeeCompany = resp

                this.patchValues(resp);
            });


        });

    }

    check() {
        this.isDisabled = !this.isDisabled;
        return;
    }

    showSuccess(message) {

        this.updateMessage.emit(message);
    }


    async update(value) {

        value.UserId = this.id;

        if (this.EmployeeCompany.userCompanyId > 0) {

            value.UserCompanyId = this.EmployeeCompany.userCompanyId;

            this.employeeService.updateUserCompany(value).subscribe(c => {

                this.showSuccess("Company Information Updated");

            })
        }
        else {

            this.employeeService.addUserCompany(value).subscribe(c => {

                this.showSuccess("Company Information Added");

            })

        }
    }


    patchValues(company: any) {

        this.EmpCompanyForm.patchValue({

            DesignationId: company.designationId,
            ManagementLevelId: company.managementlevelId,
            FunctionId: company.functionId,
            EmployeeStatusId: company.employeeStatusId,
            EmployeeTypeId: company.employeeTypeId,
            ShiftId: company.shiftId,
            ContractStartDate: company.ContractStartDate,
            ContractEndDate: company.contractEndDate,
            AppointmentDate: company.appointmentDate,
            NextAppraisalDate: company.nextAppraisalDate,
            ConfirmationDueDate: company.confirmationDueDate,
            ConfirmationDate: company.confirmationDate,
            LeavingDate: company.leavingDate,
            ResignDate: company.resignDate,
            Approver: company.approver,
            userId: this.id
        });
    }

}
