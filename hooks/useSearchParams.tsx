import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";

// gets a value from any of the provided query string names
export default function useSearchParams(...queryParamNames) {
  const router = useRouter();
  const [state, setState] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    // Get a value from the search params or nextjs path param
    const searchParam = queryParamNames.reduce((acc, x) => acc || searchParams.get(x) || router.query[x], null);
    setState(searchParam);
  }, [router]);

  return state;
}