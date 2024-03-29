import { SketchModal } from './SketchModal';
import { append_embed_button } from './EmbedButton'
import { append_tools_selector } from './tools/Tool';
import { append_color_selector, append_thickness_selector } from './Brush';
import { append_clear } from './Clear';
import { append_copy } from './Copy';

export const append_menu = (container: HTMLElement, sketchModal: SketchModal): void => {
  let table = container.createEl('table');
  table.style.borderCollapse = 'collapse';
  table.style.marginBottom = '0.8em';
  let tbody = table.createEl('tbody');

  let menuArr: Array<[Function, string]> = [
    [append_embed_button, "Embed"],
    [append_tools_selector, "Tools"],
    [append_thickness_selector, "Thickness"],
    [append_color_selector, "Colour"],
    [append_clear, "Clear"],
    [append_copy, "Copy"],
  ];

  let row1 = tbody.createEl('tr');
  for (const [func, _] of menuArr) {
    let cell = row1.createEl('td');
    cell.style.paddingInline = '0.8em';
    cell.style.borderRight = '0.5px solid var(--color-accent)';
    cell.style.textAlign = 'center';
    func(cell, sketchModal)
  }

  let row2 = tbody.createEl('tr');
  for (const [_, label] of menuArr) {
    let cell = row2.createEl('td');
    cell.style.paddingInline = '0.8em';
    cell.style.textAlign = 'center';
    cell.style.borderRight = '0.5px solid var(--color-accent)';
    cell.createDiv().textContent = label;
  }
}