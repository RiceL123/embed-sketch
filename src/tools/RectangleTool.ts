import { SketchModal } from "src/SketchModal";
import { Tool } from "./Tool";

export class RectangleTool implements Tool {
  modal: SketchModal;
  is_drawing: boolean;
  rectangle: SVGRectElement;
  startX: number;
  startY: number;

  constructor(modal: SketchModal) {
    this.modal = modal;
  }

  startDraw(x: number, y: number): void {
    console.log(`modal: canvas: ${this.modal.canvas}`);
    console.log(this.modal);

    console.log(`RectangleTool: x: ${x} y: ${y}`)
    this.is_drawing = true;

    this.rectangle = this.modal.canvas.createSvg('rect');
    this.rectangle.style.fill = 'none';
    this.rectangle.style.stroke = this.modal.brush.color;
    this.rectangle.style.strokeWidth = `${this.modal.brush.thickness}`;

    this.startX = x;
    this.startY = y;

    this.rectangle.setAttribute("x", String(x));
    this.rectangle.setAttribute("y", String(y));
    this.rectangle.setAttribute("width", "0");
    this.rectangle.setAttribute("height", "0");
  }

  continueDraw(x: number, y: number): void {
    console.log(`RectangleTool: x: ${x} y: ${y}`)
    if (this.is_drawing) {
      const width = x - this.startX;
      const height = y - this.startY;
      this.rectangle.setAttribute("x", String(width >= 0 ? this.startX : x));
      this.rectangle.setAttribute("y", String(height >= 0 ? this.startY : y));
      this.rectangle.setAttribute("width", String(Math.abs(width)));
      this.rectangle.setAttribute("height", String(Math.abs(height)));
    }
  }

  endDraw(x: number, y: number): void {
    console.log(`RectangleTool: x: ${x} y: ${y}`)
    this.is_drawing = false;
  }
}