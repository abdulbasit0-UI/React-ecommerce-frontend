import AuthLayout from '../components/layout/AuthLayout';
import RegisterForm from '../components/auth/RegisterForm';
import SEO from '../components/seo/SEO';

export default function Register() {
  return (
    <>
      <SEO
        title="Create Account - Join Our Store"
        description="Create your account to start shopping. Join thousands of satisfied customers with exclusive deals, fast shipping, and personalized recommendations."
        keywords="register, create account, sign up, join, ecommerce, new user, exclusive deals"
        url="/register"
        noindex={true}
      />
      <AuthLayout
        title="Create an account"
        subtitle="Join thousands of shoppers on our platform"
      >
        <RegisterForm />
      </AuthLayout>
    </>
  );
}