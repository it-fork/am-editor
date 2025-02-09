import {
	EngineInterface,
	EventListener,
	TypingHandleInterface,
} from '../../types';
import { $ } from '../../node';

class Backspace implements TypingHandleInterface {
	type: 'keydown' | 'keyup' = 'keydown';
	hotkey: Array<string> | string = 'backspace';
	private engine: EngineInterface;
	private listeners: Array<EventListener> = [];
	constructor(engine: EngineInterface) {
		this.engine = engine;
	}

	on(listener: EventListener) {
		this.listeners.push(listener);
	}

	off(listener: EventListener) {
		for (let i = 0; i < this.listeners.length; i++) {
			if (this.listeners[i] === listener) {
				this.listeners.splice(i, 1);
				break;
			}
		}
	}

	trigger(event: KeyboardEvent) {
		const { change } = this.engine;
		const range = change.getRange();
		// 编辑器没有内容
		if (change.isEmpty()) {
			event.preventDefault();
			change.setValue('<p><br /><cursor /></p>');
			return;
		}

		// 处理 BR
		const { startNode, startOffset } = range;
		if (startNode.isEditable()) {
			const child = startNode[0].childNodes[startOffset - 1];
			const lastNode = $(child);
			if (lastNode.name === 'br') {
				event.preventDefault();
				lastNode.remove();
				return;
			}
		}
		let result: boolean | void = true;
		for (let i = 0; i < this.listeners.length; i++) {
			const listener = this.listeners[i];
			result = listener(event);
			if (result === false) break;
		}
		if (result === false) return;
		// 范围为展开状态
		if (!range.collapsed) {
			event.preventDefault();
			change.deleteContent();
			return;
		}
	}

	destroy() {
		this.listeners = [];
	}
}

export default Backspace;
