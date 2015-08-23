#!/usr/bin/env bash

tmux split-window -v
tmux split-window -v

tmux send-keys -t 0 'node server.js' Enter
tmux send-keys -t 1 'grunt' Enter
tmux send-keys -t 2 'karma start' Enter

