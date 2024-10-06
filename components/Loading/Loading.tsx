interface LoadingProps {
  color?: string | null;
  size?: "sm" | "md" | "lg" | null;
}

const Loading: React.FC<LoadingProps> = ({ color, size }) => {

  if ( size == "sm" ) {
    return (
      <div>
        <div
          className={`w-4 h-4 border-2 ${
            color ? `border-${color}` : "border-white"
          } border-solid border-t-transparent rounded-full animate-spin`}
        ></div>
      </div>
    );
  }
  
  if (size == "lg") {
    return (
      <div>
        <div
          className={`w-8 h-8 border-4 ${
            color ? `border-${color}` : "border-white"
          } border-solid border-t-transparent rounded-full animate-spin`}
        ></div>
      </div>
    );
  }

  if (size == "md") {
    return  (
      <div>
        <div
          className={`w-6 h-6 border-4 ${
            color ? `border-${color}` : "border-white"
          } border-solid border-t-transparent rounded-full animate-spin`}
        ></div>
      </div>
    );
  }

  return  (
    <div>
      <div
        className={`w-6 h-6 border-4 ${
          color ? `border-${color}` : "border-white"
        } border-solid border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export { Loading };