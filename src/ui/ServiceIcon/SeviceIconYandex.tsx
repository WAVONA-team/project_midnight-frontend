import React from 'react';

const ServiceIconYandex: React.FC = () => {
  return (
    <div
      className="
        relative
        p-6
        rounded-xl
        bg-gradient-to-r from-[rgba(248,251,255,0.04)] to-[rgba(255,255,255,0)]
        shadow-[inset_0_0_8px_0_#fdd54052]
        border-[0.8px]
        border-solid
        border-[#fdd54052]
        "
    >
      <div className="p-[1px] bg-[transparent] rounded-full  shadow-[-1px_0px_10px_8px_#fdd54052]"></div>
      <div className="z-10 absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center">
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25.7538 9.91025L25.6524 9.40609L21.3649 8.65707L23.8563 5.28643L23.5666 4.96953L19.9019 6.72687L20.3654 2.05984L19.9889 1.84377L17.7582 5.61772L15.2524 0H14.8179L15.4117 5.43047L9.11087 0.38892L8.57492 0.547367L13.4273 6.64045L3.82401 3.44266L3.38945 3.93241L11.9644 8.81551L0.130357 9.79501L0 10.5296L12.2975 11.8692L2.04242 20.3535L2.47697 20.9441L14.6875 14.3035L12.2686 26H13.0073L17.6858 14.995L20.5393 23.6088L21.0463 23.2199L19.873 14.462L24.3198 19.5035L24.6095 19.0426L21.2056 12.7912L25.9566 14.5484L26 14.0155L21.7416 10.8753L25.7538 9.91025Z"
            fill="#FFBC0D"
          />
        </svg>
      </div>
    </div>
  );
};

export default ServiceIconYandex;
