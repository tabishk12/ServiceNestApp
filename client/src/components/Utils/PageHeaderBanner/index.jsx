const PageHeaderBanner = ({
  src = "/images/browse-services-header.png",
  alt = "Browse Services",
  className = "h-full w-full object-cover",
}) => {
  return (
    <div>
      <img src={src} alt={alt} className={className} />
    </div>
  );
};

export default PageHeaderBanner;
