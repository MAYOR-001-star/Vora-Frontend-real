import PaymentCard from '../PaymentCard';

const ValidRejectionReasonsCard: React.FC = () => (
  <PaymentCard
    title="Valid Rejection Reasons"
    className="!mb-0"
    bodyClassName="p-4 text-xs text-[#808080] leading-loose"
  >
    ✓ Qualifications don&apos;t meet spec
    <br />
    ✓ Salary expectations exceed budget
    <br />
    ✓ Location / availability conflict
    <br />
    ✓ Role scope mismatch (documented)
    <br />
    ✓ Candidate withdrew
    <br />
    <span className="text-[#DC2626] font-semibold">✗ &quot;Personal fit&quot; (undocumented)</span>
    <br />
    <span className="text-[#DC2626] font-semibold">✗ &quot;Not what we expected&quot;</span>
    <br />
    <span className="text-[#DC2626] font-semibold">✗ Any subjective, unsubstantiated reason</span>
  </PaymentCard>
);

export default ValidRejectionReasonsCard;
