import { useState } from "react";

export const useFetching = (
  callback: any,
): [(...args: any[]) => void, boolean, string] => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetching = async (...args: any[]) => {
    try {
      setIsLoading(true);
      await callback(...args);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
};
