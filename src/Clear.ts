import { getIcon } from "obsidian";
import { SketchModal } from "./SketchModal";

export const append_clear = (menu: HTMLElement, sketchModal: SketchModal) : void => {
  let button = menu.createEl("button");
  button.appendChild(getIcon('refresh-cw'));
  button.style.height = '4.2em';
  button.style.width = '4.2em';

  button.addEventListener('click', () => {
    sketchModal.canvas.textContent = ''
  });
}