import React from 'react';
import Button from './Button';

const EmptyState = ({
  icon: IconComponent,
  headline,
  body,
  ctaText,
  ctaAction,
  className = '',
}) => {
  return (
    <div
      className={`
        flex flex-col items-center justify-center
        text-center py-16 px-6
        ${className}
      `}
    >
      {/* Icon */}
      {IconComponent && (
        <div className="mb-8">
          <IconComponent className="w-16 h-16 text-gold-functional opacity-70" />
        </div>
      )}

      {/* Headline */}
      <h2 className="font-display text-h2 text-text-high mb-4">
        {headline}
      </h2>

      {/* Body Copy */}
      <p className="font-ui text-text-medium text-body max-w-sm mb-8">
        {body}
      </p>

      {/* CTA Button */}
      {ctaText && ctaAction && (
        <Button
          variant="primary"
          size="md"
          onClick={ctaAction}
        >
          {ctaText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
