import {
  LinkIcon,
  PaperAirplaneIcon,
  ShareIcon,
} from '@heroicons/react/24/solid';
import Button from 'mintflow/Button';
import React, { useEffect, useState, Fragment } from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
} from 'react-share';
import {
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  LinkedinIcon,
  RedditIcon,
} from 'react-share';
import { useOvermind } from 'stores/Overmind';
import { Popover, Transition } from '@headlessui/react';

export default function ShareButtons({ quote, shareURL, iconOnly }) {
  const [url, setUrl] = React.useState(shareURL);
  const { state: ostate, actions } = useOvermind();
  const [isCopied, setIsCopied] = useState(false);
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    let url = shareURL;
    if (shareURL && shareURL.indexOf('/') === 0) {
      url = window.location.origin + shareURL;
    }
    setUrl(url);
    /*const u = new URL(url);
    if (!ostate.user.creator && ostate.user.uid)
      u.searchParams.set('aff', ostate.user.uid);
    setUrl(u.href);
    */
  }, [shareURL, ostate.user.uid]);

  async function copyTextToClipboard(url) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(url);
    } else {
      return document.execCommand('copy', true, url);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(url)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Popover className="relative" onMouseLeave={() => setIsShowing(false)}>
      <Popover.Button onMouseEnter={() => setIsShowing(true)}>
        <div className="flex-2 flex gap-2 items-center">
          <Button
            variant="nav"
            size="sm"
            circle={iconOnly && true}
            startIcon={!iconOnly}
          >
            <ShareIcon className="w-4 h-4" />
            {!iconOnly && 'Share'}
          </Button>
        </div>
      </Popover.Button>
      <Transition
        as={Fragment}
        show={isShowing}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute z-10 w-screen max-w-xs -translate-x-1/2 transform p-4 bg-base-100 border border-base-300 rounded-box">
          <ul className="mx-auto text-center grid grid-cols-2 gap-4 w-full">
            <li>
              <a onClick={handleCopyClick}>
                <div className="flex flex-row items-center cursor-pointer">
                  <div className="bg-primary rounded-full p-2">
                    <LinkIcon className="w-4 h-4" />
                  </div>
                  <p className="base2 text-base-content ml-2">
                    {isCopied ? 'Copied!' : 'Copy Link'}
                  </p>
                </div>
              </a>
            </li>
            <li>
              <a>
                <FacebookShareButton
                  title={'Facebook'}
                  quote={quote}
                  hashtag={'#NFTs'}
                  url={url}
                  className="flex flex-row items-center"
                >
                  <FacebookIcon size={32} className="w-auto" round={true} />
                  <p className="base2 text-base-content ml-2">Facebook</p>
                </FacebookShareButton>
              </a>
            </li>
            <li>
              <a>
                <TwitterShareButton
                  title={quote}
                  hashtags={['mintgate']}
                  url={url}
                  className="flex flex-row items-center"
                >
                  <TwitterIcon size={32} round={true} />
                  <p className="base2 text-base-content ml-2">Twitter</p>
                </TwitterShareButton>
              </a>
            </li>
            <li>
              <a>
                <TelegramShareButton
                  title={quote}
                  url={url}
                  className="flex flex-row items-center"
                >
                  <TelegramIcon size={32} round={true} />
                  <p className="base2 text-base-content ml-2">Telegram</p>
                </TelegramShareButton>
              </a>
            </li>
            <li>
              <a>
                <WhatsappShareButton
                  title={quote}
                  url={url}
                  className="flex flex-row items-center"
                >
                  <WhatsappIcon size={32} round={true} />
                  <p className="base2 text-base-content ml-2">Whatsapp</p>
                </WhatsappShareButton>
              </a>
            </li>
            <li>
              <a>
                <RedditShareButton
                  title={quote}
                  url={url}
                  className="flex flex-row items-center"
                >
                  <RedditIcon size={32} round={true} />
                  <p className="base2 text-base-content ml-2">Reddit</p>
                </RedditShareButton>
              </a>
            </li>
            {/* 
            <li>
              <a>
                <LinkedinShareButton
                  url={url}
                  className="flex flex-row items-center"
                >
                  <LinkedinIcon size={32} round={true} />
                  <p className="base2 text-base-content ml-2">LinkedIn</p>
                </LinkedinShareButton>
              </a>
            </li>
            */}
          </ul>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
