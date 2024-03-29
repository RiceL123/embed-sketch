import { Notice, getIcon } from "obsidian";
import { SketchModal } from "./SketchModal";
import { ContainerAppend } from "./Menu";

export const append_copy : ContainerAppend = (menu: HTMLElement, sketchModal: SketchModal) : void => {
  let button = menu.createEl("button");
  button.appendChild(getIcon('clipboard-copy'));
  button.title = 'Copy SVG to clipboard'
  button.style.height = '4.2em';
  button.style.width = '4.2em';

  button.addEventListener('click', () => {
    navigator.clipboard.writeText(sketchModal.canvas.outerHTML);
    new Notice(`Copied to Clipboard 🤩🤩🤩`)
  });
}