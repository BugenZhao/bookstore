
export function Main({
  py: py_ = 4,
  children,
}) {
  const py = `py-${py_}`;

  return (
    <main className={`${py} container`}>
      {children}
    </main>
  );
}
