import React from 'react';
import { getModule } from '@vizality/webpack';
import { patch } from '@vizality/patcher';
import { ContextMenu } from '@vizality/components';

import arrayUtils from "../api/array"

const Dispatcher = getModule("dispatch", "subscribe")
const ThreadNotifStore = getModule("setNotificationSetting")
const { openThreadSidebarForViewing } = getModule("openThreadSidebarForViewing")
const i18n = getModule("Messages", "getLanguages")
const { getThreadSidebarState } = getModule("getThreadSidebarState")

let _threadJoin

export default {
    start: (settings) => {
        _threadJoin = ({ channel }) => {
            ThreadNotifStore.setNotificationSetting(channel, settings.get('joinThreadNotificationValue', 2))
        }

        Dispatcher.subscribe("THREAD_CREATE", _threadJoin)

        patch(getModule(m => m.default?.displayName === "ChannelListThreadContextMenu"), "default", ([props], res) => {
            if (!settings.get("openSplitViewContextMenu", false)) return
            const isSidebarOpen = !!getThreadSidebarState(props.channel.parent_id)
            res.props.children.splice(1, 0, <ContextMenu.Item
                id='split-view'
                disabled={isSidebarOpen}
                label={i18n.Messages.OPEN_IN_SPLIT_VIEW}
                action={() => openThreadSidebarForViewing(props.channel)}
            />)
        })
    },

    stop: (settings) => {
        Dispatcher.unsubscribe("THREAD_CREATE", _threadJoin)
    }
}