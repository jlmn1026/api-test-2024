import useSWR from "swr";
import { appApi } from "../api/apiClient";

type Props = {
  filePath?: string;
};

const Image = ({ filePath }: Props) => {
  const { data, error, isLoading } = useSWR(["image", filePath], async () => {
    if (filePath) return (await appApi.appControllerGetImage(filePath)).data;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>error has occurred.</div>;
  }

  if (!data || !data.data) {
    return <div>No Img Data.</div>;
  }

  return (
    <img
      width="100px"
      height="100px"
      src={`data:image/png;base64,${data.data}`}
      style={{ background: "#fff" }}
    />
  );
};

export default Image;
