import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodolistAddComponent } from './todolist-add.component';

describe('TodolistAddComponent', () => {
  let component: TodolistAddComponent;
  let fixture: ComponentFixture<TodolistAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodolistAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodolistAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
