import { Link } from 'react-router-dom';
import { Mail, Home } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function EmailVerificationSent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 animate-slide-up">
          <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center mb-6">
            <Mail className="h-10 w-10 text-blue-600 dark:text-blue-400" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Check your email
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
          </p>
          
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Go to Homepage
              </Link>
            </Button>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Didn't receive the email?{' '}
              <Button variant="link" className="p-0 h-auto">
                Resend
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}