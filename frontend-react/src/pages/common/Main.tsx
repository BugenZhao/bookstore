import { PropsWithChildren } from "react";

export function Main({ py: py_ = 4, children }: PropsWithChildren<{
  py?: number
}>) {
  const py = `py-${py_}`;

  return (
    <main className={`${py} container`}>
      {children}
    </main>
  );
}
