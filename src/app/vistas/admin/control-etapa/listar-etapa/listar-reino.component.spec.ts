import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEtapaComponent } from './listar-etapa.component';

describe('ListarEtapaComponent', () => {
  let component: ListarEtapaComponent;
  let fixture: ComponentFixture<ListarEtapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarEtapaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEtapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
