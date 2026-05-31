import { useEffect, useRef, useState } from 'react';
import { CheckIcon } from '../../common/Icons';
import { CV_ACCEPT_MIME, isAcceptedCvFile } from '../../../utils/cvUpload';

interface CvUploadZoneProps {
  file: File | null;
  onFileSelect: (file: File | null) => void;
}

const CvUploadZone: React.FC<CvUploadZoneProps> = ({ file, onFileSelect }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const hasFile = Boolean(file);

  useEffect(() => {
    if (!file && inputRef.current) {
      inputRef.current.value = '';
    }
  }, [file]);

  const pickFile = (selected: File | null) => {
    if (selected && !isAcceptedCvFile(selected)) return;
    onFileSelect(selected);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
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
        onChange={(event) => pickFile(event.target.files?.[0] ?? null)}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`w-full min-h-[220px] border-[1.5px] rounded-[10px] bg-white flex flex-col items-center justify-center cursor-pointer transition-colors mb-5 px-5 py-8 ${
          hasFile
            ? 'border-[#0047CC] bg-[#EEFBEE]'
            : isDragging
              ? 'border-[#0047CC] bg-[#EBF6FF]'
              : 'border-[#E6E6E6] hover:border-[#0047CC] hover:bg-[#EBF6FF]'
        }`}
      >
        <div className="mb-3.5 flex items-center justify-center">
          {hasFile ? (
            <CheckIcon size={34} className="text-[#0047CC]" strokeWidth={2.5} />
          ) : (
            <svg
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#808080"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
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
