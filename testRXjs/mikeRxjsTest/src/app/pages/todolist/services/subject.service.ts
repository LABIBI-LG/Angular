import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface TodoState {
  loading: boolean;
  todos: Todos[];
}

export interface Todos {
  id: number;
  name: string;
  done: boolean;
}

@Injectable({
  providedIn: 'root',
})

export class SubjectService {
  store$ = new BehaviorSubject<TodoState>({
    loading: false,
    todos: [
      { id: 1, name: 'Todo Item 1', done: false },
      { id: 2, name: 'Todo Item 2', done: true },
      { id: 3, name: 'Todo Item 3', done: false },
    ],
  });


}
