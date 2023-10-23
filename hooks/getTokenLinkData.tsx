import useSWR from 'swr';

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

export const useTokenLinkURL = (tokentid) => {
  return TPP + '/api/v2/links/token?tokenAddress=' + tokentid;
};
export const useTokenLinkData = (token, linkTokenData = null) => {
  // const { state: ostate, actions } = useOvermind();

  const req = useSWR(!token?.tid ? null : useTokenLinkURL(token.tid));

  if (req.error)
    console.log('/api/v2/links/token?tokenAddres req.error', req.error);

  // console.log('data', req.data, req.error);
  if (token.primary_content_id) {
    const primaryLink = req.data?.result?.find(
      (l) => l.id === token.primary_content_id
    );
    if (primaryLink) primaryLink.primary = true;
  }

  const data = req.data || linkTokenData;
  const r = { value: data || null, loading: !data && !req.error };
  // if (req.data) console.log(token?.tid, '---r', r);
  return [r];
};
