const PageHeader = ({ title, description }) => {
  return (
    <div>
      <div className="row mt-4">
        <div className="col-12 "></div>
        <h1>{title}</h1>
      </div>
      {description && (
        <div className="row mt-2">
          <div className="col-12">
            <p>{description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageHeader;
