import { SketchModal } from "src/SketchModal";
import { PathTool } from "./PathTool";
import { RectangleTool } from "./RectangleTool";
import { getIcon } from "obsidian";

export interface Tool {
  modal: SketchModal; // for some reason becomes undefined
  is_drawing: boolean;
  startDraw(x: number, y: number): void;
  continueDraw(x:number, y: number): void;
  endDraw(x: number, y:number): void;
}

export const append_tools_selector = (menu: HTMLElement, sketchModal: SketchModal): void => {
  let container = menu.createDiv();
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';
  container.style.gap = '0.5em';

  let toolConatainer = container.createDiv();
  toolConatainer.style.display = 'grid';
  toolConatainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
  toolConatainer.style.gap = '0.25em';

  let path = toolConatainer.createEl("button");
  path.title = 'Path Tool';
  path.prepend(getIcon('pen-tool'));
  // let pen_icon = getIcon('pen-tool');

  path.addEventListener("click", () => {
    sketchModal.tool = new PathTool(sketchModal);
  });

  let rect = toolConatainer.createEl("button");
  rect.title = 'Rectangle Tool';
  rect.prepend(getIcon('rectangle-horizontal'));
  rect.addEventListener("click", () => {
    console.log("changing to rectangle")
    sketchModal.tool = new RectangleTool(sketchModal);
    console.log(sketchModal);
  });

  let circle = toolConatainer.createEl("button");
  circle.title = 'Ellipse Tool';
  circle.prepend(getIcon('circle'));

  circle.addEventListener("click", () => {
    sketchModal.tool = new RectangleTool(sketchModal);
  });

  let eraser = toolConatainer.createEl("button");
  eraser.title = 'Eraser Tool';
  eraser.prepend(getIcon('eraser'));

  eraser.addEventListener("click", () => {
    sketchModal.tool = new RectangleTool(sketchModal);
  });

  let lasso = toolConatainer.createEl("button");
  lasso.title = 'Lasso Tool';
  lasso.prepend(getIcon('lasso-select'));

  lasso.addEventListener("click", () => {
    sketchModal.tool = new RectangleTool(sketchModal);
  });

  let fill = toolConatainer.createEl("button");
  fill.title = 'Fill Tool';
  fill.prepend(getIcon('paint-bucket'));

  fill.addEventListener("click", () => {
    sketchModal.tool = new RectangleTool(sketchModal);
  });

  // container.createEl('div').textContent = 'Tools';
}