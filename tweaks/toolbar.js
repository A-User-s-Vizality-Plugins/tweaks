import React from 'react';
import { getModule } from '@vizality/webpack';
import { patch } from '@vizality/patcher';
import { findInReactTree, findInTree } from '@vizality/util/React';

export default function (settings) {
    patch(getModule(m => m.default?.displayName === "HeaderBar"), "default", ([props], res) => {
        let toolbar = props.toolbar
        
        let channeltoolbars = toolbar.props.children[0]
        
        //mute button
        if (!settings.get("muteChannelButton", true)){
            channeltoolbars = channeltoolbars.filter(element => element?.key !== "mute")
            toolbar.props.children[0] = channeltoolbars
        }

        //help button
        if (!settings.get("helpButton", true)){
            toolbar.props.children = toolbar.props.children.filter(element => element?.type?.displayName !== "HelpButton")
        }

        console.log(props, res)
    })
}