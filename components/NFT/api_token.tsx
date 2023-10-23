export const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

export async function apiUpdateToken(tid: string, jwt: string, obj: any) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jwt: jwt,
      tid: tid,
      ...obj,
    }),
  };

  return await fetch(`${TPP}/api/v2/tokens/update`, requestOptions)
    .then((response) => response.json())
    .then((resp) => {
      if (resp && resp.status === 'fail') {
        console.log('Cannot save page content' + resp.message);
        return 'Cannot save page content' + resp.message;
        return resp;
      } else {
        console.log('resp', resp);
        return true;
      }
    })
    .catch((e) => {
      alert(e);
      // setLoading(false);
    });
}
