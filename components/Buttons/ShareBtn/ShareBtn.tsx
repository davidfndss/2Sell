import { useState, useEffect } from 'react';

type ShareButtonProps = {
  url: string;
  mainColor: string | null;
};

const ShareButton: React.FC<ShareButtonProps> = (props: { url: string, mainColor: string | null }) => {
  const [copied, setCopied] = useState(false);
  const [isClipboardSupported, setIsClipboardSupported] = useState(false);
  const [isShareSupported, setIsShareSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClipboardSupported(!!navigator.clipboard);
      setIsShareSupported(!!navigator.share);
    }
  }, []);

  const handleShare = async () => {
    if (isShareSupported) {
      try {
        await navigator.share({
          title: 'Compartilhe este link',
          url: props.url,
        });
      } catch (error) {
        console.error('Erro ao compartilhar:', error);
      }
    } else {
      handleCopyToClipboard();
    }
  };

  const handleCopyToClipboard = () => {
    if (isClipboardSupported) {
      navigator.clipboard.writeText(props.url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      console.error('API Clipboard não suportada no navegador.');
    }
  };

  return (
    <button onClick={handleShare}>
          <i
          className={`bi bi-share cursor-pointer hover:text-${props.mainColor}-500 transition`}
          ></i>
    </button>
  );
};

export default ShareButton;
