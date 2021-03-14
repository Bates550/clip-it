console.log(process.env.ADDONS_MOZILLA_ORG_JWT_ISSUER);
console.log(process.env.ADDONS_MOZILLA_ORG_JWT_SECRET);

const { exec } = require("child_process");

const apiKey = process.env.ADDONS_MOZILLA_ORG_JWT_ISSUER;
const apiSecret = process.env.ADDONS_MOZILLA_ORG_JWT_SECRET;

//exec(
//  `yarn web-ext sign --api-key=${apiKey} --api-secret=${apiSecret}`,
//  (err, stdout, stderr) => {
//    if (err) {
//      //some err occurred
//      console.error(err);
//    } else {
//      // the *entire* stdout and stderr (buffered)
//      console.log(`stdout: ${stdout}`);
//      console.log(`stderr: ${stderr}`);
//    }
//  }
//);

const { spawn } = require("child_process");
const child = spawn("yarn web-ext sign", [
  `--api-key=${apiKey}`,
  `--api-secret=${apiSecret}`
]);
// use child.stdout.setEncoding('utf8'); if you want text chunks
child.stdout.on("data", chunk => {
  // data from the standard output is here as buffers
  console.log(chunk);
});
// since these are streams, you can pipe them elsewhere
// child.stderr.pipe(dest);
child.on("close", code => {
  console.log(`child process exited with code ${code}`);
});
