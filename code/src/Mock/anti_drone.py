import numpy as np
import socketio
from aiohttp import web
import asyncio

sio = socketio.AsyncServer()
IP, PORT = "0.0.0.0", 8070

gc_sio = socketio.AsyncClient()

state = {
    "targetID": None,
    "chasing": False,
    "killing": False,
    "killed": False,
    "antidroneLocation": np.array([17.44862, 78.3493]),
    "ammo": 2,
    "velocity": np.array([0., 0.]),
    "speed": 0.002
}


async def antidrone_update_task():
    while True:
        await sio.emit('antidroneUpdate', {**state, "antidroneLocation": {"latitude": state["antidroneLocation"][0],
                                                                          "longitude": state["antidroneLocation"][1]},
                                           "velocity": {"x": state["velocity"][0], "y": state["velocity"][1]}})
        await asyncio.sleep(0.2)


@gc_sio.on("groundControlUpdate")
async def on_ground_control_update(update):
    if state["targetID"] is None:
        return
    target = [threat for threat in update["threatLocations"] if threat["id"] == state["targetID"]]
    if not target or state["killed"]:
        return
    target = target[0]
    diff = np.array([target["latitude"], target["longitude"]]) - state["antidroneLocation"]
    magnitude = np.linalg.norm(diff)
    direction = 1 / magnitude * diff
    state["velocity"] = direction * state["speed"]
    state["antidroneLocation"] += 0.05 * state["velocity"]
    if magnitude < 0.001 and not state["killed"] and state["killing"]:
        state["killed"] = True
        state["chasing"] = state["killing"] = False
        print("killed", state["targetID"])
        await asyncio.gather(sio.emit("killed"), gc_sio.emit("killed", state["targetID"]))


@sio.on("chase")
async def on_chase(client_id, args):
    print("chasing", args)
    state["chasing"] = True
    state["killed"] = False
    state["targetID"] = args["targetID"]
    state["speed"] = 0.002


@sio.on("kill")
async def on_kill(client_id, args):
    print("killing", args)
    state["chasing"] = state["killing"] = True
    state["killed"] = False
    state["targetID"] = args["targetID"]
    state["speed"] = 0.005


@sio.on("abort")
async def on_abort(client_id):
    print("aborting chase")
    state["chasing"] = False
    state["killing"] = False
    state["killed"] = False
    state["targetID"] = None


async def main():
    app = web.Application()
    sio.attach(app)
    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, IP, PORT)
    print(f"Server started on http://{IP}:{PORT}")
    await site.start()
    await gc_sio.connect("http://localhost:8080")
    asyncio.create_task(antidrone_update_task())
    print("connected to ground control")
    await gc_sio.wait()
    while True:
        await asyncio.sleep(3600)  # sleep forever


if __name__ == "__main__":
    asyncio.run(main())
