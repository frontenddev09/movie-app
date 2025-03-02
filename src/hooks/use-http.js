import { useCallback, useState } from "react";

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const clearError = () => setError(false);
  const request = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = { "Content-Type": "application-json" }
    ) => {
      try {
        setLoading(true);
        const response = await fetch(url, { method, body, headers });
        if (!response.ok) {
          throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }
        const data = await response.json();
        setLoading(false);
        return data;
      } catch (error) {
        setLoading(false);
        setError(error);
        throw error;
      }
    }
  );
  return { request, loading, error, clearError };
};

export default useHttp;
