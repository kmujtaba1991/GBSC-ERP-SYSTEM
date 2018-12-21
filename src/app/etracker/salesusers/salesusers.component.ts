import { Component, OnInit, ViewChild } from '@angular/core';
import { eTrackerUserService, AuthService, InventorysystemService } from '../../../app/core';
import { DxSelectBoxComponent } from 'devextreme-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'app-salesusers',
    templateUrl: './salesusers.component.html',
    styleUrls: ['./salesusers.component.scss']
})
export class SalesusersComponent implements OnInit {

    public companyId: any;
    public users: any;
    public distributors: any;
    public territories: any;
    public sections: any;
    public assignedSubsections: any;

    public distributorId: any;
    public territoryId: any;
    public sectionId: any;

    public userId: any;

    public error: boolean;
    public errorText: string;

    public assignForm: FormGroup;

    @ViewChild("distributorcb") distributorcb: DxSelectBoxComponent;
    @ViewChild("territorycb") territorycb: DxSelectBoxComponent;
    @ViewChild("sectioncb") sectioncb: DxSelectBoxComponent;
    @ViewChild("sectioncb2") sectioncb2: DxSelectBoxComponent;


    constructor(private authService: AuthService,
        private userService: eTrackerUserService,
        private inventoryService: InventorysystemService,
        private formBuilder: FormBuilder) {

        this.companyId = this.authService.getUserCompanyId();

        this.assignForm = this.formBuilder.group({
            'TerritoryId': ['', Validators.required],
            'DistributorId': ['', Validators.required],
            'SectionId': ['', Validators.required]
        })
    }

    ngOnInit() {

        this.inventoryService.GetDistributorsByCompany(this.companyId).subscribe(dist => {

            this.distributors = dist;
        });

        this.inventoryService.getSectionsByCompany(this.companyId).subscribe(sec => {
            this.sections = sec;
        });

        this.userService.getSalesUsersByCompany(this.companyId).subscribe(u => {

            this.users = u;
        });

        this.distributorcb.onValueChanged.subscribe(res => this.onDistributorChange(res.component.option("value")));

        this.territorycb.onValueChanged.subscribe(res => this.onTerritoryChange(res.component.option("value")));

        this.sectioncb.onValueChanged.subscribe(res => this.onSectionChange(res.component.option("value")));

        this.sectioncb2.onValueChanged.subscribe(res => this.onSectionChange(res.component.option("value")));

    }

    onUserSelect(userId) {

        this.userId = userId;

        this.userService.getUser(this.userId).subscribe(resp => {

            this.distributorId = resp.distributorId;
            this.territoryId = resp.territoryId;
            this.sectionId = resp.sectionId;

        });

    }

    onAssignSubsections(userId, sectionId) {
        this.userId = userId;

        this.inventoryService.getSectionsByCompany(this.companyId).subscribe(resp => {
            this.sections = resp;
            this.sectionId = sectionId;

            if (this.sectionId)
                this.userService.getAssignedSubsectionsBySection(this.sectionId, this.userId).subscribe(resp => {
                    this.assignedSubsections = resp;
                });
        });
    }

    onDistributorChange(id) {

        this.inventoryService.getTerritoriesByDistributorId(id).subscribe(territories => {
            this.territories = territories;
            this.distributorId = id;

        });
    }

    onTerritoryChange(id) {

        console.log(id);
        this.inventoryService.getSectionsByTerritory(id).subscribe(sections => {
            this.sections = sections;
            this.territoryId = id;
        });
    }

    onSectionChange(id) {
        this.sectionId = id;

        if (this.sectionId)
            this.userService.getAssignedSubsectionsBySection(this.sectionId, this.userId).subscribe(resp => {
                this.assignedSubsections = resp;
            });
    }

    onSubsectionSelect(e, i) {
        this.assignedSubsections[i].isAssigned = e.target.checked;
    }

    assignSubsectionsOnSubmit()
    {
        this.userService.assignSubsections(this.assignedSubsections).subscribe(resp=>{
            console.log(resp);
        })
    }

    assignUserSection(value) {

        this.userService.assignUserSection({UserId: this.userId, DistributorId: value.DistributorId, SectionId: value.SectionId}).subscribe(resp => {
            console.log(resp);
        });
    }

}
