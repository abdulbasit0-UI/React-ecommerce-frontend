import { useState } from 'react';
import { Mail } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your newsletter subscription logic here
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
    setEmail('');
  };

  return (
    <section className="py-16 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Mail className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Get the latest updates on new products and upcoming sales. Subscribe to our newsletter today!
          </p>
          
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/70 flex-1"
            />
            <Button type="submit" variant="secondary">
              {isSubscribed ? 'Subscribed!' : 'Subscribe'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}