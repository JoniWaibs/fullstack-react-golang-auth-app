import { useState } from "react";
import { HTTP_METHODS } from "../enums";
import { UseRequestProps } from "../types";

/**
 * Client side requests custom hook
 * @param param0 - config to make request
 * @returns
 */
 export const useRequest = ({url, onSucces, method = HTTP_METHODS.GET }: UseRequestProps) => {
  const [error, setError] = useState<any>();

  const doApiRequest = async (body?: object | null) => {
    try {
      const data = await fetch(`${import.meta.env.VITE_API_URL}` + url, {
        body: JSON.stringify(body),
        method,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const response = await data.json();

      if(response.data) {
        onSucces(response.data)
      }
    } catch (error) {
      setError(error)
    }
  }

  return { doApiRequest, error }
}

