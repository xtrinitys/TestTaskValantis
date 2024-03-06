import { RefObject, useEffect, useRef } from "react";

export const useObserver = (
  ref: RefObject<HTMLElement>,
  isLoading: boolean,
  callback: () => void,
  canLoad = true,
) => {
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();

    let cb = function (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver,
    ) {
      if (entries[0].isIntersecting && canLoad) {
        callback();
      }
    };

    observer.current = new IntersectionObserver(cb);
    observer.current.observe(ref.current as HTMLElement);
  }, [isLoading]);
};
