import { Loading } from "./Loading";

const LoadingScreen: React.FC = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Loading size="lg" />   
    </div> 
  )
};

export { LoadingScreen };