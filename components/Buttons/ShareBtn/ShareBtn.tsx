// components/ShareButton.tsx
import { useState } from 'react';

type ShareButtonProps = {
  url: string;  // O link a ser compartilhado
};

const ShareBtn: React.FC<ShareButtonProps> = ({ url }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Compartilhe este link',
          url: url,
        });
        console.log('Compartilhamento bem-sucedido');
      } catch (error) {
        console.error('Erro ao compartilhar:', error);
      }
    } else {
      handleCopyToClipboard();
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);  // Reverte o estado depois de 2 segundos
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleShare}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Compartilhar
      </button>
      {copied && <span className="text-green-500 text-sm">Link copiado!</span>}
    </div>
  );
};

export default ShareBtn;