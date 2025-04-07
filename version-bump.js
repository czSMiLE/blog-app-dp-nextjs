/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process');
const fs = require('fs');
const semver = require('semver');

const bumpType = process.argv[2];
if (!['major', 'minor', 'patch'].includes(bumpType)) {
  console.error(
    'Please specify a valid version bump type: major, minor, or patch'
  );
  process.exit(1);
}

try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const currentVersion = packageJson.version;

  const newVersion = semver.inc(currentVersion, bumpType);

  if (!newVersion) {
    throw new Error(
      `Failed to increment version from ${currentVersion} with type ${bumpType}`
    );
  }

  packageJson.version = newVersion;
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2) + '\n');

  execSync('npm run changelog', { stdio: 'inherit' });

  execSync('git add package.json CHANGELOG.md', { stdio: 'inherit' });

  execSync(
    `git commit -m "chore(release): bump version to ${newVersion} and update changelog"`,
    { stdio: 'inherit' }
  );

  console.log(
    `\nSuccessfully bumped version to ${newVersion} and updated changelog`
  );
  console.log('You can now push your changes with: git push');
} catch (error) {
  if (error instanceof Error) {
    console.error('Error during version bump:', error.message);
  } else {
    console.error('Unknown error during version bump');
  }
  process.exit(1);
}
