import { PropsWithChildren } from "react";

export function Body(props: PropsWithChildren<{}>) {
  return <div className="store-home">{props.children}</div>;
}
