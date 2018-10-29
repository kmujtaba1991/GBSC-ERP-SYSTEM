import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../api.service';
import { Observable } from 'rxjs';

@Injectable()
export class SemenanalysisService {

  private Url = "Hims/api/SemenAnalysis/"

  constructor(private http: HttpClient, private ApiService: ApiService) { }

  GetAllSemenAnalyses(): Observable<any> {
    return this.ApiService.get(this.Url + "GetAllSemenAnalyses");
  }

  getSemenAnalysis(id: number): Observable<any> {
    return this.ApiService.get(this.Url + "GetSemenAnalysis/" + id);
  }

  getSemenAnalysisByPatientId(id: number): Observable<any> {
    return this.ApiService.get(this.Url + "getSemenAnalysisByPatientId/" + id);
  }

  addSemenAnalysis(value): Observable<any> {
    return this.ApiService.post(this.Url + "AddSemenAnalysis", value);
  }

  updateSemenAnalysis(value): Observable<any> {
    return this.ApiService.put(this.Url + "UpdateSemenAnalysis", value);
  }

  deleteSemenAnalysis(id) {
    this.ApiService.delete(this.Url + "DeleteSemenAnalysis" + id);
  }
}