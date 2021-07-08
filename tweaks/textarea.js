import React from 'react';
import { getModule } from '@vizality/webpack';
import { patch } from '@vizality/patcher';
import { findInReactTree } from '@vizality/util/React';

export default function(settings){
    //pre patch
    patch(getModule(m => m.type?.render?.displayName === "ChannelTextAreaContainer").type, "render", ([props]) => {
        if (!settings.get('giftButton', true)) props.shouldRenderPremiumGiftButton = false
    }, "before")

    //pos patch
    patch(getModule(m => m.type?.render?.displayName === "ChannelTextAreaContainer").type, "render", (args, res) => {
        // console.log(args, res)
        let module = findInReactTree(res, comp => comp?.className?.indexOf("buttons-") == 0)
        if (!settings.get('gifButton', true)) delete module.children[module.children.length - 3]
        if (!settings.get('stickerButton', true)) delete module.children[module.children.length - 2]
    })
}