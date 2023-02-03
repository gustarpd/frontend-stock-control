import { SetStateAction, useCallback, useState } from "react";
import { api } from "../lib/axios";

interface RequestProps {
  endpoint: string;
  data: unknown;
}

function useRequest(endpoint: string, data: unknown) {
  const [RequestData, setData] = useState<any[]>();
  const [error, setError] = useState<any>();

  async function PostRequest() {
    useCallback(() => {
      try {
        api
          .post(endpoint, data)
          .then((res) => res.data)
          .then((res) => setData(res));
      } catch (error) {
        setError(error);
      }
    }, []);
  }

  return { RequestData, error, PostRequest };
}

export default useRequest