import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProject } from 'app/shared/model/project.model';

type EntityResponseType = HttpResponse<IProject>;
type EntityArrayResponseType = HttpResponse<IProject[]>;

@Injectable({ providedIn: 'root' })
export class ProjectService {
    private resourceUrl = SERVER_API_URL + 'api/projects';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/projects';

    constructor(private http: HttpClient) {}

    create(project: IProject): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(project);
        return this.http
            .post<IProject>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(project: IProject): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(project);
        return this.http
            .put<IProject>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IProject>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        req = {
            page: 0,
            size: 200,
            sort: ['projectTitle']
        };

        const options = createRequestOption(req);
        return this.http
            .get<IProject[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IProject[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    private convertDateFromClient(project: IProject): IProject {
        const copy: IProject = Object.assign({}, project, {
            startYear: project.startYear != null && project.startYear.isValid() ? project.startYear.format(DATE_FORMAT) : null,
            endYear: project.endYear != null && project.endYear.isValid() ? project.endYear.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.startYear = res.body.startYear != null ? moment(res.body.startYear) : null;
        res.body.endYear = res.body.endYear != null ? moment(res.body.endYear) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((project: IProject) => {
            project.startYear = project.startYear != null ? moment(project.startYear) : null;
            project.endYear = project.endYear != null ? moment(project.endYear) : null;
        });
        return res;
    }
}
