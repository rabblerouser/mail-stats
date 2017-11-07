module.exports = {
  streamName: process.env.STREAM_NAME,
  listenerAuthToken: process.env.LISTENER_AUTH_TOKEN,
  archiveBucket: process.env.ARCHIVE_BUCKET,

  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,

  kinesisEndpoint: process.env.KINESIS_ENDPOINT,
  s3Endpoint: process.env.S3_ENDPOINT,
};
