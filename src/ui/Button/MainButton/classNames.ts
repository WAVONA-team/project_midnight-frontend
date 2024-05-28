export const classNamesBase = {
  mainButton: `
  relative
  block
  px-5
  py-2
  w-full
  border-none
  rounded
  transition-all
  duration-290
  outline outline-1 outline-primary-poppy
  bg-primary-poppy
  text-on-primary-lavender-blush
  hover:outline hover:outline-1 hover:outline-primary-fire-brick
  hover:bg-primary-fire-brick
  hover:border-none
  focus:outline focus:outline-1 focus:outline-primary-madder
  focus:bg-primary-madder
  disabled:outline disabled:outline-1 disabled:outline-secondary-cadet-gray
  disabled:bg-secondary-cadet-gray
  tracking-wider font-rubik text-base font-normal leading-6

  lg:text-sm
    `,
  mainButtonLink: `
  relative
  block
  px-7
  py-4
  w-full
  border-none
  rounded
  transition-all
  duration-290
  outline outline-1 outline-primary-poppy
  bg-primary-poppy
  text-on-primary-lavender-blush
  tracking-wider font-rubik text-base font-normal leading-6

  hover:text-on-primary-lavender-blush
  hover:outline hover:outline-1 hover:outline-primary-fire-brick
  hover:bg-primary-fire-brick
  hover:border-none
  focus:outline focus:outline-1 focus:outline-primary-madder
  focus:bg-primary-madder

  lg:text-sm
    `,
  mainButtonLinkDisabled: `
  outline outline-1 outline-secondary-cadet-gray
  bg-secondary-cadet-gray
  pointer-events-none
    `,
  mainButtonLoading: `
  relative
  flex
  items-center
  justify-center
  px-5
  py-2
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
