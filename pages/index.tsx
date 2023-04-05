import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

import Navbar from "@/components/Navbar";
import Bilboard from "@/components/Bilboard";
import MovieList from "@/components/MovieList";
import useMoviesList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "@/components/InfoModal";
import useInfoModalStore from "@/hooks/useInfoModal";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { data: movies = [] } = useMoviesList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModalStore()

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Bilboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        {
          favorites.length > 0 ? <MovieList title="My List" data={favorites} /> : null
        }
      </div>
    </>
  );
}
