import { CheckIcon } from '../../common/Icons';

interface MatchConfirmedBoxProps {
  title: string;
  subtitle: string;
}

const MatchConfirmedBox: React.FC<MatchConfirmedBoxProps> = ({ title, subtitle }) => (
  <div className="flex justify-center">
    <div className="inline-flex items-start gap-2.5 bg-[#EEFBEE] border-[1.5px] border-[#85E585] rounded-lg px-5 py-3 text-left w-full sm:w-auto sm:max-w-[440px]">
      <CheckIcon size={18} strokeWidth={2.5} className="text-[#135813] shrink-0 mt-0.5" />
      <div>
        <p className="text-[15px] font-extrabold text-[#135813]">{title}</p>
        <p className="text-xs text-[#1D871D] mt-0.5">{subtitle}</p>
      </div>
    </div>
  </div>
);

export default MatchConfirmedBox;
