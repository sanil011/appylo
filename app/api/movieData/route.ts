import { NextApiRequest } from "next";
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
  const apiKey = "143e905a";

  try {
    const body = await req.json(); 
    const { search = "batman", type, y: year, page = 1 } = body;
    const url = new URL("http://www.omdbapi.com/");
    url.searchParams.append("s", search as string);
    url.searchParams.append("apikey", apiKey);

    if (type) {
      url.searchParams.append("type", type as string);
    }

    if (year) {
      url.searchParams.append("y", year as string);
    }

    if (page) {
      url.searchParams.append("page", page as string);
    }

    const updatedUrl = url.toString();
    const { data }: { data: MovieData } = await axios.get(updatedUrl);

    data["page"] = page ? Number(page) : 1;

    return NextResponse.json(data); // Return the response here
  } catch (error) {
    // If it's an Axios error
    if (axios.isAxiosError(error)) {
      return NextResponse.json({ error: error.message }, { status: 500 }); // Return error here
    } else {
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: 500 }
      );
    }
  }
}
