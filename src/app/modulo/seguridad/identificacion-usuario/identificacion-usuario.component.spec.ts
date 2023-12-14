import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificacionUsuarioComponent } from './identificacion-usuario.component';
import { CommonModule } from '@angular/common';

describe('IdentificacionUsuarioComponent', () => {
  let component: IdentificacionUsuarioComponent;
  let fixture: ComponentFixture<IdentificacionUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdentificacionUsuarioComponent,]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdentificacionUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
