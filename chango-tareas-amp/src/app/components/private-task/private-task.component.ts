import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-private-task',
  templateUrl: './private-task.component.html',
  styleUrls: ['./private-task.component.scss']
})
export class PrivateTaskComponent implements OnInit {
  tasks = []

  constructor(private taksServices: TasksService) { }

  ngOnInit(): void {
    this.taksServices.getPrivate().subscribe(
      res => {
        console.log(res);
        this.tasks = res.data;
      },
      err => console.log(err)
    );
  }

}
