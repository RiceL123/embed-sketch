import { ButtonComponent } from "obsidian";
import { SketchModal } from "./SketchModal";

export class Brush {
  thickness: string;
  color: string;

  constructor(thickness: string, color: string) {
    this.thickness = thickness;
    this.color = color;
  }
}

export const append_thickness_selector = (menu: HTMLElement, sketchModal: SketchModal): void => {
  let thickness_container = menu.createDiv();
  thickness_container.style.display = 'flex';
  thickness_container.style.flexDirection = 'column';
  thickness_container.style.alignItems = 'center';
  thickness_container.style.gap = '0.3em';

  let brush_thickness = thickness_container.createEl("input");
  brush_thickness.name = 'thickness'
  brush_thickness.type = "range";
  brush_thickness.min = "0";
  brush_thickness.max = "100";
  brush_thickness.value = sketchModal.brush.thickness;
  brush_thickness.oninput = () => {
    sketchModal.brush.thickness = brush_thickness.value;
  }
}

export const append_color_selector = (menu: HTMLElement, sketchModal: SketchModal): void => {
  let color_container = menu.createDiv();
  color_container.style.display = 'flex';
  color_container.style.alignItems = 'center';
  color_container.style.gap = '1em';

  let brush_color = color_container.createEl("input");
  brush_color.type = 'color';
  brush_color.value = sketchModal.brush.color;
  brush_color.oninput = () => {
    sketchModal.brush.color = brush_color.value;
  }

  let predefined_colors = color_container.createDiv();
  predefined_colors.style.display = 'grid';
  predefined_colors.style.gap = '0.4em';
  predefined_colors.style.gridTemplateColumns = 'repeat(5, 1fr)';

  let colors = [
    "#000000", // Black
    "#888888", // Grey
    "#FFFFFF", // White
    "#FF0000", // Red
    "#FFFF00", // Yellow
    "#FF7F50", // Coral
    "#FFBF00", // Amber
    "#00FF00", // Green
    "#DE3163", // Cerise
    "#9FE2BF", // Light Sea Green
    "#40E0D0", // Turquoise
    "#CCCCFF", // Lavender
    "#6495ED", // Cornflower Blue
    "#0000FF", // Blue
    "#FFC0CB", // Pink
  ];

  for (const color of colors) {
    let button = predefined_colors.createEl("button");
    button.value = color;
    button.style.backgroundColor = color;
    button.style.borderRadius = "100%";
    button.style.height = "1.2em";
    button.style.width = "1.2em";
    button.style.padding = '0px';

    button.addEventListener("click", () => {
      brush_color.value = color;
      sketchModal.brush.color = color;
    })
  }
}