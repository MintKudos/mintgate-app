import ALink from 'components/ALink';
import PageHero from 'components/general/PageHero';

const moreItems = [
  {
    title: 'About Mintgate',
    link: '/about.mintgate.io',
    img: '/more/about.jpg',
    isActive: false,
  },
  {
    title: 'Vote for Features',
    link: 'https://mintgate.canny.io/featurevoting',
    img: '/more/feature.jpg',
    isActive: true,
  },
  {
    title: 'Support',
    link: 'https://discord.gg/9BGwzQwJdt',
    img: '/more/support.jpg',
    isActive: true,
  },
  {
    title: 'Give us Feedback',
    link: 'https://mintgate.canny.io/feedback',
    img: '/more/feedback.jpg',
    isActive: true,
  },
];

const socialLinks = [
  {
    title: 'Discord',
    link: 'https://discord.gg/9BGwzQwJdt',
    img: '/more/discord.jpg',
    isActive: true,
  },
  {
    title: 'Twitter',
    link: 'https://twitter.com/mintgate_io',
    img: '/more/twitter.jpg',
    isActive: true,
  },
  {
    title: 'Instagram',
    link: 'https://www.instagram.com/mintgate.io/',
    img: '/more/instagram.jpg',
    isActive: true,
  },
  {
    title: 'LinkedIn',
    link: 'https://www.linkedin.com/company/68536551',
    img: '/more/linkedIn.jpg',
    isActive: true,
  },
  {
    title: 'Medium',
    link: 'https://medium.com/mintgate',
    img: '/more/medium.jpg',
    isActive: true,
  },
];

export default function more() {
  return (
    <div className="pb-16">
      <PageHero Text="More from Mintgate" />
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 px-6">
        {moreItems.map((item) => (
          <ALink title={item.title} href={item.link} target="_blank">
            <div
              className={`cursor-pointer border border-base-300 shadow-elevationSmall rounded-box overflow-hidden hover:shadow-elevationMedium transition-all ease-in-out hover:-translate-y-2 duration-300 ${
                item.isActive ? 'opacity-100' : 'opacity-50'
              }`}
            >
              <img src={item.img} />
            </div>
          </ALink>
        ))}
      </div>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-8 mt-6 px-6">
        {socialLinks.map((item) => (
          <ALink title={item.title} href={item.link} target="_blank">
            <div
              className={`cursor-pointer border border-base-300 shadow-elevationSmall rounded-box overflow-hidden hover:shadow-elevationMedium transition-all ease-in-out hover:-translate-y-2 duration-300 ${
                item.isActive ? 'opacity-100' : 'opacity-50'
              }`}
            >
              <img src={item.img} />
            </div>
          </ALink>
        ))}
      </div>
    </div>
  );
}
