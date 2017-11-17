module.exports = {
  streamName: process.env.STREAM_NAME || 'rabblerouser_stream',
  listenerAuthToken: process.env.LISTENER_AUTH_TOKEN || 'secret',
  archiveBucket: process.env.ARCHIVE_BUCKET || 'rr-mail-archive',

  region: process.env.AWS_REGION || 'ap-southeast-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'fake',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'also-fake',

  kinesisEndpoint: process.env.KINESIS_ENDPOINT,
  s3Endpoint: process.env.S3_ENDPOINT,
};
