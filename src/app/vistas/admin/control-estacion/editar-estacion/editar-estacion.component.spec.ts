import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEstacionComponent } from './editar-estacion.component';

describe('EditarEstacionComponent', () => {
  let component: EditarEstacionComponent;
  let fixture: ComponentFixture<EditarEstacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarEstacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEstacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
