import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from 'src/app/common/models/todo.model';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss'],
})
export class TodoItemsComponent {
  @Input() todo: Todo | undefined;
  @Output() todoClicked: EventEmitter<void> = new EventEmitter();
  @Output() deleteTodoClicked: EventEmitter<void> = new EventEmitter();
  @Output() editTodoClicked: EventEmitter<void> = new EventEmitter();

  constructor() {}

  onTodoClicked() {
    this.todoClicked.emit();
  }
  deleteTodo(): void {
    this.deleteTodoClicked.emit();
  }
  editTodo(): void {
    this.editTodoClicked.emit();
  }
}
