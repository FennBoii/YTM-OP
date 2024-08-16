**Client syncing is REALLY quick as of now and it's fully updated as of now. Enjoy :3 (build it with the underConstruction branch)**

<h2>CHECK OUT THE 'underConstruction' BRANCH</h2>

[![Node.js CI](https://github.com/FennBoii/YTM-OP/actions/workflows/node.js.yml/badge.svg)](https://github.com/FennBoii/YTM-OP/actions/workflows/node.js.yml) ![Website](https://img.shields.io/website?up_message=site%20UP&down_message=site%20DOWN&url=https%3A%2F%2Fgetname.ytmopdata.net%2F&label=Token%20Page%20-&labelColor=%23ff00ff&link=https%3A%2F%2Fgetname.ytmopdata.net%2F) ![Known Vulnerabilities](https://snyk.io/test/github/FennBoii/YTM-OP/badge.svg)

<h4>UPDATE NOT YET RELEASED, DID UPDATE THE 'underConstruction' BRANCH</h4>

# YTM-OP
## This project is a youtube music client meant to include features such as music syncing, Discord RPC, and end power options. It includes other features but work may be slow. Thank you for being a part of this project <3.

<center>How to setup client syncing<br />
<center>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</center></center><br />
<i>It's too easy now, load up the player and you'll see my "Token" page (if your ID doesn't match already), simply put in ANY name. This will be used for communicating with my web server as well as other clients. Once you press the button to insert your single ID, the player automatically reloads itself and when you see it load the home page, your done! Everything is automated apart from you enabling syncing (sending or receiving). If you want to make it easy, just tell the person your ID and once they add it, your done. :3</i>
<hr />
</center>
Some stuff I've fixed / need to work on:

- Make everything look neater with a better menu and cleaner look
- Allow the titlebar to be customized through text in textfiles for ultimate customization
    - If you've got any ideas, leave them somewhere maybe in issues idk I'll *definitely* add them
- Try to add releases for Mac and Linux in the future when I get the time
- Make updates, triggers, for faster updating with syncing.
- ~~Fix project so when u 'npm install' it doesn't break and say some vc++ error~~
- ~~Fix "win-audio" package because it keeps making the builds fail (currently is broken with current build, the "System Volume" is stuck at '78%')~~
- ~~Fix Restart and Shutdown~~
- ~~Update the release dist / exe~~
- Update all the old packages
- ~~External Files Setup~~
- <s>Add Releases so you can just get a distribution player instead of a whole package you need to compile yourself every time</s>
- ~~Add SENDING and RECEIVING for when you want to remotely play music through clients (the basics are already in the client just doesn't do anything yet)~~
- ~~Add a function to be able to add your own discord activity through a text file for the clientID and also maybe images~~

***Features***
- Added a feature that allows the client to act a little like spotify in the sense that it disconnects when your song is paused and connects when its playing.. I haven't really tested this fully but it works for now. It's called "Not Playing Disconnect" in the Utils (a little unstable).
- Allows you to connect and disconnect discord rpc buttons as well as for "Quitting the application", "Sleeping your PC", "Restarting your PC", and "Shutting down your PC" after the song ends.
- Easy customization and more to come in the future.
- Continuous updates (Its not daily but its also not monthly) within the 'underConstruction' branch.
- Your able to Send and receive song data between clients! (0.2s delay synced listening, updates soon)
- 100% safe and free! No extras are added that weren't made for the client
- Uses little Resources (Less than 11% of cpu) (recommended use on localdisk C:// because read/write)
- No self promotion anywhere (I like to let the consumer use the product however they please, ad-free!)
 
 ***How Client Connecting Works***
 - First when you load my page within the YTM-OP client, it loads the default index.html page.
 - When you submit a name, when it fully fades out and starts loading, my php file runs and does multiple things:
	 - It gets your name and inserts it into the conf file for apache2.
	 - Then it runs a command to reload my websocket service to add your ID to it.
	 - Then it runs another command to restart the website hosting service on the server.
	 - Once that all completes, it loads the create.php file's index.html page which is what shows you your created ID to be copied or loaded into your client.
 - When you add your ID to the client, it doesnt communicate just yet with my site, you have to go to the 'Utils' menu and click 'Websocket Connections' and then either Sending or Recieving which then connects to the websocket.
 - If your wondering how the websocket connects to both clients and sends the data, it does this with client mapping. It gets your connected client and adds it to the clientMAP (this is only sessionary meaning when you disconnect, it removes you from the map) and whoever is the sender, sends the data to the websocket and it determines whether you are the sender or reciever and redirects the traffic accordingly, meaning if there are 5 clients connected and one sender (making 6), all clients inside of the map will get the message that the 6th client sends, this way it allows real-time syncing and communication to happen to all the connected clients allowing them to listen to the master's music instantly as every update happens!
</center>
