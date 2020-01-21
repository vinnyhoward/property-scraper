const schedule = require('node-schedule');

const jobs = {};
export const scheduleJob = (name, spec, func) => {
  let promise = null;
  const job = jobs[name];
  console.log({spec, job: name}, 'JOB_SCHEDULED');

  if (!job) {
    jobs[name] = schedule.scheduleJob(spec, async () => {
      if (!promise) {
        promise = func();

        if (promise.then) {
          console.log({job: name}, 'JOB_IN_CYCLE');
          promise
            .then(() => {
              promise = null;
            })
            .catch(e => {
              console.error(e, 'ERROR_IN_JOB');
              promise = null;
            });
        }
      }
    });
  }
};

export const cancelJob = name => {
  const job = jobs[name];

  if (job) {
    job.cancel();
  }
};

