#!/usr/bin/env bash

if [ "$#" -lt 1 ]; then
    echo "Usage:"
    echo "${BASH_SOURCE[0]} <name>"
    exit 1
fi

URL="https://elsamuko.github.io/Hide-my-Name/main.html#$@"

SITE=$(chromium-browser --headless --dump-dom "$URL" 2> /dev/null)

CONVERTED=$( echo $SITE | grep -Po '(?<=<p id="result" class="card-text">)[^<]*(?=</p>)' )

echo "$CONVERTED"
