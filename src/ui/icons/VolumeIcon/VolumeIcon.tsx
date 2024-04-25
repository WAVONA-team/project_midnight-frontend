import React, { useState } from 'react';

import { useStore } from '@/store/index';

const VolumeIcon: React.FC = React.memo(() => {
  const { volume } = useStore(({ volume }) => ({
    volume,
  }));
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);

  if (volume <= 0.5 && volume !== 0.0) {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="transparent"
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-on-primary-anti-flash-white active:stroke-primary-poppy hover:stroke-primary-misty-rose"
      >
        <path
          d="M19 9C19.6254 9.81968 20 10.8634 20 12C20 13.1366 19.6254 14.1803 19 15"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 14.8135V9.18646C16 6.04126 16 4.46866 15.0747 4.0773C14.1494 3.68593 13.0603 4.79793 10.8823 7.02192C9.75439 8.17365 9.11085 8.42869 7.50604 8.42869C6.10257 8.42869 5.40084 8.42869 4.89675 8.77262C3.85035 9.48655 4.00852 10.882 4.00852 12C4.00852 13.118 3.85035 14.5134 4.89675 15.2274C5.40084 15.5713 6.10257 15.5713 7.50604 15.5713C9.11085 15.5713 9.75439 15.8264 10.8823 16.9781C13.0603 19.2021 14.1494 20.3141 15.0747 19.9227C16 19.5313 16 17.9587 16 14.8135Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (volume === 0.0) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="transparent"
        className="   active:text-primary-poppy"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onMouseUp={() => setActive(false)}
        onMouseDown={() => setActive(true)}
      >
        <path
          d="M22 22 2 2"
          className={`stroke-on-primary-anti-flash-white ${
            active ? 'stroke-primary-poppy' : ''
          } ${hover ? 'stroke-primary-misty-rose' : ''}`}
        />
        <path
          className={`fill-on-primary-anti-flash-white ${
            active ? 'fill-primary-poppy' : ''
          } ${hover ? 'fill-primary-misty-rose' : ''}`}
          d="m8.882 16.978.536-.525-.536.525ZM2.897 8.773l.422.62-.422-.62Zm0 6.454.422-.62-.422.62Zm10.178 4.696.292.69-.292-.69ZM14.75 14a.75.75 0 0 0-1.5 0h1.5ZM8.43 8.536a.75.75 0 0 0-.945-1.166l.945 1.166Zm-2.924-.857c-.686 0-1.258-.001-1.72.047-.474.05-.915.157-1.312.427l.845 1.24c.108-.074.27-.139.623-.175.366-.038.846-.04 1.564-.04v-1.5Zm0 7.142c-.718 0-1.198 0-1.564-.039-.353-.036-.515-.1-.623-.174l-.845 1.239c.397.27.838.378 1.313.427.461.048 1.033.047 1.719.047v-1.5Zm7.744-.007c0 1.597-.002 2.713-.109 3.484-.111.805-.296.908-.358.934l.584 1.382c.863-.366 1.14-1.245 1.26-2.11.125-.9.123-2.142.123-3.69h-1.5Zm-4.904 2.689c1.072 1.094 1.933 1.976 2.645 2.523.687.528 1.505.956 2.376.588l-.585-1.382c-.053.023-.243.091-.877-.395-.608-.467-1.38-1.253-2.487-2.384l-1.072 1.05ZM13.25 14v.814h1.5V14h-1.5ZM2.759 12c0-.627-.037-1.148.042-1.648.073-.462.228-.761.518-.96l-.845-1.239c-.756.516-1.045 1.27-1.155 1.965-.103.655-.06 1.392-.06 1.882h1.5Zm-1.5 0c0 .49-.043 1.227.06 1.882.11.694.4 1.45 1.155 1.965l.845-1.24c-.29-.197-.445-.497-.518-.959-.079-.5-.042-1.02-.042-1.648h-1.5Zm8.16 4.453c-.59-.6-1.117-1.038-1.76-1.303-.64-.265-1.321-.329-2.153-.329v1.5c.773 0 1.216.064 1.58.215.363.15.721.416 1.26.967l1.072-1.05ZM5.505 9.18c.373 0 .897.027 1.367-.025.508-.057 1.054-.211 1.557-.618L7.485 7.37c-.213.173-.457.257-.779.293-.36.04-.703.016-1.2.016v1.5ZM13.075 4.066l-.293.69.293-.69ZM9.472 5.461a.75.75 0 1 0 1.056 1.064L9.473 5.461ZM13.25 9.5a.75.75 0 0 0 1.5 0h-1.5Zm1.5-.314c0-1.551.002-2.797-.123-3.698-.12-.866-.397-1.747-1.26-2.112l-.585 1.38c.062.027.248.13.36.938.106.773.108 1.891.108 3.492h1.5Zm-4.222-2.661c.722-.717 1.258-1.226 1.692-1.526.212-.147.358-.213.452-.237.079-.02.101-.009.11-.005l.585-1.381c-.745-.316-1.456.013-2 .39-.563.388-1.195.999-1.895 1.695l1.056 1.064Zm2.722 2.66V9.5h1.5v-.314h-1.5Z"
        />
        <path
          className={`stroke-on-primary-anti-flash-white ${
            active ? 'stroke-primary-poppy' : ''
          } ${hover ? 'stroke-primary-misty-rose' : ''}`}
          d="M17 10c.63.767 1 1.705 1 2.72 0 .444-.071.873-.204 1.28M20 8c1.25 1.23 2 2.795 2 4.5 0 1.416-.517 2.737-1.41 3.848"
        />
      </svg>
    );
  }
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="transparent"
      xmlns="http://www.w3.org/2000/svg"
      className="stroke-on-primary-anti-flash-white active:stroke-primary-poppy hover:stroke-primary-misty-rose"
    >
      <path
        d="M14 14.8135V9.18646C14 6.04126 14 4.46866 13.0747 4.0773C12.1494 3.68593 11.0603 4.79793 8.88232 7.02192C7.75439 8.17365 7.11085 8.42869 5.50604 8.42869C4.10257 8.42869 3.40084 8.42869 2.89675 8.77262C1.85035 9.48655 2.00852 10.882 2.00852 12C2.00852 13.118 1.85035 14.5134 2.89675 15.2274C3.40084 15.5713 4.10257 15.5713 5.50604 15.5713C7.11085 15.5713 7.75439 15.8264 8.88232 16.9781C11.0603 19.2021 12.1494 20.3141 13.0747 19.9227C14 19.5313 14 17.9587 14 14.8135Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 9C17.6254 9.81968 18 10.8634 18 12C18 13.1366 17.6254 14.1803 17 15"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 7C21.2508 8.36613 22 10.1057 22 12C22 13.8943 21.2508 15.6339 20 17"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export default VolumeIcon;
