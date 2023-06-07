#!/bin/bash

# Find all Node.js processes and kill them
node_pids=$(sudo netstat -tlnp | grep node | awk '{print $7}' | awk -F '/' '{print $1}' | sort -u)

for pid in $node_pids; do
  kill -9 $pid
  echo "Killed node process with PID: $pid"
done

# Find all Java processes and kill them (Firebase Emulators)
java_pids=$(sudo netstat -tlnp | grep java | awk '{print $7}' | awk -F '/' '{print $1}' | sort -u)

for java_pid in $java_pids; do
  sudo kill -9 $java_pid
  echo "Killed Java process with PID: $java_pid"
done
