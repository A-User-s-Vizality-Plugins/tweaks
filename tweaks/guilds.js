import React from 'react';
import { getModule } from '@vizality/webpack';
import { patch } from '@vizality/patcher';
import { findInReactTree } from '@vizality/util/React';
import arrayUtils from "../api/array"

const DMS_PING_ID = "null" //not joking, its literally null

const { getTotalMentionCount, getMentionCount } = getModule("getTotalMentionCount")
const BadgeModule = getModule('NumberBadge')
const { NumberBadge } = BadgeModule

export default {
    start: (settings) => {
        //before
        patch(getModule("DefaultHomeButton"), "DefaultHomeButton", ([props]) => {
            if (!settings.get("showPingCounter", false)) return
            const dmPings = getMentionCount(DMS_PING_ID)
            const guildOnlyPing = settings.get("separatePingCounter", true) ? getTotalMentionCount() - dmPings : getTotalMentionCount()
            
            props.badge = guildOnlyPing
        }, "before")

        //after
        patch(getModule("DefaultHomeButton"), "DefaultHomeButton", ([props], res) => {
            if (!settings.get("showPingCounter", false) || !settings.get("separatePingCounter", true)) return
            const dmOnlyPings = getMentionCount(DMS_PING_ID)
            if (dmOnlyPings <= 0) return

            let homebutton = findInReactTree(res, e => e.type?.displayName === "BlobMask")
            homebutton.props.upperBadge = <NumberBadge count={dmOnlyPings}/>
        })

        //limit patch
        patch(BadgeModule, "NumberBadge", ([props], res) => {
            if (!settings.get("noPingCounterLimit", false)) return
            res.props.children = props.count

            res.props.style.width = 10 + 6 * props.count.toString().length
        })
    }
}