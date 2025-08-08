"use client"
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type SearchFilterProps = {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    selectedType: string;
    setSelectedType: (value: string) => void;
    selectedYear: string;
    setSelectedYear: (value: string) => void;
};

export default function SearchFilter({
    searchQuery,
    setSearchQuery,
    selectedType,
    setSelectedType,
    selectedYear,
    setSelectedYear,
}: SearchFilterProps) {


    const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
    const [localSelectedYear, setLocalSelectedYear] = useState(selectedYear);

    // Debounce for search query
    useEffect(() => {
        const handler = setTimeout(() => {
            setSearchQuery(localSearchQuery);
        }, 500); 

        return () => clearTimeout(handler);
    }, [localSearchQuery, setSearchQuery]);

    // Debounce for year
    useEffect(() => {
        const handler = setTimeout(() => {
            setSelectedYear(localSelectedYear);
        }, 500);

        return () => clearTimeout(handler);
    }, [localSelectedYear, setSelectedYear]);


    return (
        <div className="w-11/12 sm:w-9/12 md:w-8/12 mx-auto pb-6 space-y-6">
            <div className="space-y-4">
                {/* Search Input */}
                <div className="space-y-2">
                    <Label htmlFor="search" className="text-sm font-medium">
                        Search
                    </Label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            id="search"
                            type="text"
                            placeholder="Search movies and series..."
                            value={localSearchQuery}
                            onChange={(e) => setLocalSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Type Filter */}
                    <div className="space-y-2">
                        <Label htmlFor="type" className="text-sm font-medium">
                            Type
                        </Label>
                        <Select value={selectedType} onValueChange={setSelectedType}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="movie">Movie</SelectItem>
                                <SelectItem value="series">Series</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Year Filter */}
                    <div className="space-y-2">
                        <Label htmlFor="year" className="text-sm font-medium">
                            Year
                        </Label>
                        <Input
                            id="year"
                            type="number"
                            placeholder="Enter year (e.g., 2024)"
                            value={localSelectedYear}
                            onChange={(e) => setLocalSelectedYear(e.target.value)}
                            min="1900"
                            max="2030"
                        />
                    </div>
                </div>
            </div>


            <div className="pt-4 border-t">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Current Filters:</h3>
                <div className="flex flex-wrap gap-2 text-sm">
                    {searchQuery && (
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                            Search: "{searchQuery}"
                        </span>
                    )}
                    {selectedType && (
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                            Type: {selectedType === "movie" ? "Movie" : "Series"}
                        </span>
                    )}
                    {selectedYear && (
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                            Year: {selectedYear}
                        </span>
                    )}
                    {!searchQuery && !selectedType && !selectedYear && (
                        <span className="text-muted-foreground">No filters applied</span>
                    )}
                </div>
            </div>
        </div>
    )
}
