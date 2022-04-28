import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaAdminComponent } from './vista-admin.component';

describe('VistaAdminComponent', () => {
  let component: VistaAdminComponent;
  let fixture: ComponentFixture<VistaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
