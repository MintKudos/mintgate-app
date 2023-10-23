import React, { useEffect, useState } from 'react';
import { useSetState } from 'react-use';
import { useOvermind } from 'stores/Overmind';
const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

export const handleFollow = async (following, jwt, username) => {
  const follow = !following;

  var requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };

  let url = new URL(`${TPP}/api/v2/users/follow`);
  url.searchParams.set('jwt', jwt);
  if (username) url.searchParams.set('username', username);
  if (follow !== null)
    url.searchParams.set('follow', follow ? 'follow' : 'unfollow');

  // console.log("url", url);

  await fetch(url.toString(), requestOptions)
    .then((response) => response.json())
    .then((resp) => {
      // console.log('url', url);
      // console.log('resp', resp);
      if (resp && resp.status === 'fail') alert('Cannot save: ' + resp.message);
      else {
        alert(`You ${!follow ? 'have unjoined' : 'now joined'} ${username}`);
        // window.location.reload();
      }
    })
    .catch((e) => {
      alert(e);
    });
};

export default function FollowButtons({
  username,
  follows,
  uid,
  profileId,
  addAsCollaborator,
}: {
  username;
  follows;
  uid;
  profileId;
  addAsCollaborator?;
}) {
  const { state: ostate, actions } = useOvermind();
  const [following, setFollowing] = useState(null);

  useEffect(() => {
    setFollowing(!!follows);
  }, [follows]);

  if (
    !profileId ||
    !uid ||
    uid.toString() === profileId.toString() ||
    following === null
  )
    return null; // user is self

  const onSubmit = async (e) => {
    if (e) e.preventDefault();
    await handleFollow(following, ostate.user.jwt, username);
    setFollowing(!following);
  };

  return (
    <div className="mx-auto">
      {following ? (
        <button
          onClick={onSubmit}
          type="button"
          className="btn btn-outline btn-base buttontext text-base-content"
        >
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-base-content"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"
              />
            </svg>
            Leave
          </span>
        </button>
      ) : (
        <button
          onClick={onSubmit}
          type="button"
          className="btn btn-primary buttontext text-primary-content"
        >
          <span className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-primary-content"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>{' '}
            {addAsCollaborator ? 'Add Collaborator' : 'Join'}
          </span>
        </button>
      )}
    </div>
  );
}
