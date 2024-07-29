import React from 'react';

type Props = {
  message: string;
  handlerText?: string;
  handler?: () => void;
};

const NotificationMessage: React.FC<Props> = React.memo(
  ({ message, handlerText, handler }) => {
    return (
      <div className="font-rubik font-normal text-base rounded-xl px-3.5 py-4 bg-surface-eerie_black">
        <span
          className={`font-rubik font-normal text-base ${handlerText && 'mr-4'}`}
        >
          {message}
        </span>
        {handlerText && (
          <button
            className="text-sm focus:outline-none text-secondary-satin-sheen-gold"
            onClick={handler}
          >
            {handlerText}
          </button>
        )}
      </div>
    );
  },
);

export default NotificationMessage;
