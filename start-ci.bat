@echo off
echo Starting Electron...
start /b electron .
echo Waiting for 20 seconds...
ping 127.0.0.1 -n 21 > nul
echo Timeout completed, attempting to kill Electron...
taskkill /F /IM electron.exe /T
echo Checking if Electron is still running...
tasklist | find "electron.exe"
if %ERRORLEVEL% EQU 0 (
    echo Electron is still running.
) else (
    echo Electron has been terminated.
)
echo Script execution finished.
pause
