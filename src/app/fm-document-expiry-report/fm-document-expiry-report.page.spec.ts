import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FmDocumentExpiryReportPage } from './fm-document-expiry-report.page';

describe('FmDocumentExpiryReportPage', () => {
  let component: FmDocumentExpiryReportPage;
  let fixture: ComponentFixture<FmDocumentExpiryReportPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FmDocumentExpiryReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FmDocumentExpiryReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
