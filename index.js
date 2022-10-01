const fs = require("fs");

// const bytes = require("./indexBinary.js");
const bytesList = require("./hex");
const bytes = bytesList();

let fileName;
let fileType;
if (process.argv[2] && process.argv[2] === "read") {
  fileName = "RDbinaryFile.csv";
  fileType = "J2AXI_RD";
} else if (process.argv[2] || process.argv[2] === "write") {
  fileName = "WRbinaryFile.csv";
  fileType = "J2AXI_WR";
}

let readStream = fs.createReadStream("binaryFile.bin");
const writeStream = fs.createWriteStream(fileName);

readStream.on("data", function (chunk) {
  const hexValue = chunk.toString("hex");

  const reverestedHexValue = reverseString(hexValue);

  reverestedHexValue.forEach((value) => {
    writeStream.write(value + "\r\n");
  });
});

function reverseString(arrayOfHex) {
  const hexValue = arrayOfHex.toString("hex");

  const arrayOfHexValue = hexValue.match(/.{1,32}/g);

  // console.log(arrayOfHexValue)
  const arrayOfHexReversed = arrayOfHexValue.map((hexValue, index) => {
    let reversedHexValue = hexValue
      .match(/.{1,2}/g)
      .reverse()
      .join("");

    return `${fileType},40'h20008${bytes[index]},3'h4,128'h${reversedHexValue}`;
  });

  return arrayOfHexReversed;
}
