import { useState } from "react";
import { getData } from "../api/api";

export function useAlbumPhotos() {
  const [photos, setPhotos] = useState({});
  const [pages, setPages] = useState({});

  const loadInitial = async (albumId) => {
    const data = await getData(albumId);
    setPhotos(prev => ({ ...prev, [albumId]: data }));
    setPages(prev => ({ ...prev, [albumId]: 1 }));
  };

  const loadMore = async (albumId) => {
    const next = (pages[albumId] || 1) + 1;
    const more = await getPhotos(albumId, next, 10);

    setPhotos(prev => ({
      ...prev,
      [albumId]: [...prev[albumId], ...more]
    }));
    setPages(prev => ({ ...prev, [albumId]: next }));
  };

  return { photos, loadInitial, loadMore };
}
