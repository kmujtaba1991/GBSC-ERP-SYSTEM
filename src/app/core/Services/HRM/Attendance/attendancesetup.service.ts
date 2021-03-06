import { Injectable } from '@angular/core';
import { ApiService } from '../../api.service';
import { Shift } from '../../../Models/HRM/shift';
import { Observable } from 'rxjs';

@Injectable()
export class AttendancesetupService {

    public baseUrl: string = "SystemAdmin/api/AttendanceSetup";

    constructor(public ApiService: ApiService) { }

    async getAsignRosters() {
        return await this.ApiService.get(`${this.baseUrl}/GetAssignRosters`).toPromise();
    }

    async getAsignRoster(id) {
        return await this.ApiService.get(`${this.baseUrl}/GetAssignRoster/` + id).toPromise();

    }

    getAsignRosterById(id): Observable<any> {
        return this.ApiService.get(this.baseUrl + '/GetAssignRoster/' + id);
    }

    async addAsignRoster(data) {

        return await this.ApiService.post(`${this.baseUrl}/AddAssignRoster`, data).toPromise();
    }

    async getdataToUpdate(attendanceId, attendanceUrl) {
        return await this.ApiService.get(`${this.baseUrl}/${attendanceUrl}/${attendanceId}`).toPromise();
    }


    async updateAsignRoster(data) {

        return await this.ApiService.put(`${this.baseUrl}/UpdateAssignRoster`, data).toPromise();

    }

    async DeleteAsignRoster(id) {

        return await this.ApiService.delete(`${this.baseUrl}/DeleteAssignRoster/${id}`).toPromise();
    }

    async getAttendanceFlags() {

        return await this.ApiService.get(`${this.baseUrl}/GetAttendanceFlags`).toPromise();
    }
    async addAttendanceFlag(data) {

        return await this.ApiService.post(`${this.baseUrl}/AddattendanceFlag`, data).toPromise();

    }

    async updateAttendanceFlag(data) {

        return await this.ApiService.put(`${this.baseUrl}/UpdateAttendanceFlag`, data).toPromise();

    }

    async DeleteAttendanceFlag(id) {
        return await this.ApiService.delete(`${this.baseUrl}/DeleteAttendanceFlag/${id}`).toPromise();
    }


    async getAttendanceRequestApprover() {

        return await this.ApiService.get(`${this.baseUrl}/GetAttendanceRequestApprovers`).toPromise();

    }
    async addAttendanceRequestApprover(data) {

        return await this.ApiService.post(`${this.baseUrl}/AddAttendanceRequestApprover`, data).toPromise();

    }

    async updateAttendanceRequestApprover(data) {
        return await this.ApiService.put(`${this.baseUrl}/UpdateAttendanceRequestApprover`, data).toPromise();

    }

    async DeleteAttendanceRequestApprover(id) {
        return await this.ApiService.delete(`${this.baseUrl}/DeleteAttendanceRequestApprover/${id}`).toPromise();
    }


    async getAttendanceRequestTypes() {

        return await this.ApiService.get(`${this.baseUrl}/GetAttendanceRequestTypes`).toPromise();
    }
    async addAttendanceRequestType(data) {

        return await this.ApiService.post(`${this.baseUrl}/AddAttendanceRequestType`, data).toPromise();

    }

    async updateAttendanceRequestType(data) {

        let attendanceRequestType = await this.getdataToUpdate(data.key, 'GetAttendanceRequestType');
        attendanceRequestType = { ...attendanceRequestType, ...data.data }
        return await this.ApiService.put(`${this.baseUrl}/UpdateAttendanceRequestType`, attendanceRequestType).toPromise();

    }

    async DeleteAttendanceRequestType(id) {

        return await this.ApiService.delete(`${this.baseUrl}/DeleteAttendanceRequestType/${id}`).toPromise();
    }

    async getFlagCategories() {

        return await this.ApiService.get(`${this.baseUrl}/GetFlagCategories`).toPromise();
    }
    async addFlagCategory(data) {

        return await this.ApiService.post(`${this.baseUrl}/AddFlagCategory`, data).toPromise();

    }

    async updateFlagCategory(data) {

        let flagCategory = await this.getdataToUpdate(data.key, 'GetFlagCategory');
        flagCategory = { ...flagCategory, ...data.data }
        return await this.ApiService.put(`${this.baseUrl}/UpdateFlagCategory`, flagCategory).toPromise();

    }

    async DeleteFlagCategory(id) {
        return await this.ApiService.delete(`${this.baseUrl}/DeleteFlagCategory/${id}`).toPromise();
    }

    async getFlagEffectTypes() {

        return await this.ApiService.get(`${this.baseUrl}/GetFlagEffectTypes`).toPromise();
    }
    async addFlagEffectType(data) {

        return await this.ApiService.post(`${this.baseUrl}/AddFlagEffectType`, data).toPromise();
    }

    async updateFlagEffectType(data) {

        let flagEffecttype = await this.getdataToUpdate(data.key, 'GetFlagEffectType');
        flagEffecttype = { ...flagEffecttype, ...data.data }
        return await this.ApiService.put(`${this.baseUrl}/UpdateFlagEffectType`, flagEffecttype).toPromise();

    }

    async DeleteFlagEffectType(id) {
        return await this.ApiService.delete(`${this.baseUrl}/DeleteFlagEffectType/${id}`).toPromise();
    }

    async getFlagTypes() {

        return await this.ApiService.get(`${this.baseUrl}/GetFlagTypes`).toPromise();
    }
    async addFlagType(data) {

        return await this.ApiService.post(`${this.baseUrl}/AddFlagType`, data).toPromise();

    }

    async updateFlagType(data) {

        let flagtype = await this.getdataToUpdate(data.key, 'GetFlagType');
        flagtype = { ...flagtype, ...data.data }
        return await this.ApiService.put(`${this.baseUrl}/UpdateFlagType`, flagtype).toPromise();

    }

    async DeleteFlagType(id) {
        return await this.ApiService.delete(`${this.baseUrl}/DeleteFlagType/${id}`).toPromise();
    }

    async getFlagValues() {

        return await this.ApiService.get(`${this.baseUrl}/GetFlagValues`).toPromise();

    }
    async addFlagValue(data) {

        return await this.ApiService.post(`${this.baseUrl}/Addflagvalue`, data).toPromise();
    }

    async updateFlagValue(data) {

        let flagvalue = await this.getdataToUpdate(data.key, 'GetFlagValue');
        flagvalue = { ...flagvalue, ...data.data }

        return await this.ApiService.put(`${this.baseUrl}/UpdateFlagValue`, flagvalue).toPromise();

    }

    async DeleteFlagValue(id) {

        return await this.ApiService.delete(`${this.baseUrl}/DeleteFlagValue/${id}`).toPromise();
    }

    async getRosters() {
        return await this.ApiService.get(`${this.baseUrl}/GetRosters`).toPromise();
    }
    async addRoster(data) {

        return await this.ApiService.post(`${this.baseUrl}/AddRoster`, data).toPromise();

    }

    async updateRoster(data) {

        let roster = await this.getdataToUpdate(data.key, 'Getroster');
        roster = { ...roster, ...data.data }
        return await this.ApiService.put(`${this.baseUrl}/UpdateRoster`, roster).toPromise();

    }

    async DeleteRoster(id) {

        return await this.ApiService.delete(`${this.baseUrl}/DeleteRoster/${id}`).toPromise();
    }

    async getShifts() {

        return await this.ApiService.get(`${this.baseUrl}/GetShifts`).toPromise();
    }

    getShift(id): Observable<Shift> {

        return this.ApiService.get(this.baseUrl + '/GetShift/' + id);
    }

    async addShift(data) {

        return await this.ApiService.post(`${this.baseUrl}/AddShift`, data).toPromise();
    }

    updateShift(data: Shift): Observable<any> {
        return this.ApiService.put(`${this.baseUrl}/UpdateShift`, data);

    }

    async DeleteShift(id) {
        return await this.ApiService.delete(`${this.baseUrl}/DeleteShift/${id}`).toPromise();
    }

    async getAllOvertimeType() {
        return await this.ApiService.get(`${this.baseUrl}/GetOverTimeTypes`).toPromise();
    }

    async addOvertimeType(data) {
        return await this.ApiService.post(`${this.baseUrl}/AddOverTimeType`, data).toPromise();
    }

    async updateOvertimeType(data) {

        return await this.ApiService.put(`${this.baseUrl}/UpdateOverTimeType`, data).toPromise();

    }

    async DeleteOvertimeType(overtimetypeId) {
        return await this.ApiService.delete(`${this.baseUrl}/DeleteOverTimeType/${overtimetypeId}`).toPromise();
    }


    async getAllOvertimeFlag() {
        return await this.ApiService.get(`${this.baseUrl}/GetOverTimeFlags`).toPromise();
    }

    async addOvertimeFlag(data) {
        return await this.ApiService.post(`${this.baseUrl}/AddOverTimeFlag`, data).toPromise();
    }

    async updateOvertimeFlag(data) {

        let overtimeflag = await this.getdataToUpdate(data.key, 'GetOverTimeFlag');
        overtimeflag = { ...overtimeflag, ...data.data }
        return await this.ApiService.put(`${this.baseUrl}/UpdateOverTimeFlag`, overtimeflag).toPromise();

    }

    async DeleteOvertimeFlag(overtimeflagId) {

        return await this.ApiService.delete(`${this.baseUrl}/DeleteOverTimeFlag/${overtimeflagId}`).toPromise();
    }

}
