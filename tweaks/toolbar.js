import React from 'react';
import { getModule } from '@vizality/webpack';
import { patch } from '@vizality/patcher';
import { findInReactTree, findInTree } from '@vizality/util/React';
import { isArray } from '@vizality/util/Array';

export default function (settings) {
    patch(getModule(m => m.default?.displayName === "HeaderBar"), "default", ([props], res) => {
        let toolbar = props.toolbar
        let toolbarChildren = toolbar.props.children

        let channelToolbar = toolbarChildren[0]
        const channelToolbarExists = isArray(channelToolbar)
        
        // help button
        if (!settings.get("helpButton", true)) {
            toolbarChildren.splice(
                toolbarChildren.findIndex(element => element?.type?.displayName === "HelpButton")
            , 1)
        }

        // mute button
        if (!settings.get("muteChannelButton", true) && channelToolbarExists){
            channelToolbar.splice(
                channelToolbar.findIndex(element => element?.key === "mute")
            , 1)
        }

        // member list button
        if (!settings.get("memberListButton", true) && channelToolbarExists) {
            channelToolbar.splice(
                channelToolbar.findIndex(element => element?.key === "members")
            , 1)
        }

        // search bar
        if (settings.get('searchBarPosition', "default") !== "default") {
            let moveIndex;
            switch (settings.get('searchBarPosition', "left")) {
                case "left": moveIndex = 0
                case "right": moveIndex = toolbarChildren.length - 1
            }
            toolbarChildren = moveArray(toolbar.props.children,
                toolbarChildren.findIndex(element => element?.type?.displayName === "FluxContainer(Search)")
            , moveIndex)
        }

        // console.log(channelToolbar)
        // console.log(props, res)
    })
}

const moveArray = (array, from, to) => {
    if (to === from) return array;

    var target = array[from];
    var increment = to < from ? -1 : 1;

    for (var k = from; k != to; k += increment) {
        array[k] = array[k + increment];
    }
    array[to] = target;
    return array;
}