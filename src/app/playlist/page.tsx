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
  liked: boolean; // Nouveau champ pour le statut "liked"
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

  const handleAddToPlaylist = (trackId: string) => {
    if (!selectedPlaylist) {
      alert('Veuillez sélectionner une playlist.');
      return;
    }

    const playlist = playlists.find(pl => pl.id === selectedPlaylist);
    if (playlist && playlist.tracks.find(track => track.id === trackId)) {
      alert('Cette piste est déjà dans la playlist !');
      return;
    }

    const likedTrack = likedTracks.find(track => track.id === trackId);
    if (likedTrack) {
      const updatedPlaylists = playlists.map(playlist => {
        if (playlist.id === selectedPlaylist) {
          const newTracks = [...playlist.tracks, likedTrack];
          return { ...playlist, tracks: newTracks };
        }
        return playlist;
      });

      setPlaylists(updatedPlaylists);
    }
  };

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

  const handlePlaylistChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlaylist(event.target.value);
  };

  const handleLikeClick = (trackId: string) => {
    const updatedPlaylists = playlists.map(playlist => {
      const updatedTracks = playlist.tracks.map(track => {
        if (track.id === trackId) {
          const updatedTrack = { ...track, liked: !track.liked };
          return updatedTrack;
        }
        return track;
      });
      return { ...playlist, tracks: updatedTracks };
    });

    const updatedLikedTracks: Track[] = updatedPlaylists.flatMap(playlist =>
      playlist.tracks.filter(track => track.liked)
    );

    setLikedTracks(updatedLikedTracks);
    setPlaylists(updatedPlaylists);

    localStorage.setItem('likedTracks', JSON.stringify(updatedLikedTracks));
  };

  const isTrackLiked = (trackId: string) => {
    const likedTrack = likedTracks.find(track => track.id === trackId);
    return likedTrack && likedTrack.liked;
  };

  return (
    <div className={styles.container}>
      <div className={styles.childcontainer}>
        <p>Mes playlists :</p>
        <input
          type="text"
          value={newPlaylistName}
          onChange={handleNameChange}
          placeholder="Nom de la nouvelle playlist"
        />
        <button onClick={handleSubmitClick}>Créer la playlist</button>

        <select value={selectedPlaylist} onChange={handlePlaylistChange}>
          {playlists.map(playlist => (
            <option key={playlist.id} value={playlist.id}>
              {playlist.name}
            </option>
          ))}
        </select>

        {playlists.map((playlist: Playlist) => (
          <div key={playlist.id}>
            <h2>{playlist.name}</h2>
            <button onClick={() => handleRemovePlaylist(playlist.id)}>Supprimer la playlist</button>
            <ul>
              {playlist.tracks.map((track: Track) => (
                <li key={track.id}>
                  <Link className={styles.titleButton} href={`/track/${track.id}`}>
                    {`${track.name}`}
                  </Link>
                  <button onClick={() => handleRemoveTrack(playlist.id, track.id)}>❌</button>
                  <button
                    className={isTrackLiked(track.id) ? styles.likeButtonActive : styles.likeButton}
                    onClick={() => handleLikeClick(track.id)}
                  >
                    {isTrackLiked(track.id) ? '❤️' : '🤍'}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatePlaylist;
