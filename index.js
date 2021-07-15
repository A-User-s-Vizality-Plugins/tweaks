import React from 'react';
import { Plugin } from '@vizality/entities';
import { patch, unpatchAll } from '@vizality/patcher';
import { getModule } from '@vizality/webpack';
import Settings from './Settings';
import Tweaks from './tweaks';

const { getChannelId } = getModule('getChannelId', 'getVoiceChannelId')
const { getChannel } = getModule("getChannel");

const { Permissions } = getModule("Permissions")
const UserPermissions = getModule("getHighestRole");

export default class Tweaks extends Plugin {
    start () {
        this.registerSettings(Settings)
        this.injectStyles("style.scss")

        Object.values(Tweaks).forEach(tweak => {
            if (typeof tweak !== "function") return
            tweak(this.settings)
        })
    }

    stop () {
        unpatchAll()
    }
}