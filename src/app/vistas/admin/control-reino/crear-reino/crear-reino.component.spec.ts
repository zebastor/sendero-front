import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearReinoComponent } from './crear-reino.component';

describe('CrearReinoComponent', () => {
  let component: CrearReinoComponent;
  let fixture: ComponentFixture<CrearReinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearReinoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearReinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
