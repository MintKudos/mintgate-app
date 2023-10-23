const tokenLinks = {
  1: `https://etherscan.io/`,
  137: `https://polygonscan.com/`,
};

const contractLinks = {
  1: `https://etherscan.io/`,
  137: `https://polygonscan.com/`,
};

export function getTokenLink(chainId, contract, tokenId) {
  return tokenLinks[chainId] + `token/${contract}?a=${tokenId}`;
}

export function getTransactionLink(chainId, transactionHash) {
  return contractLinks[chainId] + `tx/${transactionHash}`;
}
