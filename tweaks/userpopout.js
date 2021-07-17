import React from 'react';
import { getModule } from '@vizality/webpack';
import { patch } from '@vizality/patcher';
import { findInReactTree } from '@vizality/util/React';
import { isEmptyArray, isArray } from '@vizality/util/Array';
import arrayUtils from "../api/array"

export default function (settings) {
    // no roles
    patch(getModule(m => m.default?.displayName === "UserPopoutBody"), "default", ([props], res) => {
        console.log(props, res)

        if (!settings.get('showNoRolesText', true) && isEmptyArray(props.guildMember.roles) && isArray(res.props.children)) {
            let roleElement = findInReactTree(res, comp => comp?.props?.children?.[1].key === "roles")
            res.props.children = arrayUtils.removeElement(res.props.children, element => element === roleElement)
        }
    })
}