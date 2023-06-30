'use client'

import { useState, useEffect } from 'react';
import styles from './page.module.scss';
import Link from 'next/link';

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

const CreatePlaylist = () => {
  const [likedTracks, setLikedTracks] = useState<Track[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState('');

  useEffect(() => {
    const storedLikedTracks = JSON.parse(localStorage.getItem('likedTracks') || '[]') as Track[];
    setLikedTracks(storedLikedTracks);
  }, []);

  useEffect(() => {
    localStorage.setItem('likedTracks', JSON.stringify(likedTracks));
  }, [likedTracks]);

  useEffect(() => {
    const storedPlaylists = JSON.parse(localStorage.getItem('playlists') || '[]') as Playlist[];
    setPlaylists(storedPlaylists);
  }, []);

  useEffect(() => {
    localStorage.setItem('playlists', JSON.stringify(playlists));
  }, [playlists]);

  const handleRemovePlaylist = (playlistId: string) => {
    const updatedPlaylists = playlists.filter(playlist => playlist.id !== playlistId);
    setPlaylists(updatedPlaylists);

    if (playlistId === selectedPlaylist) {
      setSelectedPlaylist('');
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPlaylistName(event.target.value);
  };

  const handleSubmitClick = () => {
    if (newPlaylistName.trim() === '') {
      alert('Veuillez entrer un nom pour la playlist.');
      return;
    }

    if (playlists.find(playlist => playlist.name === newPlaylistName)) {
      alert('Une playlist avec ce nom existe déjà !');
      return;
    }

    const newPlaylist: Playlist = {
      id: newPlaylistName,
      name: newPlaylistName,
      tracks: [],
    };
    setPlaylists([...playlists, newPlaylist]);
    setNewPlaylistName('');
    setSelectedPlaylist(newPlaylistName);
  };

  const handleRemoveTrack = (playlistId: string, trackId: string) => {
    const newPlaylists = playlists.map(playlist => {
      if (playlist.id === playlistId) {
        const newTracks = playlist.tracks.filter(track => track.id !== trackId);
        return { ...playlist, tracks: newTracks };
      }
      return playlist;
    });
    setPlaylists(newPlaylists);
  };

  const handleLikeClick = (trackId: string) => {
    const updatedPlaylists = playlists.map(playlist => {
      const updatedTracks = playlist.tracks.map(track => {
        if (track.id === trackId) {
          const updatedTrack = { ...track};
          return updatedTrack;
        }
        return track;
      });
      return { ...playlist, tracks: updatedTracks };
    });

    let updatedLikedTracks: Track[] = likedTracks;
    const isLiked = likedTracks.some(likedTrack => likedTrack.id === trackId);
    if (isLiked) {
      updatedLikedTracks = likedTracks.filter(likedTrack => likedTrack.id !== trackId);
    } else {
      const track = playlists.flatMap(playlist => playlist.tracks).find(track => track.id === trackId);
      if (track) {
        updatedLikedTracks = [...likedTracks, track];
      }
    }

    setLikedTracks(updatedLikedTracks);
    setPlaylists(updatedPlaylists);
    localStorage.setItem('likedTracks', JSON.stringify(updatedLikedTracks));
  };

  const isTrackLiked = (trackId: string) => {
    return likedTracks.some(likedTrack => likedTrack.id === trackId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.childcontainer}>
        <span className={styles.playlist}>Mes playlists :</span>
        <div className={styles.playlistForm}><input
          type="text"
          value={newPlaylistName}
          onChange={handleNameChange}
          placeholder="Nom de la nouvelle playlist"
        />
          <button onClick={handleSubmitClick}>Créer la playlist</button>
        </div>
        {playlists.map((playlist: Playlist) => (
          <div key={playlist.id} className={styles.playlistCard}>
            <h2>{playlist.name}</h2>
            <ul>
              {playlist.tracks.map((track: Track) => (
                <li key={track.id}>
                  <div className={styles.trackLogo}></div>
                  <Link className={styles.titleButton} href={`/track/${track.id}`}>
                    {`${track.name}`} - {`${track.artist}`}
                  </Link>
                  <img src={track.artistImage} className={styles.artistImage} />
                  <button
                    className={isTrackLiked(track.id) ? styles.likeButtonActive : styles.likeButton}
                    onClick={() => handleLikeClick(track.id)}
                  >
                    {isTrackLiked(track.id) ? '❤️' : '🤍'}
                  </button>
                  <button onClick={() => handleRemoveTrack(playlist.id, track.id)}>❌</button>
                </li>
              ))}
            </ul>
            <button className={styles.playlistCardButton} onClick={() => handleRemovePlaylist(playlist.id)}>Supprimer la playlist</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatePlaylist;
