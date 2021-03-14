const { exec } = require("child_process");

const apiKey = process.env.ADDONS_MOZILLA_ORG_JWT_ISSUER;
const apiSecret = process.env.ADDONS_MOZILLA_ORG_JWT_SECRET;

const child = exec(`yarn web-ext sign --api-key=${apiKey} --api-secret=${apiSecret}`);
// use child.stdout.setEncoding('utf8'); if you want text chunks
child.stdout.on("data", chunk => {
  // data from the standard output is here as buffers
  console.log(chunk);
});

child.stderr.on("data", chunk => {
  // data from the standard error is here as buffers
  console.log(chunk);
});

// since these are streams, you can pipe them elsewhere
// child.stderr.pipe(dest);
child.on("close", code => {
  console.log(`child process exited with code ${code}`);
});
