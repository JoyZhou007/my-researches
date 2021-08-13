import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-fires',
  templateUrl: './fires.component.html',
  styleUrls: ['./fires.component.scss'],
})
export class FiresComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', { static: true, read: ElementRef })
  canvas: ElementRef;
  canvasEle: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  particles: fireEntity[];
  rid: number;

  constructor() {}

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.canvasEle = this.canvas.nativeElement;
    this.canvasEle.width = window.innerWidth;
    this.canvasEle.height = window.innerHeight;
    this.ctx = this.canvasEle.getContext('2d');
    document.addEventListener(
      'mousedown',
      this.mousedownHandler.bind(this),
      false
    );
  }

  mousedownHandler(e: MouseEvent) {
    const x = e.clientX;
    const y = e.clientY;

    this.createFireWorks(x, y);
    let radius = 0; //圆心半径
    const tick = () => {
      //tips:注意新加入的这4行代码
      // this.ctx.globalCompositeOperation = 'destination-out';
      // this.ctx.fillStyle = 'rgba(0,0,0,' + 10 / 100 + ')';
      // this.ctx.fillRect(0, 0, this.canvasEle.width, this.canvasEle.height);
      // this.ctx.globalCompositeOperation = 'lighter';
      // //tipsend
      this.drawFires(); //绘制烟花
      radius++; //半径不断变大
      this.rid = requestAnimationFrame(tick);
    };
    cancelAnimationFrame(this.rid);
    tick();
  }

  drawFires() {
    this.clearCanvas();

    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];

      p.vx = p.sx + Math.cos(p.radians) * p.radius;
      p.vy = p.sy + Math.sin(p.radians) * p.radius;

      p.radius += 1 + p.speed;
      // p.x += vx;
      // p.y += vy;

      // p.radius *= 1 - p.speed / 100;

      // if (p.alpha <= 0) {
      //   this.particles.splice(i, 1);
      //   continue;
      // }

      const context = this.ctx;
      context.beginPath();
      context.arc(p.vx, p.vy, p.size, 0, Math.PI * 2, false);
      context.closePath();

      context.fillStyle =
        'hsla(' + p.hue + ', 100%,' + p.brightness + '%, ' + p.alpha + ')';
      context.fill();
    }
  }

  clearCanvas() {
    // this.ctx.clearRect(0, 0, this.canvasEle.width, this.canvasEle.height);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, this.canvasEle.width, this.canvasEle.height);
  }

  createFireWorks(sx, sy) {
    this.particles = [];

    let hue = Math.floor(Math.random() * 51) + 150;
    let hueletiance = 30;
    let count = 100;

    for (let i = 0; i < count; i++) {
      let p: fireEntity = new fireEntity();

      let angle = Math.floor(Math.random() * 360);
      p.radians = (angle * Math.PI) / 180;
      p.radius = 0;

      p.sx = sx;
      p.sy = sy;

      p.speed = Math.random() * 5 + 0.4;

      p.size = Math.floor(Math.random() * 3) + 1;

      p.hue =
        Math.floor(Math.random() * (hue + hueletiance - (hue - hueletiance))) +
        (hue - hueletiance);
      p.brightness = Math.floor(Math.random() * 31) + 50;
      p.alpha = (Math.floor(Math.random() * 61) + 40) / 100;

      this.particles.push(p);
    }
  }
}

class fireEntity {
  radians: number;
  radius: number;
  sx: number;
  sy: number;
  speed: number;
  size: number;
  brightness: number;
  hue: number;
  alpha: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
}
