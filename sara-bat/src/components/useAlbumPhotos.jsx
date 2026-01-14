import { useEffect, useState } from "react";
import { getPhotosByAlbum } from "../api/api";

export function useAlbumPhotos(albumId, limit = 10, enabled = false) {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // התחלה מחדש כשפותחים אלבום או מחליפים אלבום
  useEffect(() => {
    if (enabled) {
      setPhotos([]);
      setPage(1);
      setHasMore(true);
    }
  }, [enabled, albumId]);

  // טעינת תמונות
  useEffect(() => {
    if (!enabled || !hasMore) return;

    setIsLoading(true);

    getPhotosByAlbum(albumId, page, limit)
      .then(newPhotos => {
        if (newPhotos.length < limit) {
          setHasMore(false);
        }
        setPhotos(prev => [...prev, ...newPhotos]);
      })
      .catch(() => {
        setHasMore(false);
      })
      .finally(() => {
        setIsLoading(false);
      });

  }, [enabled, page, albumId, limit, hasMore]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

 return { photos, setPhotos, loadMore, hasMore, isLoading };

}
