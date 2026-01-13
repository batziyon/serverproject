import { useState } from "react";
import { getPhotos, deleteData, updateData } from "../api/api";

export function useAlbumPhotos() {
  const [photos, setPhotos] = useState({}); // { albumId: [photo] }
  const [pages, setPages] = useState({});  // { albumId: currentPage }

  const loadInitial = async (albumId) => {
    try {
      const data = await getPhotos(albumId, 1, 10);
      setPhotos(prev => ({ ...prev, [albumId]: data }));
      setPages(prev => ({ ...prev, [albumId]: 1 }));
    } catch (err) {
      console.error("Error loading initial photos:", err);
    }
  };

  const loadMore = async (albumId) => {
    try {
      const nextPage = (pages[albumId] || 1) + 1;
      const more = await getPhotos(albumId, nextPage, 10);
      setPhotos(prev => ({
        ...prev,
        [albumId]: [...(prev[albumId] || []), ...more]
      }));
      setPages(prev => ({ ...prev, [albumId]: nextPage }));
    } catch (err) {
      console.error("Error loading more photos:", err);
    }
  };

  const deletePhoto = async (albumId, photoId) => {
    try {
      const numericId = Number(photoId);
      await deleteData("photos", numericId);
      setPhotos(prev => ({
        ...prev,
        [albumId]: prev[albumId].filter(p => p.id !== numericId),
      }));
    } catch (err) {
      console.error("Error deleting photo:", err);
    }
  };

  const updatePhoto = async (albumId, photoId, newData) => {
    try {
      const numericId = Number(photoId);
      const updated = await updateData("photos", numericId, newData);
      setPhotos(prev => ({
        ...prev,
        [albumId]: prev[albumId].map(p => p.id === numericId ? updated : p)
      }));
    } catch (err) {
      console.error("Error updating photo:", err);
    }
  };

  return { photos, loadInitial, loadMore, deletePhoto, updatePhoto };
}
