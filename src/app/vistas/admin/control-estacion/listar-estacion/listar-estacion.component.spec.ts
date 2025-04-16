import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEstacionComponent } from './listar-estacion.component';

describe('ListarEstacionComponent', () => {
  let component: ListarEstacionComponent;
  let fixture: ComponentFixture<ListarEstacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarEstacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEstacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
