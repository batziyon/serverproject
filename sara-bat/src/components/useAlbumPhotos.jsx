import { useEffect, useState } from "react";
import { getPhotosByAlbum } from "../api/api";

export function useAlbumPhotos(albumId, limit = 10) {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {

    if (!albumId) return;

    console.log("Fetching photos for album", albumId, "page", page);

    getPhotosByAlbum(albumId, page, limit).then(newPhotos => {
      console.log("Fetched photos:", newPhotos);
      if (newPhotos.length < limit) setHasMore(false);
      setPhotos(prev => [...prev, ...newPhotos]);
    });
  }, [albumId, page]);

  const loadMore = () => {
    if (hasMore) {
      setPage(prev => prev + 1);
    }
  };

  const reset = () => {
    setPhotos([]);
    setPage(1);
    setHasMore(true);
  };

  return { photos, loadMore, hasMore, reset };
}
