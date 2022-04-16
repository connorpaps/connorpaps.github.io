import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemImageDialogComponent } from './add-item-image-dialog.component';

describe('AddItemImageDialogComponent', () => {
  let component: AddItemImageDialogComponent;
  let fixture: ComponentFixture<AddItemImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddItemImageDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
