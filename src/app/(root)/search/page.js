import SearchResults from '@/components/SearchResults';

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = typeof params?.q === 'string' ? params.q : '';

  return <SearchResults key={query} query={query} />;
}
