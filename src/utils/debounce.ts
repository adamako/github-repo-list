export default function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
) {
  let timerId: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
