import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

function readShallowCommits() {
  try {
    const shallowFile = execFileSync("git", ["rev-parse", "--git-path", "shallow"], { encoding: "utf8" }).trim();
    return new Set(existsSync(shallowFile) ? readFileSync(shallowFile, "utf8").split("\n").filter(Boolean) : []);
  } catch {
    return new Set();
  }
}

const shallowCommits = readShallowCommits();
const cache = new Map();

/**
 * Date (YYYY-MM-DD) of the last commit touching any of the given files, or undefined when git
 * history is missing. In a shallow clone the boundary commit looks like it added every file,
 * so its date is not real and is skipped.
 * @param {string[]} files
 * @returns {string | undefined}
 */
export function gitLastmod(files) {
  const key = files.join("|");
  if (!cache.has(key)) {
    let lastmod;
    try {
      const [hash, date] = execFileSync("git", ["log", "-1", "--format=%H %cs", "--", ...files], { encoding: "utf8" }).trim().split(" ");
      lastmod = hash && !shallowCommits.has(hash) ? date : undefined;
    } catch {
      lastmod = undefined;
    }
    cache.set(key, lastmod);
  }
  return cache.get(key);
}
