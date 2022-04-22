import ContentLoader from "react-content-loader";

const Loader = () => {
  return (
    <ContentLoader
      speed={2}
      width={220}
      height={260}
      viewBox="0 0 210 260"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="12" ry="12" width="150" height="90" />
      <rect x="0" y="110" rx="8" ry="8" width="150" height="15" />
      <rect x="0" y="130" rx="8" ry="8" width="90" height="15" />
      <rect x="0" y="200" rx="8" ry="8" width="80" height="25" />
      <rect x="117" y="195" rx="8" ry="8" width="32" height="32" />
    </ContentLoader>
  );
};

export default Loader;
