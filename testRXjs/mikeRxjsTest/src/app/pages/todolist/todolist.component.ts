import { Component, OnInit, inject } from '@angular/core';
import { tap } from 'rxjs';
import { SubjectService, Todos } from './services/subject.service';
import { TodolistAddComponent } from './components/todolist-add/todolist-add.component';
import { TodolistContentComponent } from './components/todolist-content/todolist-content.component';
import { TodolistInfoComponent } from './components/todolist-info/todolist-info.component';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [
    TodolistAddComponent,
    TodolistContentComponent,
    TodolistInfoComponent,
  ],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.scss',
})
export class TodolistComponent implements OnInit {
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

}
