export function SectionHeading({
  title,
  id,
}: {
  title: string;
  id?: string;
}) {
  return (
    <div id={id} className="mb-6 flex items-center gap-3">
      <h2 className="font-serif text-2xl text-navy-900">{title}</h2>
      <span className="h-px flex-1 bg-graphite-900/10" />
    </div>
  );
}
