import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { tap } from 'rxjs';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-todolist-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todolist-info.component.html',
  styleUrl: './todolist-info.component.scss',
})
export class TodolistInfoComponent {
  private _subjectService = inject(SubjectService);

  todosCont = 0;
  data$ = this._subjectService.store$.pipe(
    tap((state) => {
      this.todosCont = state.todos.filter((todo) => todo.done).length;
    })
  );
}
