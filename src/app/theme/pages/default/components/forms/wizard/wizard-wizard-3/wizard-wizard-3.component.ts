import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../../../../helpers';
import { ScriptLoaderService } from '../../../../../../../_services/script-loader.service';


@Component({
    selector: "app-wizard-wizard-3",
    templateUrl: "./wizard-wizard-3.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class WizardWizard3Component implements OnInit, AfterViewInit {


    constructor(public _script: ScriptLoaderService) {

    }
    ngOnInit() {

    }
    ngAfterViewInit() {
        this._script.loadScripts('app-wizard-wizard-3',
            ['assets/demo/default/custom/components/forms/wizard/wizard.js']);

    }

}
