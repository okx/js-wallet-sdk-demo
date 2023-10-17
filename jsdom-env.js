const { TextEncoder, TextDecoder } = require("util");
const JSDOMBase = require("jest-environment-jsdom");

Object.defineProperty(exports, "__esModule", {
  value: true,
});

class JSDOMEnvironment extends JSDOMBase {
  constructor(...args) {
    const { global } = super(...args);
    global.TextEncoder = TextEncoder;
    global.TextDecoder = TextDecoder;
    global.Uint8Array = Uint8Array;
  }
}

exports.default = JSDOMEnvironment;
