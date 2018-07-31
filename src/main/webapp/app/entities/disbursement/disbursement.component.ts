import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDisbursement } from 'app/shared/model/disbursement.model';
import { Principal } from 'app/core';
import { DisbursementService } from './disbursement.service';

@Component({
    selector: 'jhi-disbursement',
    templateUrl: './disbursement.component.html'
})
export class DisbursementComponent implements OnInit, OnDestroy {
    disbursements: IDisbursement[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private disbursementService: DisbursementService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.disbursementService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IDisbursement[]>) => (this.disbursements = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.disbursementService.query().subscribe(
            (res: HttpResponse<IDisbursement[]>) => {
                this.disbursements = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDisbursements();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDisbursement) {
        return item.id;
    }

    registerChangeInDisbursements() {
        this.eventSubscriber = this.eventManager.subscribe('disbursementListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
