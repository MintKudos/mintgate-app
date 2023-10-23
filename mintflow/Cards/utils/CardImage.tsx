// import Image from 'next/image';
import LazyLoad from 'react-lazyload';
import Fastly, { SMALL_NFT_SIZE } from 'components/utility/Fastly';

export default function CardImage({ token, className }) {
  if (!token || !token?.img) return null;

  const url = token?.img;

  // const _url = url ? new URL(url) : null;
  // if (_url && url?.indexOf('.gif') === -1) {
  //   _url.searchParams.set('width', 400);
  //   _url.searchParams.set('quality', 80);
  //   _url.searchParams.set('auto_optimize', 'medium');
  // }

  return <LazyLoad height={300} offset={200} resize once>
    <Fastly
    width={SMALL_NFT_SIZE}
    loading="lazy"
    src={url || "/cardPlaceholder.png"}
    onError={(e) => {
      if (e.target.src !== "/cardPlaceholder.png" && e.target.src !== window.location.href) e.target.src = "/cardPlaceholder.png"
    }}
    alt={token?.name}
    className={className}
  /></LazyLoad>
}