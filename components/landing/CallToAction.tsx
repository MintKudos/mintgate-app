import { Container } from './Container';
import Button from 'mintflow/Button';

export function CallToAction({ actions }) {
  const brands = [
    {
      title: 'Bored Apes',
      image: '/brands/bored-ape.webp',
      invert: false,
      hight: 'h-10',
    },
    {
      title: 'Friends with Benefits',
      image: '/brands/fwb.svg',
      invert: false,
      hight: 'h-8',
    },
    {
      title: 'Global Titants',
      image: '/brands/global-titans.webp',
      invert: false,
      hight: 'h-16',
    },
    {
      title: 'Golden State',
      image: '/brands/golden-state.png',
      invert: true,
      hight: 'h-16',
    },
    {
      title: 'Rally',
      image: '/brands/rally.webp',
      invert: true,
      hight: 'h-12',
    },
    {
      title: 'Rug Radio',
      image: '/brands/rug-radio.svg',
      invert: true,
      hight: 'h-12',
    },
  ];

  return (
    <section
      id="start"
      className="relative overflow-hidden bg-primary pt-32 pb-28 bg-cover bg-center"
      style={{ backgroundImage: 'url(/call-to-action.png)' }}
    >
      {/* <img
        className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        src="/background-call-to-action.jpg"
        alt=""
        width={2347}
        height={1244}
      /> */}
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Get started. Be your NFT!
          </h2>
          <p className="mt-4 text-lg tracking-tight text-base-primary">
            For content that matters! Create and experience your NFT
            communities.
          </p>
          {/* <Button
            variant="secondary"
            className="mt-10"
            onClick={() => actions.triggerWallet()}
          >
            Connect Wallet
          </Button> */}
          <div className="mt-28 flex flex-col items-center px-12">
            <div className="w-full grid grid-cols-3 gap-4 lg:flex lg:flex-row lg:space-x-4 lg:items-center lg:justify-center">
              {brands.map((brand) => (
                <img
                  key={brand.title}
                  src={brand.image}
                  title={brand.title}
                  className={`${
                    brand.hight
                  } w-full object-contain object-center grayscale hue-rotate-0 contrast-200 saturate-200 ${
                    brand.invert && 'invert'
                  }`}
                />
              ))}
            </div>
            <p className="mt-4 body2">
              The OG token gating provider trusted by the best.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
