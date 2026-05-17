import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import { useVerifyOTPMutation, useResendOTPMutation } from '../../services/queries/auth';
import { routeAfterAuth } from '../../utils/auth';

const VerifyOTP: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || { email: 'test@vora.com' };
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [formError, setFormError] = useState('');
  const verifyMutation = useVerifyOTPMutation();
  const resendMutation = useResendOTPMutation();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isComplete = otp.every(digit => digit !== '');

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComplete) return;

    setFormError('');
    try {
      const response = await verifyMutation.mutateAsync({ email, code: otp.join('') });
      const authData = response.data;
      const user = authData?.user;
      
      if (user) {
        const targetRoute = routeAfterAuth(user);
        navigate(targetRoute, { state: { email, accountType: user.role } });
      } else {
        navigate('/dashboard');
      }
    } catch (error: any) {
      setFormError(error?.message || 'Invalid verification code. Please try again.');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    setFormError('');
    try {
      await resendMutation.mutateAsync({ email });
      setTimer(60);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (error: any) {
      setFormError(error?.message || 'Failed to resend verification code. Please try again.');
    }
  };

  return (
    <div className="max-w-xl mx-auto py-12 sm:py-20 px-4 flex flex-col items-center">
      <div className="text-center mb-10 sm:mb-12">
        <h1 className="text-2xl sm:text-[24px] font-medium mb-4 text-[#1C1C1C] leading-[32px] tracking-[-1%] ">
          Verify your email
        </h1>
        <p className="text-[#6B7280] text-sm sm:text-base max-w-sm mx-auto leading-relaxed">
          We've sent a 6-digit verification code to <span className="font-medium text-gray-900">{email}</span>. Enter the code below to verify your email.
        </p>
      </div>

      {formError && (
        <div className="w-full max-w-[480px] mb-6 p-4 bg-red-50 border border-red-100 rounded-lg">
          <p className="text-sm font-medium text-red-600 text-center">{formError}</p>
        </div>
      )}

      <form onSubmit={handleVerify} className="w-full max-w-[480px] space-y-10">
        <div className="flex justify-between gap-2 sm:gap-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-10 h-12 sm:w-16 sm:h-16 text-center text-xl sm:text-2xl font-medium rounded-xl border border-[#E5E7EB] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          ))}
        </div>

        <div className="text-center">
          {timer > 0 ? (
            <p className="text-[#6B7280] text-sm font-medium">
              Resend a new otp in <span className="text-[#0047CC] font-medium">{timer} secs</span>
            </p>
          ) : (
            <Button 
              variant="link"
              onClick={handleResend}
              fullWidth={false}
              isLoading={resendMutation.isPending}
              className="mx-auto text-[#0047CC] text-sm font-medium underline decoration-2 underline-offset-4 hover:bg-transparent hover:text-blue-700 p-0"
            >
              Resend OTP
            </Button>
          )}
        </div>

        <Button 
          variant={isComplete ? 'primary' : 'secondary'}
          type="submit"
          disabled={!isComplete || verifyMutation.isPending}
          isLoading={verifyMutation.isPending}
        >
          Verify email
        </Button>
      </form>
    </div>
  );
};

export default VerifyOTP;
