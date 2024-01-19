import { Component, inject } from '@angular/core';
import { SubjectService, Todos } from '../../services/subject.service';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todolist-content',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todolist-content.component.html',
  styleUrl: './todolist-content.component.scss',
})
export class TodolistContentComponent {
  private _subjectService = inject(SubjectService);
  data$ = this._subjectService.store$;

  updateItem(id: number): void {
    this._subjectService.store$.next({
      todos: this._subjectService.store$.value.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            done: !todo.done,
          };
        }
        return todo;
      }),
      loading: false,
    });
  }

}
