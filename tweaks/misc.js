import React from 'react';
import { getModule } from '@vizality/webpack';
import { patch } from '@vizality/patcher';
import arrayUtils from "../api/array"

const { getStatus } = getModule('getStatus');
const { getCurrentUser } = getModule('getCurrentUser')
const Dispatcher = getModule("dispatch", "subscribe")

/**
 * @private
 * @see {@link https://github.com/QWERTxD/BetterDiscordPlugins/blob/main/DndWhilePlaying/DndWhilePlaying.plugin.js}
*/
let _dndWhilePlaying;

export default {
    start: (settings) => {
        //dark theme on create/join guild modal
        patch(getModule(m => m.default?.displayName === "CreateGuildModal"), "default", (args, res) => {
            if (!settings.get("darkThemeCreateJoinModal", false)) return res
            res.props.className = "theme-dark"
        })

        // view icon
        // disabled due to bugs
        // patch(getModule(m => m.default?.displayName === "UserProfileModalHeader"), "default", ([props], res) => {
        //     let avatar = findInReactTree(res, element => element?.props?.src)
        //     avatar.props.onClick = () => {
        //         openModal(() => <div className="twe-force-height">
        //             <ImageModal
        //                 className="image-1tIMwV"
        //                 src={avatar.props.src.replace("?size=128", "?size=4096")}
        //                 width="500"
        //                 heigth="500"
        //             />
        //         </div>)
        //     }
        // })
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

        // mayb later
        // patch(getModule(m => m.default?.displayName === "NativeImageContextMenu"), "default", ([props], res) => {
        //     console.log(props, res)
        // })

        patch(getModule(m => m.default?.displayName === "AccountConnected"), "default", ([props], res) => {
            console.log(props, res)
        })
    },

    stop: (settings) => {
        Dispatcher.unsubscribe("RUNNING_GAMES_CHANGE", _dndWhilePlaying)
    }
}