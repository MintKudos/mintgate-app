import { useOvermind } from 'stores/Overmind';
import WertWidget from '@wert-io/widget-initializer';

const initWert = () => {
  const { state: ostate, actions } = useOvermind();
  const address = ostate.user.wallets.address;
  const network = ostate.network;
  if (!network || network < 0) return null;

  const wertWidget = new WertWidget({
    address,
    partner_id: '01FJ1SB6GP1QC272AM88CDMQV0', // mainnet: "01FJ1SB6GP1QC272AM88CDMQV0", Ropsten testnet: "01FGSQQZK4GZR051Z6S1Y71GRQ"
    origin: 'https://widget.wert.io',
    commodity: 'USDC',
  });

  return wertWidget;
};

export { initWert };
