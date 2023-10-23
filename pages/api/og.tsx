import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { useOvermind } from 'stores/Overmind';
import { getContractData } from 'hooks/whitelabel/getContractData';

export const config = {
  runtime: 'experimental-edge',
};

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const img = searchParams.get('img');
  const name = searchParams.get('name');
  if (!img) {
    return new ImageResponse(<>Visit with &quot;?username=vercel&quot;</>, {
      width: 1200,
      height: 630,
    });
  }

  return new ImageResponse(
    (
      <>
        <div
          tw="w-full h-full p-2 flex"
          style={{
            backgroundImage: 'linear-gradient(to right, #6A48F1, #EE46F0)',
            fontFamily: '"Outfit"',
          }}
        >
          <div tw="rounded-xl w-full h-full p-4 flex bg-gray-900 shadow-xl">
            <img
              width="562"
              height="562"
              src={img}
              tw="rounded-xl border-2 border-gray-800"
              style={{ objectFit: 'cover' }}
            />
            <div tw="mt-6 flex flex-col px-6 w-[740px] h-full justify-between">
              <div tw="flex flex-col">
                <span
                  tw="text-7xl font-bold text-zinc-50 mb-4"
                  style={{
                    fontFamily: '"Outfit"',
                    fontWeight: 'bold',
                  }}
                >
                  {name}
                </span>
                <span tw="text-3xl text-zinc-300">Community Page</span>
              </div>
              <div tw="flex justify-between items-end w-3/4 text-zinc-400 text-xl">
                <span>Be your NFT.</span>
              </div>
            </div>
            <div
              tw="w-32 h-32 bg-gray-800 rounded-full absolute right-[526px] bottom-[59px]"
              style={{
                transform: 'rotate(-45deg)',
              }}
            />
            <div tw="absolute right-[312px] bottom-[68px] flex items-center">
              <img
                tw="rounded-full border-2 border-zinc-700"
                width="110"
                height="110"
                src="https://pbs.twimg.com/profile_images/1593235690523070466/5wuAw7jw_400x400.jpg"
              />
              <p tw="ml-6 text-4xl font-semibold text-zinc-400">mintgate.io</p>
            </div>
          </div>
        </div>
      </>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
