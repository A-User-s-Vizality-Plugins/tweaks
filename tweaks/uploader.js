import React from 'react';
import { getModule } from '@vizality/webpack';
import { Icon } from '@vizality/components';
import { patch } from '@vizality/patcher';

const { Permissions } = getModule("Permissions")
const UserPermissions = getModule("getHighestRole");
const { getChannelId } = getModule('getChannelId', 'getVoiceChannelId')
const { getChannel } = getModule("getChannel");

export default function (settings) {
    //patch text area
    patch(getModule(m => m.default?.displayName === "ChannelAttachMenu"), "default", ([props], res) => {
        if (settings.get("attachmentOldStyle")) {
            if (!props.options || props.options.length > 1 || props.options[0]?.type !== "UPLOAD_A_FILE") return res
            
            props.onClose()
            props.onFileUpload()
        }
    })

    //patch pluscircle
    patch(getModule(m => m.default?.displayName === "PlusCirclePlay"), "default", ([props], res) => {
        if ([props].foreground !== "attachButtonPlay-3iJ0mf" || !settings.get("attachmentExtraIcon", false)) return res
        
        const currentChannel = getChannel(getChannelId())
        const attachmentPerms = (UserPermissions.can(
            Permissions.ATTACH_FILES,
            currentChannel
        )) ||
            currentChannel.type == 1 || // DM
            currentChannel.type == 3 // Group DM
        if (attachmentPerms) return res

        res.props.children = <Icon name="PersonPlay" className="twe-plus-btn-color" />
        res.type = "div"
    })
}