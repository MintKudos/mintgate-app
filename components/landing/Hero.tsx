import React, { useState } from 'react';
import Button from 'mintflow/Button';
import { PhotoIcon, PlayIcon } from '@heroicons/react/24/solid';
import { Container } from './Container';
import Fastly from 'components/utility/Fastly';
import Modal from 'mintflow/Modal';
import ModalBody from 'mintflow/Modal/ModalBody';
import ModalHeader from 'mintflow/Modal/ModalHeader';
import { XMarkIcon } from '@heroicons/react/20/solid';

const communities = [
  {
    title: 'CryptoPunks',
    logo: '/images/punks.avif',
  },
  {
    title: 'CLONE X',
    logo: '/images/1p.avif',
  },
  {
    title: 'Meebits',
    logo: '/images/meebits.png',
  },
  {
    title: 'Bufficorn Brigade',
    logo: 'https://prod-metadata.s3.amazonaws.com/images/3118.png',
  },
  {
    title: 'Moonbirds',
    logo: '/images/2p.avif',
  },
  {
    title: 'Azuki',
    logo: '/images/3p.avif',
  },
  {
    title: 'Bored Ape',
    logo: '/images/4p.avif',
  },
  {
    title: 'Cool Cats NFT',
    logo: 'https://i.seadn.io/gae/LIov33kogXOK4XZd2ESj29sqm_Hww5JSdO7AFn5wjt8xgnJJ0UpNV9yITqxra3s_LMEW1AnnrgOVB_hDpjJRA1uF4skI5Sdi_9rULi8?auto=format&w=256',
  },
];

export function Hero({ actions }) {
  const [videoOpen, setVideoOpen] = useState(false);
  return (
    <div className="w-scrren h-full py-44 lg:py-56">
      <div className="w-full h-full mx-auto max-w-md sm:max-w-4xl text-center">
        <h1 className="text-5xl md:text-7xl h1 text-primary-content">
          Be your NFT. Gated community experiences.
        </h1>
        <p className="mx-auto mt-2 md:mt-4 max-w-xl body1 text-primary-content text-opacity-80">
          Create and enjoy gated experiences from your NFT communities. Movies,
          Shows, Videos, Art, Articles, Events & More! The new way to social.
        </p>
        <div className="relative mt-10 flex justify-center items-center gap-x-6 z-10">
          {/* <Button
            variant="secondary"
            onClick={(e) => {
              e?.preventDefault();
              actions.triggerWallet();
            }}
          >
            Connect Wallet
          </Button> */}
          <Button
            variant="nav"
            className="group"
            startIcon
            onClick={() => setVideoOpen(true)}
          >
            <PlayIcon className="w-5 h-5 text-primary-content group-hover:text-base-content" />
            <span className="text-primary-content group-hover:text-base-content">
              Watch video
            </span>
          </Button>
        </div>
      </div>
      <Container>
        <ul
          role="list"
          className="mx-auto mt-20 max-w-2xl lg:mt-28 lg:max-w-4xl"
        >
          <ul
            role="list"
            className="grid grid-cols-2 gap-6 sm:gap-4 lg:grid-cols-4"
          >
            {communities
              .filter((x) => x.logo)
              .map((community, index) => (
                <li key={index}>
                  <figure
                    className="cursor-pointer relative rounded-box bg-base-100 shadow-elevationMedium border border-base-300 hover:shadow-elevationMedium transition-all ease-in-out hover:-translate-y-2 duration-300"
                    onClick={(e) => {
                      e?.preventDefault();
                      actions.triggerWallet();
                    }}
                  >
                    <div className="h-48 w-full flex items-center justify-center">
                      <Fastly
                        className="w-full h-full object-cover rounded-t-box text-base-200"
                        src={community.logo}
                        alt={community.title}
                      />
                    </div>
                    <figcaption className="p-4 relative bg-base-200 rounded-b-box flex items-center space-x-4 justify-start">
                      <div className="text-start">
                        <p className="base1 text-base-content font-hanson">
                          {community.title}
                        </p>
                      </div>
                    </figcaption>
                  </figure>
                </li>
              ))}
          </ul>
        </ul>
      </Container>
      <Modal open={videoOpen} className="w-full max-w-7xl">
        <ModalHeader className="flex w-full justify-between items-center">
          <p className="title">What if you could be your NFT?</p>
          <Button variant="nav" circle onClick={() => setVideoOpen(false)}>
            <XMarkIcon className="w-7" />
          </Button>
        </ModalHeader>
        <div className="flex flex-col space-y-2 items-center text-center w-full max-w-7xl">
          <iframe
            src="https://www.youtube.com/embed/kKr6Ktb9dBY?controls=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="w-full max-w-8xl aspect-video"
          ></iframe>
        </div>
      </Modal>
    </div>
  );
}
