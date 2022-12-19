/* eslint-disable max-len */
var osc = require('node-osc');
var fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

rl.question('Which Port: ', answer => {
	console.log(`Set port to ${answer}`);
	port = answer;
	setInterval(allVars, 1e3);
});


var port = 9000;
function allVars() {
	console.log('sending to', port);
	artistVar();
	channelVar();
	channelnameVar();
	ConnectDisVar();
	detailsThreeVar();
	detailsTwoVar();
	error_boolVar();
	ExplicitVar();
	fennecVar();
	imageiconVar();
	isFirstVar();
	join1Var();
	join2Var();
	pausedVar();
	playlistVar();
	playlistCounterVar();
	repeatVar();
	secondTitleVar();
	stateTwoVar();
	SystemVolumeVar();
	thirdTitleVar();
	timeMaxVar();
	timeNowVar();
	titleTwoVar();
	ToggleArtistVar();
	ToggleButtonsVar();
	TogglePlaylistVar();
	volumeVar();
}

function artistVar() {
	var artist = fs.readFileSync('c:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\artist.txt', 'utf-8');
	var artistFiltered = JSON.stringify(artist);
	var client = new osc.Client('127.0.0.1', port);
	client.send('/artist', artistFiltered, () => {
		client.close();
	});
}

function channelVar() {
	var channel = fs.readFileSync('c:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\channel.txt', 'utf-8');
	var channelFiltered = JSON.stringify(channel);
	var client = new osc.Client('127.0.0.1', port);
	client.send('/channel', channelFiltered, () => {
		client.close();
	});
}

function channelnameVar() {
	var channelname = fs.readFileSync('c:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\channelname.txt', 'utf-8');
	var channelnameFiltered = JSON.stringify(channelname);
	var client = new osc.Client('127.0.0.1', port);
	client.send('/channelname', channelnameFiltered, () => {
		client.close();
	});
}

function ConnectDisVar() {
	var ConnectDis = fs.readFileSync('c:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\ConnectDis.txt', 'utf-8');
	var ConnectDisFiltered = JSON.stringify(ConnectDis);
	var client = new osc.Client('127.0.0.1', port);
	client.send('/ConnectDis', ConnectDisFiltered, () => {
		client.close();
	});
}

function detailsThreeVar() {
	var detailsThree = fs.readFileSync('c:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\detailsThree.txt', 'utf-8');
	var setTitleFiltered = JSON.stringify(detailsThree);
	var client = new osc.Client('127.0.0.1', port);
	client.send('/detailsThree', setTitleFiltered, () => {
		client.close();
	});
}

function detailsTwoVar() {
	var detailsTwo = fs.readFileSync('c:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\detailsTwo.txt', 'utf-8');
	var detailsTwoFiltered = JSON.stringify(detailsTwo);
	var client = new osc.Client('127.0.0.1', port);
	client.send('/detailsTwo', detailsTwoFiltered, () => {
		client.close();
	});
}

function error_boolVar() {
	var error_bool = fs.readFileSync('c:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\error_bool.txt', 'utf-8');
	var error_boolFiltered = JSON.stringify(error_bool);
	var client = new osc.Client('127.0.0.1', port);
	client.send('/error_bool', error_boolFiltered, () => {
		client.close();
	});
}

function ExplicitVar() {
	var Explicit = fs.readFileSync('c:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\Explicit.txt', 'utf-8');
	var ExplicitFiltered = JSON.stringify(Explicit);
	var client = new osc.Client('127.0.0.1', port);
	client.send('/Explicit', ExplicitFiltered, () => {
		client.close();
	});
}

function fennecVar() {
	var fennec = fs.readFileSync('c:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\fennec.txt', 'utf-8');
	var fennecFiltered = JSON.stringify(fennec);
	var client = new osc.Client('127.0.0.1', port);
	client.send('/fennec', fennecFiltered, () => {
		client.close();
	});
}

function imageiconVar() {
	var imageicon = fs.readFileSync('c:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\imageicon.txt', 'utf-8');
	var imageiconFiltered = JSON.stringify(imageicon);
	var client = new osc.Client('127.0.0.1', port);
	client.send('/imageicon', imageiconFiltered, () => {
		client.close();
	});
}

function isFirstVar() {
	var isFirst = fs.readFileSync('c:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\isFirst.txt', 'utf-8');
	var isFirstFiltered = JSON.stringify(isFirst);
	var client = new osc.Client('127.0.0.1', port);
	client.send('/isFirst', isFirstFiltered, () => {
		client.close();
	});
}

function join1Var() {
	var join1 = fs.readFileSync('c:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\join1.txt', 'utf-8');
	var join1Filtered = JSON.stringify(join1);
	var client = new osc.Client('127.0.0.1', port);
	client.send('/join1', join1Filtered, () => {
		client.close();
	});
}

function join2Var() {
	var join2 = fs.readFileSync('c:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\join2.txt', 'utf-8');
	var join2Filtered = JSON.stringify(join2);
	var client = new osc.Client('127.0.0.1', port);
	client.send('/join2', join2Filtered, () => {
		client.close();
	});
}

function pausedVar() {
	var paused = fs.readFileSync('c:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\paused.txt', 'utf-8');
	var pausedFiltered = JSON.stringify(paused);
	var client = new osc.Client('127.0.0.1', port);
	client.send('/paused', pausedFiltered, () => {
		client.close();
	});
}

function playlistVar() {
	var playlist = fs.readFileSync('c:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\playlist.txt', 'utf-8');
	var playlistFiltered = JSON.stringify(playlist);
	var client = new osc.Client('127.0.0.1', port);
	client.send('/playlist', playlistFiltered, () => {
		client.close();
	});
}

function playlistCounterVar() {
	var PlaylistCounter = fs.readFileSync('c:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\PlaylistCounter.txt', 'utf-8');
	var PlaylistCounterFiltered = JSON.stringify(PlaylistCounter);
	var client = new osc.Client('127.0.0.1', port);
	client.send('/playlistCounter', PlaylistCounterFiltered, () => {
		client.close();
	});
}

function repeatVar() {
	var repeat = fs.readFileSync('c:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\repeat.txt', 'utf-8');
	var repeatFiltered = JSON.stringify(repeat);
	var client = new osc.Client('127.0.0.1', port);
	client.send('/repeat', repeatFiltered, () => {
		client.close();
	});
}

function secondTitleVar() {
	var secondTitle = fs.readFileSync('c:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\secondTitle.txt', 'utf-8');
	var secondTitleFiltered = JSON.stringify(secondTitle);
	var client = new osc.Client('127.0.0.1', port);
	client.send('/secondTitle', secondTitleFiltered, () => {
		client.close();
	});
}

function stateTwoVar() {
	var stateTwo = fs.readFileSync('c:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\stateTwo.txt', 'utf-8');
	var stateTwoFiltered = JSON.stringify(stateTwo);
	var client = new osc.Client('127.0.0.1', port);
	client.send('/stateTwo', stateTwoFiltered, () => {
		client.close();
	});
}

function SystemVolumeVar() {
	var SystemVolume = fs.readFileSync('c:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\SystemVolume.txt', 'utf-8');
	var SystemVolumeFiltered = JSON.stringify(SystemVolume);
	var client = new osc.Client('127.0.0.1', port);
	client.send('/SystemVolume', SystemVolumeFiltered, () => {
		client.close();
	});
}

function thirdTitleVar() {
	var thirdTitle = fs.readFileSync('c:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\thirdTitle.txt', 'utf-8');
	var thirdTitleFiltered = JSON.stringify(thirdTitle);
	var client = new osc.Client('127.0.0.1', port);
	client.send('/thirdTitle', thirdTitleFiltered, () => {
		client.close();
	});
}

function timeMaxVar() {
	var timeMax = fs.readFileSync('c:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\timeMax.txt', 'utf-8');
	var timeMaxFiltered = JSON.stringify(timeMax);
	var client = new osc.Client('127.0.0.1', port);
	client.send('/timeMax', timeMaxFiltered, () => {
		client.close();
	});
}

function timeNowVar() {
	var timeNow = fs.readFileSync('c:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\timeNow.txt', 'utf-8');
	var timeNowFiltered = JSON.stringify(timeNow);
	var client = new osc.Client('127.0.0.1', port);
	client.send('/timeNow', timeNowFiltered, () => {
		client.close();
	});
}

function titleTwoVar() {
	var titleTwo = fs.readFileSync('c:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\titleTwo.txt', 'utf-8');
	var titleTwoFiltered = JSON.stringify(titleTwo);
	var client = new osc.Client('127.0.0.1', port);
	client.send('/titleTwo', titleTwoFiltered, () => {
		client.close();
	});
}

function ToggleArtistVar() {
	var ToggleArtist = fs.readFileSync('c:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\ToggleArtist.txt', 'utf-8');
	var ToggleArtistFiltered = JSON.stringify(ToggleArtist);
	var client = new osc.Client('127.0.0.1', port);
	client.send('/ToggleArtist', ToggleArtistFiltered, () => {
		client.close();
	});
}

function ToggleButtonsVar() {
	var ToggleButtons = fs.readFileSync('c:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\ToggleButtons.txt', 'utf-8');
	var ToggleButtonsFiltered = JSON.stringify(ToggleButtons);
	var client = new osc.Client('127.0.0.1', port);
	client.send('/ToggleButtons', ToggleButtonsFiltered, () => {
		client.close();
	});
}

function TogglePlaylistVar() {
	var TogglePlaylist = fs.readFileSync('c:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\TogglePlaylist.txt', 'utf-8');
	var TogglePlaylistFiltered = JSON.stringify(TogglePlaylist);
	var client = new osc.Client('127.0.0.1', port);
	client.send('/TogglePlaylist', TogglePlaylistFiltered, () => {
		client.close();
	});
}

function volumeVar() {
	var volume = fs.readFileSync('c:\\Users\\Thepl\\Downloads\\YouTube-Music-Client-master\\allVars\\volume.txt', 'utf-8');
	var volumeFiltered = JSON.stringify(volume);
	var client = new osc.Client('127.0.0.1', port);
	client.send('/volume', volumeFiltered, () => {
		client.close();
	});
}
