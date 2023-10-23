import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from 'mintflow/Button';
import { useOvermind } from 'stores/Overmind';
import ALink from 'components/ALink';

export type T_VARIANTS = 'base' | 'silver' | 'gold' | 'platinum';
export const TIER_VARIANTS: T_VARIANTS[] = [
  'base',
  'silver',
  'gold',
  'platinum',
];
type Tier = { v: number; d: string; title?: T_VARIANTS; id?: number };

export function hasBalanceForTier(
  balance: number,
  tierIndex: number,
  tiers: Tier[],
  creator: boolean = false
) {
  if (creator) return true;
  if (!tiers?.length) return false;

  return tiers[tierIndex || 0].v <= balance;
}
export function getTier(
  balance: number,
  tiers: Tier[],
  creator: boolean = false
) {
  if (!tiers || !tiers.length) return null;
  if (!balance) return null;

  tiers.forEach((x, i) => {
    x.id = i;
    x.title = TIER_VARIANTS[i];
  });

  if (creator) return tiers[tiers.length - 1];

  const f = tiers.filter((t) => t.v > -1 && t.v <= balance);
  if (f.length === 0) return null;
  const tier = f[f.length - 1];
  return tier;
}

export type BadgeProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> & {
  variant: T_VARIANTS;
  price?: number;
  balance?: number;
  playerAvailable?: boolean;
  setBuy?: () => void;
  validClaim?: boolean;
  quantity?: number;
  postfix?: string;
};

export type BadgePropsSmall = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'color'
> & {
  variant: T_VARIANTS;
  postfix?: string;
};

const buttonDisplay = (
  validClaim: boolean,
  balance: number,
  variant: string,
  quantity: number
) => {
  if (balance >= quantity) return 'Purchased';

  if (variant === 'base') {
    if (validClaim) return 'Claim for Free';
  } else {
    if (balance > 0) return 'Upgrade';
  }

  return 'Buy';
};

export const TierCard = forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      children,
      price,
      variant,
      balance,
      playerAvailable,
      setBuy,
      postfix,
      validClaim,
      quantity,
      className,
      ...props
    },
    ref
  ): JSX.Element => {
    const classes = twMerge(
      `p-4 md:p-6 w-full ${balance < quantity &&
      'cursor-pointer transition-all ease-in-out hover:-translate-y-1 duration-300'
      } group rounded-box border border-base-300 space-y-8`,
      className
    );

    const { state: ostate } = useOvermind();

    if (variant === null) return null;
    quantity = quantity || 1;

    return (
      <div aria-label="Tiercard" {...props} className={classes} ref={ref}>
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row space-x-2 items-end text-base-content">
            <p className="title">${(quantity * price).toFixed(2)}</p>
            <p className="title"> USDC</p>
          </div>
        </div>
        <div className="">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 items-start md:items-end">
            <h6 className={`capitalize ${variant}-text`}>{variant} Pass</h6>
            <p className="body2 opacity-80">({quantity} Token)</p>
          </div>

          <p className="body2 mt-4 md:mt-2 opacity-80">{children}</p>
        </div>

        {!ostate.user.loggedIn ? (
          <ALink href="/login" title="Login to buy">
            <Button
              variant="secondary"
              disabled={balance >= quantity}
              fullWidth
            >
              Login to buy
            </Button>
          </ALink>
        ) : (
          <Button
            onClick={() => {
              if (balance >= quantity) return;
              setBuy();
            }}
            variant="secondary"
            disabled={balance >= quantity}
            fullWidth
          >
            {buttonDisplay(validClaim, balance, variant, quantity)}
          </Button>
        )}
      </div>
    );
  }
);
TierCard.displayName = 'Tiercard';

export const TierCardSmall = forwardRef<HTMLDivElement, BadgePropsSmall>(
  ({ children, variant, postfix, className, ...props }, ref): JSX.Element => {
    const classes = twMerge(
      'px-4 py-2 cursor-pointer group rounded-box border border-base-300 space-y-8 transition-all ease-in-out duration-300',
      className
    );

    if (variant === null) return null;

    return (
      <div aria-label="Tiercard" {...props} className={classes} ref={ref}>
        <div className="space-y-2">
          <div className="flex flex-row items-center space-x-1">
            <p className={`capitalize base2 ${variant}-text`}>
              {variant} Tier {postfix !== '' ? postfix || 'Unlocked' : ''}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

TierCardSmall.displayName = 'TiercardSmall';
