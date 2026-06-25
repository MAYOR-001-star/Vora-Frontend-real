import React from 'react';
import RoleAssessmentStageTwoSimulationBase from '../../components/talent/RoleAssessmentStageTwoSimulationBase';

const RoleAssessmentStageTwoPartThreeSimulationFour: React.FC = () => {
  return (
    <RoleAssessmentStageTwoSimulationBase
      simulationNumber={4}
      simulationTitle="Safeguarding referral write-up"
      sectionTitle="Write up a safeguarding referral"
      sectionSub="A community health worker has raised a safeguarding concern about a young woman in the programme. Read what she's told you, then write the internal referral you'd send to the Reach Africa safeguarding lead."
      whyMattersText="Safeguarding write-ups have to be factual, calm and protective. A bad one delays action or exposes the person at risk further. We're reading for clarity, judgement, and proportion."
      scenarioTag="CHW report to you"
      scenarioTitle="Concern raised about Miriam, 17, ANC enrolee at Bariga ward"
      scenarioBody={
        <>
          <p>Your senior CHW, Mrs Funke Adediran, came to you this morning, visibly worried. Below is what she shared, in her words. Names and a few details are anonymised here for your write-up purposes.</p>
          <p className="bg-[#F7F7F7] border border-[#E6E6E6] rounded-[10px] p-[14px_16px] italic text-[#4A4A4A] leading-[1.65] mt-[10px]">
            "Madam, Miriam came to the ANC session yesterday. She is 17, second time pregnant, gestation about 24 weeks. The husband, who they say is around 38, brought her and did not let her speak alone with me. I tried twice. When I noticed bruising on her upper arm she pulled her wrapper across quickly. She would not make eye contact. He answered all my questions for her. When I asked her name she looked at him first. I am worried something is happening at home. I did not ask further yesterday in front of him. I have not told anyone else. What should we do?"
          </p>
          <p className="mt-[10px]">It is now 11:00am. Your safeguarding lead, Mr Olumide Bankole, expects all referrals via the internal portal and a parallel email.</p>
        </>
      }
      briefTitle="Your referral should"
      briefItems={[
        'State the facts you have, not your interpretations, with the line between the two kept clear',
        'Identify the risk indicators that warrant escalation',
        'Confirm what has and hasn\'t been done so far',
        'Recommend the immediate next safeguarding steps you\'d propose',
        'Note who else does and doesn\'t currently know',
        'Be appropriate in tone, free of speculation about the perpetrator, and prioritise Miriam\'s safety'
      ]}
      editorPlaceholder="Start writing your safeguarding referral here. Use a professional, objective tone..."
      editorLabel="Your safeguarding referral · to Mr Bankole, Safeguarding Lead"
      editorSubtext="Internal, confidential. No names from this prompt verbatim."
      wordCountMin={200}
      wordCountMax={350}
      nextPath="assessment/stage-2/analyzing"
    />
  );
};

export default RoleAssessmentStageTwoPartThreeSimulationFour;
