import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEstacionComponent } from './crear-estacion.component';

describe('CrearEstacionComponent', () => {
  let component: CrearEstacionComponent;
  let fixture: ComponentFixture<CrearEstacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearEstacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearEstacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
