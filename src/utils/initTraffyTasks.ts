type TraffyTask = {
  id: string;
  title: string;
  image_url: string | null;
  link: string;
};

export const initTraffyTasks = (
  traffyTasksVal: HTMLElement | null,
  onReward: (signedToken: string, id: string) => void,
  onReject: () => void
) => {
  if (traffyTasksVal && window.Traffy) {
    function onTaskLoad(tasks: TraffyTask[]) {}
    function onTaskRender(
      changeReward: (str: string) => void,
      changeCardTitle: (str: string) => void,
      changeDescription: (str: string) => void,
      changeButtonCheckText: (str: string) => void
    ) {
      changeReward("15");
      changeCardTitle("Subscribe on: ");
      changeButtonCheckText("Check");
    }
    function onTaskReward(task: TraffyTask, signedToken: string) {
      onReward(signedToken, task.id);
    }
    function onTaskReject(task: TraffyTask) {
      onReject();
    }
    window.Traffy.renderTasks(traffyTasksVal, {
      max_tasks: 3,
      onTaskLoad,
      onTaskRender,
      onTaskReward,
      onTaskReject,
    });
  }
};
