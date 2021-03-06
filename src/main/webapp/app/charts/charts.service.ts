import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SERVER_API_URL } from '../app.constants';
import 'rxjs/add/operator/toPromise';
import { CountryCount } from '../home/countrycount';
import { GenericCount } from '../home/genericcount';
import { Validcountry } from '../home/validcountry';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { catchError, map, tap } from 'rxjs/operators';
import { ValueCount } from 'app/home/valuecount';

@Injectable()
export class ChartService {
    private restUrl = SERVER_API_URL + 'api/custom';

    constructor(private http: HttpClient) {}

    getCount(): Observable<String> {
        return this.http.get<String>(this.restUrl + '/count');
    }

    getCountryCountChart(): Observable<GenericCount[]> {
        return this.http
            .get<GenericCount[]>(this.restUrl + '/countrycountchart')
            .pipe(catchError(this.handleError('getCountryCountChart', [])));
    }

    getValidCountries(): Observable<Validcountry[]> {
        return this.http.get<Validcountry[]>(this.restUrl + '/validcountries').pipe(catchError(this.handleError('getValidCountries', [])));
    }

    getSectorCount(): Observable<GenericCount[]> {
        return this.http.get<GenericCount[]>(this.restUrl + '/sectorcount').pipe(catchError(this.handleError('getSectorCount', [])));
    }

    getMinistryCount(): Observable<GenericCount[]> {
        return this.http.get<GenericCount[]>(this.restUrl + '/ministrycount').pipe(catchError(this.handleError('getMinistryCount', [])));
    }

    getSectorValue(): Observable<ValueCount[]> {
        return this.http.get<ValueCount[]>(this.restUrl + '/sectorvalue').pipe(catchError(this.handleError('getSectorValue', [])));
    }

    getProjectStatusCount(): Observable<GenericCount[]> {
        return this.http.get<GenericCount[]>(this.restUrl + '/projectstatuscount').pipe(catchError(this.handleError('getSectorCount', [])));
    }

    getDetailedSectorCount(): Observable<GenericCount[]> {
        return this.http
            .get<GenericCount[]>(this.restUrl + '/detailedsectorcount')
            .pipe(catchError(this.handleError('getSectorCount', [])));
    }

    getSourceCount(): Observable<GenericCount[]> {
        return this.http.get<GenericCount[]>(this.restUrl + '/sourcecount').pipe(catchError(this.handleError('getSourceCount', [])));
    }

    getProjectTypeCount(): Observable<GenericCount[]> {
        return this.http
            .get<GenericCount[]>(this.restUrl + '/projecttypecount')
            .pipe(catchError(this.handleError('getProjectTypeCount', [])));
    }

    getCountryValueChart(): Observable<ValueCount[]> {
        return this.http
            .get<ValueCount[]>(this.restUrl + '/countryvaluechart')
            .pipe(catchError(this.handleError('getCountryValueChart', [])));
    }

    getSourceValue(): Observable<ValueCount[]> {
        return this.http.get<ValueCount[]>(this.restUrl + '/sourcevalue').pipe(catchError(this.handleError('getSourceValue', [])));
    }

    //by country
    getSectorCountByCountry(countryId): Observable<GenericCount[]> {
        return this.http
            .get<GenericCount[]>(this.restUrl + '/sectorcountbycountry?countryId=' + countryId)
            .pipe(catchError(this.handleError('getSectorCountByCountry', [])));
    }

    getMinistryCountByCountry(countryId): Observable<GenericCount[]> {
        return this.http
            .get<GenericCount[]>(this.restUrl + '/ministrycountbycountry?countryId=' + countryId)
            .pipe(catchError(this.handleError('getMinistryCountByCountry', [])));
    }

    getSectorValueByCountry(countryId): Observable<ValueCount[]> {
        return this.http
            .get<ValueCount[]>(this.restUrl + '/sectorvaluebycountry?countryId=' + countryId)
            .pipe(catchError(this.handleError('getSectorValueByCountry', [])));
    }

    getSourceValueByCountry(countryId): Observable<ValueCount[]> {
        return this.http
            .get<ValueCount[]>(this.restUrl + '/sourcevaluebycountry?countryId=' + countryId)
            .pipe(catchError(this.handleError('getSourceValueByCountry', [])));
    }

    getCountryCountChartByCountry(countryId): Observable<GenericCount[]> {
        return this.http
            .get<GenericCount[]>(this.restUrl + '/countrycountchartbycountry?countryId=' + countryId)
            .pipe(catchError(this.handleError('getCountryCountChartByCountry', [])));
    }

    getCountryValueChartByCountry(countryId): Observable<ValueCount[]> {
        return this.http
            .get<ValueCount[]>(this.restUrl + '/countryvaluechartbycountry?countryId=' + countryId)
            .pipe(catchError(this.handleError('getCountryValueChartByCountry', [])));
    }

    getCountByCountry(countryId): Observable<String> {
        return this.http.get<String>(this.restUrl + '/countbycountry?countryId=' + countryId);
    }

    getProjectTypeCountByCountry(countryId): Observable<GenericCount[]> {
        return this.http
            .get<GenericCount[]>(this.restUrl + '/projecttypecountbycountry?countryId=' + countryId)
            .pipe(catchError(this.handleError('getProjectTypeCountByCountry', [])));
    }

    getSourceCountByCountry(countryId): Observable<GenericCount[]> {
        return this.http
            .get<GenericCount[]>(this.restUrl + '/sourcecountbycountry?countryId=' + countryId)
            .pipe(catchError(this.handleError('getSourceCountByCountry', [])));
    }

    getDetailedSectorCountByCountry(countryId): Observable<GenericCount[]> {
        return this.http
            .get<GenericCount[]>(this.restUrl + '/detailedsectorcountbycountry?countryId=' + countryId)
            .pipe(catchError(this.handleError('getSectorCountByCountry', [])));
    }

    getProjectStatusCountByCountry(countryId): Observable<GenericCount[]> {
        return this.http
            .get<GenericCount[]>(this.restUrl + '/projectstatuscountbycountry?countryId=' + countryId)
            .pipe(catchError(this.handleError('getProjectStatusCountByCountry', [])));
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            //this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
