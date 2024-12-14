import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITodo } from '../models/todo.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  apiUrl: string = 'http://localhost:5001/api/todos'

  getTodos(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(this.apiUrl)
  }

  addTodo(text: string): Observable<ITodo> {
    return this.http.post<ITodo>(this.apiUrl, { text })
  }

  updateTodo(id: string, todo: Partial<ITodo>): Observable<ITodo> {
    return this.http.put<ITodo>(`${this.apiUrl}/${id}`, todo)
  }

  deleteTodo(id: string):Observable<ITodo>{
    return this.http.delete<ITodo>(`${this.apiUrl}/${id}`)
  }
}
