import {
  useInterval,
  useAsyncFn,
  useTimeoutFn,
  useAsync,
  useDebounce,
} from 'react-use';
import React, { useState, useMemo, useCallback } from 'react';
import useSWR from 'swr';

export function useRampInterval(fn, deps, stopOnVal?: boolean, name?: string) {
  const [step, setStep] = useState<number>(0);

  const state = useMemoTruthy(fn, [step, ...deps], stopOnVal, name);

  const incStep = () => setStep(step + 1);

  useTimeoutFn(incStep, 12000); // 12 seconds
  // useTimeoutFn(incStep, 30000); // 30 seconds
  // useTimeoutFn(incStep, 60000); // 1 minutes

  // if (state) console.log('state', state);

  return state;
}

// Returns a callback that only fires when all deps are truthy
export function useMemoTruthy(fn, deps, stopOnVal?: boolean, name?: string) {
  const [state, setState] = useState<any>(null);

  useMemo(() => {
    // console.log('name', name, state, deps);
    if (stopOnVal && state !== null) return;

    // console.log('token && provider && account', !!token, !!provider, !!account);
    if (deps.indexOf(null) === -1 && deps.indexOf(undefined) === -1) {
      // console.log(name, 'called', deps);
      const v = fn();
      if (v?.then) v.then((x) => setState(x));
      else setState(v);
    }
  }, deps);

  return state;
}

// useSWRFn(fn, args, rapidCheck) is a custom hook to use SWR with async functions that caches between components and can render SSR.
// fn: will ONLY fire if all args are either NOT null or undefined.
// args: MUST be simple values (strings/numbers/booleans)
// rapidCheck: if true, fires more frequently as an "active interest" to the user
type ArgTypes = string | number | boolean | null | undefined;
const FAST_TIME = 4000;
export function useSWRFn<T = any>(
  name: string,
  fn: any,
  args: ArgTypes[],
  rapidCheck: boolean = false
) {
  const [checks, setChecks] = useState<number>(1);

  const ready =
    args.findIndex((arg) => arg === null || arg === undefined) === -1;
  const url = ready ? [name, ...args].join(':') : null;

  const fetcher = useSWR(
    ready && [url, ...args],
    (url, ...args) => {
      // console.log('called', url, checks);
      return fn.apply(null, args);
    },
    {
      refreshInterval:
        rapidCheck && ready && checks < 4 ? FAST_TIME * checks : null,
      onSuccess: (data) => {
        setChecks((checks) => checks + 1);
      },
      revalidateIfStale: true,
      revalidateOnFocus: rapidCheck,
      revalidateOnReconnect: rapidCheck,
      dedupingInterval: rapidCheck ? FAST_TIME : 120000,
      focusThrottleInterval: rapidCheck ? FAST_TIME / 2 : 120000 / 2,
    }
  );

  if (fetcher.error) console.error(fetcher.error);

  return fetcher.data as T;
}
