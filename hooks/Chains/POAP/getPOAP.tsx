import { useAsync } from "react-use";

export const findPOAPMetaData = (event_id) => {
  const POAPMetaData = useAsync(async () => {
    const response = await fetch(`https://api.poap.xyz/events/id/${event_id}`, {
      method: "GET",
    });
    let data = await response.json();
    console.log("data", data);
    return data;
  }, [event_id]);

  return POAPMetaData;
};
