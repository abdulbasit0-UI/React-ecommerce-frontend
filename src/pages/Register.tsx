import AuthLayout from '../components/layout/AuthLayout';
import RegisterForm from '../components/auth/RegisterForm';
export default function Register() {
  return (
    <>
      <title>Create Account - Join Our Store</title>
      <meta name="description" content="Create your account to start shopping. Join thousands of satisfied customers with exclusive deals, fast shipping, and personalized recommendations." />
      <meta name="keywords" content="register, create account, sign up, join, ecommerce, new user, exclusive deals" />
      <meta name="url" content="/register" />
      <meta name="noindex" content="true" />
      <AuthLayout
        title="Create an account"
        subtitle="Join thousands of shoppers on our platform"
      >
        <RegisterForm />
      </AuthLayout>
    </>
  );
}