import EmailVerification from '@/components/auth/EmailVerifications';
import AuthLayout from '../components/layout/AuthLayout';

export default function EmailVerificationPage() {
  return (
    <AuthLayout title="Email Verification">
      <EmailVerification />
    </AuthLayout>
  );
}