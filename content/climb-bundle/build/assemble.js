const fs = require("fs");
const path = require("path");

const bodyPath = path.join(__dirname, "body.html");
const lines = fs.readFileSync(bodyPath, "utf8").split("\n");

// Lines 0-11 (1-indexed 1-12) are the auto-generated cover/front-matter block,
// ending right after the first <hr>. Drop them — a custom cover replaces it.
const firstHrIndex = lines.findIndex((l) => l.trim() === "<hr>");
const rest = lines.slice(firstHrIndex + 1).join("\n");

// Force a page break before every remaining top-level heading (Part 1..15, Bonus Pack).
const withBreaks = rest.replace(/<h1>/g, '<h1 class="part-break">');

const cover = `
<section class="cover">
  <div class="cover-frame">
    <p class="cover-kicker">PEAKFORM PRESENTS</p>
    <h1 class="cover-title">THE VALORANT<br>CLIMB SYSTEM</h1>
    <p class="cover-subtitle">A Practical Improvement Guide for Iron to Immortal Players</p>
    <div class="cover-rule"></div>
    <p class="cover-promise">Stop mindlessly queueing ranked.<br>Learn what's actually holding you back — and build a system to fix it.</p>
    <div class="cover-meta">
      <span>£49.99</span>
      <span class="dot">&middot;</span>
      <span>Lifetime Access</span>
    </div>
  </div>
</section>
`;

const template = fs.readFileSync(path.join(__dirname, "template.html"), "utf8");
const final = template.replace("{{COVER}}", cover).replace("{{BODY}}", withBreaks);
fs.writeFileSync(path.join(__dirname, "final.html"), final, "utf8");
console.log("wrote final.html, length", final.length);
