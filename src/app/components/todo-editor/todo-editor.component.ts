import {
  Component,
  Inject
} from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { Todo } from 'src/app/common/models/todo.model';
import { TodoService } from 'src/app/common/services/todo.service';

@Component({
  selector: 'app-todo-editor',
  templateUrl: './todo-editor.component.html',
  styleUrls: ['./todo-editor.component.scss'],
})
export class TodoEditorComponent {
  showErrors: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<TodoEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public todo: Todo,
    private todoService: TodoService
  ) {}

  onEditDialogSubmit(form: NgForm) {
    this.showErrors = true;
    if (form.invalid) return;
    this.dialogRef.close({ ...this.todo, title: form.value.text });
    this.showErrors = false;
  }

  closeEditTodoDialog() {
    this.dialogRef.close();
  }
}
