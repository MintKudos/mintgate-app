import { Container } from './Container';

const faqs = [
  [
    {
      question: 'What chains does Mintgate support?',
      answer:
        'We currently support all ERC-271 collections from Ethereum and Polygon.',
    },
    {
      question: 'Do I need to setup my collection?',
      answer:
        'No all collections are automatically indexed on Mintgate. Just connect your wallet and start posting on collection pages',
    },
    {
      question: 'How do I gate my content?',
      answer:
        'All posts on colleciton pages are automatically gated and only visible for token holders.',
    },
  ],
  [
    {
      question: 'Can I share my content outside of a collection page?',
      answer:
        'Yes you have the option to post your content privately (only for token holders) or publicly.',
    },
    {
      question: 'What content can I post on Mintgate?',
      answer:
        'We support posting of Text, Video, Audio, Images, PDFs and links.',
    },
    {
      question:
        'I am a collection owner. Can I customize and moderate my page?',
      answer:
        'Customization and Moderation of collection feeds are on our roadmap. Pleas reach out to use for more details.',
    },
  ],
  [
    {
      question: 'Can I Edit my Profile, where do I see it?',
      answer:
        'You do not have a typical Profile on Mintgate. Your NFTs are your Identity and all your posts happens as your NFT.',
    },
    {
      question: 'Do you support ERC-1155 and ERC-20s?',
      answer:
        'We currently only support ERC-721. Support for other token types is currently in research phase.',
    },
    {
      question: 'Where can I give feedback and propose features?',
      answer:
        'You can leave feedback, propose features and see our roadmap on mintgate.canny.io',
    },
  ],
];

export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-base-100 py-20 sm:py-32"
    >
      {/* <img
        className="absolute top-0 left-1/2 max-w-none translate-x-[-30%] -translate-y-1/4"
        src="/background-faqs.jpg"
        alt=""
        width={1558}
        height={946}
      /> */}
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-base-content sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 text-md tracking-tight text-base-content opacity-80">
            If you can’t find what you’re looking for, pleas reach out to us at
            support@mintgate.io and will get back to you.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg leading-7 text-base-content">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-base-content opacity-80">
                      {faq.answer}
                    </p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
