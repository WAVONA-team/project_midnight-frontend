const Spinner: React.FC = () => {
  return (
    <div className="bg-[inherit] absolute z-10 top-0 right-0 bottom-0 left-0 flex justify-center items-center rounded ">
      <div className="grid place-items-center w-7 h-7 rounded-full animate-spin bg-[conic-gradient(#FCEEEE,#FCEEEE,#da2f37)]"></div>
      <div className="bg-[inherit] absolute w-5 h-5 rounded-full" />
    </div>
  );
};
export default Spinner;
