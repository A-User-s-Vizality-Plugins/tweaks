import React, { memo } from 'react';
import { Icon, Text } from '@vizality/components';
import { SwitchItem, Category, RadioGroup } from '@vizality/components/settings';

export default memo(({ getSetting, updateSetting, toggleSetting }) => {
    return <>
        {/*
            Text Area
        */}
        <Category
            icon="Pencil"
            title="Text Area"
            description="Text Area tweaks"
            opened={getSetting('category-textarea', false)}
            onChange={() => toggleSetting('category-textarea')}
        >
            <SwitchItem
                children={[<SwitchIcon icon="Gift"/>, "Display Gift button"]}
                value={getSetting('giftButton', true)}
                onChange={() => {
                    toggleSetting('giftButton')
                }}
            />
            <SwitchItem
                children={[<SwitchIcon icon="InvertedGifLabel" />, "Display Gif button"]}
                value={getSetting('gifButton', true)}
                onChange={() => {
                    toggleSetting('gifButton')
                }}
            />
            <SwitchItem
                children={[<SwitchIcon icon="Sticker" />, "Display Sticker button"]}
                value={getSetting('stickerButton', true)}
                onChange={() => {
                    toggleSetting('stickerButton')
                }}
            />

            <SwitchItem
                children={[<SwitchIcon icon="Sticker" />, "Enable Sticker suggestions"]}
                value={getSetting('stickerSuggestions', true)}
                onChange={() => {
                    toggleSetting('stickerSuggestions')
                }}
            />
        </Category>

        {/*
            Attachment Button
        */}
        <Category
            icon="FileUpload"
            title="Attachment Button"
            description="Attachment Button tweaks"
            opened={getSetting('category-attachment', false)}
            onChange={() => toggleSetting('category-attachment')}
        >
            <SwitchItem
                children={[<SwitchIcon icon="Reply" />, "Return to the old style"]}
                description="Do a single click instead of double clicking to send an attachment. The popout will be still shown if you're listening to Spotify or going to invite a person to play a game."
                value={getSetting('attachmentOldStyle', false)}
                onChange={() => {
                    toggleSetting('attachmentOldStyle')
                }}
            />
            <SwitchItem
                children={[<SwitchIcon icon="PersonPlay" />, "Show a different icon when you're listening to music and it isn't possible to attach files"]}
                description="Sometimes you can get confused when you're listening to music and chatting in a channel without upload permissions. This will change the icon, showing to you can only share your music."
                value={getSetting('attachmentExtraIcon', false)}
                onChange={() => {
                    toggleSetting('attachmentExtraIcon')
                }}
            />
        </Category>

        {/*
            Toolbar
        */}
        <Category
            icon="Wrench"
            title="Toolbar"
            description="Discord's toolbar tweaks"
            opened={getSetting('category-toolbar', false)}
            onChange={() => toggleSetting('category-toolbar')}
        >
            <SwitchItem
                children={[<SwitchIcon icon="HelpCircle" />, "Enable Help button"]}
                value={getSetting('helpButton', true)}
                onChange={() => {
                    toggleSetting('helpButton')
                }}
            />

            <SwitchItem
                children={[<SwitchIcon icon="BellOff" />, "Enable Mute Channel button"]}
                value={getSetting('muteChannelButton', true)}
                onChange={() => {
                    toggleSetting('muteChannelButton')
                }}
            />

            <SwitchItem
                children={[<SwitchIcon icon="People" />, "Enable Show Members button"]}
                value={getSetting('memberListButton', true)}
                onChange={() => {
                    toggleSetting('memberListButton')
                }}
            />

            <RadioGroup
                options={[
                    { name: "Default", value: "default" },
                    { name: "Left", value: "left" },
                    { name: "Right", value: "right" }
                ]}
                value={getSetting('searchBarPosition', "default")}
                onChange={e => {
                    updateSetting('searchBarPosition', e.value)
                }}
            > Search bar position </RadioGroup>
        </Category>

        {/*
            User Popout
        */}
        <Category
            icon="PersonTag"
            title="User Popout"
            description="User Popout tweaks"
            opened={getSetting('user-toolbar', false)}
            onChange={() => toggleSetting('user-toolbar')}
        >
            <SwitchItem
                children={[<SwitchIcon icon="NitroWheelAlt" />, 'Show Nitro badge on banners']}
                value={getSetting('showPremiumBadge', true)}
                onChange={() => {
                    toggleSetting('showPremiumBadge')
                }}
            />
            <SwitchItem
                children={[<SwitchIcon icon="Compose" />, 'Show "Set a Server Nickname" text']}
                value={getSetting('showSetNicknameText', true)}
                onChange={() => {
                    toggleSetting('showSetNicknameText')
                }}
            />
            <SwitchItem
                children={[<SwitchIcon icon="PersonRemove" />, 'Show "No roles" text']}
                value={getSetting('showNoRolesText', true)}
                onChange={() => {
                    toggleSetting('showNoRolesText')
                }}
            />
            <SwitchItem
                children={[<SwitchIcon icon="ChatNew" />, 'Show "Messge @somebody" text area']}
                value={getSetting('showMessageSomebodyTextArea', true)}
                onChange={() => {
                    toggleSetting('showMessageSomebodyTextArea')
                }}
            />
        </Category>

        <Category
            icon="ChannelText"
            title="Channels"
            description="Channel tweaks"
            opened={getSetting('channel-toolbar', false)}
            onChange={() => toggleSetting('channel-toolbar')}
        >
            <SwitchItem
                children={[<SwitchIcon icon="Invite" />, "Show invite icon on channels"]}
                value={getSetting('showChannelInviteIcon', true)}
                onChange={() => {
                    toggleSetting('showChannelInviteIcon')
                }}
            />
            <SwitchItem
                children={[<SwitchIcon icon="Gear" />, "Show settings icon on channels"]}
                value={getSetting('showSettingsIcon', true)}
                onChange={() => {
                    toggleSetting('showSettingsIcon')
                }}
            />
        </Category>

        <Category
            icon="Discover"
            title="Guilds"
            description="Guilds tweaks"
            opened={getSetting('guild-toolbar', false)}
            onChange={() => toggleSetting('guild-toolbar')}
        >
            <SwitchItem
                children={[<SwitchIcon icon="At" />, "Show a ping counter"]}
                value={getSetting('showPingCounter', false)}
                onChange={() => {
                    toggleSetting('showPingCounter')
                }}
            />
            {getSetting('showPingCounter', false) && <SwitchItem
                children={[<SwitchIcon icon="Slash" />, "Separate guild counter from DM counter"]}
                description="It will show an upper badge when you have a DM ping"
                value={getSetting('separatePingCounter', true)}
                onChange={() => {
                    toggleSetting('separatePingCounter')
                }}
            />}
            <SwitchItem
                children={[<SwitchIcon icon="ShortAnswer" />, "Show full ping counter"]}
                description="Removes the 99+ ping count cap"
                value={getSetting('noPingCounterLimit', false)}
                onChange={() => {
                    toggleSetting('noPingCounterLimit')
                }}
            />
            <Text size={Text.Sizes.SIZE_12} color={Text.Colors.MUTED}>Note: Hover the guilds to update them</Text>
        </Category>

        {/*
            Other Tweaks
        */}
        <Category
            icon="Experiment"
            title="Misc."
            description="Other tweaks"
            opened={getSetting('misc-toolbar', false)}
            onChange={() => toggleSetting('misc-toolbar')}
        >
            <SwitchItem
                children={[<SwitchIcon icon="PersonTag" />, "Apply dark theme into the create/join guild modal"]}
                value={getSetting('darkThemeCreateJoinModal', false)}
                onChange={() => {
                    toggleSetting('darkThemeCreateJoinModal')
                }}
            />
            <SwitchItem
                children={[<SwitchIcon icon="PersonTag" />, "Automatically set to DnD when playing a gane"]}
                value={getSetting('autoGameDnD', false)}
                onChange={() => {
                    toggleSetting('autoGameDnD')
                }}
            />
        </Category>
    </>
})

const SwitchIcon = memo(({ icon }) => {
    return <Icon name={icon} className="twe-marginSwitch" />
});
