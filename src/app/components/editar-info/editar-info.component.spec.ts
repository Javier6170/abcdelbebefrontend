import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInfoComponent } from './editar-info.component';

describe('EditarInfoComponent', () => {
  let component: EditarInfoComponent;
  let fixture: ComponentFixture<EditarInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
