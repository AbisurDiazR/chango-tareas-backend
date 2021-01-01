import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-failure',
  templateUrl: './failure.component.html',
  styleUrls: ['./failure.component.scss']
})
export class FailureComponent implements OnInit {
  title = 'Pago fallido';

  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      {meta: 'keywords', content: 'pago, fallido, changotareas'},
      {meta: 'description', content: 'pago fallido de changotareas'},
      {meta: 'content', content: 'pago, fallido'}
    ]);
  }

}
