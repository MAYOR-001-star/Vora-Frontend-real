import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import ProtectedDashboardLayout from './layout/ProtectedDashboardLayout'
import EmployerRoute from './components/auth/EmployerRoute'
import { Toaster } from 'react-hot-toast'
import { defaultToastOptions } from './config/toastOptions'

// Lazy load pages for performance
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Signup = lazy(() => import('./pages/auth/Signup'))
const Login = lazy(() => import('./pages/auth/Login'))
const VerifyOTP = lazy(() => import('./pages/auth/VerifyOTP'))
const EmployerOnboarding = lazy(() => import('./pages/employer/EmployerOnboarding'))
const TalentOnboarding = lazy(() => import('./pages/talent/TalentOnboarding'))
const RoleCvUpload = lazy(() => import('./pages/talent/RoleCvUpload'))
const RoleProfileMatchBuilding = lazy(() => import('./pages/talent/RoleProfileMatchBuilding'))
const RoleProfileMatchResult = lazy(() => import('./pages/talent/RoleProfileMatchResult'))
const RoleEmployerAsks = lazy(() => import('./pages/talent/RoleEmployerAsks'))
const RoleAssessmentIntro = lazy(() => import('./pages/talent/RoleAssessmentIntro'))
const RoleAssessmentSessionInfo = lazy(() => import('./pages/talent/RoleAssessmentSessionInfo'))
const RoleAssessmentJourney = lazy(() => import('./pages/talent/RoleAssessmentJourney'))
const RoleAssessmentSessionPsychometric = lazy(() => import('./pages/talent/RoleAssessmentSessionPsychometric'))
const RoleAssessmentSessionForcedChoice = lazy(() => import('./pages/talent/RoleAssessmentSessionForcedChoice'))
const RoleAssessmentSessionPsychometricValues = lazy(() => import('./pages/talent/RoleAssessmentSessionPsychometricValues'))
const RoleAssessmentSessionSituational = lazy(() => import('./pages/talent/RoleAssessmentSessionSituational'))
const RoleAssessmentSessionCognitive = lazy(() => import('./pages/talent/RoleAssessmentSessionCognitive'))
const RoleAssessmentSessionReading = lazy(() => import('./pages/talent/RoleAssessmentSessionReading'))
const RoleAssessmentSessionComplete = lazy(() => import('./pages/talent/RoleAssessmentSessionComplete'))
const RoleProfileRolesFound = lazy(() => import('./pages/talent/RoleProfileRolesFound'))
const RoleProfileMatchWaitlist = lazy(() => import('./pages/talent/RoleProfileMatchWaitlist'))
const RoleProfileMatchBlocked = lazy(() => import('./pages/talent/RoleProfileMatchBlocked'))
const MentorApply = lazy(() => import('./pages/mentor/MentorApply'))
const MentorProfile = lazy(() => import('./pages/mentor/MentorOnboarding'))
const Welcome = lazy(() => import('./pages/onboarding/Welcome'))
const SelectAccountType = lazy(() => import('./pages/auth/SelectAccountType'))
const Jobs = lazy(() => import('./pages/employer/Jobs'))
const Talents = lazy(() => import('./pages/talent/TalentList'))
const JobDetails = lazy(() => import('./pages/employer/JobDetails'))
const Rejection = lazy(() => import('./pages/employer/Rejection'))
const TalentProfile = lazy(() => import('./pages/talent/TalentProfile'))
const FinalAlignmentSession = lazy(() => import('./pages/employer/FinalAlignmentSession'))
const OnboardingContainer = lazy(() => import('./pages/onboarding/OnboardingContainer'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Settings = lazy(() => import('./pages/Settings'))
const Payments = lazy(() => import('./pages/employer/Payments'))
const VaultRoleConfirmation = lazy(() => import('./pages/employer/VaultRoleConfirmation'))
const EditVaultRole = lazy(() => import('./pages/employer/EditVaultRole'))
const VaultEditReview = lazy(() => import('./pages/employer/VaultEditReview'))
const RoleApplyRoute = lazy(() => import('./components/auth/RoleApplyRoute'))

const JobPostedConfirmation = lazy(() => import('./pages/employer/JobPostedConfirmation'))
const RoleLanding = lazy(() => import('./pages/public/RoleLanding'))
const RoleSignup = lazy(() => import('./pages/auth/RoleSignup'))

const App = () => {
  return (
    <MainLayout>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={defaultToastOptions}
      />
      <Suspense fallback={
        <div className="fixed inset-0 flex justify-center items-center bg-white z-[9999]">
          <div className="w-10 h-10 border-4 border-[#0047CC] border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/role/:slug" element={<RoleLanding />} />
          <Route path="/role/:slug/signup" element={<RoleSignup />} />
          <Route path="/role/:slug/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedDashboardLayout><Dashboard /></ProtectedDashboardLayout>} />
          <Route path="/jobs" element={<ProtectedDashboardLayout><Jobs /></ProtectedDashboardLayout>} />
          <Route path="/jobs/posted/confirmation" element={<ProtectedDashboardLayout><EmployerRoute><JobPostedConfirmation /></EmployerRoute></ProtectedDashboardLayout>} />
          <Route path="/jobs/vault/confirmation" element={<ProtectedDashboardLayout><EmployerRoute><VaultRoleConfirmation /></EmployerRoute></ProtectedDashboardLayout>} />
          <Route path="/jobs/vault/edit/:id" element={<ProtectedDashboardLayout><EmployerRoute><EditVaultRole /></EmployerRoute></ProtectedDashboardLayout>} />
          <Route path="/jobs/vault/review/:id?" element={<ProtectedDashboardLayout><EmployerRoute><VaultEditReview /></EmployerRoute></ProtectedDashboardLayout>} />
          <Route path="/jobs/:id" element={<ProtectedDashboardLayout><EmployerRoute><JobDetails /></EmployerRoute></ProtectedDashboardLayout>} />
          <Route path="/jobs/:id/reject/:applicantId" element={<ProtectedDashboardLayout><EmployerRoute><Rejection /></EmployerRoute></ProtectedDashboardLayout>} />
          <Route path="/jobs/:id/alignment/:candidateId" element={<ProtectedDashboardLayout><EmployerRoute><FinalAlignmentSession /></EmployerRoute></ProtectedDashboardLayout>} />
          <Route path="/payments/*" element={<ProtectedDashboardLayout><EmployerRoute><Payments /></EmployerRoute></ProtectedDashboardLayout>} />
          <Route path="/talents" element={<ProtectedDashboardLayout><Talents /></ProtectedDashboardLayout>} />
          <Route path="/talents/:id" element={<ProtectedDashboardLayout><TalentProfile /></ProtectedDashboardLayout>} />

          {/* Auth Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyOTP />} />
          <Route path="/select-type" element={<SelectAccountType />} />

          {/* Onboarding Routes */}
          <Route path="/onboarding" element={<OnboardingContainer />} />
          <Route path="/onboarding/welcome" element={<Welcome />} />
          <Route path="/onboarding/employer" element={<EmployerOnboarding />} />
          {/* Normal Onboarding Routes */}
          <Route path="/onboarding/talent" element={<TalentOnboarding />} />

          {/* Job-Link Role Apply Routes (Dynamic & Protected) */}
          <Route path="/onboarding/talent/:roleSlug" element={<RoleApplyRoute />}>
            <Route path="cv" element={<RoleCvUpload />} />
            <Route path="match" element={<RoleProfileMatchBuilding />} />
            <Route path="match/result" element={<RoleProfileMatchResult />} />
            <Route path="assessment/asks" element={<RoleEmployerAsks />} />
            <Route path="assessment/journey" element={<RoleAssessmentJourney />} />
            <Route path="assessment/stage-1" element={<RoleAssessmentIntro />} />
            <Route path="assessment/session-1" element={<RoleAssessmentSessionInfo />} />
            <Route path="assessment/session-1/psychometric" element={<RoleAssessmentSessionPsychometric />} />
            <Route path="assessment/session-1/forced-choice" element={<RoleAssessmentSessionForcedChoice />} />
            <Route path="assessment/session-1/psychometric-values" element={<RoleAssessmentSessionPsychometricValues />} />
            <Route path="assessment/session-1/situational" element={<RoleAssessmentSessionSituational />} />
            <Route path="assessment/session-1/cognitive" element={<RoleAssessmentSessionCognitive />} />
            <Route path="assessment/session-1/reading" element={<RoleAssessmentSessionReading />} />
            <Route path="assessment/session-1/complete" element={<RoleAssessmentSessionComplete />} />
            <Route path="match/blocked" element={<RoleProfileMatchBlocked />} />
            <Route path="match/roles" element={<RoleProfileRolesFound />} />
            <Route path="match/waitlist" element={<RoleProfileMatchWaitlist />} />
          </Route>

          <Route path="/onboarding/mentor-apply/profile" element={<MentorProfile />} />
          <Route path="/onboarding/mentor-apply" element={<MentorApply />} />

          <Route path="/settings" element={<ProtectedDashboardLayout><Settings /></ProtectedDashboardLayout>} />

          {/* Wildcard Fallback 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </MainLayout>
  )
}

export default App
