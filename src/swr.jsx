import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Swr = () => {
  const {
    data: accommodation,
    error,
    isValidating,
  } = useSWR('https://api.adriatic.hr/test/accommodation', fetcher);

  // Handles error and loading state
  if (error) return <div className='failed'>failed to load</div>;
  if (isValidating) return <div className="Loading">Loading...</div>;

  return (
    <div>
     {accommodation &&
        accommodation.map((accommodationItem, index) => (
          <div key={index}>
            <p title={accommodationItem.title}>
              {accommodationItem.title}
            </p>
          </div>
        ))}
    </div>
  );
};

export default Swr;