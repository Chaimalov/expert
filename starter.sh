#!/bin/bash

# Function to run a command in a new terminal tab
run_in_new_tab() {
  osascript <<EOF
tell application "Terminal"
  activate
  do script "$1"
end tell
EOF
}

# Start server
run_in_new_tab "cd $(pwd)/ex.server && npm start"

# Start client
run_in_new_tab "cd $(pwd)/ex.client && npm run dev"

# Start emoji API
run_in_new_tab "cd $(pwd)/ex.emoji && npm start"
