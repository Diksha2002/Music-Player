let songs = [
    { id: 1, name: "Shape Of You", artist: "Ed Sheeran", img: "https://picsum.photos/id/10/300/300", genre: "pop", source: "\Ed Sheeran - Shape of You (Official Music Video).mp3" },
    { id: 2, name: "Sugar", artist: "Maroon 5", img: "https://picsum.photos/id/12/300/300", genre: "pop", source: "\Maroon 5 - Girls Like You ft. Cardi B (Official Music Video).mp3" },
    { id: 3, name: "Locked Away", artist: "R. City", img: "https://picsum.photos/id/15/300/300", genre: "hip-hop", source: "\Music App\R. City - Locked Away ft. Adam Levine.mp3" },
    // Add more songs here
];

let currentSongIndex = 0;
let playlists = [];

function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute("data-theme");
    console.log(currentTheme);
    body.setAttribute("data-theme", currentTheme === "dark" ? "light" : "dark");
}

function showSongs() {
    const genreSelect = document.getElementById("genre-select");
    const genre = genreSelect.value;
    const songListDiv = document.getElementById("song-list");

    const filteredSongs = genre ? songs.filter(song => song.genre === genre) : songs;

    songListDiv.innerHTML = filteredSongs.map(song => `
        <button onclick="renderCurrentSong(${song.id})">${song.name} - ${song.artist}</button>
    `).join('');
}

function renderCurrentSong(songId) {
    const song = songs.find(s => s.id === songId);
    const songImage = document.getElementById("song-image");
    const songName = document.getElementById("song-name");
    const songArtist = document.getElementById("song-artist");
    const audioPlayer = document.getElementById("audio-player");

    songImage.src = song.img;
    songName.textContent = song.name;
    songArtist.textContent = song.artist;
    audioPlayer.src = song.source;

    currentSongIndex = songs.indexOf(song);
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    renderCurrentSong(songs[currentSongIndex].id);
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    renderCurrentSong(songs[currentSongIndex].id);
}

function addToPlaylist() {
    const currentSong = songs[currentSongIndex];
    const playlistName = document.getElementById("playlist-name").value;

    if (!playlistName) return alert("Please enter a playlist name");

    let playlist = playlists.find(pl => pl.name === playlistName);
    if (!playlist) {
        playlist = { name: playlistName, songs: [] };
        playlists.push(playlist);
        renderPlaylists();
    }

    if (!playlist.songs.includes(currentSong)) {
        playlist.songs.push(currentSong);
    } else {
        alert("Song is already in the playlist");
    }
}

function createPlaylist() {
    const playlistName = document.getElementById("playlist-name").value;
    if (!playlistName) return alert("Please enter a playlist name");

    if (!playlists.find(pl => pl.name === playlistName)) {
        playlists.push({ name: playlistName, songs: [] });
        renderPlaylists();
    } else {
        alert("Playlist already exists");
    }
}

function renderPlaylists() {
    const allPlaylistsDiv = document.getElementById("all-playlists");
    allPlaylistsDiv.innerHTML = playlists.map(pl => `
        <button onclick="renderPlaylistSongs('${pl.name}')">${pl.name}</button>
    `).join('');
}

function renderPlaylistSongs(playlistName) {
    const playlist = playlists.find(pl => pl.name === playlistName);
    const songListDiv = document.getElementById("song-list");

    if (playlist) {
        songListDiv.innerHTML = playlist.songs.map(song => `
            <button onclick="renderCurrentSong(${song.id})">${song.name} - ${song.artist}</button>
        `).join('');
    } else {
        songListDiv.innerHTML = "Playlist is empty or does not exist.";
    }
}

window.onload = function() {
    showSongs(); // Initial render of songs
    renderPlaylists(); // Initial render of playlists
};
