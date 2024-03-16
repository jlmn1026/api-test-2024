import useSWR from "swr";
import { appApi } from "../api/apiClient";
import Image from "./Image";

const Results = () => {
  const { data, error, isLoading } = useSWR("latest-results", async () => {
    return (await appApi.appControllerGetLatestResults()).data;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>error has occurred.</div>;
  }

  if (!data || data.length === 0) {
    return <div>No Data.</div>;
  }

  return data.map((result) => {
    return (
      <>
        <div>FilePath: {result.imagePath}</div>
        <div>AnalysisAt: {result.responseTimestamp}</div>
        <div>Image</div>
        <Image filePath={`${result.imagePath}`} />
      </>
    );
  });
};

export default Results;
