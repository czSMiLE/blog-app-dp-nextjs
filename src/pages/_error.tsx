import * as Sentry from '@sentry/nextjs';
import Error from 'next/error';

const CustomErrorComponent = ({ statusCode }) => {
  return <Error statusCode={statusCode} />;
};

CustomErrorComponent.getInitialProps = async (contextData) => {
  await Sentry.captureUnderscoreErrorException(contextData);

  return Error.getInitialProps(contextData);
};

export default CustomErrorComponent;
