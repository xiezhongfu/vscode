/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { createDecorator } from '../../instantiation/common/instantiation.js';
export const IExtensionGalleryManifestService = createDecorator('IExtensionGalleryManifestService');
export function getExtensionGalleryManifestResourceUri(manifest, type) {
    const [name, version] = type.split('/');
    for (const resource of manifest.resources) {
        const [r, v] = resource.type.split('/');
        if (r !== name) {
            continue;
        }
        if (!version || v === version) {
            return resource.id;
        }
        break;
    }
    return undefined;
}
export const ExtensionGalleryServiceUrlConfigKey = 'extensions.gallery.serviceUrl';
//# sourceMappingURL=extensionGalleryManifest.js.map