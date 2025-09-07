import AuthLayout from '../components/layout/AuthLayout';
import LoginForm from '../components/auth/LoginForm';
import SEO from '../components/seo/SEO';

export default function Login() {
  return (
    <>
      <SEO
        title="Login - Sign In to Your Account"
        description="Sign in to your account to access your orders, wishlist, and personalized shopping experience. Secure login with fast checkout."
        keywords="login, sign in, account, ecommerce, secure login, user account"
        url="/login"
        noindex={true}
      />
      <AuthLayout
        title="Welcome back"
        subtitle="Enter your credentials to access your account"
      >
        <LoginForm />
      </AuthLayout>
    </>
  );
}