import { SketchModal } from './SketchModal';
import { append_embed_button } from './EmbedButton'
import { append_tools_selector } from './tools/Tool';
import { append_color_selector, append_thickness_selector } from './Brush';
import { append_clear } from './Clear';
import { append_copy } from './Copy';

export interface ContainerAppend {
  (container: HTMLElement, sketchModal: SketchModal): void;
}

export const append_menu = (container: HTMLElement, sketchModal: SketchModal): void => {
  let table = container.createEl('table');
  table.style.borderCollapse = 'collapse';
  table.style.marginBottom = '0.8em';
  let tbody = table.createEl('tbody');

  let menuArr: Array<[ContainerAppend, string]> = [
    [append_embed_button, "Embed"],
    [append_tools_selector, "Tools"],
    [append_thickness_selector, "Thickness"],
    [append_color_selector, "Colour"],
    [append_clear, "Clear"],
    [append_copy, "Copy"],
  ];

  let row1 = tbody.createEl('tr');
  let row2 = tbody.createEl('tr');

  for (const [func, label] of menuArr) {
    let cell1 = row1.createEl('td');
    cell1.style.paddingInline = '0.8em';
    cell1.style.borderRight = '0.5px solid var(--color-accent)';
    cell1.style.textAlign = 'center';
    func(cell1, sketchModal)

    let cell2 = row2.createEl('td');
    cell2.style.paddingInline = '0.8em';
    cell2.style.textAlign = 'center';
    cell2.style.borderRight = '0.5px solid var(--color-accent)';
    cell2.createDiv().textContent = label;
  }
}