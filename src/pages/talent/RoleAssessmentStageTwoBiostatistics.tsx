import RoleAssessmentStageTwoInterviewBase, { type Question } from '../../components/talent/RoleAssessmentStageTwoInterviewBase';

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    numText: 'Question 1 of 6',
    questionText: 'A vaccination coverage survey reports 78% (95% CI: 71 to 84) in your target community. Your donor wants you to claim "over 80% coverage". What is the most accurate framing?',
    options: [
      { letter: 'A', text: 'Report 80% coverage, since it falls within the confidence interval.' },
      { letter: 'B', text: 'Report a point estimate of 78% with the confidence interval, and note coverage may sit between 71 and 84%.' },
      { letter: 'C', text: 'Round up to 80% to align with donor expectations.' },
      { letter: 'D', text: 'Refuse to report any figure until a follow-up survey is completed.' }
    ]
  },
  {
    id: 'q2',
    numText: 'Question 2 of 6',
    questionText: 'Your team observes that maternal mortality dropped from 8 deaths per 1,000 to 6 deaths per 1,000 in the post-intervention quarter. What\'s the most cautious interpretation?',
    options: [
      { letter: 'A', text: 'The intervention caused a 25% reduction in mortality.' },
      { letter: 'B', text: 'An association exists. Causality requires controlling for confounders, denominator stability, and seasonal variation.' },
      { letter: 'C', text: 'The drop is meaningless without a five-year baseline.' },
      { letter: 'D', text: 'The intervention should be scaled nationally based on this result.' }
    ]
  },
  {
    id: 'q3',
    numText: 'Question 3 of 6',
    questionText: 'A screening test for a condition with 2% prevalence has 95% sensitivity and 90% specificity. What is the practical implication for community-level programmes?',
    options: [
      { letter: 'A', text: 'Most positive results will be true positives.' },
      { letter: 'B', text: 'A large share of positives will be false positives, so a confirmatory pathway is essential.' },
      { letter: 'C', text: 'The test is suitable as a stand-alone diagnostic.' },
      { letter: 'D', text: 'Sensitivity is too low to use the test at all.' }
    ]
  },
  {
    id: 'q4',
    numText: 'Question 4 of 6',
    questionText: 'Your community survey returns a non-significant p-value (p=0.18) on the primary outcome. The donor asks if the intervention "didn\'t work". What\'s your professional response?',
    options: [
      { letter: 'A', text: 'Yes, the intervention had no effect.' },
      { letter: 'B', text: 'Absence of statistical significance is not the same as absence of effect. The study may have been underpowered.' },
      { letter: 'C', text: 'Run the analysis again with a different test until p falls below 0.05.' },
      { letter: 'D', text: 'Hide the result and report only the secondary outcomes.' }
    ]
  },
  {
    id: 'q5',
    numText: 'Question 5 of 6',
    questionText: 'A colleague presents data showing an odds ratio of 3.5 (95% CI: 0.8 to 8.2) for a programme component. What\'s your read?',
    options: [
      { letter: 'A', text: 'A 3.5x effect is strong and should be acted on.' },
      { letter: 'B', text: 'The confidence interval crosses 1, so the result is consistent with no effect. Treat as inconclusive.' },
      { letter: 'C', text: 'The wide interval means the data is wrong.' },
      { letter: 'D', text: 'An odds ratio above 3 always indicates a meaningful clinical effect.' }
    ]
  },
  {
    id: 'q6',
    numText: 'Question 6 of 6',
    questionText: 'You\'re asked to set up routine monitoring for a new outreach. Which set best protects against bias in the data collected?',
    options: [
      { letter: 'A', text: 'Use the same enumerator for the entire programme to keep things consistent.' },
      { letter: 'B', text: 'Standardised tools, blinded data entry where feasible, rotating enumerators, periodic supervisor verification, and clear case definitions.' },
      { letter: 'C', text: 'Collect data only when senior staff are present.' },
      { letter: 'D', text: 'Wait until the end of the quarter and collect retrospectively.' }
    ]
  }
];

const RoleAssessmentStageTwoBiostatistics: React.FC = () => {
  return (
    <RoleAssessmentStageTwoInterviewBase
      interviewNumber={2}
      interviewTitle="Biostatistics"
      sectionTitle="Reading the numbers behind the work"
      sectionSub="Six questions about the statistics you'll actually run into. The aim isn't pure mathematical exactness, it's whether you read public health figures correctly."
      whyMattersText="You'll sign off on internal reports and answer donor questions on coverage, prevalence, and impact. Misreading a confidence interval at this level has consequences downstream."
      questions={QUESTIONS}
      nextPath="assessment/stage-2/part-1/interview-3"
    />
  );
};

export default RoleAssessmentStageTwoBiostatistics;
