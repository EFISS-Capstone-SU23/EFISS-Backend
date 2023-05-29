import Queue from 'bull';
import { config } from '../config/configuration';
import { EmailType } from '../loaders/enums';
import Email from '../mail/email';

export const emailQueue = new Queue('email', `redis://${config.redis.host}:${config.redis.port}`);

emailQueue.process(async (job) => {
  switch (job.data.type) {
    case EmailType.VERIFY_EMAIL: {
      await new Email(job.data.account, job.data.url).sendVerifyEmail();
      break;
    }
    case EmailType.PASSWORD_RESET: {
      await new Email(job.data.account, job.data.url).sendPasswordResetEmail();
      break;
    }
  }
});
