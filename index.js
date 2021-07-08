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

export default class Unfeaturer extends Plugin {
    start () {
        this.registerSettings(Settings)
        this.injectStyles("style.scss")

        for (const tweak of Object.values(Tweaks)) {
            if (typeof tweak !== "function") return
            tweak(this.settings)
        }
    }

    // patchTextArea(settings) {
    //     //pre patch
    //     patch(getModule(m => m.type?.render?.displayName === "ChannelTextAreaContainer").type, "render", ([props]) => {
    //         if (!settings.get('giftButton', true)) props.shouldRenderPremiumGiftButton = false

    //         // const old_renderAttachButton = props.renderAttachButton;
    //         // console.log(props.renderAttachButton)
    //         // props.renderAttachButton = function () {
    //         //     console.log(this, arguments)
    //         //     let attachRes = old_renderAttachButton.apply(this, arguments);
    //         //     console.log("original:", attachRes)
    //         //     let attachResProps = attachRes.props

    //         //     const attachmentPerms = (UserPermissions.can(
    //         //         Permissions.ATTACH_FILES,
    //         //         attachRes.props.channel
    //         //     ) && UserPermissions.can(
    //         //         Permissions.SEND_MESSAGES,
    //         //         attachRes.props.channel
    //         //     )) ||
    //         //         attachRes.props.channel.type == 1 || // DM
    //         //         attachRes.props.channel.type == 3 // Group DM
                
    //         //     //console.log(<Icon name='Folder' />)
    //         //     if (!attachmentPerms) attachRes = <Icon name='Folder' {...attachResProps}/>
    //         //     console.log(attachRes)
    //         //     return attachRes;
    //         // }
    //     }, "before")

    //     //pos patch
    //     patch(getModule(m => m.type?.render?.displayName === "ChannelTextAreaContainer").type, "render", (args, res) => {
    //         // console.log(args, res)
    //         let module = findInReactTree(res, comp => comp?.className?.indexOf("buttons-") == 0)
    //         if (!settings.get('gifButton', true)) delete module.children[module.children.length - 3]
    //         if (!settings.get('stickerButton', true)) delete module.children[module.children.length - 2]
    //     })
    // }

    // patchUploader(settings) {
    //     patch(getModule(m => m.default?.displayName === "ChannelAttachMenu"), "default", ([props], res) => {
    //         if (settings.get("attachmentOldStyle")) {
    //             if (!props.options || props.options.length > 1 || props.options[0]?.type !== "UPLOAD_A_FILE") return res
    //             props.onClose()
    //             props.onFileUpload()
    //         }
    //     })

    //     patch(getModule(m => m.default?.displayName === "PlusCirclePlay"), "default", (args, res) => {
    //         if (args[0].foreground !== "attachButtonPlay-3iJ0mf" || !settings.get("attachmentExtraIcon", false)) return res
    //         const currentChannel = getChannel(getChannelId())
    //         console.log(currentChannel)
    //         const attachmentPerms = (UserPermissions.can(
    //             Permissions.ATTACH_FILES,
    //             currentChannel
    //         )) ||
    //             currentChannel.type == 1 || // DM
    //             currentChannel.type == 3 // Group DM
    //         if(attachmentPerms) return res

    //         res.props.children = <Icon name="PersonPlay" className="uf-plus-btn-color"/>
    //         res.type = "div"
    //     })
    // }

    patchMiscelaneous(settings){
        patch(getModule("getCurrentUser"), "getCurrentUser", (args, res) => {
            res.premiumType = 2
        })
    }

    stop () {
        unpatchAll()
    }
}