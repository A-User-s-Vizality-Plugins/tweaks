import React from 'react';
import { getModule } from '@vizality/webpack';
import { patch } from '@vizality/patcher';
import { findInReactTree } from '@vizality/util/React';

export default function (settings) {
    // create/join guild dark theme patch
    patch(getModule(m => m.default?.displayName === "CreateGuildModal"), "default", ([props], res) => {
        if (settings.get("darkThemeCreateJoinModal", false)) res.props.className = "theme-dark"
    })
}