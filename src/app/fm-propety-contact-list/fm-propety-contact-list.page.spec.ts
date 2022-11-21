import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FmPropetyContactListPage } from './fm-propety-contact-list.page';

describe('FmPropetyContactListPage', () => {
  let component: FmPropetyContactListPage;
  let fixture: ComponentFixture<FmPropetyContactListPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FmPropetyContactListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FmPropetyContactListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
