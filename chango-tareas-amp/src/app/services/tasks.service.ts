import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private URL = 'https://chango-tareas-backend.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  getTask(){
    return this.http.get<any>(this.URL + '/task');
  }

  getPrivate(){
    return this.http.get<any>(this.URL + '/private');
  }
}
