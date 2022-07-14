import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { TodoService } from 'src/app/common/services/todo.service';
import { Todo } from '../../common/models/todo.model';
import { TodoEditorComponent } from '../todo-editor/todo-editor.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.scss'],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  showErrors: boolean = true;
  httpError: string = '';

  constructor(private todoService: TodoService, private dialogRef: MatDialog) {}

  ngOnInit(): void {
    this.todoService.getAllTodos().subscribe({
      next: (response) => {
        this.todos = response;
        this.httpError = '';
      },
      error: (err) => {
        this.httpError = err.error;
      },
    });
  }

  todoOnSubmit(form: NgForm, todoTextField: NgModel) {
    this.showErrors = true;
    if (form.invalid) return;
    this.todoService
      .addTodo({ title: form.value.text, completed: false })
      .subscribe({
        next: (response) => {
          this.todos.push(response);
          this.httpError = '';
        },
        error: (err) => {
          this.httpError = err.error;
        },
      });
    form.reset();
    this.showErrors = false;
  }

  todoClicked(todo: Todo) {
    this.todoService
      .editTodo(todo._id, { ...todo, completed: !todo.completed })
      .subscribe({
        next: (response) => {
          this.todos[this.todos.findIndex((item) => item._id === todo._id)] =
            response;
          this.httpError = '';
        },
        error: (err) => {
          this.httpError = err.error;
        },
      });
  }

  editTodoClicked(todo: Todo) {
    this.dialogRef
      .open(TodoEditorComponent, {
        width: '700px',
        data: todo,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.todoService.editTodo(result._id, result).subscribe({
            next: (response) => {
              this.todos[
                this.todos.findIndex((item) => item._id === result._id)
              ] = response;
              this.httpError = '';
            },
            error: (err) => {
              this.httpError = err.error;
            },
          });
        }
      });
  }

  deleteTodoClicked(todo: Todo) {
    this.todoService.deleteTodo(todo._id).subscribe({
      next: (response) => {
        this.todos = this.todos.filter((todoItem) => todoItem._id !== todo._id);
        this.httpError = '';
      },
      error: (err) => {
        this.httpError = err.error;
      },
    });
  }
}
