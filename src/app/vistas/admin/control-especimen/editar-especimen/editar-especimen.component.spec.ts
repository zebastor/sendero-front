import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEspecimenComponent } from './editar-especimen.component';

describe('EditarEspecimenComponent', () => {
  let component: EditarEspecimenComponent;
  let fixture: ComponentFixture<EditarEspecimenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarEspecimenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEspecimenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
