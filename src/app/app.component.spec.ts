import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Data } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { AngularMaterialModule } from './material.module';
import { DataService } from './services/data.service';
import { Observable, of, throwError } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularMaterialModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
      declarations: [AppComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
        {
          provide: MatDialogRef,
          useValue: {},
        },
        DataService,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    dataService = TestBed.inject(DataService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'mvp-user-cars'`, () => {
    expect(component.title).toEqual('mvp-user-cars');
  });

  it('should call sortChange', () => {
    const loadDataSpy = spyOn(component, 'loadData');
    component.sortChange('name:asc');
    expect(loadDataSpy).toHaveBeenCalledTimes(1);
  });

  it('should call loadData', () => {
    spyOn(dataService, 'getUsers').and.returnValue(of([]));
    component.loadData('abc');
    fixture.detectChanges();
    expect(component.dataSource).toEqual([]);
  });

  it('should call loadData error case', () => {
    spyOn(dataService, 'getUsers').and.returnValue(throwError({ status: 404 }));
    component.loadData('abc');
    fixture.detectChanges();
    expect(component.dataSource).toEqual([]);
  });

  it('should call searchUsers with filter user value', () => {
    const mockEvent: Event = <Event>(<any>{
      target: {
        value: 'abc',
      },
    });

    const loadDataSpy = spyOn(component, 'loadData');
    component.searchUsers(mockEvent);
    expect(loadDataSpy).toHaveBeenCalledTimes(1);
  });
});
