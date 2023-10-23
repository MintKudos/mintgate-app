import { TPP } from './VideoPlayer';

export async function callTPP(
  id,
  signature,
  account,
  jwt,
  mgsession,
  signature_ver
) {
  if (!id) return;
  if (!signature) return;

  // const removeCF = TPP.replace('cf.', '');
  const url = new URL(TPP + `/go/${id}`);

  if (account) url.searchParams.set('account', account);
  if (mgsession) url.searchParams.set('mgsession', mgsession);
  if (signature) {
    url.searchParams.set('signature', signature);
    url.searchParams.set('ver', signature_ver);
  }

  if (jwt) url.searchParams.set('jwt', jwt);
  url.searchParams.set('embed', 'true');

  console.log('fetch started', url.toString());
  const result = await fetch(url.toString())
    .then((x) => {
      return x.json();
    })
    .catch((e) => {
      console.log('fetch failed');
      console.error(e);
      return null; // sign out -2
    });

  if (!result) {
    console.error('NO RESULT'); // no idea if this happens
    return null;
  }
  if (result.redirect) {
    console.error('error', result);
    console.log('not_enough');
    const u = new URL(result.redirect);
    u.searchParams.delete('embed');

    if (u.searchParams.has('utm_source')) {
      u.searchParams.set('utm_source', window.location.host);
    }

    window.location.href = u.href;
    return -1;
  }

  const vurl = result.url;

  // if (_ref) _ref.innerHTML = `<video controls src="${vurl}" controlsList="nodownload" autoplay="true" width="100%"/>`;
  console.log('completed');
  //console.log(id, ref);
  return { vurl, mgsession: result.mgsession, type: result.type }; // account, signature,
}
