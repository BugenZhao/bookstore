import moment from "moment";

export function DatetimeFormatter({ value }: { value: string }) {
  const datetime = moment(value);
  return <>{datetime.format("YYYY-MM-DD HH:mm:ss")}</>;
}
