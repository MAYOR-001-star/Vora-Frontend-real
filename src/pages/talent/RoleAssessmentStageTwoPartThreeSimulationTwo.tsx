import React from 'react';
import RoleAssessmentStageTwoSimulationBase from '../../components/talent/RoleAssessmentStageTwoSimulationBase';

const RoleAssessmentStageTwoPartThreeSimulationTwo: React.FC = () => {
  return (
    <RoleAssessmentStageTwoSimulationBase
      simulationNumber={2}
      simulationTitle="Community health message drafting"
      sectionTitle="Draft a community mobilization message"
      sectionSub="An upcoming child immunization campaign needs a clear, persuasive broadcast message. Draft the message to be shared with community health workers (CHWs) for dissemination."
      whyMattersText="Community mobilization messages must balance official health guidelines with locally resonant, clear language. Messages that are too dense fail to drive action, while overly simplified ones miss critical instructions."
      scenarioTag="Mobilization Campaign"
      scenarioTitle="Immunization outreach: Mobilizing Ward 4 families"
      scenarioBody={
        <>
          <p>Ward 4 has shown a 15% drop in measles second-dose coverage over the last quarter. You are launching a catch-up immunization campaign next Saturday. You need to draft a message that CHWs can copy-paste into local community WhatsApp groups or read during household visits.</p>
          <p className="italic bg-[#F7F7F7] border border-[#E6E6E6] rounded-[8px] p-[10px_14px] mt-[10px] text-[#4A4A4A]">
            "CHWs report that mothers are asking about safety, what documents to bring, and if there are fees. The campaign is completely free, runs from 8:00am to 4:00pm at the Ward 4 Town Hall, and mothers need to bring their child's yellow immunization card if they have it."
          </p>
        </>
      }
      briefTitle="Your message should cover"
      briefItems={[
        'Action: State clearly what families need to do, where, and when.',
        'Why it matters: Explain the benefit of immunization in simple, non-jargon terms.',
        'Practical details: Address fees (free), times, location, and what to bring.',
        'Call to action: Formulate a warm, encouraging closing that invites questions.',
        'Tone: Informative, supportive, respectful, and culturally appropriate.'
      ]}
      editorPlaceholder="Draft your community message here..."
      editorLabel="Your broadcast draft · to Community Health Workers for dissemination"
      editorSubtext="Public-facing, community-centered tone."
      wordCountMin={100}
      wordCountMax={200}
      nextPath="assessment/stage-2/part-3/simulation-3"
      timeLimitSeconds={8 * 60}
    />
  );
};

export default RoleAssessmentStageTwoPartThreeSimulationTwo;
