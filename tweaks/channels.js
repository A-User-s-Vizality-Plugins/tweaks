import React from 'react';
import { getModule } from '@vizality/webpack';
import { patch } from '@vizality/patcher';
import arrayUtils from "../api/array"

export default {
    start: function (settings) {
        patch(getModule(m => m.default?.displayName === "ChannelItem"), "default", ([props], res) => {
            console.log(props, res)
            if (!settings.get("showChannelInviteIcon", true)) arrayUtils.removeElement(props.children, props.children[0])
            if (!settings.get("showSettingsIcon", true)) arrayUtils.removeElement(props.children, props.children[1])
        })
    }
}