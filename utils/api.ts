import { api_host } from "../config/config";
import { useState, useEffect } from "react";
import axios, { CancelTokenSource } from "axios";

const token: string = process.env.REACT_APP_TOKEN as string;

export default function prsApi<T>(
  url: string,
  ID: string
): { response: T | null; error: Error | null | string } {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError]: [string, (error: string) => void] = useState("");
  const [loading, setLoading]: [
    boolean,
    (loading: boolean) => void
  ] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async (): Promise<void> => {
      try {
        const res = await axios(`${api_host}${url}${ID}`, {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 5000,
        });
        setResponse(res.data);
        console.log(res.data);
      } catch (err: any) {
        const error = axios.isCancel(err)
          ? "Request Cancelled"
          : err.code === "ECONNABORTED"
          ? "A timeout has occurred"
          : err.response.status === 404
          ? "Page not found"
          : "An unerxpected error has occurred";
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
    setLoading(false);
  }, [url]);

  return { response, error };
}
