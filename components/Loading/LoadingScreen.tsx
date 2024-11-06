import { Loading } from "./Loading";

const LoadingScreen: React.FC = () => {
  return (
    <div className="w-screen h-full min-h-[90vh] flex items-center justify-center">
      <Loading size="lg" />   
    </div> 
  )
};

export { LoadingScreen };