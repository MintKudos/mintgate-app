import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();

  const host =
    typeof window !== 'undefined' && window.location.host
      ? window.location.host
      : '';

  return (
    <div
      suppressHydrationWarning={true}
      className="bg-white min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8"
    >
      <Head>
        <title>{`404 ${router.asPath} on ${host} — MintGate`}</title>
      </Head>
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          <p className="text-4xl font-extrabold text-indigo-600 sm:text-5xl">
            404
          </p>
          <div className="sm:ml-6 text-">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1
                suppressHydrationWarning={true}
                className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl"
              >
                Page not found {router.asPath}
              </h1>
              <p className="mt-1 text-base text-gray-500">
                Please check the URL in the address bar and try again.
              </p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <a
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Go back home
              </a>
              <a
                href="mailto:support@mintgate.io"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Contact support
                <br />
                [support@mintgate.io]
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
