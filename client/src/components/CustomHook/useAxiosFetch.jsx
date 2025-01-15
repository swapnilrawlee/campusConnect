import { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

const useAxiosFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // To avoid state updates on unmounted components
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(url);
        if (isMounted) {
          setData(response.data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setData(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Clean up the effect to avoid memory leaks
    };
  }, [url]);

  return { data, loading, error };
};

export default useAxiosFetch;
