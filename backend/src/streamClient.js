const createClient = require('@rabblerouser/stream-client');
const config = require('./config');
const logger = require('./logger');

module.exports = createClient({
  publishToStream: config.streamName,
  listenWithAuthToken: config.listenerAuthToken,
  readArchiveFromBucket: config.archiveBucket,

  region: config.region,
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,

  kinesisEndpoint: config.kinesisEndpoint,
  s3Endpoint: config.s3Endpoint,

  logger,
});
