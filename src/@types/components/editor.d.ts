import type { TAsset } from '../core/assets';

export type TInjectedEditor = {
    flags: undefined;
    i18n: Record<'editor.build' | 'editor.help', string>;
    assets: Record<
        | 'image.icon.build'
        | 'image.icon.help'
        | 'image.icon.pin'
        | 'image.icon.unpin'
        | 'image.icon.code'
        | 'image.icon.close',
        TAsset
    >;
};
