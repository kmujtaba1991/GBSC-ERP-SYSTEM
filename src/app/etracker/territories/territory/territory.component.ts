import { Component, OnInit } from '@angular/core';
import { AuthService, InventorysystemService } from '../../../../app/core';

@Component({
    selector: 'app-territory',
    templateUrl: './territory.component.html',
    styleUrls: ['./territory.component.scss']
})
export class TerritoryComponent implements OnInit {

    public territories: any;
    public areas: any;
    public companyId: any;

    constructor(public inventoryService: InventorysystemService, public authService: AuthService) {
        this.companyId = this.authService.getUserCompanyId();
    }

    ngOnInit() {

        this.inventoryService.getTerritoriesByCompany(this.companyId).subscribe(t => {
            this.territories = t;
        });

        this.inventoryService.getAreasByCompany(this.companyId).subscribe(a => {
            this.areas = a;
        })
    }

    addTerritory(territory) {

        territory.data.companyId = this.companyId;
        this.inventoryService.AddTerritory(territory.data).subscribe(resp => {
            console.log(resp);
        })
    }

    updateTerritory(territory) {
        territory.data.territoryId = territory.key;
        territory.data.companyId = this.companyId;
        this.inventoryService.UpdateTerritory(territory.data).subscribe(resp => {
            console.log(resp);
        });
    }

    deleteTerritory(territory) {

    }

}
