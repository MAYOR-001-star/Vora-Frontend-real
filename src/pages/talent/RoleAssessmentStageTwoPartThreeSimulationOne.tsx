import React from 'react';
import RoleAssessmentStageTwoSimulationBase from '../../components/talent/RoleAssessmentStageTwoSimulationBase';

const RoleAssessmentStageTwoPartThreeSimulationOne: React.FC = () => {
  return (
    <RoleAssessmentStageTwoSimulationBase
      simulationNumber={1}
      simulationTitle="Clinical handover documentation"
      sectionTitle="Write up a clinical handover"
      sectionSub="A patient's condition has escalated and requires referral to the regional referral hospital. Draft the clinical handover you would send to the receiving team."
      whyMattersText="Clinical handovers require crisp, structured communication (e.g. SBAR structure). A poorly structured handover increases cognitive load on the receiving team and delays life-saving interventions."
      scenarioTag="Outreach Clinic"
      scenarioTitle="Handover concern: Patient Adama, 28, gestational hypertension"
      scenarioBody={
        <>
          <p>Adama is a 28-year-old female at 32 weeks gestation who presented to your outreach clinic this afternoon with persistent headaches and blurry vision. Her vitals indicate a BP of 155/98 mmHg, heart rate of 92 bpm, and urine dipstick reveals 1+ proteinuria. The field nurse has administered a first dose of antihypertensive medication as per protocol, but she remains symptomatic.</p>
          <p className="italic bg-[#F7F7F7] border border-[#E6E6E6] rounded-[8px] p-[10px_14px] mt-[10px] text-[#4A4A4A]">
            "Adama reports that the headache started yesterday and has not responded to paracetamol. She is also complaining of mild epigastric pain that started about 2 hours ago. She has no history of chronic hypertension. Her fetal heart rate is reassuring at 142 bpm."
          </p>
        </>
      }
      briefTitle="Your handover should cover"
      briefItems={[
        'Situation: Identify the patient, gestational age, and reason for referral.',
        'Background: Note the relevant clinical history and signs leading to this point.',
        'Assessment: Clearly state the current vitals, findings, and what has been administered.',
        'Recommendation: State the urgency and what you expect the receiving team to prepare.',
        'Tone: Use clear, structured clinical language (SBAR structure is highly recommended).'
      ]}
      editorPlaceholder="Start writing your SBAR clinical handover here..."
      editorLabel="Your clinical handover · to General Hospital Receiving Nurse"
      editorSubtext="Clinical confidentiality. Do not mention names from other prompts."
      wordCountMin={150}
      wordCountMax={250}
      nextPath="assessment/stage-2/part-3/simulation-2"
    />
  );
};

export default RoleAssessmentStageTwoPartThreeSimulationOne;
