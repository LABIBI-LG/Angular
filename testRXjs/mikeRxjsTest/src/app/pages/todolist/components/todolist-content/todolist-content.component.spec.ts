import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodolistContentComponent } from './todolist-content.component';

describe('TodolistContentComponent', () => {
  let component: TodolistContentComponent;
  let fixture: ComponentFixture<TodolistContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodolistContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodolistContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
