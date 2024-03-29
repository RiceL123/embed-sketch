import { MarkdownView, Notice, getIcon } from "obsidian";
import { SketchModal } from "src/SketchModal";
import { ContainerAppend } from "./Menu";

export const append_embed_button : ContainerAppend = (menu: HTMLElement, sketchModal: SketchModal) : void => {
  let button = menu.createEl("button");
  button.appendChild(getIcon('save'))
  button.title = 'Embed SVG to current page';
  button.style.height = '4.2em';
  button.style.width = '4.2em';

  button.addEventListener('click', () => {   
    const view = sketchModal.app.workspace.getActiveViewOfType(MarkdownView);
    if (view) {
      sketchModal.canvas.style.border = 'none';
      sketchModal.app.workspace.activeEditor?.editor?.replaceSelection(sketchModal.canvas.outerHTML);
      sketchModal.close();
    } else {
      new Notice("⚠️ Could not embed file; no active editor (Consider Copy and Pasting)");
    }
  });
}