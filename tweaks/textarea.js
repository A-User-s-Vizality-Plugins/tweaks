import React from 'react';
import { getModule } from '@vizality/webpack';
import { patch } from '@vizality/patcher';
import { findInReactTree } from '@vizality/util/React';
import arrayUtils from "../api/array"

export default function(settings){
    //pre patch
    patch(getModule(m => m.type?.render?.displayName === "ChannelTextAreaContainer").type, "render", ([props]) => {
        if (!settings.get('giftButton', true)) props.shouldRenderPremiumGiftButton = false
    }, "before")

    //pos patch
    patch(getModule(m => m.type?.render?.displayName === "ChannelTextAreaContainer").type, "render", (args, res) => {
        // console.log(args, res)
        let module = findInReactTree(res, comp => comp?.className?.indexOf("buttons-") == 0)
        
        let buttons = module.children[1].props.children
        // gif button
        if (!settings.get('gifButton', true)) {
            buttons = arrayUtils.removeElement(buttons, element => element?.type?.type?.render?.displayName === "ChannelGIFPickerButton")
        }

        // sticker button
        if (!settings.get('stickerButton', true)) {
            buttons = arrayUtils.removeElement(buttons, element => element?.type?.type?.render?.displayName === "ChannelStickerPickerButton")
        }

        // why javascript
        module.children[1].props.children = buttons

        // console.log(module)
    })
}