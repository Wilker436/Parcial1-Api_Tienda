import { Component, OnInit, Input, OnDestroy, ElementRef, ViewChild, HostListener } from '@angular/core';
import { AnimationController } from '@ionic/angular';



@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  standalone: false,
})
export class SliderComponent implements OnInit, OnDestroy {
  @Input() slides: { img: string, title?: string, description?: string }[] = [];
  @Input() autoPlay: boolean = true;
  @Input() interval: number = 3000;
  @Input() showArrows: boolean = true;
  @Input() showDots: boolean = true;
  @Input() height: string = '300px';
  @Input() effect: 'fade' | 'slide' = 'fade';
  
  @ViewChild('slidesContainer', { static: true }) slidesContainer!: ElementRef;
  
  currentSlide: number = 0;
  private slideInterval: any;
  private startX: number = 0;
  private touchThreshold = 50;
  
  constructor(private animationCtrl: AnimationController) {}
  
  ngOnInit() {
    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }
  
  ngOnDestroy() {
    this.stopAutoPlay();
  }
  
  nextSlide() {
    this.stopAutoPlay();
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }
  
  prevSlide() {
    this.stopAutoPlay();
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }
  
  goToSlide(index: number) {
    if (index === this.currentSlide) return;
    
    this.stopAutoPlay();
    this.currentSlide = index;
    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }
  
  private startAutoPlay() {
    this.stopAutoPlay();
    this.slideInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, this.interval);
  }
  
  private stopAutoPlay() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }
  
  // Touch events for swipe support
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
    this.stopAutoPlay();
  }
  
  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    const endX = event.changedTouches[0].clientX;
    const diffX = endX - this.startX;
    
    if (Math.abs(diffX) > this.touchThreshold) {
      if (diffX > 0) {
        this.prevSlide();
      } else {
        this.nextSlide();
      }
    }
    
    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }
  
  // Pause autoplay when user interacts with slider
  @HostListener('mouseenter')
  onMouseEnter() {
    this.stopAutoPlay();
  }
  
  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }
  
  trackByFn(index: number, item: any): number {
    return index;
  }
}
