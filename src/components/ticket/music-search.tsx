import React from "react";
import useMusicSearch from "../../hooks/useMusicSearch";

const MusicSearch = () => {
  const { searchTerm, handleChange, searchResults, loading } = useMusicSearch();

  return <Wrapper></Wrapper>;
};

export default MusicSearch;
