import { createItem } from '@/view';
import { buildProgram } from '../core';

import { setup as setupComponent } from './components';

// -- private variables ----------------------------------------------------------------------------

let _editor: HTMLDivElement;
let _editorToolbarBtn: HTMLElement;

let _editorStatus: HTMLParagraphElement;

// -- private functions ----------------------------------------------------------------------------

/**
 * Creates the DOM of the editor.
 */
function _createEditor(): void {
    _editor = document.createElement('div');
    _editor.id = 'editor';

    setupComponent(_editor).then(({ codeBox, status, btnBuild }) => {
        _editorStatus = status;

        codeBox.addEventListener('input', () => {
            _editorStatus.innerHTML = '';
        });

        codeBox.innerHTML = `set-thickness value:4
set-color value:5
repeat times:6
  move-forward steps:100
  turn-right angle:60
set-color value:9
repeat times:6
  move-forward steps:100
  turn-left angle:60`;

        codeBox.innerHTML = `set-thickness value:4
set-color value:5
move-forward steps:100
turn-right angle:60
move-forward steps:100
turn-right angle:60
move-forward steps:100
turn-right angle:60
move-forward steps:100
turn-right angle:60`;

        btnBuild.addEventListener('click', () => {
            (async () => {
                const response = await buildProgram(codeBox.value);
                _editorStatus.innerHTML = response ? 'Successfully Built' : 'Invalid Code';
            })();
        });
    });
}

// -- public functions -----------------------------------------------------------------------------

/**
 * Sets up the DOM elements.
 */
export function setup(): void {
    _editorToolbarBtn = createItem({ location: 'toolbar', type: 'button', position: 'cluster-a' });
    _editorToolbarBtn.innerHTML = 'CODE';

    _createEditor();
}

/**
 * Returns the individual DOM components.
 * @param element toolbar button or editor
 * @returns queried DOM component
 */
export function getElement(element: 'button' | 'editor'): HTMLElement {
    return element === 'button' ? _editorToolbarBtn : _editor;
}

/**
 * Resets the editor status.
 */
export function resetStatus(): void {
    _editorStatus.innerHTML = '';
}
