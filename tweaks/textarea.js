import React from 'react';
import { getModule } from '@vizality/webpack';
import { patch } from '@vizality/patcher';
import { findInReactTree } from '@vizality/util/React';
import arrayUtils from "../api/array"

export default {
    start: (settings) => {
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
                arrayUtils.removeElement(buttons, element => element?.type?.type?.render?.displayName === "ChannelGIFPickerButton")
            }

            // sticker button
            if (!settings.get('stickerButton', true)) {
                arrayUtils.removeElement(buttons, element => element?.type?.type?.render?.displayName === "ChannelStickerPickerButton")
            }

            // console.log(module)
        })

        /**
         * @see {@link https://github.com/ordinall/BetterDiscord-Stuff/blob/master/Plugins/DisableStickerSuggestions/DisableStickerSuggestions.plugin.js}
        */
        patch(getModule("queryStickers"), "queryStickers", ([props], res) => {
            console.log(props, res)
            if (props[0] && !settings.get("stickerSuggestions", true)) return { stickers: [] }
        })
    }
}