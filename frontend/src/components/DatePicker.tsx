import moment, { Moment } from "moment";
import { PropsWithChildren, useState } from "react";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./date-picker.css";

export function DatePicker({
  initial,
  onChange,
}: PropsWithChildren<{
  initial: Moment;
  onChange: (newDate: Moment) => void;
}>) {
  const [shownDate, setShownDate] = useState<Moment>(initial);

  return (
    <ReactDatePicker
      selected={shownDate.toDate()}
      onChange={(newDate) => {
        setShownDate(moment(newDate?.toString()));
        onChange(moment(newDate?.toString()));
      }}
      showTimeInput
      showTimeSelect
      dateFormat="Pp"
    />
  );
}
