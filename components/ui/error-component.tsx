
const ErrorComponent = () => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error:</strong>
      <span className="block sm:inline"> Sorry something went wrong, please try later</span>
    </div>
  );
};

export default ErrorComponent;