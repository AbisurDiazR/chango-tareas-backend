import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  title = 'Pago exitoso';

  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      {name: 'keywords', content: 'MercadoPago, Success, Page Notification'},
      {name: 'description', content: 'MercadoPago Success Page Notification'},
      {name: 'content', content: 'success'}
    ]);
  }

}
