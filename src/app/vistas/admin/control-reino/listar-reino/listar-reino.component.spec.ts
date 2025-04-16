import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarReinoComponent } from './listar-reino.component';

describe('ListarReinoComponent', () => {
  let component: ListarReinoComponent;
  let fixture: ComponentFixture<ListarReinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarReinoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarReinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
