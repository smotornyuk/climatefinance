import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClimatefinanceSharedModule } from 'app/shared';
import {
    IntegrationComponent,
    IntegrationDetailComponent,
    IntegrationUpdateComponent,
    IntegrationDeletePopupComponent,
    IntegrationDeleteDialogComponent,
    integrationRoute,
    integrationPopupRoute
} from './';

const ENTITY_STATES = [...integrationRoute, ...integrationPopupRoute];

@NgModule({
    imports: [ClimatefinanceSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        IntegrationComponent,
        IntegrationDetailComponent,
        IntegrationUpdateComponent,
        IntegrationDeleteDialogComponent,
        IntegrationDeletePopupComponent
    ],
    entryComponents: [IntegrationComponent, IntegrationUpdateComponent, IntegrationDeleteDialogComponent, IntegrationDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClimatefinanceIntegrationModule {}
