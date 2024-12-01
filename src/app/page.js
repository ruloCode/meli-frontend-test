

import PaginationControls from "@/components/organisms/paginationControls/PaginationControls";

const data = [
  'entry1',
  'entry2',
  'entry3',
  'entry4',
  'entry5',
  'entry6',
  'entry7',
  'entry8',
  'entry9',
  'entry10',
]

export default function Home({ searchParams }) {
  const page = Number(searchParams.page) || 1; // Asegurarse de que page tenga un valor numérico

  
  const per_page = Number(searchParams.per_page) || 5; // Asegurarse de que per_page tenga un valor numérico

  const start = (page - 1) * per_page;
  const end = start + per_page;

  const entries = data.slice(start, end);

  return (
    <div>
      <h1>Page {page}</h1>
      <h2>Per page {per_page}</h2>

      {entries.map((entry) => (
        <p key={entry}>{entry}</p>
      ))}

      <PaginationControls
      hasNextPage={end < data.length}
      hasPrevPage={start > 1}
      page={page} per_page={per_page} />
    </div>
  );
}
