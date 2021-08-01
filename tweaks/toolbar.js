import React from 'react';
import { getModule } from '@vizality/webpack';
import { patch } from '@vizality/patcher';
import { isArray } from '@vizality/util/Array';
import { findInReactTree } from '@vizality/util/React';
import { error } from '@vizality/util/logger';
import arrayUtils from "../api/array"

const NOTIFICATION_BUTTON = {
    DEFAULT: "mute",
    THREAD: "notifications"
}
const MEMBER_BUTTON = "members"
const SEARCH_BAR = "FluxContainer(Search)"

const _labels = ['tweaks']

export default {
    start: (settings) => {
        patch(getModule(m => m.default?.displayName === "HeaderBar"), "default", ([props], res) => {
            // console.log(props, res)
            let toolbar = props.toolbar
            const isThread = !!props["aria-label"]
            let toolbarChildren = toolbar.props.children

            let channelToolbar = toolbarChildren?.[0]

            // help button
            if (!settings.get("helpButton", true)) {
                arrayUtils.removeElement(toolbarChildren, element => element?.type?.displayName === "HelpButton")
            }

            if (channelToolbar && isArray(channelToolbar)) {
                if (!settings.get("muteChannelButton", true)) {
                    arrayUtils.removeElement(channelToolbar, element => element?.key === NOTIFICATION_BUTTON.DEFAULT || element?.key === NOTIFICATION_BUTTON.THREAD)
                }
                if (!settings.get("memberListButton", true)) {
                    arrayUtils.removeElement(channelToolbar, element => element?.key === MEMBER_BUTTON)
                }
            }
            
            if (isThread) {
                const _oldChildren = toolbar?.type
                if (typeof _oldChildren === "function") {
                    toolbar.type = thisArgs => {
                        let typeRes
                        try {
                            typeRes = _oldChildren(thisArgs)
                            // console.log("sucessful mission", thisArgs, typeRes)

                            //remove notification button
                            if (!settings.get("threadNotificationButton", true)) {
                                arrayUtils.removeElement(typeRes?.props?.children, e => e.type.displayName === "ThreadNotificationSettingsButton")
                            }
                        } catch (err) {
                            error({ labels: _labels.concat("monkeypatch", "remove mute button from threads"), message: ["horrible error happened:", err] })
                            return typeRes
                        }
                        return typeRes
                    }
                }
            }

            // search bar
            let searchBar = element => element?.type?.displayName === SEARCH_BAR
            if (settings.get('searchBarPosition', "default") !== "default" && toolbarChildren?.find(searchBar)) {
                let moveIndex;
                switch (settings.get('searchBarPosition', "left")) {
                    case "left": moveIndex = 0
                    case "right": moveIndex = toolbarChildren.length - 1
                }
                toolbar.props.children = arrayUtils.moveArray(toolbar.props.children,
                    toolbarChildren.findIndex(searchBar)
                    , moveIndex)
            }
        })

        patch(getModule(m => m.default?.displayName === "ThreadBrowserPopout"), "default", ([props], res) => {
            // console.log(props, res)
            if (settings.get("threadCounter", true)) return

            const _oldChildren = res?.props?.children
            if (typeof _oldChildren !== "function") return
            res.props.children = (...args) => { // why discord, why you made children as a function
                let insideRes
                try {
                    insideRes = _oldChildren.apply(this, arguments)
                    if (!insideRes?.props?.children?.props) return insideRes
                    insideRes.props.children.props = {}
                    // console.log(args, insideRes)
                } catch (err) {
                    error({ labels: _labels.concat("monkeypatch", "remove thread indicator"), message: ["horrible error happened:", err]})
                }
                return insideRes
            }
        })
    }
}