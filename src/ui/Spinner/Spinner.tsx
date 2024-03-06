const Spinner: React.FC = () => {
  return (
    <div
      className="absolute z-10 top-0 right-0 bottom-0 left-0 flex justify-center items-center "
      style={{ background: 'inherit' }}
    >
      <div
        className="grid place-items-center w-7 h-7 rounded-full animate-spin"
        style={{
          background: 'conic-gradient(from 180deg at 50% 50%, white 0deg, transparent 360deg)',
        }}
      ></div>
      <div className="absolute w-5 h-5 rounded-full" style={{ background: 'inherit' }}></div>
    </div>
  );
};

export default Spinner;
