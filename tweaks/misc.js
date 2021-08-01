import React from 'react';
import { getModule } from '@vizality/webpack';
import { patch } from '@vizality/patcher';
import arrayUtils from "../api/array"

const { getStatus } = getModule('getStatus');
const { getCurrentUser } = getModule('getCurrentUser')
const Dispatcher = getModule("dispatch", "subscribe")
const ThreadNotifStore = getModule("setNotificationSetting")

/**
 * @private
 * @see {@link https://github.com/QWERTxD/BetterDiscordPlugins/blob/main/DndWhilePlaying/DndWhilePlaying.plugin.js}
*/
let _dndWhilePlaying

export default {
    start: (settings) => {
        //dark theme on create/join guild modal
        patch(getModule(m => m.default?.displayName === "CreateGuildModal"), "default", (args, res) => {
            if (!settings.get("darkThemeCreateJoinModal", false)) return
            res.props.className = "theme-dark"
        })



        // dnd while playing
        _dndWhilePlaying = ({ games }) => {
            if (!settings.get("autoGameDnD", false)) return

            const status = getStatus(getCurrentUser().id);
            
            if (games.length === 0) {
                if (settings.get("_prevStatusSetting") == undefined) settings.set("_prevStatusSetting", status)
                getModule('updateRemoteSettings').updateRemoteSettings({ status: settings.get("_prevStatusSetting") })
                return
            }
            
            if (status === 'dnd') return

            settings.set("_prevStatusSetting", status)
            getModule('updateRemoteSettings').updateRemoteSettings({ status: "dnd" })
        }
        Dispatcher.subscribe("RUNNING_GAMES_CHANGE", _dndWhilePlaying)
        
        

        patch(getModule("getCurrentUser"), "getCurrentUser", ([props], res) => {
            if (typeof settings.get("fakeNitroLevel", null) !== "number") return res
            res.premiumType = settings.get("fakeNitroLevel")
        })
    },

    stop: (settings) => {
        Dispatcher.unsubscribe("RUNNING_GAMES_CHANGE", _dndWhilePlaying)
    }
}