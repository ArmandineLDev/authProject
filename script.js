const fs = require("fs");
const path = require("path");

function extractFeaturesFromFile(filePath) {
  const features = [];
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  lines.forEach((line) => {
    if (line.trim().toLowerCase().includes("feature:")) {
      features.push(line.trim());
    }
  });
  return features;
}

function generateMarkdown(features, outputFile) {
  const markdownContent = ["# Liste des Fonctionnalités\n"];
  features.forEach((feature) => {
    markdownContent.push(`- ${feature}`);
  });
  fs.writeFileSync(outputFile, markdownContent.join("\n"), "utf-8");
}

function main() {
  const projectDir = "."; // Répertoire du projet
  const outputFile = "features.md";
  const allFeatures = [];

  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (file.endsWith(".js")) {
        const features = extractFeaturesFromFile(filePath);
        allFeatures.push(...features);
      }
    });
  }

  walkDir(projectDir);
  generateMarkdown(allFeatures, outputFile);
}

main();
