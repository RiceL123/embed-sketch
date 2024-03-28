import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, editorEditorField } from 'obsidian';

// Remember to rename these classes and interfaces!
import { EmbedSketchModal } from 'src/EmbedSketchModal';

export interface EmbedSketchSettings {
	mySetting: string;
	svg_height: string;
	svg_width: string;
}

const DEFAULT_SETTINGS: EmbedSketchSettings = {
	mySetting: 'default',
	svg_height: '100%',
	svg_width: '100%'
}

export default class MyPlugin extends Plugin {
	settings: EmbedSketchSettings;
	drawPath: SVGPathElement;
	drawingArea: SVGSVGElement;
	isDrawing: boolean;

	async onload() {
		await this.loadSettings();

		this.app.workspace

		this.app

		this.addRibbonIcon('dice', 'Sample Plugin', () => {
			new Notice('This is a adsad!');

			new SampleModal(this.app).open();
		});

		this.addRibbonIcon('pen-line', 'Sample Plugin', () => {
			new Notice('your mother!');

			new EmbedSketchModal(this.app, this.settings).open();
		});

		this.addCommand({
			id: 'your-mother-command',
			name: 'Your Mother Command',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				// let a = view.contentEl.createDiv("something");
				let a = createEl("div", { cls: "something" });

				a.innerText = "INNER TEXT";
				a.style.height = '100px';
				a.style.width = '100px';
				a.style.border = 'solid';

				a.addEventListener("mousedown", () => console.log("clicked on something"));
				a.addEventListener("click", () => console.log("clicked"));

				console.log(view.contentEl);
				view.contentEl.getElementsByClassName("cm-content")[0].appendChild(a);
				editor.replaceSelection(a.outerHTML);
				console.log(view.contentEl);

				// let svg = createSvg("")
			}
		});

		this.addSettingTab(new SampleSettingTab(this.app, this));
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
class SampleModal extends Modal {
	

	constructor(app: App) {
		super(app);
	}

	onOpen() {
		let is_drawing: boolean;

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

		a.addEventListener("mousedown", (e) => {
			console.log("hello");
			is_drawing = true;
			let point = getSVGPoint(e)
			drawPath.setAttribute("d", "M" + point.x + " " + point.y);
		});
		a.addEventListener("mousemove", (e) => {
			if (is_drawing) {
				console.log(`mouse moved: x: ${e.x} y: ${e.y}`);
				let point = getSVGPoint(e);
				let previousPath = drawPath.getAttribute("d");
				drawPath.setAttribute("d", previousPath + "L" + point.x + " " + point.y);
			}
		});
		a.addEventListener("mouseup", () => {
			console.log("mouseup");
			is_drawing = false;
		});

		function getSVGPoint(event: MouseEvent) {
			var point = a.createSVGPoint();
			point.x = event.clientX;
			point.y = event.clientY;
			return point.matrixTransform(a.getScreenCTM().inverse());
		}

	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		let { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Svg Width')
			.setDesc('Canvas Width')
			.addText(text => text
				.setPlaceholder('width')
				.setValue(this.plugin.settings.svg_width)
				.onChange(async (value) => {
					this.plugin.settings.svg_width = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Svg Heigh')
			.setDesc('Canvas Height')
			.addText(text => text
				.setPlaceholder('height')
				.setValue(this.plugin.settings.svg_height)
				.onChange(async (value) => {
					this.plugin.settings.svg_height = value;
					await this.plugin.saveSettings();
				}));
	}
}
