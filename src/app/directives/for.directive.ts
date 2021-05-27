import { 
  ViewContainerRef, 
  TemplateRef, 
  Directive, 
  Input, 
  OnInit
} from '@angular/core';

@Directive({
  selector: '[for]'
})
export class ForDirective implements OnInit {
  @Input('forIn') values!: any[]

  constructor(private container: ViewContainerRef, private template: TemplateRef<any>) {}

  ngOnInit(): void {
    for (let value of this.values) {
      this.container.createEmbeddedView(this.template, { $implicit: value })
    }
  }
}
