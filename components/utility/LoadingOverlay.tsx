import Modal from 'mintflow/Modal';
import ModalBody from 'mintflow/Modal/ModalBody';
import React from 'react';
import LoadingAnimationCircle from './LoadingAnimationCircle';

export default function LoadingOverlay({
  text,
  active,
  spinner,
}: {
  text?: string;
  active?: boolean;
  spinner?: boolean;
}) {
  if (active === false || active === null) return null;
  return (
    <Modal open={true}>
      <ModalBody className="pb-6 px-4 space-y-6">
        {spinner !== false && <LoadingAnimationCircle />}
        <div className="flex flex-col space-y-2 items-center text-center">
          <h5 className="text-base-content">{text ? text : `Loading...`}</h5>
        </div>
      </ModalBody>
    </Modal>
  );
}
