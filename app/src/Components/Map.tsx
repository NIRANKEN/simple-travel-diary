import Iframe from "react-iframe";

type MapProps = {
  placeName: string;
};

export const Map: React.FC<MapProps> = ({ placeName }) => {
  // 出てくる図がかなり拡大されているので、もう２段階くらい縮小したものがよい
  // 地図自体のサイズ調整をする。
  const gmapApiKey: string = process.env.REACT_APP_GMAP_KEY || "";
  return (
    <>
      <Iframe
        title="GoogleMap embed"
        url={getUrl(gmapApiKey || "", placeName)}
        width="100%"
        height="100%"
        loading="lazy"
        // referrerpolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </>
  );
};

const getUrl = (key: string, query: string): string => {
  // validation

  // replace for query
  //query = query.replace(" ", ","); // all spaces to ,

  return `https://www.google.com/maps/embed/v1/place?key=${key}
    &q=${query}`;
};
