import React from 'react';

type Props = {
  min?: number;
  max?: number;
  value?: number;
  step?: number | string;
  className?: string;
  inputClassName?: string;
  rangeColor?: string;
  multiplier?: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
};

const RangeInput: React.FC<Props> = React.memo(
  ({
    min,
    max,
    value,
    step,
    className = '',
    inputClassName = '',
    rangeColor = '',
    multiplier = 0,
    onChange,
    onMouseDown,
    onMouseUp,
  }) => {
    return (
      <div
        className={`
          ${className}
          relative
          bg-on-secondary-dim-gray
          flex
          items-center
        `}
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
          className={`
            ${inputClassName}
            w-full
            h-px
            bg-[inherit]
            appearance-none
            cursor-pointer
            outline-none
            sm:h-[1.5px]
            sm:[&::-webkit-slider-thumb]:w-2
            sm:[&::-webkit-slider-thumb]:h-2
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-0
            [&::-webkit-slider-thumb]:h-0
            [&::-webkit-slider-thumb]:rounded-full
          `}
        />

        <div
          style={{
            width:
              value !== undefined && multiplier !== 0
                ? value * multiplier + '%'
                : value + '%',
          }}
          className={`
            ${rangeColor}
            pointer-events-none
            absolute
            h-full
          `}
        />
      </div>
    );
  },
);

export default RangeInput;
