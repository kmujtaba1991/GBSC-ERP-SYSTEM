import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../../core';


@Component({
    selector: 'app-diagnosis',
    templateUrl: './diagnosis.component.html',
    styleUrls: ['./diagnosis.component.scss']
})
export class DiagnosisComponent implements OnInit {
    public diagnos: any;
    constructor(public PatientServiceobj: PatientService) {

    }

    async  ngOnInit() {

        await this.PatientServiceobj.getDiagnoses();
        this.diagnos = this.PatientServiceobj.diagnoses;
        //  console.log(this.diagnos);
    }

    async AddDiagnoses(value) {
        let x = await this.PatientServiceobj.addDiagnoses(value.key);
        await this.PatientServiceobj.getDiagnoses();
        this.diagnos = this.PatientServiceobj.diagnoses;
        //    console.log(x);
    }

    async UpdateDiagnoses(value) {
        let x = await this.PatientServiceobj.updateDiagnoses(value.key);
        await this.PatientServiceobj.getDiagnoses();
        this.diagnos = this.PatientServiceobj.diagnoses;
        //   console.log(x);
    }

    async DeleteDiagnoses(value) {
        let x = await this.PatientServiceobj.deleteDiagnoses(value.key.diagnosisId);
        await this.PatientServiceobj.getDiagnoses();
        this.diagnos = this.PatientServiceobj.diagnoses;
        //    console.log(x);

    }
}
