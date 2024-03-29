import { SketchModal } from "src/SketchModal";
import { Tool } from "./Tool";

export class PathTool implements Tool {
  modal: SketchModal;
  is_drawing: boolean;
  path: SVGPathElement;

  constructor(modal: SketchModal) {
    this.modal = modal;
    console.log(`modal canvas: ${modal.canvas}`)
    console.log(this.modal)
  }

  startDraw(x: number, y: number): void {
    console.log(`PathTool: x: ${x} y: ${y}`)
    this.is_drawing = true;

    this.path = this.modal.canvas.createSvg("path");
    this.path.style.fill = 'none'
    this.path.style.stroke = this.modal.brush.color;
    this.path.style.strokeWidth = `${this.modal.brush.thickness}`;
    
    this.path.setAttribute("d", `M ${x},${y}`);
  }

  continueDraw(x: number, y: number): void {
    if (this.is_drawing) {
      const currentDAttribute = this.path.getAttribute("d");
      const newDAttribute = `${currentDAttribute} L ${x},${y}`;
      this.path.setAttribute("d", newDAttribute);
    }
  }
  endDraw(x: number, y: number): void {
    console.log(`PathTool: x: ${x} y: ${y}`)
    this.is_drawing = false;
  }

}