"use client"

import styles from './albumdetail.module.scss';
import Link from 'next/link';
import { useState, useEffect } from 'react';

let plusSymbol = '\u2795';

interface Track {
  id: string;
  name: string;
  artist: string;
  artistImage: string;
  artistsId: string;
}

interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
}

interface AlbumDetailProps {
  title: string;
  imageUrl: string;
  artistName: string;
  releaseDate: string;
  artistsId: string;
  tracks: Array<{ name: string, id: string }>;
  artistImageUrl: string;
  artistImageTitle: string;
}

const handleBackClick = () => {
  window.history.back();
};

const AlbumDetail = ({
  title,
  imageUrl,
  artistName,
  releaseDate,
  tracks,
  artistsId,
  artistImageUrl,
  artistImageTitle
}: AlbumDetailProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [likedTracks, setLikedTracks] = useState<Array<Track>>([]);
  const [playlists, setPlaylists] = useState<Array<Playlist>>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>('');

  useEffect(() => {
    const storedLikes = localStorage.getItem('likedTracks');
    setLikedTracks(storedLikes ? JSON.parse(storedLikes) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem('likedTracks', JSON.stringify(likedTracks));
  }, [likedTracks]);

  useEffect(() => {
    const storedPlaylists = localStorage.getItem('playlists');
    const parsedPlaylists = storedPlaylists ? JSON.parse(storedPlaylists) : [];
    setPlaylists(parsedPlaylists);

    if (parsedPlaylists.length > 0) {
      setSelectedPlaylist(parsedPlaylists[0].id);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('playlists', JSON.stringify(playlists));
  }, [playlists]);

  const handleLikeClick = (trackName: string, trackId: string, artistName: string, artistImageUrl: string) => {
    const track: Track = { name: trackName, id: trackId, artist: artistName, artistImage: artistImageUrl, artistsId: artistsId };
    const isTrackLiked = likedTracks.some(likedTrack => likedTrack.id === track.id);

    if (isTrackLiked) {
      // unliked the track
      const updatedLikes = likedTracks.filter(likedTrack => likedTrack.id !== track.id);
      setLikedTracks(updatedLikes);
    } else {
      // liked the track
      setLikedTracks(prevLikes => [...prevLikes, track]);
    }
  };

  const handleOpenModal = (trackName: string, trackId: string, artistName: string, artistImageUrl: string) => {
    const track: Track = { name: trackName, id: trackId, artist: artistName, artistImage: artistImageUrl, artistsId: artistsId };
    setCurrentTrack(track);
    setShowModal(true);
  };

  const handleAddToPlaylist = () => {
    if (!currentTrack) return;

    if (selectedPlaylist === '') {
      alert('Veuillez sélectionner une playlist');
      return;
    }

    const playlist = playlists.find(pl => pl.id === selectedPlaylist);
    if (playlist && playlist.tracks.find(track => track.id === currentTrack.id)) {
      alert('Cette piste est déjà dans la playlist !');
      return;
    }

    const updatedPlaylists = playlists.map(playlist => {
      if (playlist.id === selectedPlaylist) {
        const newTracks = [...playlist.tracks, currentTrack];
        return { ...playlist, tracks: newTracks };
      }
      return playlist;
    });

    setPlaylists(updatedPlaylists);
    setShowModal(false);
  };

  return (
    <div className={styles.albumDetail}>
      <img src={imageUrl} alt={title} className={styles.albumImage} />
      <div className={styles.albumInfo}>
        <div className={styles.albumInformations}>
          <h2 className={styles.albumTitle}>{title}</h2>
          <Link href={`/artist/${artistsId}`} className={styles.albumArtist}>{artistName}</Link>
          <Link href={`/artist/${artistsId}`}><img src={artistImageUrl} alt={artistImageTitle} className={styles.artistImage} /></Link>
        </div>
        <div className={styles.albumTitles}>
          <p>Date de sortie: {releaseDate}</p>
          <p className={styles.albumTracks}>Titres :</p>
          <ul>
            {tracks.map((track) => (
              <li key={track.id}>
                <div className={styles.trackSlot}>
                  <div className={styles.trackLogo}></div>
                </div>
                <Link className={styles.titleButton} href={`/track/${track.id}`}>{track.name}</Link>
                <div className={styles.trackSlot}>
                  <span className={styles.plusSymbol} onClick={() => handleOpenModal(track.name, track.id, artistName, artistImageUrl)}>{plusSymbol}</span>
                  <button className={styles.like} onClick={() => handleLikeClick(track.name, track.id, artistName, artistImageUrl)}>
                    {likedTracks.some(likedTrack => likedTrack.id === track.id) ? '❤️' : '🤍'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <Link href="" onClick={handleBackClick} className={styles.button}></Link>
      </div>
      {showModal && (
        <div className={styles.modal}>
          <h2>Ajouter le titre à une playlist</h2>
          <select value={selectedPlaylist} onChange={(e) => setSelectedPlaylist(e.target.value)}>
            {playlists.map((playlist) => (
              <option key={playlist.id} value={playlist.id}>
                {playlist.name}
              </option>
            ))}
          </select>
          <button onClick={handleAddToPlaylist}>➕</button>
          <button onClick={() => setShowModal(false)}>Fermer</button>
        </div>
      )}
    </div>
  );
};

export default AlbumDetail;



