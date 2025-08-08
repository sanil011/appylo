import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

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
  page?: string | number;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); 
    const { id } = body;

    const { data }: { data: MovieData } = await axios.get(
      `http://www.omdbapi.com/?i=${id}&apikey=143e905a`
    );

    return NextResponse.json(data);
  } catch (error) {

    if (axios.isAxiosError(error)) {
      return NextResponse.json({ error: error.message }, { status: 500 }); 
    } else {
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: 500 }
      );
    }
  }
}
