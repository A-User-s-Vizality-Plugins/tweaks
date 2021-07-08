import React from 'react';
import { getModule } from '@vizality/webpack';
import { patch } from '@vizality/patcher';
import { findInReactTree, findInTree } from '@vizality/util/React';
import { isArray } from '@vizality/util/Array';

export default function (settings) {
    patch(getModule(m => m.default?.displayName === "HeaderBar"), "default", ([props], res) => {
        let toolbar = props.toolbar
        
        // mute button
        if (!settings.get("muteChannelButton", true) && isArray(toolbar.props.children[0])){
            toolbar.props.children[0].splice(
                toolbar.props.children[0].findIndex(element => element?.key === "mute")
            , 1)
        }

        // help button
        if (!settings.get("helpButton", true)){
            toolbar.props.children.splice(
                toolbar.props.children.findIndex(element => element?.type?.displayName === "HelpButton")
            , 1)
            //toolbar.props.children = toolbar.props.children.filter(element => element?.type?.displayName !== "HelpButton")
        }

        console.log(props, res)
    })
}