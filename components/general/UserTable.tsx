import React, { useEffect, useState } from 'react';
import { useOvermind } from 'stores/Overmind';
import Button from 'mintflow/Button';
import { XMarkIcon } from '@heroicons/react/24/solid';
const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

export default function UserTable({
  users,
  userHeaders,
  username,
  setUsername,
  walletAddress,
  setWalletAddress,
  handleSubmit,
  roleOptions,
  removeCollaborator,
  updateUser,
  removeUser,
}) {
  const { state: ostate, actions } = useOvermind();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const submit = async (e, username, wallet?) => {
    e.preventDefault;
    setLoading(true);
    setDisabled(true);
    removeUser(username, wallet);
  };

  if (!users || users?.length <= 0) {
    return null;
  }

  return (
    <div className="align-middle inline-block w-full">
      <div className="shadow overflow-hidden rounded-xl bg-primary">
        <table className="mt-4">
          <thead>
            <tr>
              {userHeaders?.map((header) => (
                <th
                  scope="col"
                  className="max-w-0 px-6 py-3 text-left text-md font-medium text-base-content tracking-widest"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="rounded-lg px-6 py-6">
            {users &&
              users?.map((user) => (
                <tr key={user?.wallet}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {user?.photo && (
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={user?.photo}
                            alt={`Image of ${user?.name}`}
                          />
                        </div>
                      )}
                      <div className="ml-4">
                        <div className="text-sm font-medium text-base-content">
                          {user?.username}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-base-content">
                        {user?.wallet.slice(0, 8)}...
                        {user?.wallet.slice(34, 42)}
                      </div>
                    </div>
                  </td>
                  {ostate.user.creator && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        onClick={(e) => {
                          submit(e, user?.username, user?.wallet);
                        }}
                        className="flex items-center"
                      >
                        <Button variant="warning" disabled={disabled} startIcon>
                          <XMarkIcon /> Remove
                        </Button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
