import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, editorEditorField } from 'obsidian';
import { EmbedSketchSettings } from '../main';
import { Tool } from './tools/Tool';
import { PathTool } from './tools/PathTool';
import { Brush } from './Brush';
import { append_menu } from './Menu';

export class SketchModal extends Modal {
  private settings: EmbedSketchSettings;
  tool: Tool;
  canvas: SVGSVGElement;
  brush: Brush;

  constructor(app: App, settings: EmbedSketchSettings) {
    super(app)
    this.settings = settings;
    console.log("this.contentEl.getCssPropertyValue('--color-accent')" + this.contentEl.getCssPropertyValue("--color-accent"));
    this.brush = new Brush('2', "#ffffff")
    this.modalEl.style.paddingInline = "2em";
    this.modalEl.style.height = '100%';
    this.modalEl.style.width = '100%';
    this.titleEl.textContent = "Embed Sketch";
    this.tool = new PathTool(this);
  }

	onOpen() {
		const { contentEl } = this;

    append_menu(contentEl, this);

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
      // let point = getSVGPoint_touch(e, this.canvas);
      this.tool.endDraw(NaN, NaN);
    });
    this.canvas.addEventListener('touchcancel', (e) => {
      // let point = getSVGPoint_touch(e, this.canvas);
      this.tool.endDraw(NaN, NaN);
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
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}