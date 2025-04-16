import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarActividadComponent } from './agregar-actividad.component';

describe('AgregarActividadComponent', () => {
  let component: AgregarActividadComponent;
  let fixture: ComponentFixture<AgregarActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarActividadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
