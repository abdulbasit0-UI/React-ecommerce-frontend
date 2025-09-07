import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MailCheck, MailX, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { verifyEmail } from '../../store/slices/authSlice';

export default function EmailVerification() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      verifyEmailToken();
    } else {
      setStatus('error');
    }
  }, [token]);

  const verifyEmailToken = async () => {
    try {
      await dispatch(verifyEmail(token!)).unwrap();
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'loading') {
    return (
      <div className="text-center space-y-4">
        <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto" />
        <h2 className="text-2xl font-semibold">Verifying your email...</h2>
        <p className="text-gray-600">Please wait while we verify your email address.</p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="text-center space-y-4">
        <div className="bg-green-100 dark:bg-green-900 rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center">
          <MailCheck className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Email Verified!</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Your email has been successfully verified. You can now login to your account.
        </p>
        <Button asChild className="w-full">
          <Link to="/login">Go to Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="text-center space-y-4">
      <div className="bg-red-100 dark:bg-red-900 rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center">
        <MailX className="h-10 w-10 text-red-600 dark:text-red-400" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Verification Failed</h2>
      <p className="text-gray-600 dark:text-gray-400">
        The verification link is invalid or has expired. Please try again or contact support.
      </p>
      <div className="space-y-2">
        <Button asChild variant="outline" className="w-full">
          <Link to="/register">Register Again</Link>
        </Button>
        <Button asChild className="w-full">
          <Link to="/login">Go to Login</Link>
        </Button>
      </div>
    </div>
  );
}