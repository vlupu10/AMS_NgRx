import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmsPortalLayoutComponent } from './ams-portal-layout.component';

describe('AmsPortalLayoutComponent', () => {
  let component: AmsPortalLayoutComponent;
  let fixture: ComponentFixture<AmsPortalLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmsPortalLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmsPortalLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
