import React from 'react';
import { SunEmoji } from '../svg/SunEmoji';

type Color = "green" | "blue" | "purple" | "red" | "orange" | "yellow";

const generateBackground = (color: Color, isMdUp: boolean) => {
  if (isMdUp) {
    switch (color) {
      case 'green':
        return 'linear-gradient(45deg, #22C55E 50%, #166534 50%)';
      case 'blue':
        return 'linear-gradient(45deg, #3B82F6 50%, #1E3A8A 50%)';
      case 'purple':
        return 'linear-gradient(45deg, rgb(168 85 247) 50%, rgb(107 33 168) 50%)';
      case 'red':
        return 'linear-gradient(45deg, #EF4444 50%, #991B1B 50%)';
      case 'orange':
        return 'linear-gradient(45deg, #F97316 50%, #9A3412 50%)';
      case 'yellow':
        return 'linear-gradient(45deg, #FACC15 50%, #CA8A04 50%)';
      default:
        return 'linear-gradient(45deg, #22C55E 50%, #166534 50%)';
    }
  } else {
    switch (color) {
      case 'green':
        return '#22C55E'; 
      case 'blue':
        return '#3B82F6';
      case 'purple':
        return '#8B5CF6';
      case 'red':
        return '#EF4444';
      case 'orange':
        return '#F97316';
      case 'yellow':
        return '#FACC15';
      default:
        return '#22C55E';
    }
  }
};

interface GradientBoxProps {
  color: Color;
  text1?: string;
  text2?: string;
}

const GradientBox: React.FC<GradientBoxProps> = ({ color, text1, text2 }) => {
  const [isMdUp, setIsMdUp] = React.useState<boolean>(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    setIsMdUp(mediaQuery.matches);

    const handleResize = () => setIsMdUp(mediaQuery.matches);
    mediaQuery.addListener(handleResize);

    return () => {
      mediaQuery.removeListener(handleResize);
    };
  }, []);

  const backgroundStyle = {
    background: generateBackground(color, isMdUp),
  };

  return (
      <article
        className="w-full h-[200px] m-auto rounded-xl flex transition"
        style={backgroundStyle}
      >
        <div className="w-[100%] h-full flex flex-col justify-center text-white p-4 text-2xl font-montserrat lg:w-[50%]">
            {
              text1 == "Até 70% de desconto" 
              ? (
                <>
                  <h3>Até</h3>
                  <h3 className="font-bold lg:text-3xl">70% de desconto</h3>
                </>
              )
              : (<h3 className="font-bold lg:text-3xl">{text1}</h3>) 
            }
            
            <button className={`w-[200px] text-lg rounded-full bg-white text-${color}-500 font-bold mt-2 py-1 transition hover:bg-zinc-900 hover:text-white`} onClick={() => window.scrollTo({top: 200, behavior: "smooth"})}>
              Comprar agora
            </button>
          </div>
          <div className="w-[0%] h-full flex justify-end items-end text-white p-4 px-6 text-2xl font-montserrat font-bold lg:w-[50%]">
            <div className="items-center justify-center gap-1 hidden lg:flex">
              {
                text2 == "Promoção de verão" 
                  ? (
                    <>
                      <h3 className="lg:text-2xl">Promoção de verão</h3>
                      <SunEmoji />
                    </>
                  )
                  : (
                    <h3 className="lg:text-2xl">{text2}</h3>
                  )
              }
            </div>
          </div>
      </article>
  );
};

export default GradientBox;
