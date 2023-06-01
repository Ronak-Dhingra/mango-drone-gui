import socketio
from aiohttp import web
import asyncio
from drone import CircleDrone
import numpy as np

sio = socketio.AsyncServer()
IP, PORT = "0.0.0.0", 8080

threats = [CircleDrone(radius=0.0010), CircleDrone(radius=0.0020, phase_difference=5, time_period=5)]
nonthreats = [CircleDrone(phase_difference=3, radius=0.0008, center=np.array([17.44882, 78.3446]))]


async def drone_update_task():
    while True:
        update = {"threatLocations": [threat.get_info() for threat in threats],
                  "nonthreatLocations": [nonthreat.get_info() for nonthreat in nonthreats]}
        await sio.emit('groundControlUpdate', update)
        await asyncio.sleep(0.2)


@sio.on("killed")
async def on_killed(client_id, targetID):
    for drone in threats:
        if drone.id == targetID:
            drone.kill()


async def main():
    app = web.Application()
    sio.attach(app)
    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, IP, PORT)
    print(f"Server started on http://{IP}:{PORT}")
    await site.start()
    asyncio.create_task(drone_update_task())

    while True:
        await asyncio.sleep(3600)  # sleep forever


if __name__ == "__main__":
    asyncio.run(main())
