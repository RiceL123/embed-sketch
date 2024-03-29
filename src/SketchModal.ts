import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, editorEditorField } from 'obsidian';
import { EmbedSketchSettings } from '../main';
import { generateEmbedButton } from './EmbedButton'
import { Tool } from './tools/Tool';
import { PathTool } from './tools/PathTool';
import { RectangleTool } from './tools/RectangleTool';
import { Brush, append_color_selector, append_thickness_selector } from './Brush';

export class SketchModal extends Modal {
  private settings: EmbedSketchSettings;
  private tool: Tool;
  canvas: SVGSVGElement;
  brush: Brush;

  constructor(app: App, settings: EmbedSketchSettings) {
    super(app)
    this.settings = settings;
    this.brush = new Brush('2', '#e25050')
    this.modalEl.style.padding = "40px";
    this.modalEl.style.height = '100%';
    this.modalEl.style.width = '100%';
    this.titleEl.textContent = "Embed Sketch";
    this.tool = new PathTool(this);
  }

	onOpen() {
		const { contentEl } = this;

    let menu = contentEl.createDiv("Menu");
    menu.style.display = 'flex';
    menu.style.alignItems = 'center';
    menu.style.padding = '1em';
    menu.style.gap = '0.6em';

    this.canvas = contentEl.createSvg("svg");
    this.canvas.style.height = this.settings.svg_height;
    this.canvas.style.width = this.settings.svg_width;
    this.canvas.style.border = 'solid';

    this.canvas.addEventListener('touchstart', (e) => {
      let point = getSVGPoint_touch(e, this.canvas);
      this.tool.startDraw(point.x, point.y);
    });
    this.canvas.addEventListener("touchmove", (e) => {
      let point = getSVGPoint_touch(e, this.canvas);
      this.tool.continueDraw(point.x, point.y);
    });
    this.canvas.addEventListener('touchend', (e) => {
      let point = getSVGPoint_touch(e, this.canvas);
      this.tool.endDraw(point.x, point.y);
    });

    function getSVGPoint_touch(event: TouchEvent, canvas: SVGSVGElement) {
      var point = canvas.createSVGPoint();
      point.x = event.touches[0].clientX;
      point.y = event.touches[0].clientY;
      return point.matrixTransform(canvas.getScreenCTM()?.inverse());
    }

    this.canvas.addEventListener('mousedown', (e) => {
      let point = getSVGPoint(e, this.canvas);
      this.tool.startDraw(point.x, point.y);
    });
    this.canvas.addEventListener("mousemove", (e) => {
      let point = getSVGPoint(e, this.canvas);
      this.tool.continueDraw(point.x, point.y);
    });
    this.canvas.addEventListener("mouseup", (e) => {
      let point = getSVGPoint(e, this.canvas);
      this.tool.endDraw(point.x, point.y);
    });
  
    function getSVGPoint(event: MouseEvent, canvas: SVGSVGElement) {
      var point = canvas.createSVGPoint();
      point.x = event.clientX;
      point.y = event.clientY;
      return point.matrixTransform(canvas.getScreenCTM()?.inverse());
    }

    let save = menu.createEl("button");
    generateEmbedButton(save, this.canvas, this);

    let path = menu.createEl("button");
    path.textContent = "path";
    path.addEventListener("click", () => {
      this.tool = new PathTool(this);
    });

    let rect = menu.createEl("button");
    rect.textContent = "rectangle";
    rect.addEventListener("click", () => {
      this.tool = new RectangleTool(this);
    });
  
    append_thickness_selector(menu, this.brush);
    append_color_selector(menu, this.brush);
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}