import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodolistInfoComponent } from './todolist-info.component';

describe('TodolistInfoComponent', () => {
  let component: TodolistInfoComponent;
  let fixture: ComponentFixture<TodolistInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodolistInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodolistInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
