import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { apiEndpoints } from '../utils/constants/apiEndpoints';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  getUsers(searchStr: string, sortOrder: string = 'ASC') {
    return this.httpClient.get(
      environment.baseUrl +
        apiEndpoints.getUsers
          .replace('[find]', searchStr)
          .replace('[sortOrder]', sortOrder)
    );
  }

  getUserCars(userId: number, searchStr: string, sortOrder: string = 'ASC') {
    return this.httpClient.get(
      environment.baseUrl +
        apiEndpoints.getCars
          .replace('[id]', userId.toString())
          .replace('[find]', searchStr)
          .replace('[sortOrder]', sortOrder)
    );
  }
}
