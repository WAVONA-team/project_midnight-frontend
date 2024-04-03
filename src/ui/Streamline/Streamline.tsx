import { classNames } from './classnames';

const Streamline: React.FC = () => {
  return (
    <div className="spin flex gap-[2px] items-center">
      <div
        className={`${classNames.lineBaseClass} animate-[streamline_1s_ease-in_infinite]`}
      ></div>
      <div
        className={`${classNames.lineBaseClass} animate-[streamline_1s_ease-in_0.2s_infinite]`}
      ></div>
      <div
        className={`${classNames.lineBaseClass} animate-[streamline_1s_ease-in_0.4s_infinite]`}
      ></div>
      <div
        className={`${classNames.lineBaseClass} animate-[streamline_1s_ease-in_0.6s_infinite]`}
      ></div>

      <div
        className={`${classNames.lineBaseClass} animate-[streamline_1s_ease-in_0.8s_infinite]`}
      ></div>
    </div>
  );
};

export default Streamline;
