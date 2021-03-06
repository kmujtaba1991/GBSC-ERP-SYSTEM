import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Injectable()
export class AuthService {
    public accessibleModules: any = ['patient'];
    public readonly API_URL = 'authentication/api/auth/login';
    public loggedInUser: any;

    constructor(public http: HttpClient, public router: Router, public route: ActivatedRoute, public ApiService: ApiService) {
    }

    async login(credentials) {
        let response: any = await this.ApiService.post(this.API_URL, credentials).toPromise();

        if (response.status && response.message === 'Login Successful') {
            console.log(response);

            let userData = {
                userLevel: response.userLevel,
                fullName: response.fullName,
                userId: response.userId,
                credentials: response.response,
                assignedId: response.assignedId,
                accessibleModules: response.moduleFeatures.map((m, i) => {
                    return {
                        Description: m.moduleName,
                        Features: m.features,
                        SNo: i + 1
                    }
                })
            }
            localStorage.setItem('user', JSON.stringify(userData));
            this.loggedInUser = JSON.parse(localStorage.getItem('user'));
            this.router.navigate(['employee/dashboard']);
        } else if (response.status === false || response.message === 'Invalid username or passowrd') {
            alert(response.message);
        }
    }

    logout() {
        localStorage.removeItem('user');

        this.router.navigate(['login']);

    }

    isAuthenticated() {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.accessibleModules = user.accessibleModules;
            return true;
        } else {
            return false;
        }
    }

    getUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    getAccessableModules() {
        let user = JSON.parse(localStorage.getItem('user'));
        return user.accessibleModules;

    }

    getAccessableModulesAndFeatures() {
        let modules : string[] = [];
        let features : string[] = [];

        let user = JSON.parse(localStorage.getItem('user'));

        for (let module of user.accessibleModules) {
            modules.push(module.Description);
            for(let feature of module.Features) {
                features.push(module.Description + ' - ' + feature);
            }
        }
        
        return { modules, features };
    }

    getProfileInfo() {
        let user = JSON.parse(localStorage.getItem('user'));
        return {
            Username : user.fullName,
            UserLevel : user.userLevel
        };
    }

    getUserCompanyId() {

        var user = this.getUser();
        return user.assignedId.companyId;
    }

    getUserLevel() {
        var user = this.getUser();
        return user.userLevel;
    }

    getUserId() {
        var user = this.getUser();
        return user.userId;
    }

    getuserName(){

        var user = this.getUser();
        return user.fullName;
    }

    checkIfModuleIsAccessible(module) {
        let isAccessible;

        this.getAvailableModules().forEach(m => {
            if (m.route === module) {
                isAccessible = this.accessibleModules.find(mod => {
                    return mod.Description === m.module;
                });
            }
        });

        if (isAccessible) {
            return true;
        } else {
            return false;
        }
    }

    getAvailableModules() {
        return [
            { module: 'SystemAdministration', route: 'systemadministration' },
            { module: 'Human Resource Management', route: 'hrm' },
            { module: 'Hospital Management System', route: 'hims/patient' },
            { module: 'Inventory Management System', route: 'inventorysystem' },
            { module: 'Payroll Management System', route: 'payroll' },
            { module: 'Finance', route: 'finance' },
            { module: 'Lab Information System', route: 'lab' },
            { module: 'Accounting System', route: 'accounting' },
            { module: 'Security Admin', route: 'security' },
            { module: 'eTracker', route: 'etracker' },
            { module: 'Coordination', route: 'coordination' },
            { module: 'Pharmacy', route: 'pharmacy' },
        ];
    }

    findRouteModule(module) {
        return this.getAvailableModules().find(m => {
            return m.module === module.Description;
        });
    }

}
