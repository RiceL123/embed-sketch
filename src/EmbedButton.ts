import { SketchModal } from "src/SketchModal";

export const generateEmbedButton = (button: HTMLButtonElement, svg: SVGSVGElement, sketchModal: SketchModal) : void => {
  button.textContent = 'save';
  button.addEventListener('click', () => {
    console.log(`saving ${svg.outerHTML} to active file`);
    svg.style.border = 'none';
    sketchModal.app.workspace.activeEditor?.editor?.replaceSelection(svg.outerHTML);
    sketchModal.close();
  });
}