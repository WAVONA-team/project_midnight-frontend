import { useState } from 'react';

import { Track } from 'project_midnight';

const useHandlerModal = (tracks: Track | Track[] | null) => {
  const [showModal, setShowModal] = useState(false);
  const [childElement, setChildElement] = useState<HTMLElement | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const handlerTracksModal = ({
    currentTarget,
    trackId,
  }: React.MouseEvent<HTMLDivElement> & { trackId?: string }) => {
    if (currentTarget === childElement) {
      setShowModal((state) => !state);
    } else {
      const element = currentTarget as HTMLElement;
      const track =
        Array.isArray(tracks) && tracks?.find((item) => item.id === trackId);
      track && setSelectedTrack(track);
      setChildElement(element);
      setShowModal((state) => !state);
    }
  };

  const handlerTrackModal = ({
    currentTarget,
  }: React.MouseEvent<HTMLDivElement>) => {
    if (currentTarget === childElement) {
      setShowModal((state) => !state);
    } else {
      const element = currentTarget as HTMLElement;
      setChildElement(element);
      setShowModal((state) => !state);
    }
  };

  const modalOnBlurHandler = () => {
    if (showModal) setShowModal(false);
  };

  const modalOnCloseHandler = () => {
    setShowModal(false);
  };

  if (Array.isArray(tracks)) {
    return {
      showModal,
      selectedTrack,
      childElement,
      modalOnCloseHandler,
      handlerTracksModal,
      modalOnBlurHandler,
    };
  }

  return {
    showModal,
    modalOnCloseHandler,
    childElement,
    handlerTrackModal,
    modalOnBlurHandler,
  };
};

export default useHandlerModal;
