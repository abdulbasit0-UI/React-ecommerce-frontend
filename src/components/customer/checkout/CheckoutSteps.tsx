import { CheckCircle } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface CheckoutStepsProps {
  currentStep: number;
}

const steps = [
  { id: 1, name: 'Shipping Information', description: 'Enter your shipping details' },
  { id: 2, name: 'Payment Method', description: 'Choose how to pay' },
  { id: 3, name: 'Review & Confirm', description: 'Review and place order' },
];

export default function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={cn(
              stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '',
              'relative'
            )}
          >
            <div className="flex items-center">
              {currentStep > step.id ? (
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
              ) : currentStep === step.id ? (
                <div className="h-8 w-8 rounded-full border-2 border-primary flex items-center justify-center">
                  <span className="text-primary font-semibold">{step.id}</span>
                </div>
              ) : (
                <div className="h-8 w-8 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400">{step.id}</span>
                </div>
              )}
              
              {stepIdx !== steps.length - 1 && (
                <div
                  className={cn(
                    'absolute top-4 left-8 -ml-px mt-0.5 h-0.5 w-full',
                    currentStep > step.id ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                  )}
                />
              )}
            </div>
            
            <div className="mt-2 min-w-0">
              <h3 className={cn(
                'text-sm font-medium',
                currentStep >= step.id ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
              )}>
                {step.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}