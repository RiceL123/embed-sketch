export class Brush {
  thickness: string;
  color: string;

  constructor(thickness: string, color: string) {
    this.thickness = thickness;
    this.color = color;
  }
}

export const append_thickness_selector = (menu: HTMLElement, brush: Brush): void => {
  let thickness_container = menu.createDiv();
  thickness_container.style.display = 'flex';
  thickness_container.style.alignItems = 'center';
  thickness_container.style.gap = '0.3em';

  let thickness_label = thickness_container.createEl("label");
  thickness_label.textContent = "thickness:";
  thickness_label.htmlFor = "thickness";

  let brush_thickness = thickness_container.createEl("input");
  brush_thickness.name = 'thickness'
  brush_thickness.type = "range";
  brush_thickness.min = "0";
  brush_thickness.max = "100";
  brush_thickness.value = brush.thickness;
  brush_thickness.oninput = () => {
    brush.thickness = brush_thickness.value;
  }
}

export const append_color_selector = (menu: HTMLElement, brush: Brush): void => {
    let color_container = menu.createDiv();
    color_container.style.display = 'flex';
    color_container.style.alignItems = 'center';
    color_container.style.gap = '0.3em';

    let color_label = color_container.createEl("label");
    color_label.textContent = "color:";
    color_label.htmlFor = "color";
    
    let brush_color = color_container.createEl("input");
    brush_color.type = 'color';
    brush_color.name = 'color';
    brush_color.value = brush.color;
    brush_color.oninput = () => {
      brush.color = brush_color.value;
    }
}