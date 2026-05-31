import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import PublicRoleNav from '../../components/roleLanding/PublicRoleNav';
import RoleHeroCard from '../../components/roleLanding/RoleHeroCard';
import RoleMatchCtaBanner from '../../components/roleLanding/RoleMatchCtaBanner';
import RoleDetailCard from '../../components/roleLanding/RoleDetailCard';
import RoleBulletList from '../../components/roleLanding/RoleBulletList';
import RoleOverviewList from '../../components/roleLanding/RoleOverviewList';
import AlertBanner from '../../components/common/AlertBanner';
import { SubsectionTitle } from '../../components/common/Typography';
import { getRoleLandingForSlug } from '../../utils/roleLanding';

const RoleLanding: React.FC = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const role = useMemo(() => getRoleLandingForSlug(slug), [slug]);

  return (
    <div className="min-h-screen">
      <PublicRoleNav roleSlug={slug} />

      <div className="bg-white max-w-[1000px] mx-auto px-4 sm:px-5 py-8 pb-14">
        <RoleHeroCard role={role} />
        <RoleMatchCtaBanner />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_310px] gap-5">
          <div className="space-y-5">
            <RoleDetailCard title="About this role">
              <p className="text-sm text-[#4A4A4A] leading-relaxed">{role.aboutRole}</p>
              <div className="h-px bg-[#E6E6E6] my-4" />
              <SubsectionTitle as="h3" className="mb-3">
                What you&apos;ll be doing
              </SubsectionTitle>
              <RoleBulletList items={role.responsibilities} />
              <div className="h-px bg-[#E6E6E6] my-4" />
              <SubsectionTitle as="h3" className="mb-3">
                What you&apos;ll need
              </SubsectionTitle>
              <RoleBulletList items={role.requirements} />
            </RoleDetailCard>
          </div>

          <div className="space-y-4">
            <RoleDetailCard title="Role overview">
              <RoleOverviewList rows={role.overviewRows} />
            </RoleDetailCard>

            <RoleDetailCard title="Eligibility & work rights">
              <RoleOverviewList rows={role.eligibilityRows} />
              {role.eligibilityNote && (
                <AlertBanner variant="blue" className="mt-3 !text-xs" showIcon={false}>
                  <strong>Important:</strong> {role.eligibilityNote}
                </AlertBanner>
              )}
            </RoleDetailCard>

            <RoleDetailCard title="How VORA assesses you">
              <RoleBulletList items={role.assessmentItems} />
              <AlertBanner variant="blue" className="mt-3 !text-xs !rounded-lg" showIcon={false}>
                <p className="font-semibold mb-1">Free to apply</p>
                <p className="text-xs leading-relaxed font-normal">
                  Signing up and checking your profile match costs nothing. The whole process takes
                  under 15 minutes.
                </p>
              </AlertBanner>
            </RoleDetailCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleLanding;
