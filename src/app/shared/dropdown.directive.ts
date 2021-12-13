import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';



@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.hide-dropdown')
  public isHidden: boolean = true;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isHidden = this.elRef.nativeElement.contains(event.target) ? !this.isHidden : true;
  }
  constructor(private elRef: ElementRef) {}
}
