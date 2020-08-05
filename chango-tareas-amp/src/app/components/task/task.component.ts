import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  tasks = [];

  constructor(private taskService: TasksService) { }

  ngOnInit(): void {
    this.taskService.getTask().subscribe(
      res => {
        console.log(res);
        this.tasks = res.data; //asignamos el res a la propiedad task
      },
      err => console.log(err)
    );
  }

}
