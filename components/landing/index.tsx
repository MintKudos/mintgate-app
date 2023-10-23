import Head from 'next/head';

import { CallToAction } from './CallToAction';
import { Faqs } from './Faqs';
import { Footer } from './Footer';
import { Header } from './Header';
import { Hero } from './Hero';
import { PrimaryFeatures } from './PrimaryFeatures';
import { SecondaryFeatures } from './SecondaryFeatures';
import { useOvermind } from 'stores/Overmind';

export default function Landing() {
  const { state: ostate, actions } = useOvermind();

  return (
    <div className="bg-base-100">
      <Head>
        <title>
          Mintgate - NFT based social network for token gated content. Be your
          NFT!
        </title>
        <meta
          name="description"
          content="NFT based social network for token gated content - BE YOUR NFT!"
        />
      </Head>
      <Header actions={actions} />
      <main
        className="h-full bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
      >
        <Hero actions={actions} />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction actions={actions} />
        <Faqs />
      </main>
      <Footer actions={actions} />
    </div>
  );
}
