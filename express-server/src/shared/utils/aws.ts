import AWS from 'aws-sdk';
import config from '../../config';

export const s3 = new AWS.S3({
  accessKeyId: config.AWS.accessKeyId,
  secretAccessKey: config.AWS.secretAccessKey,
  region: config.AWS.region,
});
