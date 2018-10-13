import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService, SetupService } from '../../../core';
import { Employee } from '../../../core/Models/HRM/employee';

@Component({
    selector: 'app-basicinformation',
    templateUrl: './basicinformation.component.html',
    styleUrls: ['./basicinformation.component.css']
})
export class BasicinformationComponent implements OnInit {


    public basic: any;
    public religion: any;
    public language: any;
    public city: any;
    public Employee: any;

    @Input('employeeId') id: number;

    @Output() updateMessage = new EventEmitter();


    public EmpbasicForm: FormGroup;

    constructor(public employeeService: EmployeeService, public fb: FormBuilder, private SetupServiceobj: SetupService, public router: Router, private route: ActivatedRoute) {

        this.EmpbasicForm = this.fb.group({
            FirstName: [''],
            LastName: [''],
            FatherName: [''],
            Email: [''],
            Cnic: [''],
            CnicExpiry: [''],
            Phone: [''],
            HomePhone: [''],
            DOB: [''],
            POB: [''],
            BloodGroup: [''],
            MaritalStatus: [''],
            Gender: [''],
            CountryId: [''],
            CityId: [''],
            ReligionId: [''],
            LanguageId: [''],
            Address: [''],
            PermanentAddress: ['']
        });

    }

    update(value) {

<<<<<<< HEAD
    async update(value) {
        console.log(value);
        await this.employeeService.updateUersById(value);
=======
        value.UserId = this.id;
>>>>>>> master

        this.employeeService.updateEmployeeBasicInfo(value).subscribe(resp => {
            this.showSuccess("Basic Information Updated");
        });

    }

    async ngOnInit() {
<<<<<<< HEAD

        this.employeeService.GetEmployee(this.id).subscribe(resp => {
=======
>>>>>>> master

        this.religion = await this.SetupServiceobj.getAllReligions();

        this.language = await this.SetupServiceobj.getAllLanguages();

        this.city = await this.SetupServiceobj.getAllCities();

        if (this.id) {
            this.employeeService.GetEmployee(this.id).subscribe(resp => {

<<<<<<< HEAD
        //     await this.SetupServiceobj.getAllDesignations();
        //     let dsg = this.SetupServiceobj.designation;

        //     await this.SetupServiceobj.getAllLanguages();
        //     let lng = this.SetupServiceobj.language;
=======
                this.Employee = resp;

                this.patchValues(resp);
>>>>>>> master

            });
        }

<<<<<<< HEAD
        //     await this.SetupServiceobj.getAllFunctions();
        //     let func = this.SetupServiceobj.function;

        //     await this.SetupServiceobj.getAllReligions();
        //     let relg = this.SetupServiceobj.religion;
        //     console.log(relg);

        //     await this.SetupServiceobj.getAllGazettedHolidays();
        //     let holiday = this.SetupServiceobj.gazetholidays;

        //     await this.SetupServiceobj.getAllCities();
        //     let cty = this.SetupServiceobj.city;
=======

    }

    showSuccess(message) {

        this.updateMessage.emit(message);
    }
>>>>>>> master

    isUpdate(): boolean {

        if (this.id > 0)
            return true;
        else
            return false;
    }

    patchValues(employee: any) {

        this.EmpbasicForm.patchValue({
            FirstName: employee.firstName,
            LastName: employee.lastName,
            FatherName: employee.fatherName,
            Email: employee.email,
            Cnic: employee.cnic,
            CnicExpiry: employee.cnicExpiry,
            Phone: employee.phone,
            HomePhone: employee.homePhone,
            DOB: employee.dob,
            POB: employee.pob,
            BloodGroup: employee.bloodGroup,
            MaritalStatus: employee.maritalStatus,
            Gender: employee.gender,
            CityId: employee.cityId,
            ReligionId: employee.religionId,
            Address: employee.address,
            PermanentAddress: employee.permanentAddress
        });
    }

<<<<<<< HEAD
    async Formsubmit() {
        await this.employeeService.addEmployee();
=======
    async Formsubmit(value) {

        this.employeeService.addEmployee(value).subscribe(resp => {

            this.router.navigate(['hrm/employee/updateemployee/' + resp.userID]);
        })
>>>>>>> master
    }
}