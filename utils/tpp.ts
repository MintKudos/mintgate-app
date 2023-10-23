const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

//reference

// const TOKEN_DEFAULT = {
//   userSelectedType: "1155",
//   amount: "1",
//   tokenAddress: env.raricontract, // preselect ||
//   subid: null,
//   network: '1'
// };

const SUPPORTED_PLATFORMS = [
  'mypinata.cloud',
  'zoom.com',
  'zoom.us',
  'calendly.com',
  'airtable.com',
  'bit.ly',
  'tinyurl.com',
  'huddle01.com',
  'dropbox.com',
  'drive.google.com',
  'wetransfer.com',
  'box.net',
  'hackmd.io',
  'shopify',
  'figma.com',
  'twitch.tv',
  'facebook.com',
  'eventbrite',
  'ifps://',
  'trello.com',
  'ticketmaster',
  'ticketfly',
  'notion.site',
  'notion.so',
  'pinata',
  'youtube.com',
  'youtu.be',
  'slack.com',
  'discord.com',
  'discord.gg',
  // 'vimeo.com',
  'docs.google.com',
  'slides.google.com',
  'ghost.io',
  'soundcloud.com',
  'wix.com',
  'webflow.com',
  'hubspot.com',
  'squarespace.com',
  'imgur.com',
  'audius.com',
  'tiktok.com',
  'embednotion.com',
  'mintgate.io',
];

//const { state: ostate, actions } = useOvermind();

const isplatformURL = (formURL) => {
  let host = null;
  if (!formURL) return false;
  if (formURL.indexOf('http') === -1) formURL = `https://${formURL}`;
  try {
    host = new URL(formURL).host?.toLowerCase();
  } catch (e) {
    // console.log(e);
    return false;
  }

  return !!SUPPORTED_PLATFORMS.find((x) => host.includes(x));
};

function contentLink(url: string) {
  if (url === 'https://tix.tix') return false;
  if (url === 'https://vid_upload' || url === 'https://audio') return true;
  return false;
}

function isSentinalUrl(url: string) {
  if (url === 'https://tix.tix') return true;
  if (url === 'https://vid_upload' || url === 'https://audio') return true;
  return false;
}

// Test if link is publically accessible if not on whitelist redirects
async function testLink(url: string) {
  if (!url) return false;
  if (isSentinalUrl(url)) return true;

  if (isplatformURL(url)) return true;

  try {
    await fetch(url?.toString());
  } catch (e) {
    // console.error('fetch: ', e);
    return false;
  }
  return true;
}

//  optional: img, descr
const createGatedLink = async (
  {
    url,
    linkTitle,
    tid,
    refid,
    img,
    descr,
    ostate,
    release_date,
    tier,
    uid_img,
    media,
  },
  network = '1',
  ttype = '721',
  uid_tid: string = null,
  subid: string = ''
) => {
  img = img || null;
  descr = descr || null;
  release_date = release_date || null;

  if (url) {
    if (contentLink(url) && !refid) {
      alert('Please upload content first.');
      return;
    } else if ((await testLink(url)) !== true) {
      try {
        const _url = new URL(url);
        _url.searchParams.set('utm_source', '1');
        url = _url.toString();
      } catch (e) {
        alert('Content URL invalid.');
        return;
      }
    }
  } else {
    url = '';
  }
  let _url = new URL(`${TPP}/api/v2/links/create`);

  if (!ostate.user.jwt) throw new Error('no JWT token');
  if (!tid) throw new Error('missing tid to verify');

  let tokenParams = {
    network: network || -1,
    subid: subid || '', // can't be null
    ttype: ttype || '721', // '1',
    balance: 1,
    token: tid,
  };
  // console.log({ tokenParams });

  const v2Params: any = {
    media: media || null,
    url,
    title: linkTitle,
    tokens: [tokenParams],
    jwt: ostate.user.jwt,
    release_date: release_date,
    tier: tier || 0,
  };

  if (uid_tid || uid_tid === '0') v2Params.uid_tid = uid_tid;
  if (uid_img) v2Params.uid_img = uid_img;
  if (refid) v2Params.refid = refid;
  if (img) v2Params.img = img;
  if (descr) v2Params.descr = descr;
  if (release_date || release_date === null)
    v2Params.release_date = release_date;
  if (ostate.whitelabel?.brand?.id)
    v2Params.brand = Number.parseInt(ostate.whitelabel.brand?.id);

  // console.log('APIv2:', v2Params);
  // console.log('POST url', _url.toString());

  const gatedURL = await fetch(_url.toString(), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(v2Params),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('data response', data);
      if (data && data.status === 'fail') {
        let msg = data;
        //if (data.details) msg += ': ' + JSON.stringify(data.details, null); // data.msg
        alert('Form Error: ' + msg);
        console.error(msg);
        return;
      }
      return data.url;
    })
    .catch((e) => {
      alert('Oh no! We have an error: ' + e.toString());
      console.error(e);
    });

  return gatedURL;
};

const updateGatedLink = async ({
  jwt,
  id,
  hidden,
  descr,
  title,
  img,
  release_date,
  add,
  token_id,
  network,
  ttype,
  minbal,
  subid,
}: {
  jwt: string;
  id: string;
  hidden?: boolean;
  descr?: string;
  title?: string;
  img?: string;
  release_date?: Date | null;
  add?: boolean;
  token_id?: string;
  network?: string;
  ttype?: string;
  minbal?: number;
  subid?: string;
}) => {
  let _url = new URL(`${TPP}/api/v2/links/update`);
  _url.searchParams.set('jwt', jwt);
  _url.searchParams.set('id', id);
  if (hidden != null) _url.searchParams.set('hidden', hidden.toString());
  if (descr) _url.searchParams.set('descr', descr);
  if (title) _url.searchParams.set('title', title);
  if (img) _url.searchParams.set('img', img);
  if (release_date)
    _url.searchParams.set('release_date', release_date.toDateString());

  //if (!jwt) throw new Error('no JWT token');

  const addTokenParams: any = {
    add,
    token_id,
    network,
    ttype,
    minbal,
    subid,
  };

  const gatedURL = await fetch(_url.toString(), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(addTokenParams),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('data response', data);
      if (data && data.status === 'fail') {
        let msg = data;
        alert('Form Error: ' + msg);
        console.error(msg);
        return;
      }
      console.log('Updated link: ', data);
      return data;
    })
    .catch((e) => {
      alert('Oh no! We have an error: ' + e.toString());
      console.error(e);
    });

  return gatedURL;
};

export { createGatedLink, updateGatedLink, isplatformURL };
