const fs = require("fs");
const outDir = "./dist";
const clearOutDirOnBuild = true;

module.exports = {
  preBuild: function (path) {
    if (clearOutDirOnBuild && fs.existsSync(outDir)) {
      fs.rmSync(outDir, {
        recursive: true,
        force: true,
      });
      fs.mkdir(outDir, () => {});
    }
    replaceInFile(
      path,
      /secrets:.*,/g,
      'secrets: JSON.parse(fs.readFileSync(__dirname + "/../secrets.json")),'
    );
  },

  postBuild: function (path) {
    replaceInFile(path, /secrets:.*,/g, 'secrets: require("./secrets.json"),');
  },
};

function replaceInFile(path, originalMsg, newMsg) {
  const configFile = fs.readFileSync(path, "utf8");
  const result = configFile.replace(originalMsg, newMsg);
  //console.log(`Resulting file: \n\n${result}\n\n`);
  fs.writeFileSync(path, result, "utf8");
}
