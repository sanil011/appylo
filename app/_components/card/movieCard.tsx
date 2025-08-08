'use client';
import React, { useState } from 'react'
import { Star, Calendar } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import NoImage from "../icon/noImage";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Modal from '../Modal';
import { cn } from '@/lib/utils';


interface MovieCardProps {
    Title: string;
    Year: string;
    Poster: string;
    Type: string;
    imdbRating: string;
    BoxOffice?: string;
    imdbId: string;
}

const MovieCard: React.FunctionComponent<MovieCardProps> = ({ Title, Year, Poster, Type, imdbRating, BoxOffice, imdbId }) => {
    const [imageError, setImageError] = useState(false);
    const [id, setId] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data, isLoading, isError } = useQuery({
        queryKey: ['modal', id],
        queryFn: async () => {
            const response = await axios.post('/api/movieInfoById', {
                id
            })
            return response.data;
        },
        enabled: !!id
    })

    return (
        <div onClick={() => {
            if (isModalOpen) return;
            setId(imdbId);
            setIsModalOpen(true)
        }}
            className={cn('group h-[25rem] border border-gray-300  transition-all duration-300 py-4 rounded-xl overflow-hidden cursor-pointer', !isModalOpen && 'hover:scale-103')}>
            <div className="relative h-9/12 overflow-hidden">
                <div className=' z-10 flex items-center justify-between px-4 absolute top-2 w-full '>

                    {imdbRating !== 'N/A' && (
                        <div className="flex items-center bg-yellow-500 gap-1 px-2 py-1 rounded-md text-sm font-semibold ">
                            <Star className="w-3 h-3 fill-current " />
                            {imdbRating}
                        </div>
                    )}
                    <div className="">
                        <Badge variant="secondary" className="bg-black/70 text-white border-0">
                            {Type}
                        </Badge>
                    </div>

                </div>

                {!imageError ? (
                    <img
                        src={Poster}
                        alt={Title}
                        onError={() => setImageError(true)}
                        className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full opacity-50 flex flex-col items-center justify-center">
                        <NoImage />
                        <p>No Image Available</p>
                    </div>
                )}

            </div>
            <div className='px-6 py-6'>
                <h3 className="font-bold text-lg leading-tight line-clamp-2 mb-2">
                    {Title.length > 25 ? `${Title.slice(0, 25)}...` : Title}
                </h3>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {Year}
                    </div>

                    {BoxOffice && BoxOffice !== 'N/A' && (
                        <div className="flex items-center gap-1">
                            {/* <DollarSign className="w-4 h-4" /> */}
                            <span className="font-medium text-green-600">
                                {BoxOffice}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {isModalOpen && <Modal
                data={data}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />}
        </div>
    )
}

export default MovieCard