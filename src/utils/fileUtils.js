const fs = require("fs/promises");

async function createFileIfNotExists(filename) {
  try {
    await fs.access(filename);
  } catch (error) {
    await fs.writeFile(filename, "[]");
  }
}

module.exports = {
    createFileIfNotExists,
};
