export interface AdsgramController {
  show: () => Promise<{ done: boolean }>;
}
