import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarReinoComponent } from './editar-reino.component';

describe('EditarReinoComponent', () => {
  let component: EditarReinoComponent;
  let fixture: ComponentFixture<EditarReinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarReinoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarReinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
