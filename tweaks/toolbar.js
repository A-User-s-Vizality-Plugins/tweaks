import React from 'react';
import { getModule } from '@vizality/webpack';
import { patch } from '@vizality/patcher';
import { isArray } from '@vizality/util/Array';
import arrayUtils from "../api/array"

export default {
    start: (settings) => {
        patch(getModule(m => m.default?.displayName === "HeaderBar"), "default", ([props], res) => {
            let toolbar = props.toolbar
            let toolbarChildren = toolbar.props.children

            let channelToolbar = toolbarChildren?.[0]

            // help button
            if (!settings.get("helpButton", true)) {
                arrayUtils.removeElement(toolbarChildren, element => element?.type?.displayName === "HelpButton")
            }

            // mute button
            if (!settings.get("muteChannelButton", true) && channelToolbar && isArray(channelToolbar)) {
                arrayUtils.removeElement(channelToolbar, element => element?.key === "mute" || element?.key === "notifications")
            }

            // member list button
            if (!settings.get("memberListButton", true) && channelToolbar && isArray(channelToolbar)) {
                arrayUtils.removeElement(channelToolbar, element => element?.key === "members")
            }

            // search bar
            let searchBar = element => element?.type?.displayName === "FluxContainer(Search)"
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
    }
}