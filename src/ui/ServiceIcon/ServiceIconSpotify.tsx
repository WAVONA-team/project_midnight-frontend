import React from 'react';

const ServiceIconSpotify: React.FC = () => {
  return (
    <div
      className="
      relative 
      p-6 
      rounded-xl 
      bg-gradient-to-r from-[rgba(248,251,255,0.04)] to-[rgba(255,255,255,0)]
      shadow-[inset_0_0_8px_0_#2bd96952]
      border-[0.8px]
      border-solid
      border-[#2bd96842]
      "
    >
      <div className="z-10 absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center">
        <div className="bg-[#1ED760] w-7 h-7 flex justify-center items-center rounded-full shadow-lg shadow-[#2bd96952] ">
          <svg
            width="19"
            height="12"
            viewBox="0 0 19 12"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="white"
              d="M15.3643 11.623C15.1252 12.0025 14.6149 12.1087 14.2163 11.881C11.075 10.0593 7.13637 9.64945 2.48023 10.6514C2.03375 10.7425 1.58728 10.4844 1.4916 10.0593C1.39593 9.63426 1.667 9.2092 2.11348 9.11812C7.20015 8.00992 11.5693 8.48052 15.0773 10.5299C15.476 10.7576 15.6035 11.2434 15.3643 11.623ZM16.9908 8.16172C16.6878 8.63233 16.05 8.76896 15.5557 8.4957C11.9679 6.38557 6.49854 5.77833 2.25699 7.00798C1.6989 7.15979 1.12485 6.87135 0.965394 6.3552C0.805937 5.82387 1.1089 5.27736 1.667 5.12555C6.51449 3.72892 12.542 4.39687 16.6719 6.81063C17.1343 7.08388 17.2938 7.69112 16.9908 8.16172ZM17.1343 4.54868C12.829 2.11975 5.73315 1.89203 1.61917 3.07614C0.965394 3.27349 0.263784 2.92433 0.0564901 2.28674C-0.150804 1.66432 0.231893 0.996365 0.885665 0.799014C5.60559 -0.567262 13.4509 -0.294007 18.394 2.49927C18.984 2.83325 19.1754 3.56193 18.8246 4.12362C18.4897 4.70049 17.7243 4.89784 17.1343 4.54868Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ServiceIconSpotify;
