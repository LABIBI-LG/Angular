import { Component, inject } from '@angular/core';
import { SubjectService } from '../../services/subject.service';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-todolist-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todolist-info.component.html',
  styleUrl: './todolist-info.component.scss',
})
export class TodolistInfoComponent {
  private _subjectService = inject(SubjectService);

  destroy$ = new Subject<void>();
  todosCont = 0;
  data$ = this._subjectService.store$;

  ngOnInit(): void {
    this._subjectService.store$.pipe(
      takeUntil(this.destroy$),
      tap((state) => {
      this.todosCont = state.todos.filter((todo) => todo.done).length;
    })).subscribe();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
