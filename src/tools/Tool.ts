import { SketchModal } from "src/SketchModal";

export interface Tool {
  modal: SketchModal; // for some reason becomes undefined
  is_drawing: boolean;
  startDraw(x: number, y: number): void;
  continueDraw(x:number, y: number): void;
  endDraw(x: number, y:number): void;
}