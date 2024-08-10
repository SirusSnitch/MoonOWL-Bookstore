import { Component, ElementRef, ViewChild, HostListener, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('stars', { static: false }) stars!: ElementRef;


  ngAfterViewInit() {
    // Now you can access the element using this.stars.nativeElement
    this.applyParallaxEffect();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    this.applyParallaxEffect();
  }

  applyParallaxEffect() {
    const scrollPosition = window.pageYOffset;
    this.stars.nativeElement.style.transform = `translateX(${scrollPosition * -0.7}px)`;
  }

  
}