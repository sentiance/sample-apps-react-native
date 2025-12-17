// Blocks installation of known compromised packages from a maintained CSV list.
// Source list:
// https://raw.githubusercontent.com/wiz-sec-public/wiz-research-iocs/refs/heads/main/reports/shai-hulud-2-packages.csv

const { execSync } = require('child_process');

const COMPROMISED_PACKAGES_URL =
  'https://raw.githubusercontent.com/wiz-sec-public/wiz-research-iocs/refs/heads/main/reports/shai-hulud-2-packages.csv';

const COMPROMISED_PACKAGES = loadCompromisedPackages();

/**
 * Hook: called for every package before it is written to the lockfile.
 */
function readPackage(pkg) {
  const blockedVersions = COMPROMISED_PACKAGES.get(pkg.name);
  if (blockedVersions && blockedVersions.includes(pkg.version)) {
    throw new Error(
      `Installation aborted: blocked dependency "${pkg.name}@${pkg.version}" found in the dependency tree.`
    );
  }
  return pkg;
}

/**
 * Parse CSV like:
 *   babel-preset-kinvey-flex-service,= 0.1.1
 *   barebones-css,= 1.1.3 || = 1.1.4
 *
 * into Map<name, string[]>
 */
function parseCompromisedPackages(csv) {
  const map = new Map();

  csv
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .forEach((line) => {
      const [rawName, rawVersions] = line.split(',');
      if (!rawName || !rawVersions) return;

      const name = rawName.trim();
      const versions = rawVersions
        .split('||')
        .map((v) =>
          v
            .trim()               // remove whitespace
            .replace(/^=\s*/, '') // strip leading "= " or "="
        )
        .filter(Boolean);

      if (name && versions.length) {
        map.set(name, versions);
      }
    });

  return map;
}

function loadCompromisedPackages() {
  try {
    const csv = execSync(
      `curl -fsSL "${COMPROMISED_PACKAGES_URL}"`,
      { encoding: 'utf8' }
    );
    return parseCompromisedPackages(csv);
  } catch (err) {
    console.error(
      '[pnpmfile] Error: could not load compromised packages list:',
      err.message
    );
    // Fail closed: if we cannot fetch the list, we abort install.
    throw err;
  }
}

module.exports = {
  hooks: {
    readPackage,
  },
};
