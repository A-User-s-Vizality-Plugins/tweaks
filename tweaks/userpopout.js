import React from 'react';
import { getModule } from '@vizality/webpack';
import { patch } from '@vizality/patcher';
import { findInReactTree } from '@vizality/util/React';
import { isEmptyArray, isArray } from '@vizality/util/Array';
import arrayUtils from "../api/array"

export default {
    start: function (settings) {
        // no roles
        patch(getModule(m => m.default?.displayName === "UserPopoutBody"), "default", ([props], res) => {
            if (settings.get('showNoRolesText', true) || (!isArray(res.props.children) || !isEmptyArray(props.guildMember.roles))) return res

            let roleElement = findInReactTree(res, element => element?.props?.children?.[1].key === "roles")
            res.props.children = arrayUtils.removeElement(res.props.children, element => element === roleElement)
        })

        // remove premium badge on banners
        patch(getModule(m => m.default?.displayName === "UserBanner"), "default", ([props], res) => {
            // console.log(props, res)
            if (settings.get('showPremiumBadge', true)) return res
            res.props.children = arrayUtils.removeElement(res.props.children, res.props.children[0])
        })

        // remove premium badge on banners
        patch(getModule(m => m.default?.displayName === "UserPopoutFooter"), "default", ([props]) => {
            if (settings.get('showMessageSomebodyTextArea', true)) return props
            props.canDM = false
            // console.log(props)
        }, "before")
    }
}