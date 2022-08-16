import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from 'src/app/material.module';

import { CarsComponent } from './cars.component';

describe('CarsComponent', () => {
  let component: CarsComponent;
  let fixture: ComponentFixture<CarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarsComponent],
      imports: [
        AngularMaterialModule,
        BrowserDynamicTestingModule,
        NoopAnimationsModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call sortChange', () => {
    const sortFuncSpy = spyOn(component, 'sortFunc');
    component.sortChange({
      direction: 'asc',
      column: 'make',
    });
    expect(sortFuncSpy).toHaveBeenCalledTimes(1);
  });

  it('should call sortFunc', () => {
    component.sortOrder = 'asc';
    component.sortFunc();

    component.sortOrder = 'desc';
    component.sortFunc();
  });

  it('should call searchCars with filter user value', () => {
    const mockEvent: Event = <Event>(<any>{
      target: {
        value: 'abc',
      },
    });

    const sortFuncSpy = spyOn(component, 'sortFunc');

    component.searchCars(mockEvent);
    expect(sortFuncSpy).toHaveBeenCalledTimes(1);
  });

  it('should call searchCars with filter user empty value', () => {
    const mockEvent: Event = <Event>(<any>{
      target: {
        value: '',
      },
    });

    const sortFuncSpy = spyOn(component, 'sortFunc');

    component.searchCars(mockEvent);
  });
});
