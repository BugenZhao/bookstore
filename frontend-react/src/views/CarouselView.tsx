function CarouselItem({
  active = false,
  url,
}: {
  active?: boolean;
  url: string;
}) {
  return (
    <div className={`carousel-item ${active ? "active" : ""}`}>
      <img src={url} className="d-block w-100" alt={`carousel ${url}`} />
    </div>
  );
}
export function CarouselView() {
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide mb-4 shadow-sm"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <CarouselItem url="static/book1.jpg" />
        <CarouselItem url="static/book2.jpg" active={true} />
        <CarouselItem url="static/book3.jpg" />
        <CarouselItem url="static/book4.jpg" />
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
