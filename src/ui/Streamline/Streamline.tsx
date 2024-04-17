import { classNames as baseClass } from './classNames';

type Props = {
  isDesktop?: boolean;
};

const Streamline: React.FC<Props> = ({ isDesktop = false }) => {
  return isDesktop ? (
    <div className="spin flex gap-[2px] items-center">
      <div
        className={`${baseClass.lineBaseClassDesktop} animate-[streamlineDesktop_1s_ease-in_infinite]`}
      />
      <div
        className={`${baseClass.lineBaseClassDesktop} animate-[streamlineDesktop_1s_ease-in_0.2s_infinite]`}
      />
      <div
        className={`${baseClass.lineBaseClassDesktop} animate-[streamlineDesktop_1s_ease-in_0.4s_infinite]`}
      />
      <div
        className={`${baseClass.lineBaseClassDesktop} animate-[streamlineDesktop_1s_ease-in_0.6s_infinite]`}
      />

      <div
        className={`${baseClass.lineBaseClassDesktop} animate-[streamlineDesktop_1s_ease-in_0.8s_infinite]`}
      />
    </div>
  ) : (
    <div className="spin flex gap-[2px] items-center">
      <div
        className={`${baseClass.lineBaseClass} animate-[streamline_1s_ease-in_infinite]`}
      />
      <div
        className={`${baseClass.lineBaseClass} animate-[streamline_1s_ease-in_0.2s_infinite]`}
      />
      <div
        className={`${baseClass.lineBaseClass} animate-[streamline_1s_ease-in_0.4s_infinite]`}
      />
      <div
        className={`${baseClass.lineBaseClass} animate-[streamline_1s_ease-in_0.6s_infinite]`}
      />

      <div
        className={`${baseClass.lineBaseClass} animate-[streamline_1s_ease-in_0.8s_infinite]`}
      />
    </div>
  );
};

export default Streamline;
