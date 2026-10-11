import fs from "node:fs";
import path from "node:path";

// src/content/members/*.json を読み込み、ファイル名をIDとして配列にする
export default function () {
  const dir = "src/content/members";
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => ({ id: path.basename(f, ".json"), ...JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) }))
    .sort((a, b) => a.gradYear - b.gradYear || a.name.localeCompare(b.name, "ja"));
}
