import {
	$,
	Plugin,
	NodeInterface,
	CARD_KEY,
	isEngine,
	PluginEntry,
	SchemaInterface,
} from '@aomao/engine';
import HrComponent from './component';

export type Options = {
	hotkey?: string | Array<string>;
	markdown?: boolean;
};
export default class extends Plugin<Options> {
	static get pluginName() {
		return 'hr';
	}

	init() {
		this.editor.on('paser:html', node => this.parseHtml(node));
		this.editor.on('paste:schema', schema => this.pasteSchema(schema));
		this.editor.on('paste:each', child => this.pasteHtml(child));
		if (isEngine(this.editor)) {
			this.editor.on('keydown:enter', event => this.markdown(event));
			this.editor.on('paste:markdown', child =>
				this.pasteMarkdown(child),
			);
		}
	}

	execute() {
		if (!isEngine(this.editor)) return;
		const { card } = this.editor;
		card.insert(HrComponent.cardName);
	}

	hotkey() {
		return this.options.hotkey || 'mod+shift+e';
	}

	markdown(event: KeyboardEvent) {
		if (!isEngine(this.editor) || this.options.markdown === false) return;
		const { change, command, node } = this.editor;
		const range = change.getRange();

		if (!range.collapsed || change.isComposing() || !this.markdown) return;
		const blockApi = this.editor.block;
		const block = blockApi.closest(range.startNode);

		if (!node.isRootBlock(block)) {
			return;
		}

		const chars = blockApi.getLeftText(block);
		const match = /^[-]{3,}$/.exec(chars);

		if (match) {
			event.preventDefault();
			blockApi.removeLeftText(block);
			command.execute((this.constructor as PluginEntry).pluginName);
			return false;
		}
		return;
	}

	pasteMarkdown(node: NodeInterface) {
		if (!isEngine(this.editor) || !this.markdown || !node.isText()) return;

		const text = node.text();
		const reg = /(^|\r\n|\n)([-]{3,})\s?(\r\n|\n|$)/;
		let match = reg.exec(text);
		if (!match) return;

		let newText = '';
		let textNode = node.clone(true).get<Text>()!;
		const { card } = this.editor;
		while (
			textNode.textContent &&
			(match = reg.exec(textNode.textContent))
		) {
			//从匹配到的位置切断
			let regNode = textNode.splitText(match.index);
			newText += textNode.textContent;
			//从匹配结束位置分割
			textNode = regNode.splitText(match[0].length);

			const cardNode = card.replaceNode($(regNode), 'hr');
			regNode.remove();

			newText += cardNode.get<Element>()?.outerHTML + '\n';
		}
		newText += textNode.textContent;
		node.text(newText);
	}

	pasteSchema(schema: SchemaInterface) {
		schema.add([
			{
				type: 'block',
				name: 'hr',
				isVoid: true,
			},
		]);
	}

	pasteHtml(node: NodeInterface) {
		if (!isEngine(this.editor)) return;
		if (node.name === 'hr') {
			this.editor.card.replaceNode(node, HrComponent.cardName);
		}
	}

	parseHtml(root: NodeInterface) {
		root.find(`[${CARD_KEY}=${HrComponent.cardName}`).each(hrNode => {
			const node = $(hrNode);
			const hr = node.find('hr');
			hr.css({
				'background-color': '#e8e8e8',
				border: '1px solid transparent',
				margin: '18px 0',
			});
			node.replaceWith(hr);
		});
	}
}
export { HrComponent };
