import { Fade } from "react-awesome-reveal";
import { Carousel } from "react-bootstrap";
import { API_BASE } from "../config";
import { useFetch } from "../services";

function CarouselItem(url: string) {
  return (
    <Carousel.Item key={url}>
      <img className="d-block w-100" src={url} alt={url} />
    </Carousel.Item>
  );
}

export function CarouselView() {
  const paths = useFetch<string[]>("/carousels/").data ?? [];
  const items = paths.map((url) => CarouselItem(API_BASE + url));

  return (
    <Fade triggerOnce>
      <Carousel className="mb-4" fade>
        {items}
      </Carousel>
    </Fade>
  );
}
