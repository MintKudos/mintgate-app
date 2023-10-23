import { FaceSmileIcon } from '@heroicons/react/24/solid';
import EmojiPicker, {
  EmojiStyle,
  Theme,
  EmojiClickData,
  Emoji,
  SuggestionMode,
} from 'emoji-picker-react';
import Button from 'mintflow/Button';
import { useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function EmojiSelector({
  onEmojiClick,
}: {
  onEmojiClick: (emoji: string) => any;
}) {
  // const [selectedEmoji, setSelectedEmoji] = useState<string>('');

  function onClick(emojiData: EmojiClickData, event: MouseEvent) {
    onEmojiClick(emojiData.emoji);
  }

  /* TO DISPLAY THE SELECTED EMOJI
  {selectedEmoji ? (
          <Emoji
            unified={selectedEmoji}
            emojiStyle={EmojiStyle.APPLE}
            size={22}
          />
        ) : null}
*/

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className="focus:outline-none">
            <Button
              variant="nav"
              circle
              size="sm"
              className={`${
                open ? 'bg-primary' : 'bg-base-100'
              } border-none hover:text-primary focus:outline-none`}
            >
              <FaceSmileIcon className="w-5 h-5" />
            </Button>
          </Popover.Button>
          <Popover.Panel className="absolute z-30 mt-3 w-screen max-w-sm transform px-4 sm:px-0 lg:max-w-3xl">
            <EmojiPicker
              onEmojiClick={onClick}
              autoFocusSearch={false}
              lazyLoadEmojis={true}
              suggestedEmojisMode={SuggestionMode.RECENT}
              // height={350}
              // width="50%"
              // emojiVersion="0.6"
              // lazyLoadEmojis={true}
            />
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
}
