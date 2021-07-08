import React, { memo } from 'react';
import { Icon } from '@vizality/components';
import { SwitchItem, Category } from '@vizality/components/settings';

export default memo(({ getSetting, updateSetting, toggleSetting }) => {
    return <>
        {/*
            Text Area
        */}
        <Category
            icon="Pencil"
            title="Text Area"
            description="Manage your text area"
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
        </Category>

        {/*
            Attachment Button
        */}
        <Category
            icon="FileUpload"
            title="Attachment Button"
            description="Manage the attachment button"
            opened={getSetting('category-attachment', false)}
            onChange={() => toggleSetting('category-attachment')}
        >
            <SwitchItem
                children={[<SwitchIcon icon="Reply" />, "Return to the old style"]}
                note="Do a single click instead of double clicking to send an attachment. The popout will be still shown if you're listening to Spotify or going to invite a person to play a game."
                value={getSetting('attachmentOldStyle', false)}
                onChange={() => {
                    toggleSetting('attachmentOldStyle')
                }}
            />
            <SwitchItem
                children={[<SwitchIcon icon="PersonPlay" />, "Show a different icon when you're listening to music and it isn't possible to attach files"]}
                note="Sometimes you can get confused when you're listening to music and chatting in a channel without upload permissions. This will change the icon, showing to you can only share your music."
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
            icon="FileUpload"
            title="Toolbar"
            description="Manage discord's toolbar"
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
        </Category>
    </>
})

const SwitchIcon = memo(({ icon }) => {
    return <Icon name={icon} className="uf-marginSwitch" />
});
