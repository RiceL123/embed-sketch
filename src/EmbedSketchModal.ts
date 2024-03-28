import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, editorEditorField } from 'obsidian';
import { EmbedSketchSettings } from '../main';

export class EmbedSketchModal extends Modal {
  constructor(app: App, settings: EmbedSketchSettings) {
    super(app)
  }

	onOpen() {
		let is_drawing: boolean;
    let draw_with_mouse: boolean;

		const { contentEl } = this;
		let button = contentEl.createEl('button');
		let a = contentEl.createSvg("svg");
		
		button.textContent = 'save';
		button.addEventListener('click', () => {
			console.log(`saving ${a.outerHTML} to active file`);
			a.style.border = 'none';
			this.app.workspace.activeEditor?.editor?.replaceSelection(a.outerHTML);
			this.close();
		});

		a.style.height = '500px';
		a.style.width = '500px';
		a.style.border = 'solid';
		
		let drawPath = a.createSvg("path");
		drawPath.style.fill = 'none'
		drawPath.style.stroke = 'black';
		drawPath.style.strokeWidth ='2';

		a.addEventListener('touchstart', (e) => {
			console.log("hello");
			is_drawing = true;
			let point = getSVGPoint(e)
			drawPath.setAttribute("d", "M" + point.x + " " + point.y);
		});
		a.addEventListener("touchmove", (e) => {
			if (is_drawing) {
				console.log(`pointer moved: x: ${e.x} y: ${e.y} pressure: ${e.pressure}`);
				let point = getSVGPoint(e);
				let previousPath = drawPath.getAttribute("d");
				drawPath.setAttribute("d", previousPath + "L" + point.x + " " + point.y);
			}
		});
		a.addEventListener("touchend", () => {
			console.log("touchend");
			is_drawing = false;
		});

		function getSVGPoint(event: TouchEvent) {
			var point = a.createSVGPoint();
			point.x = event.touches[0].clientX;
			point.y = event.touches[0].clientY;
			return point.matrixTransform(a.getScreenCTM().inverse());
		}

	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}