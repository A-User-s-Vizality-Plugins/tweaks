import React from 'react';
import { ipcRenderer } from 'electron';
import { getModule } from '@vizality/webpack';
import { patch } from '@vizality/patcher';
import { findInReactTree } from '@vizality/util/React';
import { ImageModal } from '@vizality/components'
import { openModal } from '@vizality/modal'

const { updateRemoteSettings } = getModule('updateRemoteSettings');
const tray = getModule('setSystemTrayApplications')

const customTrayItems = [
    {
        name: "online",
        id: 'status_online'
    },
    {
        name: "idle",
        id: 'status_idle'
    },
    {
        name: "dnd",
        id: 'status_dnd'
    },
    {
        name: "offline",
        id: 'status_invisible'
    }
];

let changeStatus;

export default {
    start: function (settings) {
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
    }
}