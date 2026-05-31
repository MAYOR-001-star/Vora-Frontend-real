import { CloseIcon, FileIcon } from '../../common/Icons';
import { formatCvFileSize } from '../../../utils/cvUpload';

interface CvUploadedFileRowProps {
  file: File;
  onRemove: () => void;
}

const CvUploadedFileRow: React.FC<CvUploadedFileRowProps> = ({ file, onRemove }) => (
  <div className="flex items-center gap-3.5 border-[1.5px] border-[#0047CC] rounded-lg px-4 py-3.5 bg-white mb-4">
    <div className="w-11 h-11 rounded-lg bg-white border border-[#E6E6E6] flex items-center justify-center shrink-0">
      <FileIcon size={22} className="text-[#0047CC]" strokeWidth={2} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[15px] font-semibold text-[#1A1A1A] truncate">{file.name}</p>
      <p className="text-sm text-[#808080]">{formatCvFileSize(file.size)}</p>
    </div>
    <button
      type="button"
      onClick={onRemove}
      className="text-[#ADADAD] hover:text-[#1A1A1A] p-1 flex items-center shrink-0 cursor-pointer transition-colors"
      aria-label="Remove file"
    >
      <CloseIcon size={18} strokeWidth={2.5} />
    </button>
  </div>
);

export default CvUploadedFileRow;
