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
    console.log('хук Trackshandler');
    if (currentTarget === childElement) {
      setShowModal((state) => !state);
    } else {
      const element = currentTarget as HTMLElement;
      const track =
        Array.isArray(tracks) && tracks?.find((item) => item.id === trackId);
      track && setSelectedTrack(track);
      setChildElement(element);
      setShowModal(true);
    }
  };

  const handlerTrackModal = ({
    currentTarget,
  }: React.MouseEvent<HTMLDivElement>) => {
    console.log('хук Trackshandler');
    if (currentTarget === childElement) {
      setShowModal((state) => !state);
    } else {
      const element = currentTarget as HTMLElement;
      setChildElement(element);
      setShowModal(true);
    }
  };

  const modalOnBlurHandler = () => {
    setShowModal(false);
  };

  if (Array.isArray(tracks)) {
    return {
      showModal,
      selectedTrack,
      childElement,
      setShowModal,
      handlerTracksModal,
      modalOnBlurHandler,
    };
  }

  return {
    showModal,
    setShowModal,
    childElement,
    handlerTrackModal,
    modalOnBlurHandler,
  };
};

export default useHandlerModal;
