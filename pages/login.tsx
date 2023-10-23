import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useOvermind } from 'stores/Overmind';
import { storageRemove, storageSet } from 'stores/storage';
import Button from 'mintflow/Button';

export { getStaticProps as getServerSideProps } from 'utils/staticProps';

export default function Login(url) {
  const router = useRouter();
  const { state: ostate, actions } = useOvermind();

  useEffect(() => {
    // const sp = new URLSearchParams(window.location.search);

    // if (sp.get('force') === 'true')
    if (
      window.location.pathname === '/login' &&
      !!localStorage.getItem('seleniumLogin') === false
    )
      actions.logOut({ force: false });
    // if we're on login page, and logged in, and there's no jwt token, assume the user is here by mistake
  }, []);

  // useEffect(() => {
  //   const sp = new URLSearchParams(window.location.search);
  //   if (ostate.user.uid) router.push(sp.get('callback') || '/');
  // }, [ostate.user.uid]);

  // console.log('ostate.whitelabel', ostate.whitelabel?.brand);
  let brandName = 'Mintgate';
  let logo = '/logo-icon.png';
  let banner = '/login.jpg';

  // async function onGoogleAuth() {
  //   storageSet('selectedWallet', 'Email Google Login');
  //   setLoading(true);
  //   actions.triggerWallet();
  // }

  // const onSubmit = (data) => {
  //   const email = data.email;
  //   if (!email) {
  //     alert('no email');
  //     return;
  //   }
  //   storageSet('selectedWallet', 'Email Login');
  //   storageSet('email', data.email);

  //   setLoading(true);
  //   actions.triggerWallet();
  // };

  const onWallet = useCallback(() => {
    storageRemove('selectedWallet');
    console.log('on wallet');
    actions.triggerWallet();
  }, []);

  useEffect(onWallet, []);

  // const onSubmit = async (data) => {
  //   if (!data.email) {
  //     alert('No email provided');
  //     return; //
  //   }
  //   if (!data.email.includes('@') || !data.email.includes('.')) {
  //     return alert('invalid email');
  //   }
  //   if (window === window.parent && data.email.includes('@gmail.com')) {
  //     onGoogle();
  //     return;
  //   }

  //   const magic = makeMagic(ostate.network);
  //   const r = await magic.auth.loginWithEmailOTP({ email: data.email });
  //   if (r) router.push('/callback');
  //   else {
  //     console.error('r', r);
  //     alert('email login error');
  //   }
  // };

  // const onGoogle = useCallback(() => {
  //   if (window !== window.parent) {
  //     onSubmit({ email: null });
  //     return;
  //   }
  //   const magic = makeMagic(ostate.network);
  //   console.log('magic', magic, ostate.network);
  //   magic.oauth.loginWithRedirect({
  //     provider: 'google',
  //     redirectURI: window.location.origin + '/callback',
  //   });
  // }, [ostate.network]);

  // const onMagic = (data) => {
  //   console.log('onMagic');
  //   storageSet('selectedWallet', 'email login');
  //   setShowMagic(true);
  //   setLoading(true);
  // };

  // const [showMagic, setShowMagic] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm();

  // if (ostate.user.loggedIn === null) {
  //   return null;
  // }

  return (
    <>
      {/* {showMagic && (
        <Script
          key="magiclogin"
          id="magilogin"
          strategy="afterInteractive"
          src="https://auth.magic.link/pnp/login"
          data-magic-publishable-api-key="pk_live_7A9ACFF8E2D1AD6E"
          data-terms-of-service-uri="https://www.mintgate.io/legal/terms-of-service"
          data-privacy-policy-uri="/privacy"
          data-redirect-uri={'/callback'}
        ></Script>
      )} */}
      <div className="min-h-screen h-full grid grid-cols-12 gap-4">
        <div className="h-screen w-full hidden lg:block col-span-12 lg:col-span-5 border-r border-base-300">
          <img
            className="h-56 lg:h-full w-full object-cover object-center"
            src={banner}
            alt={brandName}
          />
        </div>
        <div className="mx-auto h-auto w-full col-span-12 lg:col-span-6 flex flex-col justify-center py-2 px-4 sm:px-6 lg:pl-24">
          <div className="mx-auto w-full max-w-xl">
            <div className="flex flex-col items-center lg:items-start">
              <img
                className="h-16 w-16 md:h-20 md:w-20 bg-transparent object-contain"
                src={logo}
                alt={brandName}
              />
              <h3 className="mt-6 text-base-content">
                Connect a crypto wallet to continue...
              </h3>
            </div>

            <div className="mt-8 max-w-sm w-full mx-auto lg:ml-0">
              <div className="mt-1 grid grid-cols-1 gap-3">
                {/* <Button
                    disabled={loading}
                    onClick={onGoogleAuth}
                    variant="secondary"
                    fullWidth
                    startIcon
                  >
                    <img
                      className="w-5 h-5"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAByElEQVRoge3YvWoVQRjG8V+iImhiI5g0FkllZ6sgNhrFG7CyEQu7eANp7RSsLfUOLGxEQY3gFVhYaJJKYiFGUYmQWMwRztnsnv04h51R5g9Pscvs7vPsvrwzs2Qy/x2ncQuP8A5f8AFrmI3oq5ZjuIYHgvH9MVqN5LGSZdzBM/w03vywXscwO8wCbuAxPmluvKivbR88M6Hxo7iAKwOdncI9YQ+H2lzQ5aHLuDzQVZzocI8mTOOFHGARd7Gle7m01VRZwkP86jFApyDjPt9FnME6Pgpd55/jMI7ENjEtZoWZ943QDvsurb/6hle4qWUnI3SiFxHNV+klTjYNMYOnCZiu0rpQ+rVcT8BsnW43CfI8AaN1els0XdZ+dzDfJHFEfuD48ImyIPv9eJmYEe9Jb2DakIOkRg6SGjlIaqQYZFPYRs9hRdiVdiL28uNSwc9KxbgRUpzZ5/G9cLxTMi75mf1czXFjYpfWhlBOc8K/ss2KcSOkWFpNSb60OpGDpEYOkho5SGqUBfndu4v2HPBYFqTzarNHNoonyoI86cHIpDTyuIjP4q+5qrSNU00Tn080zLYOq+EF3Md77EY0vzvwcE+LL5HJZEb5A24F96iJErNOAAAAAElFTkSuQmCC"
                    ></img>
                    Email / Mobile
                  </Button> */}

                {/* <Button
                  className="mb-2"
                  disabled={loading}
                  variant="primary"
                  fullWidth
                  startIcon
                  onClick={onMagic}
                >
                  <EnvelopeIcon className="w-5 h-5" />
                  Email
                </Button> */}
                {/* <Button
                  onClick={onGoogle}
                  variant="secondary"
                  fullWidth
                  startIcon
                >
                  <span className="sr-only">{message} with Google</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    className="w-6 h-6"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    ></path>
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    ></path>
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                  </svg>
                  Google
                </Button> */}
                <Button
                  disabled={loading}
                  variant="secondary"
                  fullWidth
                  startIcon
                  onClick={onWallet}
                >
                  <img
                    className="w-5 h-5"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAByElEQVRoge3YvWoVQRjG8V+iImhiI5g0FkllZ6sgNhrFG7CyEQu7eANp7RSsLfUOLGxEQY3gFVhYaJJKYiFGUYmQWMwRztnsnv04h51R5g9Pscvs7vPsvrwzs2Qy/x2ncQuP8A5f8AFrmI3oq5ZjuIYHgvH9MVqN5LGSZdzBM/w03vywXscwO8wCbuAxPmluvKivbR88M6Hxo7iAKwOdncI9YQ+H2lzQ5aHLuDzQVZzocI8mTOOFHGARd7Gle7m01VRZwkP86jFApyDjPt9FnME6Pgpd55/jMI7ENjEtZoWZ943QDvsurb/6hle4qWUnI3SiFxHNV+klTjYNMYOnCZiu0rpQ+rVcT8BsnW43CfI8AaN1els0XdZ+dzDfJHFEfuD48ImyIPv9eJmYEe9Jb2DakIOkRg6SGjlIaqQYZFPYRs9hRdiVdiL28uNSwc9KxbgRUpzZ5/G9cLxTMi75mf1czXFjYpfWhlBOc8K/ss2KcSOkWFpNSb60OpGDpEYOkho5SGqUBfndu4v2HPBYFqTzarNHNoonyoI86cHIpDTyuIjP4q+5qrSNU00Tn080zLYOq+EF3Md77EY0vzvwcE+LL5HJZEb5A24F96iJErNOAAAAAElFTkSuQmCC"
                  ></img>
                  Crypto Wallet
                </Button>
              </div>
            </div>

            {/* <div className="mt-8 max-w-sm w-full mx-auto lg:ml-0">
              <div>
                <div className="mt-6 relative">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-base-300" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-2 caption1 text-base-content bg-base-100">
                      <span className="opacity-50">Or continue with</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  action="#"
                  className="space-y-6"
                >
                  <Input
                    type="email"
                    id="email"
                    variant="primary"
                    className="w-full"
                    label="Login with Email"
                    {...register('email')}
                  />
                  <div>
                    <Button type="submit" variant="primary" fullWidth>
                      {message}
                    </Button>
                  </div>
                </form>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
