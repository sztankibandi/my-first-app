import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {consumerDestroy} from "@angular/core/primitives/signals";

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  @Input() set appUnless(condition: boolean){
    if (!condition){
      this.vcRef.createEmbeddedView(this.templateRef);

    }else{
      this.vcRef.clear();
    }
  }

  constructor(private templateRef:TemplateRef<any>, private vcRef: ViewContainerRef) { }

}
