import fs from "node:fs";
export default () => JSON.parse(fs.readFileSync("src/content/relay.json", "utf8"));
