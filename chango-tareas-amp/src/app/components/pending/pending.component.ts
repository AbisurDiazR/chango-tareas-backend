import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit {
  title = 'Pago pendiente';

  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      {meta: 'keywords', content: 'pago, pendiente, changotareas'},
      {meta: 'description', content: 'pago pendiente de changotareas'},
      {meta: 'content', content: 'pago, pendiente'}
    ]);
  }

}
