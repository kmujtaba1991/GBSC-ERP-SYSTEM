import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClinicalrecordComponent } from './clinicalrecord/clinicalrecord.component';
import { RootComponent } from './root/root.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxButtonModule, DxDataGridModule, DevExtremeModule } from 'devextreme-angular';
import { MenuComponent } from './shared/menu/menu.component';
import { AuthGuardService } from '../../core';
import { ClinicalRecordsListComponent } from './clinical-records-list/clinical-records-list.component';

const routes: Routes = [{
    path: "",
    component: RootComponent,
    canActivate: [AuthGuardService],
    children: [{
        path: "clinical-record/:id",
        component: ClinicalrecordComponent
    },
    {
        path: "clinical-record",
        component: ClinicalrecordComponent
    },
    {
        path: "clinical-records-list",
        component: ClinicalRecordsListComponent
    }]
}];

@NgModule({
    imports: [RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DxButtonModule,
        DevExtremeModule,
        DxDataGridModule
    ],

    declarations: [
        RootComponent,
        MenuComponent,
        ClinicalrecordComponent,
        ClinicalRecordsListComponent
    ],
    exports: [RouterModule]
})
export class CoordinationRoutingModule { }
