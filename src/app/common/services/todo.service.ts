import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Todo } from '../models/todo.model';
import { TodoPost } from '../models/todo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Todo[] = [];

  constructor(private http: HttpClient) {}

  getAllTodos(): Observable<Todo[]> {
    console.log('get all tosos');
    return this.http.get<Todo[]>(environment.baseUrl);
  }

  addTodo(todo: TodoPost): Observable<Todo> {
    return this.http.post<Todo>(environment.baseUrl, todo);
  }

  editTodo(id: string, updatedTodo: Todo): Observable<Todo> {
    return this.http.patch<Todo>(environment.baseUrl, updatedTodo, {
      params: new HttpParams().set('_id', updatedTodo._id),
    });
  }

  deleteTodo(id: string): Observable<unknown> {
    return this.http.delete(environment.baseUrl, {
      params: new HttpParams().set('_id', id),
    });
  }
}
