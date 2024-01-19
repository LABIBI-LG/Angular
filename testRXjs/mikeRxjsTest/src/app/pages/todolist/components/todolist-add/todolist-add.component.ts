import { Component, inject } from '@angular/core';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-todolist-add',
  standalone: true,
  imports: [],
  templateUrl: './todolist-add.component.html',
  styleUrl: './todolist-add.component.scss',
})
export class TodolistAddComponent {
  private _subjectService = inject(SubjectService);

  addItem(name: string): void {
    if (!name) {
      return;
    }
    this._subjectService.store$.next({
      todos: [
        ...this._subjectService.store$.value.todos,
        {
          id: this._subjectService.store$.value.todos.length + 1,
          name,
          done: false,
        },
      ],
      loading: false,
    });
  }
}
