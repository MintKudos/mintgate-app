import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* <meta
          http-equiv="Content-Security-Policy"
          content="default-src * 'unsafe-eval' 'unsafe-inline' data: gap: https://ssl.gstatic.com 'unsafe-eval'; frame-src *; connect-src *; style-src 'self' 'unsafe-inline'; media-src *; img-src 'self' data: content:;"
        /> */}

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        ></link>

        <link
          key="videojs-css"
          href="https://unpkg.com/video.js/dist/video-js.min.css"
          rel="stylesheet"
        />
        <link
          href="https://unpkg.com/@videojs/themes@1/dist/fantasy/index.css"
          rel="stylesheet"
        />

        {/* BASE */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#151515" />
        <meta
          name="google-site-verification"
          content="c25hwyq7pdK_hUGQRnxILkng0x2fZGYOc7Ff59Mx940"
        />
        <meta name="msvalidate.01" content="3BA2AE35FEE1B82B084E7198B318EE5A" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="true"
        />
        <link
          rel="mask-icon"
          href="/static/icons/safari-pinned-tab.svg"
          color="#5823EF"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />

        {/* {(
          <script dangerouslySetInnerHTML={{ __html: AWSRUM }} />
        )} */}
        {/* <script src="https://www.googletagmanager.com/gtag/js?id=G-37514942YF" /> */}
        {/* <script src="https://unpkg.com/share-api-polyfill@1.0.21/dist/share-min.js" /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

const AWSRUM = `(function(n,i,v,r,s,c,x,z){x=window.AwsRumClient={q:[],n:n,i:i,v:v,r:r,c:c};window[n]=function(c,p){x.q.push({c:c,p:p});};z=document.createElement('script');z.async=true;z.src=s;document.head.insertBefore(z,document.getElementsByTagName('script')[0]);})('cwr','1758d8c4-5a1d-41f5-8445-d193530adcf3','1.0.0','us-east-1','https://client.rum.us-east-1.amazonaws.com/1.0.2/cwr.js',{sessionSampleRate:1,guestRoleArn:"arn:aws:iam::704991611091:role/RUM-Monitor-us-east-1-704991611091-4726410328361-Unauth",identityPoolId:"us-east-1:8082fc48-69eb-4278-88d6-7356f6d90a82",endpoint:"https://dataplane.rum.us-east-1.amazonaws.com",telemetries:["errors","http"],allowCookies:true,enableXRay:true});`;
