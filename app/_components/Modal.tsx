import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Loader } from 'lucide-react';



const Modal = ({ isModalOpen, setIsModalOpen, data }: any) => {

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="min-w-7/12 max-h-[90vh] overflow-y-auto">

                {data ? <>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                            {data.Title}
                        </DialogTitle>

                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Movie Poster */}
                        <div className="flex justify-center items-center">
                            <img
                                src={data.Poster || "/placeholder.svg"}
                                alt={data.Title}
                                className="object-cover rounded-lg"
                                crossOrigin="anonymous"
                            />
                        </div>

                        {/* Movie Details */}
                        <div className="space-y-4">
                            {/* Basic Info */}
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary" className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {data.Released}
                                </Badge>
                                <Badge variant="outline" className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {data.Runtime}
                                </Badge>
                                <Badge variant="outline">{data.Rated}</Badge>
                            </div>

                            {/* Ratings */}
                            <div className="space-y-2">
                                <h4 className="font-semibold">Ratings</h4>
                                <div className="grid grid-cols-1 gap-2">
                                    {data.Ratings.map((rating: { Source: string; Value: string }, index: number) => (
                                        <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                                            <span className="text-sm font-medium">{rating.Source}</span>
                                            <span className="text-sm">{rating.Value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Genre */}
                            <div>
                                <h4 className="font-semibold mb-1">Genre</h4>
                                <p className="text-sm text-muted-foreground">{data.Genre}</p>
                            </div>

                            {/* Director & Cast */}
                            <div>
                                <h4 className="font-semibold mb-1">Director</h4>
                                <p className="text-sm text-muted-foreground">{data.Director}</p>
                            </div>

                            <div>
                                <h4 className="font-semibold mb-1">Cast</h4>
                                <p className="text-sm text-muted-foreground">{data.Actors}</p>
                            </div>

                            {/* Box Office */}
                            {data.BoxOffice !== "N/A" && (
                                <div>
                                    <h4 className="font-semibold mb-1">Box Office</h4>
                                    <p className="text-sm text-muted-foreground">{data.BoxOffice}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Plot */}
                    <div className="">
                        <h4 className="font-semibold mb-2">Plot</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {data.Plot}
                        </p>
                    </div>
                </>
                    :
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                            <div className='h-full w-full flex justify-center items-center'>
                                <Loader className='animate-spin' />
                            </div>
                        </DialogTitle>
                    </DialogHeader>

                }

            </DialogContent>
        </Dialog>


    )
}

export default Modal