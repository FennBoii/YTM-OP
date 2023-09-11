    module.exports = {
        "username": "",
        "SiteName": "",
        "GivenNameToken": "",
        "RandomToken": "",
        // delays between sends (used for slower connections and better syncing)
        "outOfSyncPlayingSong": 3,
        // (this is for if the song is out of sync by; how much will you want it resync again?
        "resyncSongUrl": 6000
        // (this is for how often you want to resync the url of the current song, I recommend nothing below 6000 because if it's only partially loaded, it will reload the page again and you'll be stuck in a loop
    }
