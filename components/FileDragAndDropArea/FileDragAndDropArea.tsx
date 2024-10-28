import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileDropzoneProps {
  onFilesAdded: (files: File[]) => void;
}

const FileDragAndDropArea: React.FC<FileDropzoneProps> = ({ onFilesAdded }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const filteredFiles = acceptedFiles.filter(
        (file) => file.type === 'image/png' || file.type === 'image/jpeg'
      );
      onFilesAdded(filteredFiles);
    },
    [onFilesAdded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/png': [], 'image/jpeg': [] },
  });

  return (
    <div
      {...getRootProps()}
      className={`w-full p-6 border-2 border-dashed rounded-md cursor-pointer transition ${
        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
    >
      <input {...getInputProps()} />
      <p className="text-gray-500">
        {isDragActive ? 'Solte o arquivo aqui...' : 'Arraste uma imagem aqui ou clique para selecionar'}
      </p>
    </div>
  );
};

export default FileDragAndDropArea;