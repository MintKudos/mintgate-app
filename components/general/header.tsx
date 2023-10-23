import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useOvermind } from 'stores/Overmind';
import { useRouter } from 'next/router';
import { useClickAway } from 'react-use';

export const loginAction = async (ostate, actions, router) => {
  const doLogOut = ostate.user.loggedIn === true;
  console.log(doLogOut ? 'logout' : 'login');
  actions.logOut({ force: true, redirect: true });
  // if (doLogOut) await sleep(20); // await logout

  if (!doLogOut && window.location.href.indexOf('login') === -1)
    localStorage.setItem('callback', window.location.href);
  else localStorage.removeItem('callback');

  if (doLogOut) {
    return;
  } else window.location.href = '/login';
};
