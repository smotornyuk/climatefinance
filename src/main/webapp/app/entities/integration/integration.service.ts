import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IIntegration } from 'app/shared/model/integration.model';

type EntityResponseType = HttpResponse<IIntegration>;
type EntityArrayResponseType = HttpResponse<IIntegration[]>;

@Injectable({ providedIn: 'root' })
export class IntegrationService {
    private resourceUrl = SERVER_API_URL + 'api/integrations';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/integrations';

    constructor(private http: HttpClient) {}

    create(integration: IIntegration): Observable<EntityResponseType> {
        return this.http.post<IIntegration>(this.resourceUrl, integration, { observe: 'response' });
    }

    update(integration: IIntegration): Observable<EntityResponseType> {
        return this.http.put<IIntegration>(this.resourceUrl, integration, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IIntegration>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IIntegration[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IIntegration[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
