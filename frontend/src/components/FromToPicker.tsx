import { Moment } from "moment";
import { PropsWithChildren, useEffect, useRef } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { defaultFrom, defaultTo } from "../utils";
import { DatePicker } from "./DatePicker";

export function FromToPicker({
  onChange,
}: PropsWithChildren<{
  onChange: ({ from, to }: { from: Moment; to: Moment }) => void;
}>) {
  const from = useRef<Moment>(defaultFrom());
  const to = useRef<Moment>(defaultTo());
  const notify = () => onChange({ from: from.current, to: to.current });

  useEffect(() => {
    notify();
  });

  return (
    <Form className="mx-4 my-4">
      <Form.Group as={Row} className="mb-2" controlId="formFrom">
        <Form.Label column md="1" xs="2">
          From
        </Form.Label>
        <Col lg="3" sm="7" xs="10">
          <DatePicker
            initial={from.current}
            onChange={(newFrom) => {
              from.current = newFrom;
              notify();
            }}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-2" controlId="formTo">
        <Form.Label column md="1" xs="2">
          To
        </Form.Label>
        <Col lg="3" sm="7" xs="10">
          <DatePicker
            initial={to.current}
            onChange={(newTo) => {
              to.current = newTo;
              notify();
            }}
          />
        </Col>
      </Form.Group>
    </Form>
  );
}
