import { useState, useEffect } from "react";
import { useOvermind } from "stores/Overmind";

// TODO remove? -JD
export default function TokenProtection() {
  const [state, setState] = useState({});
  const [link, setLink] = useState(null);

  const { state: ostate, actions } = useOvermind();

  useEffect(() => {
    // const _link = localStorage.getItem('genurl');
    const p = new URLSearchParams(window.location.search);
    const code = p.get("code") || localStorage.getItem("tpp_code");
    // localStorage.getItem('tpp_code');
    const namespace =
      p.get("ns") || localStorage.getItem("tpp_namespace") || "a";
    const template = localStorage.getItem("tpp_template");

    console.log("ostate", ostate);
    const account = ostate.user.wallets.address;
    // localStorage.getItem('address');

    if (!account) {
      console.log("no account");
      // throw new Error('please connect wallet');
      return;
    }
    const root = `https://${namespace}.link.mintgate.io/go/tppsocial/${code}?account=${account}`;
    console.log("root", root);
    // const rel = `/tpp/player?code=${code}&ns=${namespace}`;
    // let w = window.location.origin + rel;
    // w = w.split('//').join(`//${namespace}.`);

    //  const page = root.replace('{namespace}', namespace)
    //     .replace('{code}', code);

    console.log("using TPP link:", root);

    setLink(root);

    setTimeout(() => {
      window.location.href = root;
    }, 10);

    setState({ code, namespace, template });
  }, [ostate.user.wallets.address]);

  return <div className="w-full h-screen">Please wait...</div>;
}
/*
{link && <iframe className="w-full min-h-full"
                wdith="100%"
                referrerPolicy="origin"
                allowFullScreen={true}
                title="link player"
                sandbox="allow-same-origin allow-top-navigation allow-scripts allow-popups allow-forms"
                frameBorder="0"
                src={link}>
            </iframe>}

<iframe className="w-full min-h-full"
                referrerPolicy="origin"
                allowFullScreen={true}
                title="link player"
                sandbox="allow-same-origin allow-top-navigation allow-scripts allow-popups allow-forms"
                frameBorder="0"
                src={link}>
            </iframe>
*/
