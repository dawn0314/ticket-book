import React from "react";
import useMusicSearch from "../../hooks/useMusicSearch";

const MusicSearch = () => {
  const { searchTerm, handleChange, searchResults, loading } = useMusicSearch();

  return (
    <div>
      <h2>음악 검색</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="검색어를 입력하세요"
      />
      <div>
        {loading ? (
          <p>검색 중...</p>
        ) : (
          <ul>
            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <li key={result.id}>
                  <p>앨범 제목: {result.album_title}</p>
                  <p>아티스트: {result.artist_name}</p>
                  <p>발매 연도: {result.year}</p>
                </li>
              ))
            ) : (
              <p>검색 결과가 없습니다.</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MusicSearch;
