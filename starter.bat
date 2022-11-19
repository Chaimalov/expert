:: Start server
cd ex.server
start cmd.exe /k "npm start"

:: Start client
cd ../ex.client
start cmd.exe /k "npm start"

:: Start emoji API
cd ../ex.emoji
start cmd.exe /k "npm start"

:: Go back
cd ..