export default function EmptyState({ text }: { text: string }) {
  return (
    <div className="text-center text-gray-500 dark:text-zinc-400 py-16">
      <p>{text}</p>
    </div>
  );
}
