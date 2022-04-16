import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWantedComponent } from './create-wanted.component';

describe('CreateWantedComponent', () => {
  let component: CreateWantedComponent;
  let fixture: ComponentFixture<CreateWantedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWantedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWantedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
