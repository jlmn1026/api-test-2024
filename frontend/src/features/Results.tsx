import useSWR from "swr";
import { appApi } from "../api/apiClient";
import Image from "./Image";
import { format } from "date-fns";

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
    console.log(result);
    if (!result.responseTimestamp) {
      return <div>InCorrect Data.</div>;
    }

    return (
      <div
        style={{
          padding: "8px",
          margin: "8px",
          backgroundColor: "#777",
          borderRadius: "8px",
          display: "flex",
          width: "600px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>FileName: {result.imagePath}</div>
        <div>
          AnalyzedAt: {format(result.responseTimestamp, "yyyy/MM/dd HH:mm:ss")}
        </div>

        {result.success === "success" ? (
          <>
            <div>Class: {result.class}</div>
            <div>Confidence: {result.confidence}</div>
          </>
        ) : (
          <div>Analysis Failed</div>
        )}
        <Image filePath={`${result.imagePath}`} />
      </div>
    );
  });
};

export default Results;
