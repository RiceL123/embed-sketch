import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, editorEditorField } from 'obsidian';
import { SketchModal } from 'src/SketchModal';

// Remember to rename these classes and interfaces!

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

		this.addRibbonIcon("sunrise", 'Sketch Modal', () => {
			new Notice('using SketchModal.ts');
			new SketchModal(this.app, this.settings).open();
		});

		this.addCommand({
			id: 'your-mother-command',
			name: 'Your Mother Command',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				new SketchModal(this.app, this.settings).open();
			}
		});

		this.addSettingTab(new EmbedSketchSettingsTab(this.app, this));
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class EmbedSketchSettingsTab extends PluginSettingTab {
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
