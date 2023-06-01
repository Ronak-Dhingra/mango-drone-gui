#!/bin/bash

echo "Updating localip.js"
ip_address=$(ip route get 1 | head -1 | awk '{print $7}')
output_file="mango/localip.js"
echo "export const localIP = '${ip_address}';" > $output_file

echo "Looking for Virtual Environments in Mock/"
cd Mock
if [ -d "venv" ]; then
    echo "Virtual environment 'venv' already exists."
else
    echo "Creating virtual environment 'venv'..."
    python3 -m venv venv
    echo "Virtual environment 'venv' created."
fi

echo "Activating venv"
source venv/bin/activate
echo "Installing python requirements"
pip install -r requirements.txt

echo "Starting Ground Control Simulation"
python ground_control.py &

sleep 0.1
echo "Starting Anti Drone Simulation"
python anti_drone.py &
sleep 0.1

function kill_child_processes() {
    echo "Stopping processes..."
    pkill -P $$ # Kill all child processes
}

# Set a trap to kill the Child processes when the user presses Ctrl+C
trap kill_child_processes SIGINT

cd ../mango
echo "installing npm dependencies"
npm install
echo "starting expo server"
npm start &

wait
