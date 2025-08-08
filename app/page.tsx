import Image from "next/image";
import MovieCard from "./_components/card/movieCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from 'axios';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import HomePage from "./_components/Home";


export default function Home() {
  return (
    <div>
      <HomePage/>
    </div>
  );
}
