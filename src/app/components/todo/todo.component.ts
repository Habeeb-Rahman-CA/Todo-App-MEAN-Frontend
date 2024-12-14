import { Component, inject, OnInit } from '@angular/core';
import { ITodo } from '../../models/todo.interface';
import { TodoService } from '../../services/todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {

  todos: ITodo[] = []
  newTodoText: string = ''

  todoService = inject(TodoService)

  ngOnInit(): void {
      
  }

  getTodo(){
    this.todoService.getTodos().subscribe((todos: ITodo[]) =>{
      this.todos = todos
    })
  }

  addTodo(){
    if (!this.newTodoText) return
    this.todoService.addTodo(this.newTodoText).subscribe((newTodo:ITodo) =>{
      this.todos.push(newTodo)
      this.newTodoText = ''
    })
  }

  toggleTodo(todo: ITodo){
    todo.isCompleted = !todo.isCompleted
    this.todoService.updateTodo(todo._id, {isCompleted: todo.isCompleted}).subscribe()
  }

  deleteTodo(id: string){
    this.todoService.deleteTodo(id).subscribe(() =>{
      this.todos = this.todos.filter((todo) => todo._id !== id)
    })
  }

}
