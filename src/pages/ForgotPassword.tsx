import AuthLayout from '../components/layout/AuthLayout';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';

export default function ForgotPassword() {
  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="No worries, we'll send you reset instructions"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}