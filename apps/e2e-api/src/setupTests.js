if (process.env.STAGE === 'production') {
  throw new Error('DO NOT RUN TESTS AGAINST PROD ENVIRONMENT');
}
