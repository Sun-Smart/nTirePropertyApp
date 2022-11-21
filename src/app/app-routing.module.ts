import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  // {
  //   path: 'folder/:id',
  //   loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  // },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'customer-side-nav-bar',
    loadChildren: () => import('./customer-side-nav-bar/customer-side-nav-bar.module').then( m => m.CustomerSideNavBarPageModule)
  },
  {
    path: 'login-page',
    loadChildren: () => import('./login-page/login-page.module').then( m => m.LoginPagePageModule)
  },
  {
    path: 'customer-property-details',
    loadChildren: () => import('./customer-property-details/customer-property-details.module').then( m => m.CustomerPropertyDetailsPageModule)
  },
  {
    path: 'fm-my-task',
    loadChildren: () => import('./fm-my-task/fm-my-task.module').then( m => m.FmMyTaskPageModule)
  },
  {
    path: 'fm-additional-page',
    loadChildren: () => import('./fm-additional-page/fm-additional-page.module').then( m => m.FmAdditionalPagePageModule)
  },
  {
    path: 'fm-quick-receipt',
    loadChildren: () => import('./fm-quick-receipt/fm-quick-receipt.module').then( m => m.FmQuickReceiptPageModule)
  },
  {
    path: 'fm-transaction',
    loadChildren: () => import('./fm-transaction/fm-transaction.module').then( m => m.FmTransactionPageModule)
  },
  {
    path: 'fm-property-list',
    loadChildren: () => import('./fm-property-list/fm-property-list.module').then( m => m.FmPropertyListPageModule)
  },
  {
    path: 'fm-payment-details',
    loadChildren: () => import('./fm-payment-details/fm-payment-details.module').then( m => m.FmPaymentDetailsPageModule)
  },
  {
    path: 'fm-issue-ledger',
    loadChildren: () => import('./fm-issue-ledger/fm-issue-ledger.module').then( m => m.FmIssueLedgerPageModule)
  },
  {
    path: 'fm-document-expiry-report',
    loadChildren: () => import('./fm-document-expiry-report/fm-document-expiry-report.module').then( m => m.FmDocumentExpiryReportPageModule)
  },
  {
    path: 'fm-propety-contact-list',
    loadChildren: () => import('./fm-propety-contact-list/fm-propety-contact-list.module').then( m => m.FmPropetyContactListPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
