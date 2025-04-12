import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEspecimenComponent } from './agregar-especimen.component';

describe('AgregarEspecimenComponent', () => {
  let component: AgregarEspecimenComponent;
  let fixture: ComponentFixture<AgregarEspecimenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarEspecimenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEspecimenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
