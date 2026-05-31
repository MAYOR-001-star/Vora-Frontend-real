interface VideoInterviewMockProps {
  caption: string;
  scoreLabel: string;
  onClick: () => void;
}

const VideoInterviewMock: React.FC<VideoInterviewMockProps> = ({ caption, scoreLabel, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="relative w-full cursor-pointer group bg-slate-900 rounded-xl overflow-hidden aspect-video flex items-center justify-center border border-gray-800 text-left"
  >
    <div className="w-12 h-12 rounded-full bg-white/20 border border-white/40 flex items-center justify-center transition-all group-hover:bg-[#387DFF]/70 group-hover:border-[#387DFF]">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" className="ml-0.5" aria-hidden>
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    </div>
    <span className="absolute bottom-2.5 left-3 text-[10px] text-white/70">{caption}</span>
    <span className="absolute top-2.5 right-3 bg-black/60 text-white font-bold text-[10px] px-2 py-0.5 rounded-full">
      {scoreLabel}
    </span>
  </button>
);

export default VideoInterviewMock;
