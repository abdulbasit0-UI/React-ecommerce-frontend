import AuthLayout from '../components/layout/AuthLayout';
import LoginForm from '../components/auth/LoginForm';

export default function Login() {
  return (
    <>
      
      <title>Login</title>
      <meta
        name="description"
        content="Sign in to your account to start shopping. Secure login with easy access, fast shipping, and personalized recommendations."
        />
      <meta name="keywords" content="login, sign in, account access, secure login, online shopping" />
      <meta name="url" content="/login" />
      <meta name="type" content="website" />
      <meta name="robots" content="noindex" />
      <AuthLayout
        title="Welcome back"
        subtitle="Enter your credentials to access your account"
      >
        <LoginForm />
      </AuthLayout>
    </>
  );
}