export declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    ethereum: any;
    workbox: any;
    // mgcache: any;
  }
  interface EventTarget {
    src?: string;
    value?: any;
  }
}
