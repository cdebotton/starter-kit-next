/* @flow */

export const ENV: string = (process.env.NODE_ENV || 'development').trim();
export const DEV: boolean = ENV === 'development';
export const PROD: boolean = ENV === 'production';
export const PORT: number = parseInt(process.env.PORT || 3000, 10);

const devPortString: ?string = process.env.DEV_PORT;
let devPort: number;
if (devPortString) {
  devPort = parseInt(devPortString, 10);
} else {
  devPort = PORT + 1;
}

export const DEV_PORT = devPort;

const debugString = (process.env.DEBUG || '').trim();
const matches = debugString.match(/^(.+)[^*]/) || [];
export const DEBUG_TARGET: string = matches[0] || 'bu-starter-kit-app';
