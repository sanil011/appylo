"use client"
import MovieCard from "./card/movieCard";
import axios from 'axios';
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import SearchFilter from "./search-filter";
import NoResult from "./icon/noResult";

const fetchMovies = async ({ searchTerm, type, year, page }: any) => {
    const response = await axios.post('/api/movieData', {
        search: searchTerm,
        page,
        type,
        y: year,
    });

    return response.data;
};

type MovieData = {
    Search: Array<{
        Title: string;
        Year: string;
        imdbID: string;
        Type: string;
        Poster: string;
    }>;
    totalResults: string;
    Response: string;
    Error?: string;
    page: string;
};

const Home = () => {

    const [searchTerm, setSearchTerm] = useState('batman');
    const [selectedType, setSelectedType] = useState('movie');
    const [selectedYear, setSelectedYear] = useState("")
    const { ref, inView } = useInView();

    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery(
        {
            queryKey: ['movies', searchTerm, selectedType, selectedYear],
            queryFn: async ({ pageParam = 1 }) => {
                const response = await fetchMovies({ searchTerm, type: selectedType, year: selectedYear, page: pageParam });
                return response;
            },
            initialPageParam: 1,
            getNextPageParam: (lastPage: MovieData) => {
                const currentPage = Number(lastPage.page || 1);
                const totalResults = Number(lastPage.totalResults);

                const totalPages = Math.ceil(totalResults / 10);

                if (currentPage < totalPages) {
                    return currentPage + 1;
                } else {
                    return undefined;
                }
            }
        }
    );



    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView]);


    const movies = data && data.pages[0].Response == 'False' ? [] : data?.pages.flatMap((page) => page.Search);

    return (
        <main className="min-h-screen max-w-[1380px] mx-auto">
            <h1 className="text-3xl text-red-700 text-center py-4 font-bold">Appylo CineSeek</h1>

            <div>
                <SearchFilter
                    searchQuery={searchTerm}
                    setSearchQuery={setSearchTerm}
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                    selectedYear={selectedYear}
                    setSelectedYear={setSelectedYear}
                />
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-11/12 sm:w-9/12  gap-5 mx-auto py-4">
                    <LoadingSkeleton />
                </div>
            ) : movies?.length === 0 ? (
                <div className="flex items-center justify-center flex-col">
                    <NoResult />
                    <h1 className="text-center">No result found.</h1>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-11/12 sm:w-9/12  gap-5 mx-auto">
                    {movies?.map((movie) => (
                        <MovieCard
                            imdbId={movie.imdbID}
                            key={movie.imdbID}
                            Title={movie.Title}
                            Year={movie.Year}
                            Poster={movie.Poster}
                            Type={movie.Type}
                            imdbRating={"7.9"}
                            BoxOffice="$144,745,925"
                        />
                    ))}
                    {/* Sentinel div for infinite scroll */}
                    <div ref={ref} className="h-10" />
                </div>
            )}


            

            {isError && <div>
                <h1 className="text-2xl text-center">Error fetching movies.</h1>
            </div>}

            {isFetchingNextPage && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-11/12 sm:w-9/12  gap-5 mx-auto py-4">
                    <LoadingSkeleton />
                </div>
            )}
        </main>
    )
}

const LoadingSkeleton = () => {
    return (
        <>
            <div className="h-[20rem] w-full bg-gray-500 rounded-xl animate-pulse"></div>
            <div className="h-[20rem] w-full bg-gray-500 rounded-xl animate-pulse"></div>
            <div className="h-[20rem] w-full bg-gray-500 rounded-xl animate-pulse"></div>
        </>
    )
}

export default Home