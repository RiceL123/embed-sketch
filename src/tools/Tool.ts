import { SketchModal } from "src/SketchModal";
import { getIcon } from "obsidian";
import { ContainerAppend } from "src/Menu";

import { PathTool } from "./PathTool";
import { RectangleTool } from "./RectangleTool";
import { EraserTool } from "./EraserTool";

export interface Tool {
  modal: SketchModal; // for some reason becomes undefined
  is_drawing: boolean;
  startDraw(x: number, y: number): void;
  continueDraw(x:number, y: number): void;
  endDraw(x: number, y:number): void;
}

export const append_tools_selector : ContainerAppend = (menu: HTMLElement, sketchModal: SketchModal): void => {
  let container = menu.createDiv();
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';
  container.style.gap = '0.5em';

  let toolConatainer = container.createDiv();
  toolConatainer.style.display = 'grid';
  toolConatainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
  toolConatainer.style.gap = '0.25em';

  let toolArray: Array<[string, string, Tool]> = [
    ['Path Tool', 'pen-tool', new PathTool(sketchModal)],
    ['Rectangle Tool', 'rectangle-horizontal', new RectangleTool(sketchModal)],
    ['Ellipse Tool', 'circle', new PathTool(sketchModal)],
    ['Eraser Tool', 'eraser', new EraserTool(sketchModal)],
    ['Lasso Tool', 'lasso-select', new PathTool(sketchModal)],
    ['Fill Tool', 'paint-bucket', new PathTool(sketchModal)],
  ]

  for (const [title, icon, tool] of toolArray) {
    let button = toolConatainer.createEl('button');
    button.title = title;
    button.prepend(getIcon(icon));
    button.addEventListener('click', () => {
      sketchModal.tool = tool;
    })
  }
}