const encryptionMap = {
  A: "~",
  B: "!",
  C: "@",
  D: "#",
  E: "$",
  F: "%",
  G: "^",
  H: "&",
  I: "*",
  J: "(",
  K: ")",
  L: "-",
  M: "_",
  N: "=",
  O: "+",
  P: "X",
  Q: "Z",
  R: "{",
  S: "}",
  T: "[",
  U: "]",
  V: ":",
  W: ";",
  X: "B",
  Y: "|",
  Z: "`",
};

const decryptionMap = {
  "~": "A",
  "!": "B",
  "@": "C",
  "#": "D",
  '$': "E",
  "%": "F",
  "^": "G",
  "&": "H",
  "*": "I",
  "(": "J",
  ")": "K",
  "-": "L",
  '_': "M",
  "=": "N",
  "+": "O",
  'X': "P",
  'Z': "Q",
  "{": "R",
  "}": "S",
  "[": "T",
  "]": "U",
  ":": "V",
  ";": "W",
  "B": "X",
  "|": "Y",
  "`": "Z",
};

export const encryptText = (text) => {
  let encryptedText = "";
  for (let i = 0; i < text.length; i++) {
    const char = text.toUpperCase()[i];
    const encryptedChar = encryptionMap[char] || char;
    encryptedText += encryptedChar;
  }
  return encryptedText;
};

export const decryptText = (encryptedText) => {
  let decryptedText = "";
  for (let i = 0; i < encryptedText.length; i++) {
    const char = encryptedText.toUpperCase()[i];
    const decryptedChar = decryptionMap[char] || char;
    decryptedText += decryptedChar;
  }
  return decryptedText;
};
