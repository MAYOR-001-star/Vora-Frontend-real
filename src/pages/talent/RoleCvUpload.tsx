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
    <div className="min-h-screen bg-white flex flex-col">
      <RoleApplyContextStrip role={role} />

      <div className="flex-1 flex flex-col items-center pt-8 sm:pt-12 pb-24 px-4 sm:px-6">
        <div className="w-full max-w-[600px]">
          <div className="flex items-center gap-4 mb-8">
            <button
              type="button"
              onClick={handleCancel}
              className="text-[#808080] hover:text-[#1A1A1A] p-1 -ml-1 flex items-center cursor-pointer transition-colors shrink-0"
              aria-label="Cancel"
            >
              <CloseIcon size={24} strokeWidth={2.5} />
            </button>
            <h1 className="text-2xl sm:text-[28px] font-bold text-[#1A1A1A] tracking-tight">
              Upload CV
            </h1>
          </div>

          <p className="text-[15px] sm:text-base text-[#4A4A4A] leading-relaxed mb-8">
            VORA will combine your CV with your onboarding profile to build your full profile and
            check if you match for this role, and others that might fit.{' '}
            <strong className="text-[#1A1A1A] font-semibold">
              Don&apos;t match yet? No problem
            </strong>
            , we&apos;ll run a gap analysis and guide you step by step until you do.
          </p>

          <CvUploadZone file={file} onFileSelect={setFile} />
          {file ? <CvUploadedFileRow file={file} onRemove={() => setFile(null)} /> : null}

          <div className="mt-10">
            <Button
              type="button"
              variant={file ? 'primary' : 'secondary'}
              disabled={!file}
              onClick={handleSubmit}
              className="w-full md:min-w-[200px]"
            >
              Check if I match
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ROLE_CV_UPLOAD_PATH };
export default RoleCvUpload;
