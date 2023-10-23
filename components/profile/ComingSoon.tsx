import React from 'react';
import Avvvatars from 'avvvatars-react';
import Fastly from 'components/utility/Fastly';

export default function ComingSoon({
  name,
  username,
  description,
  profileImage,
}) {
  console.log('Profile Image', profileImage);

  return (
    <div>
      <div className="min-h-full h-screen pt-16 pb-12 flex flex-col bg-base-100">
        <main className="flex-grow flex flex-col justify-center max-w-8xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex-shrink-0 flex justify-center">
            {profileImage ? (
              <Fastly
                src={profileImage}
                alt={name}
                width={160}
                className="h-24 w-auto bg-transparent rounded-full"
                onError={(e) => (e.target.src = <Avvvatars value={username} />)}
              />
            ) : (
              <Avvvatars style="shape" value={username} />
            )}
          </div>
          <div className="pt-8 pb-16">
            <div className="max-w-lg mx-auto text-center">
              <p className="text-sm font-semibold text-primary uppercase tracking-wide">
                {name ? name : username}
              </p>
              <h1 className="mt-2 text-4xl font-extrabold text-base-content tracking-tight sm:text-5xl">
                COMING SOON!
              </h1>
              <p className="mt-2 text-base text-base-content">
                {description
                  ? description
                  : 'Share experiences together. Purchase exclusive perks soon!'}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
