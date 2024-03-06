type ClassNames = {
  [key: string]: string;
};

export const classNames: ClassNames = {
  mainButtonBase: ` 
    relative 
    p-4
    w-full 
    border-none 
    rounded 
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
  mainButtonOutlineBase: `
    relative 
    p-4
    w-full 
    border-none 
    rounded 
    outline outline-1 outline-primary-poppy
    bg-inherit
    text-primary-poppy
    hover:outline hover:outline-1 hover:outline-primary-fire-brick 
    hover:text-primary-fire-brick 
    hover:border-none
    focus:outline focus:outline-1 focus:outline-primary-madder
    focus:text-primary-madder
    disabled:outline disabled:outline-1 disabled:outline-secondary-cadet-gray
    disabled:text-secondary-cadet-gray
    tracking-wider font-rubik text-xs font-normal leading-6
    `,
  mainButtonTextBase: `
    relative 
    py-0
    px-1
    w-full 
    border-none 
    rounded 

    tracking-wider font-rubik text-xs font-normal leading-6
    text-primary-madder
    hover:text-primary-fire-brick 
    focus:text-primary-fire-brick 
    disabled:text-secondary-cadet-gray
    bg-inherit
    hover:border-none
    hover:outline-none
    focus:outline-none
    `,
  mainButtonLinkBase: `
    outline-none block text-on-primary-lavender-blush rounded w-full
    hover:text-on-primary-lavender-blush hover:outline-none
    `,
};
