[![Node.js CI](https://github.com/FennBoii/YTM-OP/actions/workflows/node.js.yml/badge.svg)](https://github.com/FennBoii/YTM-OP/actions/workflows/node.js.yml)
![GitHub release (by tag)](https://img.shields.io/github/downloads/FennBoii/YTM-OP/1.0.5/total)
![GitHub release (by tag)](https://img.shields.io/github/downloads/FennBoii/YTM-OP/1.0.6/total)
![GitHub release (by tag)](https://img.shields.io/github/downloads/FennBoii/YTM-OP/1.0.7/total)
![Website](https://img.shields.io/website?up_message=site%20UP&down_message=site%20DOWN&url=https%3A%2F%2Fgetname.ytmopdata.net%2F&label=Token%20Page%20-&labelColor=%23ff00ff&link=https%3A%2F%2Fgetname.ytmopdata.net%2F)

**some changes I've got to add**
**what iv'e gotta fix before the clients work with eachother:**

    ✓ Fix the wifi card problem with my redhat ubuntu server
    ✓ setup the server's connection to the site so the site can go live
    ✓ add a config.json that the user can edit for the client's connection to one another outside of the client build as a package
    ✓ make/fix the send/receive scripts on the client for when the site is up
    ✓ allow site connection encrypting for the client's connection with eachother
    ✓ add a couple new features (make buttons show 'album' and 'artist' instead of the actual name) and (automatically detect the *no album link available so ima spit u an error* to automatically disabling buttons for u as an option)
    ✓ finally add a 2nd release with all the newest updates

<center>

<h2><b>There is no need for these commands anymore! It automatically makes the config.js these files for you and there is also no need for svcl.exe anymore I use a different package that works seamlessly!</b></h2>

**VOLUME DOESN'T WORK RIGHT NOW, I"LL RE-RELEASE WHEN I GET IT WORKING!**

<b>THERE MAY BE ERRORS WHEN CLOSING AND MAYBE SOME DURING, I AM WORKING ON THESE JUST RESTART THE CLIENT OR ADD THE ISSUES TO "ISSUES" TAB</b>

# YTM-OP
## This project is a self project meaning this is mostly just for me but your allowed to do whatever you wish with this project if you come across it.</center>

* Summary: "This is a Youtube Music Client with a Discord Rich Presence and janky VRChat OSC support and only if you know how to run it

<hr />
<center><h2>How to setup client syncing</h2></center>

    1. Your going to have to go to this site: https://getname.ytmopdata.net/, put your name in and get the keys, don't touch the go to page site button yet, the site is still under construction.
    2. Go to your player client location where u installed it, or you can just run it from the dist folder in the release, open the config.js and put your keys in the respective places and edit the name and everything you'd want to use.
    3. Open the client and go to the **Utils** menu and hover over "Incoming Connections", you can choose what you'd want to do. (Sending makes it so that your client updated the playing url and time so that if another client connects with the name keys from the site u made, they can receive it.) (Receiving makes your client receive the data being sent, this means that the timers you set in the config file can be used, the **resyncSongUrl** will be used to load the new song url on a timer (too fast will get you stuck in a reload loop) and **outOfSyncPlayingSong** will be the timer for how fast you want to get the **timeNow** from the other client, this is a quick reload kind of thing so I recommend 3 as to not OVERLOAD the database... please...)
    4. Give the site credentials to friends etc.. and play along this works at least I think for everyone at the moment, i've done a lot of trial and error. If there are any errors put them into the Issues tab PLEASE, thankuuu for reading <3

- Make everything look neater with a better menu and cleaner look
- Allow the titlebar to be customized through text in textfiles for ultimate customization
    - If you've got any ideas, leave them somewhere maybe in issues idk I'll *definitely* add them
- Try to add releases for Mac and Linux in the future when I get the time

***Features***
- Added a feature that allows the client to act a little like spotify in the sense that it disconnects when your song is paused and connects when its playing.. I haven't really tested this fully but it works for now. It's called "Not Playing Disconnect" in the Utils.
- Allows you to enable and disable discord buttons <s>(Still kinda janky)</s>
- Has options for "Quitting the application", "Sleeping your PC", "Restarting your PC", and "Shutting down your PC" after the song ends.
- Continuous updates (Its not daily but its also not monthly)
- Your able to Send and receive functionally between clients!
- 100% safe and free! No extras are added that weren't made for the client
- Uses very little Resources (Less than 13% of cpu) (recommended use on localdisk C:// because read/write)
- No self promotion anywhere (I like to let the consumer use the product however they please, ad-free!)

</center>
</br>
</br>
++ Make sure you edit the <s>username.txt</s> <b>config.js</b> for a customized experience <s>(there will be a future use for this)</s>

