import * as Sentry from '@sentry/react';

export const handleError = (error: unknown, messagePrefix: string) => {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  const fullErrorMessage = `${messagePrefix}: ${errorMessage}`;
  Sentry.captureException(new Error(fullErrorMessage));
};
