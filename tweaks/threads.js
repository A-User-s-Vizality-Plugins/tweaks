import React from 'react';
import { getModule } from '@vizality/webpack';
import { patch } from '@vizality/patcher';
import { ContextMenu } from '@vizality/components';

import arrayUtils from "../api/array"

const Dispatcher = getModule("dispatch", "subscribe")
const ThreadNotifStore = getModule("setNotificationSetting")
const { openThreadSidebarForViewing } = getModule("openThreadSidebarForViewing")
const i18n = getModule("Messages", "getLanguages")

let _threadJoin

export default {
    start: (settings) => {
        _threadJoin = ({ channel }) => {
            ThreadNotifStore.setNotificationSetting(channel, settings.get('joinThreadNotificationValue', 2))
        }

        Dispatcher.subscribe("THREAD_CREATE", _threadJoin)

        patch(getModule(m => m.default?.displayName === "ChannelListThreadContextMenu"), "default", ([props], res) => {
            res.props.children.splice(1, 0, <ContextMenu.Item
                id='split-view'
                label={i18n.Messages.OPEN_IN_SPLIT_VIEW}
                action={() => openThreadSidebarForViewing(props.channel)}
            />)
        })
    },

    stop: (settings) => {
        Dispatcher.unsubscribe("THREAD_CREATE", _threadJoin)
    }
}