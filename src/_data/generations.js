import members from "./members.js";
import site from "./site.js";

// メンバーの卒業年度から「代」の一覧を自動生成（新しい代を追加するとページも自動で増える）
export default function () {
  const years = [...new Set(members().map((m) => Number(m.gradYear)))].sort((a, b) => a - b);
  return years.map((y) => ({ gradYear: y, gen: y - site.firstGradYear + 1, label: `${String(y).slice(-2)}卒` }));
}
