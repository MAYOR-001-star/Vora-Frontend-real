import { useState, useMemo } from 'react';
import { useLocation, useNavigate, Link, useParams } from 'react-router-dom';
import { getRoleLandingForSlug, mapApiResponseToRoleData } from '../../utils/roleLanding';
import type { PublicRoleLandingData } from '../../types/roleLanding';
import { useGetPublicRoleQuery } from '../../services/queries/talent';
import {
  ChevronDownIcon
} from '../../components/common/Icons';
import VoraLogo from '../../components/common/VoraLogo';
import ScrollArea from '../../components/common/ScrollArea';
import Select from '../../components/common/Select';
import { loadRoleApplySlug } from '../../utils/roleSignup';

// Icons used in the page

const Trash2Icon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const LinkIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);

const DocumentCheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const StageRail: React.FC = () => (
  <div className="bg-white border-b border-[#E6E6E6] px-[32px] py-[10px] flex items-center justify-center gap-[10px] overflow-x-auto whitespace-nowrap">
    <div className="flex items-center gap-[6px] shrink-0">
      <div className="w-[20px] h-[20px] rounded-full bg-[#0047CC] flex items-center justify-center text-[10px] font-[800] text-white" style={{ boxShadow: '0 0 0 3px rgba(0,71,204,.12)' }}>1</div>
      <div className="text-[11px] font-[700] text-[#0047CC]">Getting to know you</div>
    </div>
    <div className="w-[24px] h-[2px] bg-[#E6E6E6] rounded-[2px]" />
    
    <div className="flex items-center gap-[6px] shrink-0">
      <div className="w-[20px] h-[20px] rounded-full bg-[#E6E6E6] flex items-center justify-center text-[10px] font-[800] text-white">2</div>
      <div className="text-[11px] font-[700] text-[#ADADAD]">Professional dimension</div>
    </div>
    <div className="w-[24px] h-[2px] bg-[#E6E6E6] rounded-[2px]" />

    <div className="flex items-center gap-[6px] shrink-0">
      <div className="w-[20px] h-[20px] rounded-full bg-[#E6E6E6] flex items-center justify-center text-[10px] font-[800] text-white">3</div>
      <div className="text-[11px] font-[700] text-[#ADADAD]">How you show up</div>
    </div>
    <div className="w-[24px] h-[2px] bg-[#E6E6E6] rounded-[2px]" />

    <div className="flex items-center gap-[6px] shrink-0">
      <div className="w-[20px] h-[20px] rounded-full bg-[#E6E6E6] flex items-center justify-center text-[10px] font-[800] text-white">4</div>
      <div className="text-[11px] font-[700] text-[#ADADAD]">Final decision</div>
    </div>
  </div>
);

const RoleEmployerAsks: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const params = useParams<{ roleSlug: string }>();
  const roleSlug = params.roleSlug || '';

  const { data: response, isLoading: isRoleLoading } = useGetPublicRoleQuery(roleSlug || '');

  const appliedRole: PublicRoleLandingData | null = useMemo(() => {
    if (!roleSlug) return null;
    const apiData = response?.data || response;
    if (!apiData || Object.keys(apiData).length === 0) {
      return getRoleLandingForSlug(roleSlug);
    }
    return mapApiResponseToRoleData(roleSlug, apiData);
  }, [response, roleSlug]);

  const companyName = appliedRole?.companyName || 'Reach Africa';
  const roleTitle = appliedRole?.roleTitle || 'Senior Health Programme Officer';
  const roleLocation = appliedRole?.companyLocation || 'Lagos';
  const companyInitials = appliedRole?.companyInitials || 'RA';

  const [consents, setConsents] = useState({
    truthful: true,
    usage: true,
    references: true
  });

  const [referenceRelationship, setReferenceRelationship] = useState('peer');

  const handleSaveAndExit = () => {
    navigate('/dashboard');
  };

  const handleSubmit = () => {
    // Note: The HTML mock navigates to 01-welcome-dashboard.html
    navigate(`/onboarding/talent/${roleSlug}/assessment/journey`);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#1A1A1A] font-sans">
      <header className="sticky top-0 z-[50] bg-white/95 backdrop-blur-[10px] border-b border-[#E6E6E6] px-[32px] py-[12px] flex items-center justify-between">
        <span className="inline-flex items-center gap-[1px] text-[#0047CC]">
          <VoraLogo size="sm" to="/dashboard" />
        </span>
        <div className="text-[12.5px] text-[#808080] font-[600]">
          Before Stage 1 opens · {companyName}&apos;s additional asks
        </div>
        <div className="flex items-center gap-[6px] text-[12px] text-[#808080] font-[600]">
          <div className="w-[16px] h-[16px] rounded-full border border-[#0047CC] bg-white flex items-center justify-center shrink-0">
            <DocumentCheckIcon className="w-[9px] h-[9px] text-[#0047CC]" />
          </div>
          <span className="hidden sm:inline">Draft saved</span>
          <span className="sm:hidden">Saved</span>
        </div>
      </header>

      <StageRail />

      <section className="relative px-[32px] pt-[48px] pb-[48px] bg-gradient-to-br from-[#182348] to-[#0047CC] overflow-hidden text-white">
        <div className="absolute top-[-60px] right-[20%] w-[220px] h-[220px] rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute bottom-[-80px] right-[-40px] w-[280px] h-[280px] rounded-full bg-[#387DFF]/20 pointer-events-none" />
        <div className="absolute top-[40%] left-[-100px] w-[260px] h-[260px] rounded-full bg-white/5 pointer-events-none" />

        <div className="max-w-[820px] mx-auto relative z-10">
          <div className="flex gap-[20px] items-start mb-[24px]">
            <div className="w-[64px] h-[64px] rounded-[16px] bg-white/10 border border-white/20 flex items-center justify-center text-white font-[900] text-[20px] shrink-0 tracking-[0.5px] backdrop-blur-sm shadow-sm">
              {companyInitials}
            </div>
            <div className="flex-1 pt-[2px]">
              <div className="text-[11px] font-[800] tracking-[0.8px] uppercase text-[#EBF6FF] mb-[6px]">
                Additional materials requested by
              </div>
              <div className="text-[26px] font-[900] text-white tracking-[-0.4px] leading-[1.2] mb-[6px]">
                {companyName}
              </div>
              <div className="text-[14px] text-white/70 font-[500] leading-[1.45]">
                {roleTitle} · {roleLocation}
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-[8px] bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-[14px] py-[6px] mb-[24px]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-[14px] h-[14px] text-white">
              <path d="M9 12l2 2 4-4M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>
            </svg>
            <span className="text-[11.5px] font-[800] tracking-[0.3px] text-white">Stage 1 unlocks once these are submitted</span>
          </div>

          <h1 className="text-[22px] font-[800] text-white tracking-[-0.3px] leading-[1.3] mb-[10px]">
            A few extras {companyName} has asked you for
          </h1>
          <p className="text-[14.5px] text-white/80 leading-[1.65] max-w-[680px]">
            Your CV, experience profile and verified credentials are already on file. The items below are specific to this role and were chosen by the {companyName} hiring team. Each one shapes how your interviews are framed and how your profile reads to them.
          </p>
        </div>
      </section>

      <main className="max-w-[820px] mx-auto px-[28px] pt-[32px] pb-[110px]">
        {/* Already on file */}
        <div className="bg-white border-[1.5px] border-[#E6E6E6] rounded-[14px] p-[18px_22px] mb-[28px] flex gap-[14px] items-start">
          <div className="w-[38px] h-[38px] rounded-[10px] bg-[#EBF6FF] border border-[#387DFF]/30 flex items-center justify-center text-[#0047CC] shrink-0">
            <DocumentCheckIcon className="w-[20px] h-[20px]" />
          </div>
          <div className="flex-1">
            <div className="text-[13.5px] font-[800] text-[#1A1A1A] mb-[4px] flex items-center gap-[8px] flex-wrap">
              Already on file · no need to re-upload
            </div>
            <div className="text-[12.5px] text-[#4A4A4A] leading-[1.55]">
              Your candidate profile is already attached to this application. <Link to="/onboarding/talent/match" className="text-[#0047CC] font-[700] hover:underline">Review or update</Link>
            </div>
            <div className="flex gap-[6px] flex-wrap mt-[10px]">
              {['CV (v3, May 2026)', 'Years of practice', 'Specialisations', 'Languages', 'Verified certifications', 'EMR experience'].map(item => (
                <span key={item} className="text-[11px] font-[700] bg-white border border-[#0047CC] text-[#0047CC] px-[12px] py-[4px] rounded-full inline-flex items-center">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Strip */}
        <div className="flex items-center gap-[10px] mb-[22px] p-[14px_18px] bg-white border-[1.5px] border-[#E6E6E6] rounded-[12px]">
          <div className="text-[11px] font-[800] tracking-[0.6px] uppercase text-[#808080] shrink-0">
            {companyName}&apos;s checklist
          </div>
          <div className="flex-1 h-[8px] bg-[#F7F7F7] rounded-full overflow-hidden relative">
            <div className="h-full bg-gradient-to-r from-[#0047CC] to-[#387DFF] rounded-full w-[60%] transition-all duration-400" />
          </div>
          <div className="text-[12px] font-[800] text-[#1A1A1A] shrink-0 tabular-nums">
            3 of 5 complete
          </div>
        </div>

        {/* Request 1 */}
        <div className="bg-gradient-to-b from-[#F8FBFF] to-white border-[1.5px] border-[#387DFF]/50 rounded-[16px] p-[24px_26px] mb-[16px] relative overflow-visible z-50">
          <div className="flex items-start justify-between gap-[14px] mb-[14px]">
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-[7px] mb-[8px]">
                <div className="w-[26px] h-[26px] rounded-full bg-[#0047CC] text-white font-[900] text-[12px] flex items-center justify-center shrink-0">1</div>
                <div className="text-[10.5px] font-[800] tracking-[0.7px] uppercase text-[#0047CC]">{companyName} is asking for</div>
              </div>
              <div className="text-[17px] font-[800] text-[#1A1A1A] tracking-[-0.2px] leading-[1.3] mb-[5px]">
                A programme report you&apos;ve authored
              </div>
              <div className="text-[13px] text-[#808080] leading-[1.55]">
                An anonymised quarterly or end-of-programme report. Doesn&apos;t need to be perfect, just yours.
              </div>
            </div>
            <span className="text-[11px] font-[700] bg-white border border-[#0047CC] text-[#0047CC] px-[12px] py-[4px] rounded-full inline-flex items-center uppercase shrink-0 whitespace-nowrap">
              Submitted
            </span>
          </div>
          <div className="text-[12px] text-[#4A4A4A] leading-[1.55] bg-[#EBF6FF] p-[9px_12px] rounded-[8px]">
            <strong className="font-[800] text-[#182348]">Why we ask:</strong> the bulk of your work as a senior officer is internal and external reporting. We want to see how you structure findings, frame setbacks, and write for a busy reader.
          </div>
          <div className="mt-[14px]">
            <div className="border border-[#0047CC] bg-white rounded-[12px] p-[16px_18px] flex items-center gap-[14px]">
              <div className="w-[38px] h-[38px] rounded-[10px] bg-[#EBF6FF] border border-[#387DFF]/50 text-[#0047CC] flex items-center justify-center shrink-0">
                <DocumentCheckIcon className="w-[18px] h-[18px]" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="text-[13.5px] text-[#1A1A1A] font-[700] break-all leading-[1.4]">
                  Q1_2026_Maternal_Outreach_Report.docx
                </div>
                <div className="text-[11.5px] text-[#0047CC] font-[600] mt-[3px]">
                  82 KB · Uploaded today, 14:22
                </div>
              </div>
              <button className="text-[#808080] hover:text-[#DC2626] hover:bg-[#F7F7F7] p-[8px] rounded-[6px] transition-colors" title="Remove">
                <Trash2Icon className="w-[16px] h-[16px]" />
              </button>
            </div>
          </div>
        </div>

        {/* Request 2 */}
        <div className="bg-gradient-to-b from-[#F8FBFF] to-white border-[1.5px] border-[#387DFF]/50 rounded-[16px] p-[24px_26px] mb-[16px] relative overflow-visible z-40">
          <div className="flex items-start justify-between gap-[14px] mb-[14px]">
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-[7px] mb-[8px]">
                <div className="w-[26px] h-[26px] rounded-full bg-[#0047CC] text-white font-[900] text-[12px] flex items-center justify-center shrink-0">2</div>
                <div className="text-[10.5px] font-[800] tracking-[0.7px] uppercase text-[#0047CC]">{companyName} is asking for</div>
              </div>
              <div className="text-[17px] font-[800] text-[#1A1A1A] tracking-[-0.2px] leading-[1.3] mb-[5px]">
                A piece of published or unpublished research
              </div>
              <div className="text-[13px] text-[#808080] leading-[1.55]">
                An abstract, paper, conference poster, or research note you&apos;ve authored or co-authored. One file.
              </div>
            </div>
            <span className="text-[11px] font-[700] bg-white border border-[#0047CC] text-[#0047CC] px-[12px] py-[4px] rounded-full inline-flex items-center uppercase shrink-0 whitespace-nowrap">
              Submitted
            </span>
          </div>
          <div className="text-[12px] text-[#4A4A4A] leading-[1.55] bg-[#EBF6FF] p-[9px_12px] rounded-[8px]">
            <strong className="font-[800] text-[#182348]">Why we ask:</strong> {companyName} publishes annual evidence briefs and increasingly commissions internal studies. We want to gauge how you handle evidence at the deeper end.
          </div>
          <div className="mt-[14px]">
            <div className="border border-[#0047CC] bg-white rounded-[12px] p-[16px_18px] flex items-center gap-[14px]">
              <div className="w-[38px] h-[38px] rounded-[10px] bg-[#EBF6FF] border border-[#387DFF]/50 text-[#0047CC] flex items-center justify-center shrink-0">
                <DocumentCheckIcon className="w-[18px] h-[18px]" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="text-[13.5px] text-[#1A1A1A] font-[700] break-all leading-[1.4]">
                  CHW_Retention_Determinants_PHC2025_abstract.pdf
                </div>
                <div className="text-[11.5px] text-[#0047CC] font-[600] mt-[3px]">
                  128 KB · Uploaded today, 14:25
                </div>
              </div>
              <button className="text-[#808080] hover:text-[#DC2626] hover:bg-[#F7F7F7] p-[8px] rounded-[6px] transition-colors" title="Remove">
                <Trash2Icon className="w-[16px] h-[16px]" />
              </button>
            </div>
          </div>
        </div>

        {/* Request 3 */}
        <div className="bg-gradient-to-b from-[#F8FBFF] to-white border-[1.5px] border-[#387DFF]/50 rounded-[16px] p-[24px_26px] mb-[16px] relative overflow-visible z-30">
          <div className="flex items-start justify-between gap-[14px] mb-[14px]">
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-[7px] mb-[8px]">
                <div className="w-[26px] h-[26px] rounded-full bg-[#0047CC] text-white font-[900] text-[12px] flex items-center justify-center shrink-0">3</div>
                <div className="text-[10.5px] font-[800] tracking-[0.7px] uppercase text-[#0047CC]">{companyName} is asking for</div>
              </div>
              <div className="text-[17px] font-[800] text-[#1A1A1A] tracking-[-0.2px] leading-[1.3] mb-[5px]">
                A short written response · in your own words
              </div>
              <div className="text-[13px] text-[#808080] leading-[1.55]">
                "<em>Describe a programme you led that didn't go to plan. What happened, what you did, and what you learned.</em>" Around 200 words.
              </div>
            </div>
            <span className="text-[11px] font-[700] bg-white border border-[#0047CC] text-[#0047CC] px-[12px] py-[4px] rounded-full inline-flex items-center uppercase shrink-0 whitespace-nowrap">
              Submitted
            </span>
          </div>
          <div className="text-[12px] text-[#4A4A4A] leading-[1.55] bg-[#EBF6FF] p-[9px_12px] rounded-[8px]">
            <strong className="font-[800] text-[#182348]">Why we ask:</strong> set by {companyName}&apos;s HR Director. They&apos;ve told us they care more about how you handle the messy edges of programme delivery than how you describe the successes.
          </div>
          <div className="mt-[14px]">
            <div className="flex flex-col gap-[6px]">
              <ScrollArea className="border-[1.5px] border-[#E6E6E6] rounded-[10px] p-[11px_13px] bg-[#F7F7F7] w-full h-[110px] resize-y">
                <div className="font-sans text-[14px] text-[#4A4A4A] italic leading-[1.6] pb-[2px]">
                  In late 2023 I led a six-week immunisation outreach across four peri-urban wards in Lagos. Our target was 4,200 children. By week three, two of our four cold-chain coolers failed within 48 hours of each other and we lost roughly 1,800 doses. I had to make the call quickly: pause delivery and risk losing the community's confidence we'd worked months to build, or continue with degraded coverage. I paused, escalated honestly to the donor the same evening, and walked the community elders through what had happened myself rather than sending a junior staffer. We resumed eight days later with replacement stock, slightly revised microplans, and rebuilt trust by being early to the conversation rather than late. The programme ended at 87% of original target instead of 95%. The lesson I keep going back to is that the worst outcome isn't the failure, it's the silence around the failure. Honesty travels further than spin, especially with communities who've been let down by NGOs before.
                </div>
              </ScrollArea>
              <div className="text-[11px] text-[#0047CC] font-[600] text-right mt-[-3px]">
                198 words · within range
              </div>
            </div>
          </div>
        </div>

        {/* Request 4 */}
        <div className="bg-white border-[1.5px] border-[#E6E6E6] rounded-[16px] p-[24px_26px] mb-[16px] relative overflow-visible transition-all duration-250 z-20">
          <div className="flex items-start justify-between gap-[14px] mb-[14px]">
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-[7px] mb-[8px]">
                <div className="w-[26px] h-[26px] rounded-full bg-[#0047CC] text-white font-[900] text-[12px] flex items-center justify-center shrink-0">4</div>
                <div className="text-[10.5px] font-[800] tracking-[0.7px] uppercase text-[#0047CC]">{companyName} is asking for</div>
              </div>
              <div className="text-[17px] font-[800] text-[#1A1A1A] tracking-[-0.2px] leading-[1.3] mb-[5px]">
                Two professional references
              </div>
              <div className="text-[13px] text-[#808080] leading-[1.55]">
                A line manager and one peer or community stakeholder who can speak to your work. Contact details only at this stage. They won&apos;t be contacted unless you reach Stage 4.
              </div>
            </div>
            <span className="text-[11px] font-[700] bg-white border border-[#0047CC] text-[#0047CC] px-[12px] py-[4px] rounded-full inline-flex items-center uppercase shrink-0 whitespace-nowrap">
              Required
            </span>
          </div>
          
          <div className="text-[12px] text-[#4A4A4A] leading-[1.55] bg-[#EBF6FF] p-[9px_12px] rounded-[8px] mb-[14px]">
            <strong className="font-[800] text-[#182348]">Why we ask:</strong> {companyName}&apos;s hiring committee prefers a peer or community reference over two managers. They believe the people you&apos;ve worked alongside, including community partners, often see your work most clearly.
          </div>
          
          <div className="mt-[14px]">
            <div className="bg-[#F7F7F7] rounded-[12px] p-[16px_18px] mb-[10px]">
              <div className="flex items-center justify-between mb-[10px]">
                <div className="text-[11px] font-[800] tracking-[0.5px] uppercase text-[#1A1A1A]">Reference 1 · Line manager</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[12.5px] font-[700] text-[#4A4A4A]">Full name <span className="text-[#DC2626]">*</span></label>
                  <input type="text" placeholder="e.g. Dr Adaobi Mensah" className="font-sans text-[14px] border-[1.5px] border-[#E6E6E6] rounded-[10px] p-[11px_13px] bg-white text-[#1A1A1A] w-full focus:outline-none focus:border-[#0047CC] focus:ring-[3px] focus:ring-[#0047CC]/10 transition-all" />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[12.5px] font-[700] text-[#4A4A4A]">Role and organisation <span className="text-[#DC2626]">*</span></label>
                  <input type="text" placeholder="e.g. Country Director, Health Outreach Africa" className="font-sans text-[14px] border-[1.5px] border-[#E6E6E6] rounded-[10px] p-[11px_13px] bg-white text-[#1A1A1A] w-full focus:outline-none focus:border-[#0047CC] focus:ring-[3px] focus:ring-[#0047CC]/10 transition-all" />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[12.5px] font-[700] text-[#4A4A4A]">Work email <span className="text-[#DC2626]">*</span></label>
                  <input type="email" placeholder="name@organisation.org" className="font-sans text-[14px] border-[1.5px] border-[#E6E6E6] rounded-[10px] p-[11px_13px] bg-white text-[#1A1A1A] w-full focus:outline-none focus:border-[#0047CC] focus:ring-[3px] focus:ring-[#0047CC]/10 transition-all" />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[12.5px] font-[700] text-[#4A4A4A]">Phone (optional)</label>
                  <input type="tel" placeholder="+234..." className="font-sans text-[14px] border-[1.5px] border-[#E6E6E6] rounded-[10px] p-[11px_13px] bg-white text-[#1A1A1A] w-full focus:outline-none focus:border-[#0047CC] focus:ring-[3px] focus:ring-[#0047CC]/10 transition-all" />
                </div>
              </div>
            </div>

            <div className="bg-[#F7F7F7] rounded-[12px] p-[16px_18px]">
              <div className="flex items-center justify-between mb-[10px]">
                <div className="text-[11px] font-[800] tracking-[0.5px] uppercase text-[#1A1A1A]">Reference 2 · Peer or community stakeholder</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[12.5px] font-[700] text-[#4A4A4A]">Full name <span className="text-[#DC2626]">*</span></label>
                  <input type="text" placeholder="e.g. Mama Folake Adeyemi" className="font-sans text-[14px] border-[1.5px] border-[#E6E6E6] rounded-[10px] p-[11px_13px] bg-white text-[#1A1A1A] w-full focus:outline-none focus:border-[#0047CC] focus:ring-[3px] focus:ring-[#0047CC]/10 transition-all" />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[12.5px] font-[700] text-[#4A4A4A]">Role and organisation <span className="text-[#DC2626]">*</span></label>
                  <input type="text" placeholder="e.g. CHW Lead, Ifako Ward" className="font-sans text-[14px] border-[1.5px] border-[#E6E6E6] rounded-[10px] p-[11px_13px] bg-white text-[#1A1A1A] w-full focus:outline-none focus:border-[#0047CC] focus:ring-[3px] focus:ring-[#0047CC]/10 transition-all" />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[12.5px] font-[700] text-[#4A4A4A]">Email or contact <span className="text-[#DC2626]">*</span></label>
                  <input type="text" placeholder="email or phone is fine" className="font-sans text-[14px] border-[1.5px] border-[#E6E6E6] rounded-[10px] p-[11px_13px] bg-white text-[#1A1A1A] w-full focus:outline-none focus:border-[#0047CC] focus:ring-[3px] focus:ring-[#0047CC]/10 transition-all" />
                </div>
                <div className="flex flex-col gap-[6px] z-10">
                  <label className="text-[12.5px] font-[700] text-[#4A4A4A]">Relationship</label>
                  <Select
                    hideLabel
                    options={[
                      { label: 'Peer / colleague', value: 'peer' },
                      { label: 'Community stakeholder', value: 'stakeholder' },
                      { label: 'External partner', value: 'partner' },
                      { label: 'Mentor', value: 'mentor' },
                    ]}
                    value={referenceRelationship}
                    onChange={(e: any) => setReferenceRelationship(e.target.value)}
                    className="!p-[11px_13px] !rounded-[10px] !border-[1.5px] !border-[#E6E6E6] font-sans text-[14px] !bg-white focus-within:!border-[#0047CC] focus-within:!ring-[3px] focus-within:!ring-[#0047CC]/10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Request 5 */}
        <div className="bg-white border-[1.5px] border-[#E6E6E6] rounded-[16px] p-[24px_26px] mb-[16px] relative overflow-visible transition-all duration-250 z-10">
          <div className="flex items-start justify-between gap-[14px] mb-[14px]">
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-[7px] mb-[8px]">
                <div className="w-[26px] h-[26px] rounded-full bg-[#0047CC] text-white font-[900] text-[12px] flex items-center justify-center shrink-0">5</div>
                <div className="text-[10.5px] font-[800] tracking-[0.7px] uppercase text-[#0047CC]">{companyName} is asking for</div>
              </div>
              <div className="text-[17px] font-[800] text-[#1A1A1A] tracking-[-0.2px] leading-[1.3] mb-[5px]">
                Anything else you&apos;d like {companyName} to see
              </div>
              <div className="text-[13px] text-[#808080] leading-[1.55]">
                Conference talks, podcasts, published articles, blog posts, social campaigns you led. Public links only. Up to 5.
              </div>
            </div>
            <span className="bg-[#F7F7F7] text-[#808080] text-[10.5px] font-[800] px-[9px] py-[3px] rounded-full tracking-[0.4px] uppercase shrink-0 whitespace-nowrap">
              Optional
            </span>
          </div>

          <div className="text-[12px] text-[#4A4A4A] leading-[1.55] bg-[#EBF6FF] p-[9px_12px] rounded-[8px] mb-[14px]">
            <strong className="font-[800] text-[#182348]">Why we ask:</strong> {companyName}&apos;s leadership often makes hiring decisions partly on how candidates think publicly. This is your chance to surface work that might not sit on your CV.
          </div>

          <div className="mt-[14px]">
            <div className="bg-[#F7F7F7] rounded-[10px] p-[11px_13px] flex items-center gap-[10px] mb-[8px] text-[13px] text-[#1A1A1A]">
              <LinkIcon className="w-[14px] h-[14px] text-[#0047CC] shrink-0" />
              <span className="flex-1 text-[#0047CC] font-[700] text-[12.5px] break-all">
                linkedin.com/in/adaeze-okonkwo/recent-activity/articles
              </span>
              <button className="p-[4px] rounded-[6px] text-[#808080] hover:text-[#DC2626] hover:bg-[#E6E6E6] transition-colors" title="Remove">
                <Trash2Icon className="w-[14px] h-[14px]" />
              </button>
            </div>

            <div className="flex gap-[8px] mt-[8px]">
              <input type="url" placeholder="Paste a URL (LinkedIn article, blog, podcast, talk...)" className="flex-1 font-sans text-[14px] border-[1.5px] border-[#E6E6E6] rounded-[10px] p-[11px_13px] bg-white text-[#1A1A1A] focus:outline-none focus:border-[#0047CC] focus:ring-[3px] focus:ring-[#0047CC]/10 transition-all" />
              <button className="bg-[#0047CC] text-white border-none rounded-[10px] px-[18px] py-[11px] font-sans text-[13px] font-[700] cursor-pointer hover:bg-[#344DA1] transition-colors whitespace-nowrap">
                Add link
              </button>
            </div>
          </div>
        </div>

        {/* Consents */}
        <div className="bg-white border border-[#0047CC]/30 rounded-[14px] p-[20px_22px] mt-[8px] mb-[8px]">
          <div className="text-[11px] font-[800] tracking-[0.7px] uppercase text-[#0047CC] mb-[14px]">
            Acknowledgements before submission
          </div>

          <div className="flex gap-[11px] items-start py-[10px]">
            <div 
              className={`mt-[2px] w-[18px] h-[18px] rounded-[5px] border-[1.5px] cursor-pointer flex items-center justify-center transition-all shrink-0 ${consents.truthful ? 'bg-[#0047CC] border-[#0047CC]' : 'bg-white border-[#0047CC]'}`}
              onClick={() => setConsents(prev => ({...prev, truthful: !prev.truthful}))}
            >
              {consents.truthful && (
                <div className="w-[5px] h-[9px] border-r-[2px] border-b-[2px] border-white rotate-45 mb-[2px]" />
              )}
            </div>
            <div className="text-[13px] text-[#182348] leading-[1.55] flex-1">
              I confirm everything I&apos;ve submitted above is <strong className="font-[800]">truthful and reflects my own work</strong>. Misrepresentation can result in immediate disqualification.
            </div>
          </div>

          <div className="flex gap-[11px] items-start py-[10px] border-t border-[#0047CC]/10">
            <div 
              className={`mt-[2px] w-[18px] h-[18px] rounded-[5px] border-[1.5px] cursor-pointer flex items-center justify-center transition-all shrink-0 ${consents.usage ? 'bg-[#0047CC] border-[#0047CC]' : 'bg-white border-[#0047CC]'}`}
              onClick={() => setConsents(prev => ({...prev, usage: !prev.usage}))}
            >
              {consents.usage && (
                <div className="w-[5px] h-[9px] border-r-[2px] border-b-[2px] border-white rotate-45 mb-[2px]" />
              )}
            </div>
            <div className="text-[13px] text-[#182348] leading-[1.55] flex-1">
              I consent to my submissions being used by ORA and {companyName} <strong className="font-[800]">solely to shape and assess my interviews for this role</strong>. Files are encrypted and not shared beyond this hiring loop.
            </div>
          </div>

          <div className="flex gap-[11px] items-start py-[10px] border-t border-[#0047CC]/10">
            <div 
              className={`mt-[2px] w-[18px] h-[18px] rounded-[5px] border-[1.5px] cursor-pointer flex items-center justify-center transition-all shrink-0 ${consents.references ? 'bg-[#0047CC] border-[#0047CC]' : 'bg-white border-[#0047CC]'}`}
              onClick={() => setConsents(prev => ({...prev, references: !prev.references}))}
            >
              {consents.references && (
                <div className="w-[5px] h-[9px] border-r-[2px] border-b-[2px] border-white rotate-45 mb-[2px]" />
              )}
            </div>
            <div className="text-[13px] text-[#182348] leading-[1.55] flex-1">
              I understand my <strong className="font-[800]">references will only be contacted if I reach Stage 4</strong>, and I&apos;ll be notified before any contact is made.
            </div>
          </div>
        </div>

      </main>

      <footer className="fixed bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur-[10px] border-t border-[#E6E6E6] p-[14px_32px] flex items-center justify-between gap-[12px] z-[50]">
        <div className="text-[12.5px] text-[#4A4A4A] font-[600] flex items-center gap-[10px]">
          <span className="text-[#0047CC] text-[12.5px] font-[800]">
            3 of 5 done
          </span>
          Two more, then Stage 1 unlocks
        </div>
        <div className="flex gap-[10px]">
          <button 
            type="button"
            onClick={handleSaveAndExit}
            className="bg-white text-[#4A4A4A] border-[1.5px] border-[#E6E6E6] rounded-full px-[20px] py-[13px] text-[14px] font-[700] hover:border-[#ADADAD] transition-colors cursor-pointer"
          >
            Save and exit
          </button>
          <button 
            type="button"
            onClick={handleSubmit}
            className="bg-[#0047CC] text-white border-none rounded-full px-[26px] py-[13px] text-[14px] font-[700] cursor-pointer font-sans inline-flex items-center gap-[8px] shadow-[0_4px_14px_rgba(0,71,204,0.28)] hover:bg-[#344DA1] hover:-translate-y-[1px] transition-all"
          >
            Submit and open Stage 1
          </button>
        </div>
      </footer>
    </div>
  );
};

export default RoleEmployerAsks;
