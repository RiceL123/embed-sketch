import { SketchModal } from "../SketchModal";
import { Tool } from "./Tool";

export class EraserTool implements Tool {
  modal: SketchModal;
  is_drawing: boolean;
  lastX: number;
  lastY: number;

  constructor(modal: SketchModal) {
    this.modal = modal;
  }

  startDraw(x: number, y: number): void {
    this.is_drawing = true;
    this.lastX = x;
    this.lastY = y;
    // Remove elements intersecting with the eraser
    this.erase(x, y);
  }

  continueDraw(x: number, y: number): void {
    if (this.is_drawing) {
      // Remove elements intersecting with the eraser along the path
      this.erase(x, y);
      this.lastX = x;
      this.lastY = y;
    }
  }

  endDraw(x: number, y: number): void {
    this.is_drawing = false;
  }

  private erase(x: number, y: number): void {
    const elements = this.modal.canvas.querySelectorAll("*");
    elements.forEach((element) => {
      if (this.isIntersecting(x, y, element)) {
        element.remove();
      }
    });
  }

  private isIntersecting(x: number, y: number, element: SVGElement): boolean {
    const bbox = element.getBoundingClientRect();
    return x >= bbox.x && x <= bbox.x + bbox.width && y >= bbox.y && y <= bbox.y + bbox.height;
  }
}