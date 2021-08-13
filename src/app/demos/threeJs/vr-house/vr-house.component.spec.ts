import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VrHouseComponent } from './vr-house.component';

describe('VrHouseComponent', () => {
  let component: VrHouseComponent;
  let fixture: ComponentFixture<VrHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VrHouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VrHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
