import React from 'react';

const ServiceIconYoutube: React.FC = React.memo(() => {
  return (
    <div
      className="
        relative
        p-6
        rounded-xl
        bg-gradient-to-r from-[rgba(248,251,255,0.04)] to-[rgba(255,255,255,0)]
        shadow-[inset_0_0_4px_0_#FF0404]
        border-[#FF0404]
      "
    >
      <div className="z-10 absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center">
        <div className="bg-[#FF0404] w-7 h-7 flex justify-center items-center rounded-full shadow-lg shadow-[#FF0404] ">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30Z"
              fill="#FF0000"
            />
            <path
              d="M16 9.61478C19.5213 9.61478 22.3852 12.4787 22.3852 16C22.3852 19.5213 19.5213 22.3852 16 22.3852C12.4787 22.3852 9.61478 19.5213 9.61478 16C9.61478 12.4787 12.4787 9.61478 16 9.61478ZM16 9C12.1333 9 9 12.1333 9 16C9 19.8667 12.1333 23 16 23C19.8667 23 23 19.8667 23 16C23 12.1333 19.8667 9 16 9Z"
              fill="white"
            />
            <path d="M14 20L20 15.8261L14 12V20Z" fill="white" />
          </svg>
        </div>
      </div>
    </div>
  );
});

export default ServiceIconYoutube;
