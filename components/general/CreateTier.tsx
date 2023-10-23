import React, { useCallback, useMemo, useState } from 'react';
import Drawer from 'mintflow/Drawer';
import Button from 'mintflow/Button';
import Checkbox from 'mintflow/Checkbox';
import Input from 'mintflow/Input';
import Textarea from 'mintflow/Textarea';
import { TIER_VARIANTS } from 'mintflow/Tiercard/Tiercard';
import { useAsyncFn } from 'react-use';
import { useForm } from 'react-hook-form';
import { apiUpdateToken } from 'components/NFT/api_token';

export default function AddTier({ tiers, jwt, tid }) {
  // const router = useRouter();
  const [open, setOpen] = useState(false);
  const [checkedTiers, setCheckedTiers] = useState<boolean[]>(
    tiers?.map((x) => x.v > -1) || [true, false, false, false]
  );

  const addOrRemove = useCallback(
    (index) => {
      setCheckedTiers((x) => {
        x[index] = !x[index];
        return [...x];
      });
    },
    [setCheckedTiers]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const tierItems = useMemo<{ d: string; v: number; title: string }[]>(() => {
    return [0, 1, 2, 3].map((_, i) => ({
      d: '',
      v: i === 0 ? 1 : -1,
      title: TIER_VARIANTS[i],
      ...tiers?.[i],
    }));
  }, [tiers]);

  const [service, save] = useAsyncFn(
    async (x: any) => {
      x?.item?.forEach((y, i) => {
        if (!checkedTiers[i]) y.v = -1;
        else {
          y.v = Number.parseInt(y.v || -1);
          if (i > 0 && x.item[i - 1]?.v >= y.v) {
            alert('Every tier must be of greater value');
            throw new Error('cannot save');
          }
        }
      });
      console.log('x', x?.item);

      await apiUpdateToken(tid, jwt, { tiers: x.item || null });
      // setOpen(false);
      window.location.reload();
      return true;
    },
    [tiers, tid, jwt, checkedTiers]
  );

  // console.log('Balance', ostate.user?.wallets?.balance?.MATIC);

  return (
    <>
      <div className="cursor-pointer group p-2">
        <Button
          aria-label="Add Pass Tier"
          onClick={() => setOpen(true)}
          variant="primary"
          fullWidth
        >
          {!tiers ? 'Add Tier Levels' : 'Edit Tier Levels'}
        </Button>
      </div>
      <Drawer open={open} setOpen={setOpen} header="Edit Passes">
        <form onSubmit={handleSubmit(save)}>
          <div className="flex flex-col mt-8 space-y-10 px-2">
            <div className="flex flex-col space-y-4 w-full">
              {tierItems.map((item, i) => (
                <div
                  key={item.title}
                  className="cursor-pointer p-4 rounded-box border border-base-300 flex flex-col w-full items-start transition-all ease-in-out hover:-translate-y-1 duration-300"
                >
                  <div className="flex flex-row space-x-2 items-center">
                    <Checkbox
                      disabled={i === 0}
                      checked={!!checkedTiers[i]}
                      onChange={() => i > 0 && addOrRemove(i)}
                    />
                    <h6
                      className={`title pl-1 capitalize ${item.title + '-text'
                        }`}
                    >
                      {item.title} Tier
                    </h6>
                  </div>
                  <div
                    className={`w-full space-y-2 mt-6 ${!checkedTiers[i] && 'hidden'
                      }`}
                  >
                    <Input
                      variant="primary"
                      type="number"
                      readOnly={i === 0}
                      label="Amount to Unlock"
                      placeholder="e.g. 100"
                      className="w-full"
                      title={i ? 'set minimum' : 'cannot modify base'}
                      {...register(`item.${i}.v`, {
                        required: false,
                        min: 1,
                        max: i === 0 ? 1 : 10000,
                        value: tierItems[i].v === -1 ? '' : tierItems[i].v || 1,
                      })}
                    />
                    {errors?.item?.[i]?.v && (
                      <p>Must be in range 1-{i === 0 ? 1 : 10000}</p>
                    )}
                    <Textarea
                      variant="primary"
                      label="Describe pass perks"
                      className="w-full"
                      placeholder="e.g. This pass unlocks these perks:"
                      {...register(`item.${i}.d`, {
                        required: false,
                        maxLength: 160,
                        value: tierItems[i].d,
                      })}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="primary"
              type="submit"
              disabled={service.loading || !!service.value}
              fullWidth
            >
              Save & Close
            </Button>
          </div>
        </form>
      </Drawer>
    </>
  );
}
