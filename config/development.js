module.exports = {
  awsEndpoint: process.env.AWS_ENDPOINT || "http://localhost:8000",
  awsRegion: process.env.AWS_REGION || "us-east-1",
  awsTableName: process.env.AWS_TABLE_NAME || "test",
  accessKeyId: process.env.ACCESS_KEY_ID, 
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  mailApiKey: process.env.MAIL_API_KEY,
  mailDomain: process.env.MAIL_DOMAIN,
  environment: 'development',
  port: 4040,
  send_mail: 0  
};