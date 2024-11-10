import { useState, useEffect } from 'react';

type Color = "green" | "blue" | "purple" | "red" | "orange" | "yellow";

const ScrollButton = (props: { mainColor: Color }) => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  const checkScrollPosition = () => {
    const scrolledToBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
    setIsAtBottom(scrolledToBottom);
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollPosition);
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, []);

  return (
    <div className="fixed right-0 bottom-0 mb-5 mr-6">
      <button
        className={`bg-${props.mainColor}-800 text-white py-2 w-[40px] rounded-full transition hover:bg-black transform ${
          isAtBottom ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
        }`}
        onClick={scrollToBottom}
        style={{ transition: 'transform 0.3s ease, opacity 0.3s ease, background-color 0.3s ease' }}
      >
        <i className="bi bi-arrow-down"></i>
      </button>
    </div>
  );
};

export default ScrollButton;