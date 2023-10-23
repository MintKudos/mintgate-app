/**
 * @title Utils - Handle Loading Text
 * @summary Returns various loading messages based on loading type within parent component.
 * Final split / map mimics new line for use in react-loading-overlay text message field.
 */

export function handleLoadingText(type) {
  if (!type || type === '') {
    return (
      <h3 className="text-base-content mb-3 uppercase tracking-wide">
        Loading
      </h3>
    );
  }

  let mapLoadingText = {
    create_sale:
      'Please Approve two Transactions & Wait for them to Confirm to Create Sale\n1. Approve your NFT to be sold\n2. Create sale',
    cancel_sale:
      'Please Confirm Final Transaction and Wait for Sale to be Created',
    buy_nft: 'Confirm Purchase in Wallet & Please Wait for Order to Complete',
    deploy:
      'Please Wait for initial account configuration to complete. \n This may take a few minutes. You will receive a confirmation when complete.',
    approve: 'Please Wait for Minting to be Activated',
    extend: 'Confirm Transaction & Wait for Sale Time to be Extended',
    lazy: 'Please Confirm Purchase Prompt. This May Take a Moment. Do Not Close the Page.',
    confirmed: '✔️ Purchase Complete! Please Wait for Page to Reload.',
    mint: `Creating your Project. This May Take a Minute. Do Not Close the Page.`,
    insufficient: `Transaction error! \n Please make sure you have enough Matic to buy this NFT and try again.`,
    transfer: `Transferring the item. \n Please wait.`,
    transfer_complete: `✔️ Transfer Complete. Please Wait for Page to Reload.`,
    error: `Transaction error! Please report to support@mintgate.io`,
    referral_update: `Please Wait for Settings to Update. You will receive a confirmation when complete.`,
    withdraw: `Please Wait for Withdrawal to Complete. \n Page will reload when complete.`,
  };

  return mapLoadingText[type].split('\n').map((str, i) => (
    <p key={i} className="body2 text-base-content opacity-60">
      {str}
    </p>
  ));
}
