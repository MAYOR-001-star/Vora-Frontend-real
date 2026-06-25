import RoleAssessmentStageTwoInterviewBase, { type Question } from '../../components/talent/RoleAssessmentStageTwoInterviewBase';

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    numText: 'Question 1 of 6',
    questionText: 'A pregnant woman at an outreach reports she has been taking misoprostol bought at a market for cramping. She is in her second trimester. What is the most appropriate first step?',
    options: [
      { letter: 'A', text: 'Reassure her and continue the routine antenatal screening; off-prescription misoprostol is common.' },
      { letter: 'B', text: 'Document exposure timing and dose, assess for active uterine activity, and arrange urgent obstetric referral.' },
      { letter: 'C', text: 'Administer a tocolytic from the outreach kit to halt any potential contractions.' },
      { letter: 'D', text: 'Advise her to stop the medication and return to the centre next week for follow-up.' }
    ]
  },
  {
    id: 'q2',
    numText: 'Question 2 of 6',
    questionText: 'Your kit contains ferrous sulphate 200mg for anaemia in pregnancy. Which counselling point matters most for adherence in a hot, dusty field setting?',
    options: [
      { letter: 'A', text: 'Take with tea or coffee for better tolerability.' },
      { letter: 'B', text: 'Take on an empty stomach with vitamin C-rich food and expect mild dark stools as normal.' },
      { letter: 'C', text: 'Take only on days when she feels tired.' },
      { letter: 'D', text: 'Double the dose if she misses a day.' }
    ]
  },
  {
    id: 'q3',
    numText: 'Question 3 of 6',
    questionText: 'A community health worker reports that a child given oral rehydration salts and zinc for diarrhoea has worsened over 24 hours. What is the most appropriate referral threshold?',
    options: [
      { letter: 'A', text: 'Bloody stools, persistent vomiting, sunken eyes, lethargy, or no urine in 6 hours.' },
      { letter: 'B', text: 'Only if the child develops a fever above 39°C.' },
      { letter: 'C', text: 'Only after 72 hours of continued symptoms.' },
      { letter: 'D', text: 'Refer only if the caregiver requests it.' }
    ]
  },
  {
    id: 'q4',
    numText: 'Question 4 of 6',
    questionText: 'The outreach team has azithromycin 500mg for suspected trachoma in school-aged children. Which contraindication is most clinically important to screen for in this setting?',
    options: [
      { letter: 'A', text: 'Recent measles vaccination.' },
      { letter: 'B', text: 'Known macrolide allergy or significant cardiac arrhythmia history.' },
      { letter: 'C', text: 'A vegetarian diet.' },
      { letter: 'D', text: 'Birthday within the past month.' }
    ]
  },
  {
    id: 'q5',
    numText: 'Question 5 of 6',
    questionText: 'Your team is preparing magnesium sulphate for an obstetric emergency. Which monitoring set is the minimum standard before administering further doses?',
    options: [
      { letter: 'A', text: 'Patellar reflexes, respiratory rate, urine output, and blood pressure.' },
      { letter: 'B', text: 'Pulse only.' },
      { letter: 'C', text: 'Temperature and weight.' },
      { letter: 'D', text: 'Capillary blood glucose alone.' }
    ]
  },
  {
    id: 'q6',
    numText: 'Question 6 of 6',
    questionText: 'A volunteer asks you whether to dispose of expired tetanus toxoid that\'s been sitting in the cold-chain box for two weeks past expiry. What is the right call?',
    options: [
      { letter: 'A', text: 'Use it on adults only and not children.' },
      { letter: 'B', text: 'Discard via the appropriate biomedical waste protocol, document the loss, and request replacement stock.' },
      { letter: 'C', text: 'Use it within the next 48 hours only.' },
      { letter: 'D', text: 'Send it to the next outreach site.' }
    ]
  }
];

const RoleAssessmentStageTwoPharmacology: React.FC = () => {
  return (
    <RoleAssessmentStageTwoInterviewBase
      interviewNumber={1}
      interviewTitle="Pharmacology in the field"
      sectionTitle="Medications at the edge of the system"
      sectionSub="Six clinically grounded questions, paced for your seniority. Pick the strongest answer in each. The timer covers all six."
      whyMattersText="Reach Africa programmes carry medication kits into peri-urban communities. Your team will look to you for the safety calls when something doesn't go to plan."
      questions={QUESTIONS}
      nextPath="assessment/stage-2/part-1/interview-2"
    />
  );
};

export default RoleAssessmentStageTwoPharmacology;
