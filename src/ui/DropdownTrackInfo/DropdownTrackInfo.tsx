import { FC } from 'react';

type Props = {
  name: string;
  artist: string | null;
  provider: string;
  imgUrl: string | null;
};

const DropdownTrackInfo: FC<Props> = ({ name, artist, provider, imgUrl }) => {
  return (
    <div className="flex gap-[18px]">
      <div className="w-[50px] h-[50px] rounded-[4px]">
        <img
          src={imgUrl}
          alt="Cover"
          className="w-full h-full object-cover rounded-[4px]"
        ></img>
      </div>
      <div className=" font-rubik font-normal text-start  overflow-hidden text-ellipsis whitespace-nowrap  flex-0 basis-[60%] ">
        <p className="block text-sm text-on-primary-anti-flash-white ">
          {name}
        </p>
        <p className="text-[11px] text-secondary-cadet-gray">{artist}</p>
        <p className="text-[11px] text-secondary-cadet-gray">{provider}</p>
      </div>
    </div>
  );
};

export default DropdownTrackInfo;
