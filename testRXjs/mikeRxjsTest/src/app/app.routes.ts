import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        title: 'RXJS test',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'search',
        title: 'Search',
        loadComponent: () =>
          import('./pages/search/search.component').then(
            (m) => m.SearchComponent
          ),
      },
      {
        path: 'todolist',
        title: 'Todolist',
        loadComponent: () =>
          import('./pages/todolist/todolist.component').then(
            (m) => m.TodolistComponent
          ),
      }
    ],
  },
];
