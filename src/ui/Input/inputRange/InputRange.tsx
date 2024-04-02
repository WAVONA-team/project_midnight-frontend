import React from 'react';

type Props = {
  min?: number;
  max?: number;
  value?: number;
  step?: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
};

const InputRange: React.FC<Props> = React.memo(
  ({ min, max, value, step, onChange, onMouseDown, onMouseUp }) => {
    return (
      <div
        className="
          relative
          bg-on-secondary-dim-gray
          flex
          items-center
        "
      >
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          step={step}
          onChange={onChange}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          className="
            w-full
            h-px
            bg-[inherit]
            appearance-none
            cursor-pointer
            outline-none
            sm:h-[1.5px]
            sm:[&::-webkit-slider-thumb]:w-2
            sm:[&::-webkit-slider-thumb]:h-2
            [&::-webkit-slider-thumb]:bg-primary-poppy
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-0
            [&::-webkit-slider-thumb]:h-0
            [&::-webkit-slider-thumb]:rounded-full
          "
        />

        <div
          style={{ width: value + '%' }}
          className="
            pointer-events-none
            absolute
            h-full
            bg-track-range-gradient
          "
        ></div>
      </div>
    );
  },
);

export default InputRange;
