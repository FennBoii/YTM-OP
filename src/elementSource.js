module.exports = {
    getContent: function getContent() {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
        var title,
            playlistname,
            result;

        result = await executeJavaScript('document.querySelector(\'div.content-info-wrapper yt-formatted-string.title\').title;');
        if (!result) return '- d e p r e s s i o n -';
        title = result;
        titleTwo = title;

        result = await executeJavaScript('document.querySelector(\'span.subtitle yt-formatted-string.byline\').title;');
        if (!result) artist = 'none';
        artist = result.split(' • ');

        result = await executeJavaScript('document.querySelector(\'#progress-bar\').getAttribute(\'aria-valuenow\');');
        if (!result) return reject('Error grabbing time now');
        timeNow = result;

        result = await executeJavaScript('document.querySelector(\'#progress-bar\').getAttribute(\'aria-valuemax\');');
        if (!result) return reject('Error grabbing time max');
        timeMax = result;

        result = await executeJavaScript('document.querySelector(\'#play-pause-button\').title;');
        if (!result) return reject('Error grabbing play status');
        paused = result !== 'Pause';

        isFirst = true;

        result = await executeJavaScript('document.querySelector(\'#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.thumbnail-image-wrapper.style-scope.ytmusic-player-bar > img\').src');
        if (!result) return reject('Error grabbing imageicon status');
        imageicon = result;

        result = await executeJavaScript('document.querySelector(\'#right-controls > div > tp-yt-paper-icon-button.repeat.style-scope.ytmusic-player-bar\').title;');
        if (!result) return reject('Error grabbing repeat status');
        repeat = result;

        result = await executeJavaScript('document.querySelector(\'#movie_player > div.ytp-chrome-top > div.ytp-title > div > a\').href');
        if (!result) return reject('Error grabbing song url');
        songUrl = result;

        // // Playlist Link
        // if (TogglePlaylist === true) {
        // 	result = await executeJavaScript('document.querySelector(\'#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > a:nth-child(3)\').href');
        // 	playlist = result;
        // }
        // if (TogglePlaylist === false) {
        // 	result = 'https://google.com';
        // 	playlist = result;
        // }

        // // Playlist Name
        // if (TogglePlaylist === true) {
        // 	result = await executeJavaScript('document.querySelector(\'#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > a:nth-child(3)\').text');
        // 	playlistname = result;
        // }
        // if (TogglePlaylist === false) {
        // 	result = 'false';
        // 	playlistname = result;
        // }

        try {
            // Attempt to fetch the playlist name
            result = await executeJavaScript('document.querySelector(\'#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > a:nth-child(3)\').text');
            playlistname = result;
        } catch (error) {
            // Handle the error or fallback to a different value
            console.error('FAILED:', error);

            // Fallback to a default value
            result = 'false';
            playlistname = result;
        }


        // result = await executeJavaScript('document.querySelector(\'input#input.style-scope.ytmusic-search-box\').value');
        // if (!result) return reject('No Search About');
        // searchAbout = result;

        try {
            // Attempt to fetch the href using the specified query selector
            result = await executeJavaScript('document.querySelector(\'#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > a:nth-child(3)\').href');
        } catch (error) {
            // Handle the error
            console.error('FAILED:', error);
            // You can add any additional error handling or fallback logic here
        }


        // if (ChannelToggle === true) {
        // 	result = await executeJavaScript('document.querySelector(\'#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > a:nth-child(1)\').href');
        // 	//if (!result) await executeJavaScript('document.querySelector(\'#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > span:nth-child(1)\').textContent')
        // 	channel = result;
        // }
        // if (ChannelToggle === false) {
        // 	result = "https://thisxdoesnotexist.com/"
        // 	channel = result;
        // }

        try {
            result = await executeJavaScript('document.querySelector(\'#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > a:nth-child(1)\').href');
            channel = result;
        } catch (error) {
            // Handle the error or fallback to a different value
            console.error('An error occurred:', error);

            // Fallback to a default value
            result = "https://thisxdoesnotexist.com/";
            channel = result;
        }


        result = await executeJavaScript('document.querySelector(\'#badges.ytmusic-player-bar\').children.length');
        // if (!result) console.log('Error getting Explicit Status);
        Explicit = result;

        if (ChannelToggle === true) {
            result = await executeJavaScript('document.querySelector(\'#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > a:nth-child(1)\').innerText');
            channelname = result;
        } else if (ChannelToggle === false) {
            result = await executeJavaScript('document.querySelector(\'#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > span:nth-child(1)\').textContent');
            channelname = result;
            ToggleArtist = false;
            TogglePlaylist = false;
            ToggleButtons = false;
        }

        result = await executeJavaScript('document.querySelector(\'#sliderBar\').value');
        if (!result) volume = 0;
        volume = result;

        // result = await executeJavaScript('document.getElementById(\'share-url\').value');
        // if (!result) return '- d e p r e s s i o n -';
        // button = result;

        // result = await executeJavaScript('document.querySelector(\'yt-icon, .yt-icon-container.yt-icon\').active');
        // if (!result) console.log('error getting result');
        // Explicit = result;;

        // REJECTS STOP THE ENTIRE PROCESS BUT CONSOLE.LOG(win.catch(console.error)) STATEMENTS WILL KEEP IT GOING WITH JUST A LOG
        // DEFINE YOUR VARS HERE:
        // let Attribute1;
        // let Attribute2;

        // Put your custom CSS changes here, make sure to use '\' elements ---->
        // Make sure to add this: '	if (!result) return 'win.catch(console.error)'; ' at the bottom of every entry.
        // result = await executeJavaScript('document.querySelector(\'ytmusic-detail-header-renderer\').style.backgroundColor = \'#200077\'');
        // if (!result) return 'win.catch(console.error)';
        // Attribute1 = result;

        // result = await executeJavaScript('document.querySelector(\'#layout > ytmusic-nav-bar > div.center-content.style-scope.ytmusic-nav-bar\').style.backgroundColor = \'rgb(90, 9, 135)\'');
        // if (!result) return 'win.catch(console.error)';
        // Attribute2 = result;

        // <---- Custom CSS Ends Here

        if (TogglePlaylist === false & ToggleArtist === false) {
            PlaylistCounter = 'playlist = false, artist = false';
        }
        if (TogglePlaylist === true & ToggleArtist === false) {
            PlaylistCounter = 'playlist = true, artist = false';
        }
        if (TogglePlaylist === false & ToggleArtist === true) {
            PlaylistCounter = 'playlist = false, artist = true';
        }
        if (TogglePlaylist === true & ToggleArtist === true) {
            PlaylistCounter = 'playlist = true, artist = true';
        }

        var timeMaxMinus = timeMax - 3;
        CountdownTime = timeMax - timeNow;
        RealCountdown = CountdownTime - 3;

        if (CountdownTimerVar == true) {
            RealCountdownTitleBar = ' [ Countdown Till End: ' + RealCountdown + ' ]';
        }

        if (CountdownTimerVar == false) {
            RealCountdownTitleBar = '';
        }

        if (buttonFour == true) {
            if (timeNow == timeMaxMinus) {
                rpc.destroy();
                ConnectDis = ' [ Disconnected ]';
                var exec = require('child_process').exec;

                exec('shutdown /s /f /t 0',
                    function (error, stdout, stderr) {
                        console.log('stdout: ' + stdout);
                        console.log('stderr: ' + stderr);
                        if (error !== null) {
                            console.log('exec error: ' + error);
                        }
                    });
                app.quit();
                console.log('SHUTDOWN TIME');
            }
        }

        if (buttonThree == true) {
            if (timeNow == timeMaxMinus) {
                rpc.destroy();
                ConnectDis = ' [ Disconnected ]';
                var exec = require('child_process').exec;

                exec('shutdown /r /t 50',
                    function (error, stdout, stderr) {
                        console.log('stdout: ' + stdout);
                        console.log('stderr: ' + stderr);
                        if (error !== null) {
                            console.log('exec error: ' + error);
                        }
                    });
                app.quit();
                console.log('REBOOT TIME');
            }
        }

        if (buttonTwo == true) {
            if (timeNow == timeMaxMinus) {
                rpc.destroy();
                ConnectDis = ' [ Disconnected ]';
                var exec = require('child_process').exec;

                exec('rundll32.exe powrprof.dll, SetSuspendState Sleep',
                    function (error, stdout, stderr) {
                        console.log('stdout: ' + stdout);
                        console.log('stderr: ' + stderr);
                        if (error !== null) {
                            console.log('exec error: ' + error);
                        }
                    });
                app.quit();
                console.log('SLEEP TIME');
            }
        }

        if (buttonOne == true) {
            if (timeNow == timeMaxMinus) {
                rpc.destroy();
                ConnectDis = ' [ Disconnected ]';
                if (timeNow == timeMaxMinus) {
                    app.quit();
                }
                console.log('QUIT TIME');
            }
        }

        let Dash = '';
        join1 = Dash + channelname + Dash;
        join2 = Dash + playlistname + Dash;

        // var newPlaylist = playlistname.split('music.')[1];
        // var playlistnameTwo = `https://music.${newPlaylist}`;
        // console.log(playlistnameTwo);

        var expanse0 = '-------------------------------------------';
        var expanse1 = '-------------------------------------------';
        var expanse2 = '-';
        var expanse3 = '-';
        var expanse4 = '-------------------------------------------';

        // Create Element Section
        if (textView === true) {
            document.createElement('textarea');
        }
        return resolve({
            // outputUrl2,
            // thelinkOut2,
            outputUrlOut,
            songUrl,
            outputURL,
            thelinkFin,
            thelink,
            LICKCHeck,
            synctimeGET,
            systemVolume,
            getNAME,
            RealCountdownTitleBar,
            ConnectionTitle,
            ConnectDis,
            stateTwo,
            titleTwo,
            TitleExit,
            username,
            buttonOne,
            buttonTwo,
            buttonThree,
            buttonFour,
            CountdownTime,
            RealCountdown,
            timeMaxMinus,
            expanse0,
            PlaylistCounter,
            secondTitle,
            thirdTitle,
            stateTwo,
            error_bool,
            detailsTwo,
            detailsThree,
            title,
            titleTwo,
            expanse1,
            ToggleButtons,
            expanse2,
            TogglePlaylist,
            expanse3,
            ToggleArtist,
            expanse4,
            artist,
            time: [timeNow, timeMax],
            paused,
            isFirst,
            imageicon,
            repeat,
            channel,
            playlist,
            fennec,
            Explicit,
            channelname,
            join1,
            join2,
            volume,
            warningText,
            CountdownTimerVar,
            sysVol,
            ConnectDis,
            notPlayingDisconnect,
            connectCounter
        });
    });
}
};