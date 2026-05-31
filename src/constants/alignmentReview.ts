import type {
  AlignmentCandidateData,
  HistoricalAlignmentSession,
  RejectionReasonOption,
} from '../types/alignmentReview';
import type { PaymentsTabType } from '../types/employer';

export const ALIGNMENT_FEE_AMOUNT = 150;

export const ALIGNMENT_TAB_LABELS: Record<PaymentsTabType, string> = {
  session: 'Session Details',
  psychometric: 'Psychometric',
  sjt: 'Situational Judgement',
  video: 'Video Interview',
  overall: 'Overall Decision',
};

export const REJECTION_REASON_OPTIONS: RejectionReasonOption[] = [
  {
    value: 'qual',
    title: "Qualifications don't meet requirements",
    description: 'Missing required certifications or seniority level',
  },
  {
    value: 'salary',
    title: 'Salary expectation exceeds budget',
    description: 'Stated compensation is above approved ceiling (attach budget doc)',
  },
  {
    value: 'location',
    title: 'Location or availability conflict',
    description: 'Candidate cannot meet location/time zone requirements',
  },
  {
    value: 'scope',
    title: 'Role scope mismatch (documented)',
    description: 'Specific technical specialism not aligned with requirements',
  },
  {
    value: 'withdrew',
    title: 'Candidate withdrew',
    description: 'Candidate declined to proceed',
  },
  {
    value: 'other',
    title: 'Other (requires detailed written justification)',
    description: 'High bar — VORA will review closely',
  },
];

export const AMARA_CANDIDATE: AlignmentCandidateData = {
  id: 'amara',
  name: 'Dr. Amara Osei',
  initials: 'AO',
  avatarClassName: 'bg-[#EBF6FF] text-[#0047CC]',
  roleTitle: 'Public Health Advisor',
  roleTagVariant: 'blue',
  subtitle: 'Medics Without Limits · Accra, Ghana · Session 2 of 2',
  reference: 'ALN-2025-0015',
  alignmentFee: ALIGNMENT_FEE_AMOUNT,
  session: [
    { label: 'Session type', value: '2nd additional alignment session' },
    { label: 'Date conducted', value: 'March 5, 2025 · 11:00 AM GMT' },
    { label: 'Duration', value: '48 minutes' },
    {
      label: 'Alignment fee',
      value: '$150.00 · Ref #ALN-2025-0015',
      valueClassName: 'text-[#D97706]',
    },
    { label: 'Job role', value: 'Public Health Advisor – Medics Without Limits' },
    { label: 'Location', value: 'Accra, Ghana · On-site · Global South' },
    { label: 'VORA reviewer', value: 'Dr. Kwame Asante (Global Health Lead)' },
    {
      label: 'Escrow held (role)',
      value: '$4,500 · Contract 6–12mo · Min. tenure deposit',
    },
    {
      label: 'Refund on hire',
      value: '$150 auto-refunded immediately',
      valueClassName: 'text-[#1D871D]',
    },
  ],
  psychometric: {
    scoreTitle: 'Overall Psychometric Score',
    score: 87,
    scoreColorClass: 'text-[#0047CC]',
    statusTag: '✓ Above threshold (80)',
    testInfoTitle: 'Test Completed',
    testInfoLines: [
      'Feb 28, 2025 · 42 min',
      'Norm group: Global Health Professionals',
      'Provider: VORA Assessment Engine',
    ],
    domains: [
      {
        label: 'Abstract Reasoning',
        value: 92,
        description:
          'Percentile: 94th · Identifies complex patterns; rapid logical inference under time pressure',
        barColor: 'primary',
      },
      {
        label: 'Verbal Reasoning',
        value: 88,
        description:
          'Percentile: 89th · Strong comprehension of technical health literature; precise language use',
        barColor: 'primary',
      },
      {
        label: 'Numerical Reasoning',
        value: 84,
        description:
          'Percentile: 81st · Accurate statistical interpretation; some hesitation on compound ratio problems',
        barColor: 'success',
      },
      {
        label: 'Working Memory',
        value: 82,
        description:
          'Percentile: 78th · Retains multi-variable information effectively in complex scenarios',
        barColor: 'success',
      },
      {
        label: 'Conscientiousness',
        value: 91,
        description:
          'Top 8% in cohort · Exceptionally structured; self-directed under minimal supervision',
        barColor: 'primary',
      },
      {
        label: 'Emotional Stability',
        value: 79,
        description:
          'Percentile: 71st · Manages stress constructively; occasional over-preparation tendency noted',
        barColor: 'success',
      },
      {
        label: 'Openness to Complexity',
        value: 90,
        description:
          'Percentile: 91st · Seeks out novel problems; thrives in ambiguous global health environments',
        barColor: 'primary',
      },
    ],
    interpretation: {
      title: 'Psychometric interpretation:',
      body: 'Dr. Osei scores above the 80-point VORA threshold in all seven domains. Her composite score of 87/100 places her in the top 13% of all global health professionals assessed on this platform. Abstract reasoning and conscientiousness are standout strengths. No red flags in profile consistency checks.',
      variant: 'blue',
    },
  },
  sjt: {
    scoreTitle: 'SJT Overall Score',
    score: 83,
    scoreColorClass: 'text-[#2CA62C]',
    statusTag: '✓ Above threshold (80)',
    testInfoTitle: 'Test Completed',
    testInfoLines: [
      'Mar 1, 2025 · 20 scenarios · 40 min',
      'Domain: Global Health & Public Health Systems',
      'Validated against WHO competency framework',
    ],
    domains: [
      {
        label: 'Ethical Decision-Making',
        value: 89,
        description:
          'Correctly prioritised community welfare over institutional convenience in 8/8 scenarios. Cited ICRC neutrality principles and equity frameworks unprompted.',
        barColor: 'success',
      },
      {
        label: 'Crisis & Resource Triage',
        value: 85,
        description:
          'Excellent triage logic in cholera outbreak simulation. Ranked second in multi-site allocation exercise. One sub-optimal response on PPE shortage scenario.',
        barColor: 'success',
      },
      {
        label: 'Cross-Cultural Communication',
        value: 90,
        description:
          'Top response in community health worker engagement scenario. Demonstrated cultural humility without defaulting to stereotype-based assumptions.',
        barColor: 'primary',
      },
      {
        label: 'Stakeholder & Donor Management',
        value: 78,
        description:
          'Sound baseline responses. Slightly over-deferred to donor preference vs. community need in PEPFAR funding conflict scenario — noted area for development.',
        barColor: 'success',
      },
      {
        label: 'Data Interpretation Under Pressure',
        value: 82,
        description:
          'Correctly interpreted mortality rate trends in 4/5 time-pressured scenarios. One arithmetic error in composite index calculation corrected on reflection.',
        barColor: 'success',
      },
      {
        label: 'Team Leadership & Delegation',
        value: 76,
        description:
          'Adequate delegation instincts. Tendency toward over-centralisation in multi-team coordination scenarios. Development need flagged for senior advisory roles.',
        barColor: 'success',
      },
    ],
    interpretation: {
      title: 'SJT interpretation:',
      body: 'Dr. Osei demonstrates strong ethical reasoning and cross-cultural capability — the two highest-weight domains for Public Health Advisor roles. Her stakeholder management and delegation scores are within acceptable range but represent genuine development opportunities. Overall SJT result is a clear pass at 83/100.',
      variant: 'green',
    },
  },
  video: {
    scoreTitle: 'Video Interview Score',
    score: 81,
    scoreColorClass: 'text-[#7C3AED]',
    statusTag: '✓ Above threshold (80)',
    testInfoTitle: 'Session Info',
    testInfoLines: [
      'Mar 3, 2025 · 28 min · 5 structured questions',
      'AI + human review · Recorded: HD, auto-captioned',
    ],
    breakdownTitle: 'Question-by-Question Scores',
    videoCaption: 'Dr. Amara Osei – Full Session · 28:14 · Mar 3, 2025',
    videoScoreLabel: 'Score: 81/100',
    domains: [
      {
        label: 'Q1: Describe your most complex public health intervention',
        value: 88,
        description:
          'Detailed account of malaria elimination programme in Upper West Region, Ghana. Cited specific DALY reductions. Strong evidence-based narrative.',
        barColor: 'primary',
      },
      {
        label: 'Q2: How do you manage conflicting ministry and NGO priorities?',
        value: 79,
        description:
          'Good structural answer using alignment-first framework. Slightly abstract — could have grounded in specific institutional example.',
        barColor: 'success',
      },
      {
        label: 'Q3: Walk me through your data methodology for a needs assessment',
        value: 85,
        description:
          'Named WHO STEPwise tool, DHIS2 integration, and community triangulation. Identified triangulation weaknesses in low-resource data environments.',
        barColor: 'primary',
      },
      {
        label: 'Q4: Describe a time you led change in a resistant health system',
        value: 77,
        description:
          'Competent STAR response. Story was compelling but change management framework somewhat implicit — could strengthen change vocabulary.',
        barColor: 'success',
      },
      {
        label: 'Q5: What is your understanding of our organisational context?',
        value: 86,
        description:
          "Well-researched. Referenced Medics Without Limits' active programmes in Brong-Ahafo and Northern Region specifically.",
        barColor: 'primary',
      },
    ],
    communicationStats: [
      { label: 'Clarity of Communication', value: 'High', valueColorClass: 'text-[#0047CC]' },
      { label: 'Use of Evidence', value: 'Very Strong', valueColorClass: 'text-[#1D871D]' },
      { label: 'Confidence Level', value: 'Measured', valueColorClass: 'text-[#1D871D]' },
      { label: 'Technical Vocabulary', value: 'Expert', valueColorClass: 'text-[#0047CC]' },
    ],
    interpretation: {
      title: 'Video interpretation:',
      body: 'Dr. Osei presents with strong technical credibility. Q1 and Q3 responses were standout. Areas for coaching: abstract-to-concrete grounding in Q2 and explicit change management vocabulary in Q4.',
      variant: 'purple',
    },
  },
  overall: {
    scoreCards: [
      {
        label: 'Psychometric',
        score: 87,
        scoreColorClass: 'text-[#0047CC]',
        tagLabel: 'Pass',
        tagVariant: 'blue',
        cardClassName: 'bg-[#EBF6FF] border-[#387DFF]/20',
      },
      {
        label: 'SJT',
        score: 83,
        scoreColorClass: 'text-[#2CA62C]',
        tagLabel: 'Pass',
        tagVariant: 'green',
        cardClassName: 'bg-[#EEFBEE] border-[#2CA62C]/20',
      },
      {
        label: 'Video',
        score: 81,
        scoreColorClass: 'text-[#7C3AED]',
        tagLabel: 'Pass',
        tagVariant: 'purple',
        cardClassName: 'bg-[#F5F3FF] border-[#7C3AED]/20',
      },
    ],
    compositeScore: 84,
    weightingNote: 'Weighted: Psychometric 35% · SJT 40% · Video 25%',
    passSummary: {
      title: 'Why Dr. Osei passed all three assessments:',
      paragraphs: [
        'Psychometric (87/100): Above-threshold in all 7 domains. Exceptional abstract reasoning (92) and conscientiousness (91) signal high capacity for unstructured global health environments.',
        'SJT (83/100): Correctly prioritised community welfare in all ethical scenarios. Cross-cultural communication (90) is a critical competency.',
        'Video (81/100): Programme experience is genuine and evidence-backed. Q1 on malaria intervention was particularly compelling.',
      ],
    },
    recommendation: {
      body: 'Dr. Osei is a strong candidate who has passed all three assessment gates. Her composite score of 84/100 ranks her in the top 15% of all Public Health Advisor candidates assessed on VORA in the past 12 months.',
      variant: 'green',
    },
  },
};

export const PRIYA_CANDIDATE: AlignmentCandidateData = {
  id: 'priya',
  name: 'Priya Sharma',
  initials: 'PS',
  avatarClassName: 'bg-[#EEFBEE] text-[#1D871D]',
  roleTitle: 'Senior Epidemiologist',
  roleTagVariant: 'green',
  subtitle: 'GlobalHealth Corp · Nairobi, Kenya · Session 1 of 1',
  reference: 'ALN-2025-0014',
  alignmentFee: ALIGNMENT_FEE_AMOUNT,
  session: [
    { label: 'Session type', value: '1st additional alignment session' },
    { label: 'Date conducted', value: 'March 5, 2025 · 03:00 PM EAT' },
    { label: 'Duration', value: '61 minutes' },
    {
      label: 'Alignment fee',
      value: '$150.00 · Ref #ALN-2025-0014',
      valueClassName: 'text-[#D97706]',
    },
    { label: 'Job role', value: 'Senior Epidemiologist – GlobalHealth Corp' },
    { label: 'Location', value: 'Nairobi, Kenya · Remote eligible · Global South' },
    {
      label: 'Escrow held (role)',
      value: '$10,500 · Range $60k–$80k · Midpoint $70k',
    },
  ],
  psychometric: {
    scoreTitle: 'Overall Score',
    score: 91,
    scoreColorClass: 'text-[#0047CC]',
    statusTag: '✓ Exceptional',
    testInfoTitle: 'Test Info',
    testInfoLines: [
      'Mar 2, 2025 · 38 min',
      'Norm: Epidemiology professionals',
      'Provider: VORA Assessment Engine',
    ],
    domains: [
      {
        label: 'Abstract Reasoning',
        value: 95,
        description:
          'Top 4% globally. Flawless performance on matrix pattern completion and inductive series — critical for epidemiological pattern recognition.',
        barColor: 'primary',
      },
      {
        label: 'Numerical Reasoning',
        value: 93,
        description:
          'Exceptional. All rate-based and proportion problems solved correctly. Near-perfect score in compound statistical inference.',
        barColor: 'primary',
      },
      {
        label: 'Verbal Reasoning',
        value: 87,
        description:
          'Strong technical reading comprehension; slight penalty on ambiguous inference questions.',
        barColor: 'success',
      },
      {
        label: 'Conscientiousness',
        value: 92,
        description:
          'Extremely high self-regulation and goal orientation. Consistent with epidemiology role demands.',
        barColor: 'primary',
      },
      {
        label: 'Working Memory',
        value: 89,
        description:
          'High multi-variable retention. Handles complex cohort tracking and confounding variable management with ease.',
        barColor: 'success',
      },
      {
        label: 'Analytical Thinking',
        value: 94,
        description:
          'Top 6% in cohort. Deconstructed all multi-step analytical problems correctly. Strong on systems causal chain mapping.',
        barColor: 'primary',
      },
    ],
  },
  sjt: {
    scoreTitle: 'SJT Score',
    score: 86,
    scoreColorClass: 'text-[#2CA62C]',
    statusTag: '✓ Strong Pass',
    testInfoTitle: 'Test Info',
    testInfoLines: ['Mar 3, 2025 · 20 scenarios', 'Epidemiology & Disease Surveillance domain'],
    domains: [
      {
        label: 'Outbreak Investigation Protocol',
        value: 94,
        description:
          'Correctly executed line listing, source identification, and case definition steps in all 4 outbreak simulations. Cited EpiInfo and REDCAP without prompting.',
        barColor: 'primary',
      },
      {
        label: 'Data Ethics & Confidentiality',
        value: 88,
        description:
          'Correctly applied GDPR/HIPAA equivalents in all cross-border data sharing scenarios. Flagged consent gaps that many candidates missed.',
        barColor: 'primary',
      },
      {
        label: 'Cross-Sector Communication',
        value: 82,
        description:
          'Good translation of technical findings to non-specialist audiences. Some over-reliance on technical jargon in ministry briefing.',
        barColor: 'success',
      },
      {
        label: 'Resource Allocation Under Uncertainty',
        value: 79,
        description:
          'Sound decisions but slightly conservative in ambiguous supply chain scenarios. Development opportunity noted.',
        barColor: 'success',
      },
    ],
  },
  video: {
    scoreTitle: 'Video Score',
    score: 84,
    scoreColorClass: 'text-[#7C3AED]',
    statusTag: '✓ Strong Pass',
    testInfoTitle: 'Session Info',
    testInfoLines: ['Mar 4, 2025 · 32 min · 5 questions', 'AI + human review · HD recorded'],
    breakdownTitle: 'Question-by-Question',
    videoCaption: 'Priya Sharma – Full Session · 32:07 · Mar 4, 2025',
    videoScoreLabel: 'Score: 84/100',
    domains: [
      {
        label: 'Q1: Describe your most significant epidemiological investigation',
        value: 91,
        description:
          'Outstanding. Described Rift Valley Fever cluster investigation in Nakuru County — specific, detailed, methodologically sound.',
        barColor: 'primary',
      },
      {
        label: 'Q2: How do you handle conflicting surveillance data across sites?',
        value: 87,
        description:
          'Clear data reconciliation framework described with real DHIS2 example. Acknowledged limits of passive surveillance.',
        barColor: 'primary',
      },
      {
        label: 'Q3: What global health surveillance systems do you have experience with?',
        value: 89,
        description:
          'Named WHO GOARN, GHSA, AfricaCDC IDSR, DHIS2, EpiInfo, OpenMRS. Deep operational familiarity evident.',
        barColor: 'primary',
      },
      {
        label: 'Q4: How would you approach building capacity in a weak surveillance system?',
        value: 76,
        description:
          'Competent but slightly formulaic. Answer relied on standard WHO APSED/IDSR frameworks without enough local adaptation.',
        barColor: 'success',
      },
      {
        label: 'Q5: Why GlobalHealth Corp and this role specifically?',
        value: 78,
        description: 'Adequate research conducted on the organisation. Slightly generic motivation.',
        barColor: 'success',
      },
    ],
  },
  overall: {
    scoreCards: [
      {
        label: 'Psychometric',
        score: 91,
        scoreColorClass: 'text-[#0047CC]',
        tagLabel: 'Exceptional',
        tagVariant: 'blue',
        cardClassName: 'bg-[#EBF6FF] border-[#387DFF]/20',
      },
      {
        label: 'SJT',
        score: 86,
        scoreColorClass: 'text-[#2CA62C]',
        tagLabel: 'Pass',
        tagVariant: 'green',
        cardClassName: 'bg-[#EEFBEE] border-[#2CA62C]/20',
      },
      {
        label: 'Video',
        score: 84,
        scoreColorClass: 'text-[#7C3AED]',
        tagLabel: 'Pass',
        tagVariant: 'purple',
        cardClassName: 'bg-[#F5F3FF] border-[#7C3AED]/20',
      },
    ],
    compositeScore: 88,
    weightingNote: 'Weighted: Psychometric 35% · SJT 40% · Video 25%',
    recommendation: {
      body: 'Priya Sharma is an exceptional candidate — composite 88/100, ranking in the top 8% of all epidemiologists assessed on VORA. Her psychometric scores reflect rare analytical capacity.',
      variant: 'green',
    },
  },
};

export const PENDING_ALIGNMENT_CANDIDATES = [AMARA_CANDIDATE, PRIYA_CANDIDATE];

export const HISTORICAL_ALIGNMENT_SESSIONS: HistoricalAlignmentSession[] = [
  {
    id: 'yusuf',
    name: 'Dr. Yusuf Ibrahim',
    initials: 'YI',
    avatarClassName: 'bg-[#EEFBEE] text-[#1D871D]',
    roleTitle: 'Infectious Disease Specialist',
    roleTagVariant: 'blue',
    summaryLine: 'Hired · Mar 1, 2025 · $150 alignment fee fully refunded · #ALN-2025-0012',
    statusTag: { label: 'Hired · Refunded', variant: 'green' },
    scores: [
      { label: 'Psychometric', score: 78, scoreColorClass: 'text-[#0047CC]' },
      { label: 'SJT', score: 80, scoreColorClass: 'text-[#2CA62C]' },
      { label: 'Video', score: 76, scoreColorClass: 'text-[#7C3AED]' },
    ],
    paragraphs: [
      {
        label: 'Why he passed:',
        text: 'Psychometric showed strong clinical reasoning (82/100) and conscientiousness (79). SJT: correctly managed all 3 infectious disease triage scenarios. Video: presented a compelling narrative on his PEPFAR-funded HIV programme.',
      },
      {
        label: 'Outcome:',
        text: 'Hired on Mar 1, 2025. Offer letter issued immediately. $150 alignment fee refunded to wallet within 3 minutes of hire confirmation. Final salary declared: $66,000.',
      },
    ],
  },
  {
    id: 'kofi',
    name: 'Dr. Kofi Mensah',
    initials: 'KM',
    avatarClassName: 'bg-[#FEF2F2] text-[#DC2626]',
    roleTitle: 'Biostatistician',
    roleTagVariant: 'red',
    summaryLine: '⚠ Rejected · Fee Forfeited · Account Flagged (1/3) · Feb 25, 2025',
    summaryLineClassName: 'text-[#DC2626]',
    statusTag: { label: 'Forfeited · Flagged', variant: 'red' },
    borderClassName: 'border-red-200',
    determination: {
      body: 'Rejection reason "Personal fit" was deemed invalid without supporting documentation. $150 fee forfeited. Candidate Dr. Kofi Mensah compensated. 1 of 3 warnings issued.',
      variant: 'red',
    },
    scores: [
      {
        label: 'Psychometric',
        score: 83,
        scoreColorClass: 'text-[#0047CC]',
        statusTag: { label: 'Pass', variant: 'blue' },
      },
      {
        label: 'SJT',
        score: 77,
        scoreColorClass: 'text-[#DC2626]',
        statusTag: { label: 'Below 80', variant: 'red' },
      },
      {
        label: 'Video',
        score: 74,
        scoreColorClass: 'text-[#DC2626]',
        statusTag: { label: 'Below 80', variant: 'red' },
      },
    ],
    paragraphs: [
      {
        label: 'Assessment result:',
        text: 'Psychometric 83/100 — passed. SJT 77/100 — below threshold. Video 74/100 — below threshold. Rejection on undocumented "personal fit" grounds was reviewed as invalid.',
      },
      {
        label: 'Employer rejection reason:',
        text: '"Personal fit — not the right cultural match for our team."',
      },
      {
        label: 'VORA review:',
        text: 'Reason is subjective, unsubstantiated. Fee of $150 forfeited to VORA. Candidate compensated. Account flagged.',
      },
    ],
  },
  {
    id: 'adaeze',
    name: 'Dr. Adaeze Nwosu',
    initials: 'AN',
    avatarClassName: 'bg-[#FFFBEB] text-[#92400E]',
    roleTitle: 'Maternal Health Specialist',
    roleTagVariant: 'yellow',
    summaryLine: 'Rejected · Valid reason · $150 fully refunded · Feb 14, 2025 · #ALN-2025-0007',
    statusTag: { label: 'Rejected · Refunded', variant: 'gray' },
    borderClassName: 'border-[#2CA62C]/30',
    determination: {
      body: "Rejection accepted as valid. Documented evidence confirmed the candidate's salary expectation ($72,000) exceeded the budgeted ceiling ($64,000) — a factual mismatch. $150 refunded.",
      variant: 'green',
    },
    scores: [
      {
        label: 'Psychometric',
        score: 76,
        scoreColorClass: 'text-[#DC2626]',
        statusTag: { label: 'Below 80', variant: 'red' },
      },
      {
        label: 'SJT',
        score: 72,
        scoreColorClass: 'text-[#DC2626]',
        statusTag: { label: 'Below 80', variant: 'red' },
      },
      {
        label: 'Video',
        score: 73,
        scoreColorClass: 'text-[#DC2626]',
        statusTag: { label: 'Below 80', variant: 'red' },
      },
    ],
    paragraphs: [
      {
        label: 'Context:',
        text: 'Dr. Nwosu scored below the threshold on all assessments. Rejection was on salary grounds, which is a valid documented reason. Factual constraint mismatch was documented.',
      },
    ],
  },
];
