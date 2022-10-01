const fs = require("fs");
const hex = require("./hexReader.js");
const binary = fs.readFileSync("binaryFile.bin");
hex(binary);

function readBinaryFile() {
  const readBinaryFile = fs.readFileSync("binFileToString.txt", "utf8");
  const offSetBinList = [];


  const binaryList = [];
  readBinaryFile
    .toString()
    .split(/\r?\n/)
    .forEach((line) => {
      binaryList.push(line.split(" "));
    });

  const transformOffSetBinToString = binaryList.map((data) => {
    return data[0]
      .replaceAll("\x1B", "")
      .replace("[36m", "")
      .replace("[0m", "");
  });

  transformOffSetBinToString.forEach((data, index) => {
    offSetBinList.push(data);
  });
  offSetBinList.splice(0, 2);
  return offSetBinList;
}
module.exports = readBinaryFile;
