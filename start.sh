#!/bin/bash
export PATH="/root/.nvm/versions/node/v22.22.2/bin:$PATH"
cd /root/projects/notAntey
while true; do
  node node_modules/.bin/next start -p 3001
  echo "[$(date)] Next exited, restarting in 2s..."
  sleep 2
done
