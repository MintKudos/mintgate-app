import React, { useState, useEffect } from 'react';
import { useOvermind } from 'stores/Overmind';
import GatedLink from '../inputs/GatedLink';
import { VideoUpload } from 'components/utility/VideoUpload';
import { Transition } from '@headlessui/react';
import { FileUploadElement } from '../utility/FileUploadElement';
import {
  PhotoIcon,
  VideoCameraIcon,
  MicrophoneIcon,
  LinkIcon,
  TicketIcon,
  BookOpenIcon,
  ArrowUpOnSquareIcon,
} from '@heroicons/react/24/solid';
import Button from 'mintflow/Button';
import EmojiSelector from 'components/utility/EmojiPicker';
import { ImageUploadElement } from 'components/utility/ImgUploadElement';
const icons = [
  <PhotoIcon></PhotoIcon>,
  <VideoCameraIcon></VideoCameraIcon>,
  <MicrophoneIcon></MicrophoneIcon>,
  <LinkIcon></LinkIcon>,
  <TicketIcon></TicketIcon>,
  <BookOpenIcon></BookOpenIcon>,
  <ArrowUpOnSquareIcon />,
  <PhotoIcon />,
];

let gatedLinkTypes = [
  {
    type: 'post',
    label: 'no additional content',
    icon: icons[0],
    noWaitUrl: false,
    videoUpload: false,
    shortName: 'txt',
    url: null,
  },
  {
    type: 'video',
    url: 'https://vid_upload',
    shortName: 'vid',
    label: 'Video',
    icon: icons[1],
    existingLink: true,
    videoUpload: true,
  },
  {
    type: 'audio',
    url: 'https://audio',
    shortName: 'aud',
    label: 'Audio',
    icon: icons[2],
    existingLink: true,
    videoUpload: true,
  },
  {
    type: 'link',
    label: 'Link',
    icon: icons[3],
    shortName: 'lnk',
    existingLink: false,
  },
  // {
  //   type: 'ticket',
  //   url: 'https://tix.tix',
  //   noWaitUrl: true,
  //   shortName: 'tix',
  //   label: 'Ticket',
  //   icon: icons[4],
  //   existingLink: false,
  // },
  {
    type: 'ebook',
    shortName: 'ebk',
    label: 'PDF',
    icon: icons[5],
    existingLink: true,
    fileupload: true,
  },
  {
    type: 'image',
    shortName: 'img',
    label: 'Image',
    icon: icons[7],
    existingLink: true,
    fileupload: true,
  },
  // {
  //   type: 'livestream',
  //   label: 'Live',
  //   icon: icons[6],
  //   existingLink: false,
  //   linkAdd: () => (
  //     <p className="text-base-content font-bold text-sm">
  //       Livestream token gating is currently in beta with several partners.
  //       Please reach out to&nbsp;
  //       <span>
  //         <a href="mailto:partnerships@mintgate.io" className="underline">
  //           {' '}
  //           partnerships@mintgate.io
  //         </a>
  //       </span>
  //       &nbsp;for set up.
  //     </p>
  //   ),
  // },
];

export default React.memo(NFTUpload);
function NFTUpload(props) {
  const hideCrowdfund = props.hideCrowdfund;
  const setFormURLIn = props.setFormURL;
  const setTabIn = props.setTab;
  const setRefid = props.setRefid;
  const setImgP = props.setImgP;
  const imgP = props.imgP;
  const imageUpload = props.imageUpload;
  const forNFTPageDialog = props.NFTPageDialog;
  const selectedLinkOption = props.selectedLinkOption;
  const setSelectedLinkOption = props.setSelectedLinkOption;
  let img = props.img;

  const { state: ostate, actions } = useOvermind();
  // const [tab, setTab] = useState<string>('post'); // Default: crowdfund. 'link' or 'video' or 'audio' or 'crowdfund' 'video'
  const [formURL, setFormURL] = useState('');
  const hasAnID = ostate.user.uid;
  const [warning, setWarning] = useState<string>();
  const [returnNewUpload, setReturnNewUpload] = useState<boolean>(false);
  const [userLinksExists, setUserLinksExists] = useState<boolean>(false);
  const { media, setMedia } = props; // useState<string>(null);

  const tab = props.tab;
  //console.log('selectedLinkOption in NFTUpload', selectedLinkOption);

  // useEffect(() => {
  //   if (props.tab && props.tab !== tab) {
  //     setTab(props.tab);
  //   }
  // }, [props.tab]);

  if (hideCrowdfund) {
    gatedLinkTypes = gatedLinkTypes.filter((x) => x.type !== 'post');
  }

  function changeTab(tabName: string) {
    console.log('changeTab', tabName, tab);
    if (!tabName) throw new Error('no tab name');
    if (tab && tabName === tab) {
      setMedia('txt');
      setTabIn('post');
      return;
    }
    setRefid(null);
    setFormURL(null);
    if (props.setPreview) props.setPreview(null);

    const tabInfo = gatedLinkTypes.find((x) => x.type === tabName);
    if (!tabInfo) throw new Error('no tab info');
    if (tabInfo?.noWaitUrl && tabInfo.url) setFormURL(tabInfo.url);

    setTabIn(tabName);
    setMedia(tabInfo.shortName);
  }

  useEffect(() => {
    setFormURLIn(formURL);
    if (setTabIn) setTabIn(tab);
    if (setSelectedLinkOption) setSelectedLinkOption(null);
    setReturnNewUpload(false);
  }, [formURL, tab]);

  return (
    <div>
      {gatedLinkTypes.map((type, i) => (
        <Transition
          key={type.type}
          show={tab === type.type}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          {type?.shortName === 'lnk' && (
            <GatedLink
              formURL={formURL}
              setFormURL={setFormURL}
              warning={warning}
              setWarning={setWarning}
              hasAnID={hasAnID}
            />
          )}

          {(!selectedLinkOption || returnNewUpload) && (
            <div className="mb-4 flex flex-col text-base-content text-md font-light tracking-wider">
              {type?.fileupload && (
                <FileUploadElement
                  onUpload={(url) => setFormURL(url)}
                  type={type?.shortName}
                />
              )}
              {type?.videoUpload && (
                <VideoUpload
                  type={tab}
                  onFile={(file, thumb, iframeSrc) => {
                    if (file) {
                      //set
                      setFormURL(iframeSrc); // type?.url);
                      setRefid(file);
                      if (props.setPreview) props.setPreview(thumb);
                    } else setFormURL('');
                  }}
                />
              )}
              {/* 
              {type.shortName === 'aud' && (
                <div className="flex flex-col">
                  <label className="label">
                    <span className="label-text base1">Add a cover</span>
                  </label>
                  <ImageUploadElement
                    setImgP={setImgP}
                    imgP={imgP}
                    imageUpload={imageUpload}
                    type="nft"
                  />
                </div>
              )}
              */}
            </div>
          )}
          {/* {type?.existingLink && returnNewUpload && userLinksExists && (
            <ReturnButton
              returnState={false}
              setReturn={setReturnNewUpload}
              buttonLabel={'Return to upload new content instead'}
            ></ReturnButton>
          )} */}
        </Transition>
      ))}
      <div className="-mb-2 flex">
        {gatedLinkTypes.map((type, i) => (
          <Button
            variant={tab === type.type ? 'primary' : 'nav'}
            title={type.label}
            circle
            size="sm"
            onClick={() => {
              changeTab(type.type);
            }}
            className={`border-none hover:text-primary ${
              tab === type.type ? 'bg-primary' : 'bg-base-100'
            } `}
            key={i}
          >
            <div className="w-4 h-4">{type.icon}</div>
          </Button>
        ))}
      </div>
    </div>
  );
}
