import { AdsgramController } from "../types/AdsgramController";

export {};

interface TraffyTask {
  id: string;
  title: string;
  image_url: string | null;
  link: string;
}

interface Traffy {
  renderTasks: (
    element: HTMLElement,
    options: {
      max_tasks: number;
      onTaskLoad: (tasks: TraffyTask[]) => void;
      onTaskRender: (
        changeReward: (str: string) => void,
        changeCardTitle: (str: string) => void,
        changeDescription: (str: string) => void,
        changeButtonCheckText: (str: string) => void
      ) => void;
      onTaskReward: (task: TraffyTask, signedToken: string) => void;
      onTaskReject: (task: TraffyTask) => void;
    }
  ) => Promise<void>;
}

interface Adsgram {
  init: (options: { blockId: string }) => AdsgramController;
}

interface OnClickaMini {
  isInit: boolean;
  goId: (id: string) => void;
}
interface WallgramShowcase {
  init: (
    platformId: string,
    options: {
      container: string;
      onLoad?: () => void;
      onFinishTask?: (task: any) => void;
      onStartTask?: (task: any) => void;
    }
  ) => void;
  show: () => void;
}

declare global {
  interface Window {
    bQuest?: any;
    bQuestInstance?: any;
    Traffy?: Traffy;
    Adsgram?: Adsgram;
    onclickaMini?: OnClickaMini;
    WallgramShowcase?: WallgramShowcase;
    initCdTma?: (options: { id: string }) => Promise<any>;
  }
}
