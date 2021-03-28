import { PropsWithChildren } from "react";

export function Main({
  py = 4,
  children,
}: PropsWithChildren<{
  py?: number;
}>) {
  return <main className={`py-${py} container`}>{children}</main>;
}
