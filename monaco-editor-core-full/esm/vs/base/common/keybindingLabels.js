/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as nls from '../../nls.js';
export class ModifierLabelProvider {
    constructor(mac, windows, linux = windows) {
        this.modifierLabels = [null]; // index 0 will never me accessed.
        this.modifierLabels[2 /* OperatingSystem.Macintosh */] = mac;
        this.modifierLabels[1 /* OperatingSystem.Windows */] = windows;
        this.modifierLabels[3 /* OperatingSystem.Linux */] = linux;
    }
    toLabel(OS, chords, keyLabelProvider) {
        if (chords.length === 0) {
            return null;
        }
        const result = [];
        for (let i = 0, len = chords.length; i < len; i++) {
            const chord = chords[i];
            const keyLabel = keyLabelProvider(chord);
            if (keyLabel === null) {
                // this keybinding cannot be expressed...
                return null;
            }
            result[i] = _simpleAsString(chord, keyLabel, this.modifierLabels[OS]);
        }
        return result.join(' ');
    }
}
/**
 * A label provider that prints modifiers in a suitable format for displaying in the UI.
 */
export const UILabelProvider = new ModifierLabelProvider({
    ctrlKey: '\u2303',
    shiftKey: '⇧',
    altKey: '⌥',
    metaKey: '⌘',
    separator: '',
}, {
    ctrlKey: nls.localize(116, "Ctrl"),
    shiftKey: nls.localize(117, "Shift"),
    altKey: nls.localize(118, "Alt"),
    metaKey: nls.localize(119, "Windows"),
    separator: '+',
}, {
    ctrlKey: nls.localize(120, "Ctrl"),
    shiftKey: nls.localize(121, "Shift"),
    altKey: nls.localize(122, "Alt"),
    metaKey: nls.localize(123, "Super"),
    separator: '+',
});
/**
 * A label provider that prints modifiers in a suitable format for ARIA.
 */
export const AriaLabelProvider = new ModifierLabelProvider({
    ctrlKey: nls.localize(124, "Control"),
    shiftKey: nls.localize(125, "Shift"),
    altKey: nls.localize(126, "Option"),
    metaKey: nls.localize(127, "Command"),
    separator: '+',
}, {
    ctrlKey: nls.localize(128, "Control"),
    shiftKey: nls.localize(129, "Shift"),
    altKey: nls.localize(130, "Alt"),
    metaKey: nls.localize(131, "Windows"),
    separator: '+',
}, {
    ctrlKey: nls.localize(132, "Control"),
    shiftKey: nls.localize(133, "Shift"),
    altKey: nls.localize(134, "Alt"),
    metaKey: nls.localize(135, "Super"),
    separator: '+',
});
/**
 * A label provider that prints modifiers in a suitable format for Electron Accelerators.
 * See https://github.com/electron/electron/blob/master/docs/api/accelerator.md
 */
export const ElectronAcceleratorLabelProvider = new ModifierLabelProvider({
    ctrlKey: 'Ctrl',
    shiftKey: 'Shift',
    altKey: 'Alt',
    metaKey: 'Cmd',
    separator: '+',
}, {
    ctrlKey: 'Ctrl',
    shiftKey: 'Shift',
    altKey: 'Alt',
    metaKey: 'Super',
    separator: '+',
});
/**
 * A label provider that prints modifiers in a suitable format for user settings.
 */
export const UserSettingsLabelProvider = new ModifierLabelProvider({
    ctrlKey: 'ctrl',
    shiftKey: 'shift',
    altKey: 'alt',
    metaKey: 'cmd',
    separator: '+',
}, {
    ctrlKey: 'ctrl',
    shiftKey: 'shift',
    altKey: 'alt',
    metaKey: 'win',
    separator: '+',
}, {
    ctrlKey: 'ctrl',
    shiftKey: 'shift',
    altKey: 'alt',
    metaKey: 'meta',
    separator: '+',
});
function _simpleAsString(modifiers, key, labels) {
    if (key === null) {
        return '';
    }
    const result = [];
    // translate modifier keys: Ctrl-Shift-Alt-Meta
    if (modifiers.ctrlKey) {
        result.push(labels.ctrlKey);
    }
    if (modifiers.shiftKey) {
        result.push(labels.shiftKey);
    }
    if (modifiers.altKey) {
        result.push(labels.altKey);
    }
    if (modifiers.metaKey) {
        result.push(labels.metaKey);
    }
    // the actual key
    if (key !== '') {
        result.push(key);
    }
    return result.join(labels.separator);
}
//# sourceMappingURL=keybindingLabels.js.map