import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEtapaComponent } from './editar-etapa.component';

describe('EditarEtapaComponent', () => {
  let component: EditarEtapaComponent;
  let fixture: ComponentFixture<EditarEtapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarEtapaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEtapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
