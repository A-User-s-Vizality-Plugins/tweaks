import React from 'react';
import { Plugin } from '@vizality/entities';
import { patch, unpatchAll } from '@vizality/patcher';
import { getModule } from '@vizality/webpack';
import { assertObject, isEmptyObject } from '@vizality/util/Object';
import Settings from './Settings';
import Tweaks from './tweaks';

// const { getChannelId } = getModule('getChannelId', 'getVoiceChannelId')
// const { getChannel } = getModule("getChannel");

// const { Permissions } = getModule("Permissions")
// const UserPermissions = getModule("getHighestRole");

export default class Tweaks extends Plugin {
    start () {
        this.registerSettings(Settings)
        this.injectStyles("style.scss")

        Object.values(Tweaks).forEach(tweak => {
            assertObject(tweak)
            if (isEmptyObject(tweak)) return
            tweak.start?.(this.settings)
        })
    }

    stop () {
        unpatchAll()

        Object.values(Tweaks).forEach(tweak => {
            assertObject(tweak)
            if (isEmptyObject(tweak)) return
            tweak.stop?.(this.settings)
        })
    }
}