import React from 'react';
import { getModule } from '@vizality/webpack';
import { patch } from '@vizality/patcher';
import { findInReactTree } from '@vizality/util/React';

export default function(settings){
    //pre patch
    patch(getModule(m => m.type?.render?.displayName === "ChannelTextAreaContainer").type, "render", ([props]) => {
        if (!settings.get('giftButton', true)) props.shouldRenderPremiumGiftButton = false

        // const old_renderAttachButton = props.renderAttachButton;
        // console.log(props.renderAttachButton)
        // props.renderAttachButton = function () {
        //     console.log(this, arguments)
        //     let attachRes = old_renderAttachButton.apply(this, arguments);
        //     console.log("original:", attachRes)
        //     let attachResProps = attachRes.props

        //     const attachmentPerms = (UserPermissions.can(
        //         Permissions.ATTACH_FILES,
        //         attachRes.props.channel
        //     ) && UserPermissions.can(
        //         Permissions.SEND_MESSAGES,
        //         attachRes.props.channel
        //     )) ||
        //         attachRes.props.channel.type == 1 || // DM
        //         attachRes.props.channel.type == 3 // Group DM

        //     //console.log(<Icon name='Folder' />)
        //     if (!attachmentPerms) attachRes = <Icon name='Folder' {...attachResProps}/>
        //     console.log(attachRes)
        //     return attachRes;
        // }
    }, "before")

    //pos patch
    patch(getModule(m => m.type?.render?.displayName === "ChannelTextAreaContainer").type, "render", (args, res) => {
        // console.log(args, res)
        let module = findInReactTree(res, comp => comp?.className?.indexOf("buttons-") == 0)
        if (!settings.get('gifButton', true)) delete module.children[module.children.length - 3]
        if (!settings.get('stickerButton', true)) delete module.children[module.children.length - 2]
    })
}