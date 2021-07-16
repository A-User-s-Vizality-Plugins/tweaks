import React from 'react';
import { getModule } from '@vizality/webpack';
import { patch } from '@vizality/patcher';
import { findInReactTree } from '@vizality/util/React';

export default function (settings) {
    // create/join guild dark theme patch
    patch(getModule(m => m.default?.displayName === "UserPopoutBody"), "default", ([props], res) => {
        console.log(props, res)

    })
}