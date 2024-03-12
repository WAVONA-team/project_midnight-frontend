export const classNamesBase = {
  mainButton: `
  relative 
  px-11
  py-7
  w-full 
  border-none 
  rounded 
  transition-all
  duration-290
  outline outline-1 outline-primary-poppy
  bg-primary-poppy
  hover:outline hover:outline-1 hover:outline-primary-fire-brick 
  hover:bg-primary-fire-brick
  hover:border-none
  focus:outline focus:outline-1 focus:outline-primary-madder
  focus:bg-primary-madder
  disabled:outline disabled:outline-1 disabled:outline-secondary-cadet-gray
  disabled:bg-secondary-cadet-gray
  tracking-wider font-rubik text-xs font-normal leading-6 
    `,
  mainButtonLink: `
  relative 
  block
  px-11
  py-7
  w-full 
  border-none 
  rounded 
  transition-all
  duration-290
  outline outline-1 outline-primary-poppy
  bg-primary-poppy
  text-on-primary-lavender-blush
  tracking-wider font-rubik text-xs font-normal leading-6

  hover:text-on-primary-lavender-blush
  hover:outline hover:outline-1 hover:outline-primary-fire-brick 
  hover:bg-primary-fire-brick
  hover:border-none
  focus:outline focus:outline-1 focus:outline-primary-madder
  focus:bg-primary-madder
    `,
  mainButtonLinkDisabled: `
  outline outline-1 outline-secondary-cadet-gray
  bg-secondary-cadet-gray
  pointer-events-none
    `,
  mainButtonLoading: `
  relative 
  block
  px-11
  py-7
  w-full 
  border-none 
  rounded 
  transition-all
  duration-290
  outline outline-1 outline-primary-poppy
  bg-primary-poppy
  cursor-auto
  focus:outline focus:outline-1 focus:outline-primary-poppy
    `,
};
