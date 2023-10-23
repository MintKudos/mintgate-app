function unlockLink(add, network, id) {
  let url = new URL(
    `https://app.unlock-protocol.com/checkout?redirectUri=https://mgate.io/go/${id}&paywallConfig=`
  );
  let unlockObject = {
    locks: {
      [`${add}`]: { network: Number(network) },
    },
    pessimistic: true,
    persistentCheckout: true,
    icon: `https://locksmith.unlock-protocol.com/lock/${add}/icon`,
    referrer: "0x684D30c3504fEa374fC21ecBaf1A5D86E4eee278",
  };
  const newLink = url + encodeURIComponent(JSON.stringify(unlockObject));
  return newLink;
}

export { unlockLink };
