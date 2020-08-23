declare const VERSION: string;
declare const COMMITHASH: string;
declare const BRANCH: string;

declare module '*.png' {
  const content: string;
  export default content;
}
