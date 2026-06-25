import { useEffect, useRef, useState } from 'react';
import { UploadSimpleIcon } from '../../common/Icons';
import { CV_ACCEPT_MIME, isAcceptedCvFile } from '../../../utils/cvUpload';
import { VORA_LOGO_SRC } from '../../../constants/brand';

interface CvUploadZoneProps {
  file: File | null;
  onFileSelect: (file: File | null) => void;
  disabled?: boolean;
}

const CvUploadZone: React.FC<CvUploadZoneProps> = ({ file, onFileSelect, disabled }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const hasFile = Boolean(file);

  useEffect(() => {
    if (!file && inputRef.current) {
      inputRef.current.value = '';
    }
  }, [file]);

  const pickFile = (selected: File | null) => {
    if (disabled) return;
    if (selected && !isAcceptedCvFile(selected)) return;
    onFileSelect(selected);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    if (disabled) return;
    setIsDragging(false);
    pickFile(event.dataTransfer.files?.[0] ?? null);
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={CV_ACCEPT_MIME}
        className="hidden"
        disabled={disabled}
        onChange={(event) => pickFile(event.target.files?.[0] ?? null)}
      />
      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`w-full min-h-[220px] border-[1.5px] rounded-[10px] bg-white flex flex-col items-center justify-center transition-colors mb-5 px-5 py-8 ${
          disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
        } ${
          hasFile
            ? 'border-[#0047CC] bg-[#EEFBEE]'
            : isDragging
              ? 'border-[#0047CC] bg-white'
              : 'border-[#E6E6E6] hover:border-[#0047CC] hover:bg-white'
        }`}
      >
        <div className="mb-3.5 flex items-center justify-center">
          {hasFile ? (
            <img src={VORA_LOGO_SRC} alt="Vora Logo" className="w-10 h-10 object-contain" />
          ) : (
            <UploadSimpleIcon size={34} stroke="#808080" aria-hidden />
          )}
        </div>
        <p className="text-base font-semibold text-[#1A1A1A] mb-1 text-center">
          {hasFile ? 'File uploaded' : 'Choose file to upload'}
        </p>
        <p className="text-sm text-[#808080] text-center">
          {hasFile ? 'Tap to replace' : 'Supported formats: pdf, docx'}
        </p>
      </button>
    </>
  );
};

export default CvUploadZone;
