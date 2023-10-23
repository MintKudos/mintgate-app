import { useOvermind } from "stores/Overmind";
import { useAsync } from "react-use";

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

let cache = null;
export default function getUserInfo() {
  const { state: ostate, actions } = useOvermind();

  const userInfoObj = useAsync(async () => {
    if (!ostate.user.uid || !ostate.user.jwt) return null;
    if (cache) return cache;

    let _url = `${TPP}/api/v2/users/info?username=${ostate.user.username}`;
    const response = await fetch(_url, {
      method: "GET",
    });
    const data = await response.json();
    cache = data?.result;
    return data;
  }, [ostate.user.username]);

  return userInfoObj?.value || undefined;
}
