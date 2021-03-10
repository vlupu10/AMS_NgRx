import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnDestroyComponent } from './on-destroy.component';

describe('OnDestroyComponent', () => {
  let component: OnDestroyComponent;
  let fixture: ComponentFixture<OnDestroyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnDestroyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnDestroyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
