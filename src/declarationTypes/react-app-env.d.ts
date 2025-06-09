/// <reference types="react-scripts" />

declare module "*.mp3" {
  const src: string;
  export default src;
}

// Add type declaration for window.bQuest
declare global {
  interface Window {
    bQuest: any;
    bQuestInstance: any;
  }
}
