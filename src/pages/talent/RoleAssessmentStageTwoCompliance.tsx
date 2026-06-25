import React, { useEffect } from 'react';
import RoleAssessmentStageTwoInterviewBase, { type Question } from '../../components/talent/RoleAssessmentStageTwoInterviewBase';

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    numText: 'Question 1 of 6',
    questionText: 'A donor\'s communications team asks for photographs of beneficiaries that include faces and names for their annual report. Several beneficiaries verbally agreed during the outreach. What\'s the right call?',
    options: [
      { letter: 'A', text: 'Send the photographs straight to the donor since verbal consent was given.' },
      { letter: 'B', text: 'Verify written informed consent specifically for external use, in the appropriate language, and decline if not on file.' },
      { letter: 'C', text: 'Send the photographs with faces blurred without further checks.' },
      { letter: 'D', text: 'Ask the field officer to get retroactive signatures next visit.' }
    ]
  },
  {
    id: 'q2',
    numText: 'Question 2 of 6',
    questionText: 'A junior team member shares beneficiary information on a WhatsApp group that includes external partners, intending to coordinate a referral. Your response?',
    options: [
      { letter: 'A', text: 'Ignore it, since the intent was good.' },
      { letter: 'B', text: 'Privately address the breach, document it, follow Reach Africa\'s data incident pathway, and refresh the team\'s training.' },
      { letter: 'C', text: 'Publicly call her out in the team chat as an example.' },
      { letter: 'D', text: 'Ask her to delete the message and consider the matter closed.' }
    ]
  },
  {
    id: 'q3',
    numText: 'Question 3 of 6',
    questionText: 'Your spouse owns a printing business that bids for Reach Africa\'s annual contract. What\'s the proper handling?',
    options: [
      { letter: 'A', text: 'Disclose the conflict of interest in writing, recuse yourself from the evaluation, and follow the organisation\'s conflict policy.' },
      { letter: 'B', text: 'Ensure your spouse\'s bid is the most competitive so the choice is justified on merit.' },
      { letter: 'C', text: 'Mention it casually to a peer but stay on the evaluation panel.' },
      { letter: 'D', text: 'Say nothing as the procurement officer makes the final decision anyway.' }
    ]
  },
  {
    id: 'q4',
    numText: 'Question 4 of 6',
    questionText: 'A government health official asks for an under-the-table fee to "fast-track" your permit. The outreach starts in 48 hours and lives may be affected by the delay. Your move?',
    options: [
      { letter: 'A', text: 'Pay the fee privately and reimburse yourself later.' },
      { letter: 'B', text: 'Refuse, document the request, escalate internally, and explore the proper escalation pathway in parallel.' },
      { letter: 'C', text: 'Negotiate the fee down to a smaller amount.' },
      { letter: 'D', text: 'Cancel the outreach quietly to avoid the situation.' }
    ]
  },
  {
    id: 'q5',
    numText: 'Question 5 of 6',
    questionText: 'A research partner wants to use last year\'s beneficiary data for a study that was not within the original consent scope. The data is anonymised. What\'s the right answer?',
    options: [
      { letter: 'A', text: 'Anonymised data can be used freely.' },
      { letter: 'B', text: 'Secondary use beyond original consent requires ethics review and, where feasible, fresh consent. Treat anonymisation as a safeguard, not a permission.' },
      { letter: 'C', text: 'Use the data if the research is for a good cause.' },
      { letter: 'D', text: 'Share only if the partner signs an NDA.' }
    ]
  },
  {
    id: 'q6',
    numText: 'Question 6 of 6',
    questionText: 'During a programme review, you discover that last quarter\'s coverage figures were inflated by 15% in the report sent to donors. The senior who authored it asks you to leave it alone "because the outcome was directionally right". Your response?',
    options: [
      { letter: 'A', text: 'Leave it alone since correction would damage donor relations.' },
      { letter: 'B', text: 'Raise the discrepancy through internal escalation, follow the organisation\'s whistleblowing or correction pathway, and ensure a transparent correction is issued to the donor.' },
      { letter: 'C', text: 'Adjust the next quarter\'s figures down to compensate.' },
      { letter: 'D', text: 'Resign quietly.' }
    ]
  }
];

const RoleAssessmentStageTwoCompliance: React.FC = () => {
  useEffect(() => {
    localStorage.setItem('vora_stage2_part2_unlocked', 'true');
  }, []);

  return (
    <RoleAssessmentStageTwoInterviewBase
      interviewNumber={3}
      interviewTitle="Compliance and ethics"
      sectionTitle="The guardrails health programmes live inside"
      sectionSub="Six grounded questions on consent, confidentiality, conflicts of interest and regulatory accountability. Last interview in Part 1."
      whyMattersText="Reach Africa works across NGO, donor and government structures. Misjudging where the lines sit creates organisational risk and damages community trust."
      questions={QUESTIONS}
      nextPath="assessment/stage-2/part-1/complete"
    />
  );
};

export default RoleAssessmentStageTwoCompliance;
