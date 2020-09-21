import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appDropdown]',
    // exportAs: 'appDropdown'
})
export class DropdownDirective {
    private isOpen = false;
    constructor(private el: ElementRef, private renderer: Renderer2) {

    }
    // tslint:disable-next-line: typedef
    @HostBinding('class.show') get opened() {
        return this.isOpen;
    }

    @HostListener('click') toggleOpen(): void {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.renderer.addClass(this.el.nativeElement.querySelector('.dropdown-menu'), 'show');
        } else {
            this.renderer.removeClass(this.el.nativeElement.querySelector('.dropdown-menu'), 'show');
        }
    }

    @HostListener('document:click', ['$event.target']) close(targetElement): void {
        const inside: boolean = this.el.nativeElement.contains(targetElement);
        if (!inside) {
            this.isOpen = false;
            this.renderer.removeClass(this.el.nativeElement.querySelector('.dropdown-menu'), 'show');
        }
    }
}
