import { Fade } from "react-awesome-reveal";
import { Carousel } from "react-bootstrap";

function CarouselItem(url: string) {
  return (
    <Carousel.Item key={url}>
      <img className="d-block w-100" src={url} alt={url} />
    </Carousel.Item>
  );
}

export function CarouselView() {
  const items = [
    "static/book1.jpg",
    "static/book2.jpg",
    "static/book3.jpg",
    "static/book4.jpg",
  ].map((url) => CarouselItem(url));

  return (
    <Fade triggerOnce>
      <Carousel className="mb-4" fade>
        {items}
      </Carousel>
    </Fade>
  );
}
