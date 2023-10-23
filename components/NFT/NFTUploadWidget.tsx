import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useOvermind } from 'stores/Overmind';
import { useAsyncFn } from 'react-use';
import { createGatedLink } from 'utils/tpp';
import NFTUpload from 'components/Content/ContentUpload';
import NFTUploadFields from 'components/NFT/NFTUploadFields';
import { photoUpload } from 'components/utility/ImgUploadElement';
import Button from 'mintflow/Button';
import dynamic from 'next/dynamic';
import { HeartIcon } from '@heroicons/react/24/solid';
import NFTSelector from 'components/utility/NFTSelector';
import { useSWRConfig } from 'swr';
import { useMatchMutate } from 'utils/useMatchMutate';

type NFTUploadWidgetProps = {
  chain: number;
  tid: string;
  tierItems: any;
  userNft: any;
  imgSrc: string;
};

const PostEditor = dynamic(() => import('components/NFT/NFTUploadFields'), {
  ssr: true,
  loading: () => <p>loading post ...</p>,
});

export default function NFTUploadWidget({
  tid,
  chain,
  tierItems,
  userNft,
  imgSrc,
}: NFTUploadWidgetProps) {
  const { state: ostate, actions } = useOvermind();
  const [formURL, setFormURL] = useState('');
  const [formRefid, setRefid] = useState(null);
  const [tab, setTab] = useState('post');
  const [imgP, setImgP] = useState<string>();
  const [img, setImg] = useState<string>();
  const [openModal, setOpenModal] = useState<boolean>();
  const [time, setTime] = useState(null);
  const [release_date, setReleaseDate] = useState<string | null>();
  const [media, setMedia] = useState<string>('txt');
  const imageUpload = useRef();
  const [preview, setPreview] = useState<string>(null);
  // const imageUpload = useRef();
  const [tokenInput, setTokenInput] = useState({
    img: '',
    tokenName: '',
    descr: '',
    release_date: '',
  });

  const mutateMatch = useMatchMutate();

  const tabsWithoutFields = ['post', 'livestream'];

  const router = useRouter();
  const [tier, setTier] = useState<0 | 1 | 2 | 3>(0);
  const [selectedNFT, setSelectedNFT] = useState<any>(null);

  useEffect(() => {
    setSelectedNFT(userNft?.[0]);
  }, [userNft?.[0], router.asPath]);
  // console.log('authorNFT', selectedNFT?.tokenId);

  const [service, submit] = useAsyncFn(async () => {
    var authorNFT = selectedNFT; // || userNft;
    let imgURL =
      preview || (imageUpload ? await photoUpload(imageUpload) : imgSrc);

    let linkTitle = authorNFT?.title;
    // return;

    let gatedLink;

    console.log('I am posting something on tab:', tab);

    let url = formURL;
    if (tab === 'post') {
      url = null;
    }

    let descr = tokenInput.descr;
    let _media = media;
    console.log('media', _media, descr);
    // Check for link in post
    if (_media === 'txt' && descr?.includes('https:')) {
      descr = descr?.replace('HTTPS:', 'https:');
      const link = descr?.split('https:')[1]?.split(' ')[0];
      url = 'https:' + link;

      descr = descr.replace(url, '');
      _media = 'lnk';
    }

    if (_media === 'lnk' && !url) {
      alert('no link');
      return;
    }

    //if (tab !== 'post') {
    console.log('createGatedLink');
    console.log({
      formURL,
      linkTitle,
      tid,
      formRefid,
      imgURL,
      descr: descr,
      release_date,
    });

    const is721 = authorNFT.tokenType.includes('721') ? '721' : null;
    const is1155 = authorNFT.tokenType.includes('1155') ? '1155' : null;
    if (is1155) linkTitle = linkTitle + ' #' + ostate.user.uid;

    if (!authorNFT?.media?.[0]?.gateway) {
      console.log('no media gateway');
      alert('no NFT image found. please report!');
      return;
    }

    const uid_img =
      authorNFT?.media?.[0]?.thumbnail ||
      authorNFT?.media?.[0]?.gateway ||
      null;

    // try {
    let gatedLinkParams = {
      media: _media,
      tier: tier || 0,
      url,
      linkTitle,
      tid: tid,
      refid: formRefid,
      img: imgURL,
      descr: descr.toString(),
      release_date,
      ostate,
      uid_img,
    };

    if (!authorNFT.tokenType || (!is721 && !is1155)) {
      alert('no token type on NFT');
      return;
    }

    // console.log('authorNFT', authorNFT);
    // return;

    if (is721) {
      if (authorNFT.tokenId?.length > 78) {
        alert('no large of tokenid');
        return;
      }
      gatedLink = await createGatedLink(
        gatedLinkParams,
        chain?.toString() || '1',
        is721,
        authorNFT.tokenId?.toString(),
        ''
      );
    } else if (is1155) {
      gatedLink = await createGatedLink(
        gatedLinkParams,
        chain?.toString() || '1',
        is1155,
        '0',
        authorNFT.tokenId
      );
    }

    console.log('gated link created', gatedLink);
    if (!gatedLink) return false;
    else {
      console.log('gated link created', gatedLink);
      // alert('Your content has been added');
      // window.location.reload();
      // router.reload();
      await mutateMatch(/\/feed/);
      setTokenInput((x) => ({
        ...x,
        descr: '',
        tokenName: '',
        img: '',
        release_date: null,
      }));
      setTab('post');
      setMedia('txt');
      setFormURL('');
      setRefid(null);
      setPreview(null);
      return true;
    }
    // }
    // catch (error) {
    //   console.log('error:' + error);
    // }
    //}
  }, [
    media,
    selectedNFT,
    tid,
    tier,
    formURL,
    imageUpload,
    formRefid,
    ostate.user.jwt,
    tokenInput,
    release_date,
  ]);

  const wordsLength = tokenInput?.descr?.length;

  // console.log('userNft', userNft);
  if (service.error) console.log('Error Input?', service);

  return (
    <div className="relative group flex flex-col justify-end transition-all transform-all ease-in-out duration-500 bg-base-200 rounded-box px-2 pb-2">
      <div className="absolute -top-6 -left-1">
        {
          <NFTSelector
            userNfts={userNft}
            selectedNFT={selectedNFT}
            setSelectedNFT={setSelectedNFT}
          />
        }
      </div>
      <div className="flex flex-ro justify-end pt-4 px-2">
        <p className="text-xs opacity-60">
          * Only other NFT owners can see the posts.
        </p>
      </div>
      <div className="mt-6 bubble bubbleBottom shadow-elevationHigh space-y-1 w-full">
        <PostEditor
          setTokenInput={setTokenInput}
          id={'add post'}
          value={tokenInput?.descr}
        />
        <div className="pt-2 flex flex-row justify-between items-end">
          <div className="flex-1">
            <NFTUpload
              setFormURL={setFormURL}
              setRefid={setRefid}
              setTab={setTab}
              tab={tab}
              imgP={imgP}
              setImgP={setImgP}
              imageUpload={imageUpload}
              img={img}
              setImg={setImg}
              hideCrowdfund={true}
              NFTPageDialog={true}
              tabsWithoutFields={tabsWithoutFields}
              media={media}
              setMedia={setMedia}
              setPreview={setPreview}
            />
          </div>
          {/* No Tier feature at the moment 
        {!!tierItems.length && (
          <TierSelect tierItems={tierItems} tier={tier} setTier={setTier} />
        )}
        */}
          <div className="flex space-x-4 items-end">
            <p className="body2 opacity-60">{600 - wordsLength}</p>
            {!service.loading && (
              <Button
                //disabled={!formURL}
                variant="primary"
                size="sm"
                onClick={() => submit()}
                className="ml-auto mr-0 px-4"
              >
                Post
              </Button>
            )}
          </div>
        </div>
      </div>
      {service.loading && (
        <div className="relative rounded-3xl col-span-2 border border-base-300 px-6 py-5 shadow-sm hover:shadow-mg flex justify-center items-center space-x-3 transition duration-500 ease-in-out transform hover:scale-105 focus:scale-95 focus:border-primary">
          <p className="text-base font-medium  gradient-four tracking-wide button">
            Loading...
          </p>
        </div>
      )}
    </div>
  );
}

export function TierSelect({ tierItems, tier, setTier }) {
  return (
    <div className="mt-6">
      <label className="label" htmlFor="tiers">
        <span className="label-text base1">Select the Tier to assign</span>
      </label>
      <select
        onChange={(r) => setTier(Number.parseInt(r.target.value))}
        name="tiers"
        required
        className="select border border-base-300 focus:shadow-sm focus:ring focus:border-primary ring-primary/50 w-full focus:outline-none"
      >
        {tierItems
          .filter((t) => t.v > 0)
          .map((item, i) => (
            <option
              value={i}
              selected={i === tier}
              label={item.title + ' x' + item.v}
            />
          ))}
      </select>
    </div>
  );
}
