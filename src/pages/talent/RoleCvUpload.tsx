import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import { CloseIcon } from '../../components/common/Icons';
import RoleApplyContextStrip from '../../components/talent/cvUpload/RoleApplyContextStrip';
import CvUploadZone from '../../components/talent/cvUpload/CvUploadZone';
import CvUploadedFileRow from '../../components/talent/cvUpload/CvUploadedFileRow';
import { getRoleLandingForSlug } from '../../utils/roleLanding';
import { loadRoleApplySlug } from '../../utils/roleSignup';
import { ROLE_CV_UPLOAD_PATH } from '../../utils/cvUpload';

const RoleCvUpload: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const roleSlug =
    (location.state as { roleSlug?: string } | null)?.roleSlug || loadRoleApplySlug() || '';
  const firstName = (location.state as { firstName?: string } | null)?.firstName ?? '';

  const role = useMemo(
    () => (roleSlug ? getRoleLandingForSlug(roleSlug) : null),
    [roleSlug],
  );

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!roleSlug) {
      navigate('/onboarding/talent?step=1', { replace: true });
    }
  }, [roleSlug, navigate]);

  if (!roleSlug || !role) {
    return null;
  }

  const handleCancel = () => {
    navigate('/onboarding/talent?step=2');
  };

  const handleSubmit = () => {
    if (!file) return;
    navigate('/onboarding/talent/match', {
      state: { firstName, roleSlug },
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex justify-center">
      <div className="flex flex-col min-h-screen w-full max-w-[500px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.06)] relative">
        <RoleApplyContextStrip role={role} />

        <div className="flex items-center gap-4 px-4 sm:px-6 py-4 sm:py-[18px] bg-white shrink-0">
          <button
            type="button"
            onClick={handleCancel}
            className="text-[#808080] hover:text-[#1A1A1A] p-1 flex items-center cursor-pointer transition-colors shrink-0"
            aria-label="Cancel"
          >
            <CloseIcon size={22} strokeWidth={2.5} />
          </button>
          <h1 className="text-[22px] font-semibold text-[#1A1A1A] tracking-tight">Upload CV</h1>
        </div>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 pt-2 pb-28">
          <p className="text-[15px] text-[#4A4A4A] leading-relaxed mb-7">
            VORA will combine your CV with your onboarding profile to build your full profile and
            check if you match for this role — and others that might fit.{' '}
            <strong className="text-[#1A1A1A] font-semibold">
              Don&apos;t match yet? No problem
            </strong>{' '}
            — we&apos;ll run a gap analysis and guide you step by step until you do.
          </p>

          <CvUploadZone file={file} onFileSelect={setFile} />
          {file ? <CvUploadedFileRow file={file} onRemove={() => setFile(null)} /> : null}
        </div>

        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] bg-white px-4 sm:px-6 pt-3.5 pb-6 shadow-[0_-1px_0_rgba(0,0,0,0.06)]">
          <Button
            type="button"
            variant={file ? 'primary' : 'secondary'}
            disabled={!file}
            onClick={handleSubmit}
          >
            Check if I match
          </Button>
        </div>
      </div>
    </div>
  );
};

export { ROLE_CV_UPLOAD_PATH };
export default RoleCvUpload;
