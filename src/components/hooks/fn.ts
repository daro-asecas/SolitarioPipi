export const run_all = (fns: Array<() => void>) => {
    for(const fn of fns) fn();
  }