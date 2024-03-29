import { Notice, getIcon } from "obsidian";
import { SketchModal } from "./SketchModal";

export const append_copy = (menu: HTMLElement, sketchModal: SketchModal) : void => {
  let button = menu.createEl("button");
  button.appendChild(getIcon('clipboard-copy'));
  button.style.height = '4.2em';
  button.style.width = '4.2em';

  button.addEventListener('click', () => {
    navigator.clipboard.writeText(sketchModal.canvas.outerHTML);
    new Notice(`Copied to Clipboard 🤩🤩🤩`)
  });
}