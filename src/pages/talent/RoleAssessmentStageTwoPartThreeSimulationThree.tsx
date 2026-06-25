import React from 'react';
import RoleAssessmentStageTwoSimulationBase from '../../components/talent/RoleAssessmentStageTwoSimulationBase';

const RoleAssessmentStageTwoPartThreeSimulationThree: React.FC = () => {
  return (
    <RoleAssessmentStageTwoSimulationBase
      simulationNumber={3}
      simulationTitle="Telehealth consultation response"
      sectionTitle="Write a telehealth response"
      sectionSub="A community health worker at a remote post has requested guidance regarding a postpartum patient. Write a professional, clinical advice response."
      whyMattersText="Telehealth consultations require clear, structured, and calm guidance. A vague or rushed response can lead to critical clinical errors by frontline staff who are looking for step-by-step direction."
      scenarioTag="Telehealth Support"
      scenarioTitle="Consultation request: Guidance for postpartum monitoring"
      scenarioBody={
        <>
          <p>A CHW at a rural outpost, 4 hours away from the nearest hospital, has texted you about a 22-year-old patient who delivered a healthy baby boy 3 hours ago. The CHW reports that the patient is experiencing slightly heavier bleeding than usual, though her vitals are currently stable (BP 110/70 mmHg, HR 88 bpm).</p>
          <p className="italic bg-[#F7F7F7] border border-[#E6E6E6] rounded-[8px] p-[10px_14px] mt-[10px] text-[#4A4A4A]">
            "The patient says she feels dizzy when standing up. Mrs. Funke is the only CHW on site and has standard postpartum supplies. She wants to know how to monitor the patient, what checks to perform, and at what point to prepare for emergency evacuation."
          </p>
        </>
      }
      briefTitle="Your response should cover"
      briefItems={[
        'Immediate checks: Guide the CHW on checking uterine tone (fundal massage) and bladder status.',
        'Monitoring plan: Provide clear instructions on what vitals/bleeding signs to check and how often.',
        'Red flags: Specify exact triggers (e.g. rising HR, falling BP, passing clots) that require evacuation.',
        'Patient care: Advise on positioning, hydration, and safety steps to take immediately.',
        'Tone: Calm, authoritative yet supportive, structured, and easy to follow under pressure.'
      ]}
      editorPlaceholder="Write your response to the CHW here..."
      editorLabel="Your guidance message · to Outpost CHW"
      editorSubtext="Clinical support. Ensure steps are numbered or clearly bulleted for readability."
      wordCountMin={150}
      wordCountMax={300}
      nextPath="assessment/stage-2/part-3/simulation-4"
    />
  );
};

export default RoleAssessmentStageTwoPartThreeSimulationThree;
