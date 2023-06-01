import socketio
import asyncio

sio = socketio.AsyncClient()


async def main():
    await sio.connect("http://localhost:8070")
    print("connected to server")
    await sio.sleep(4)
    print("chasing")
    await sio.emit("chase", {"targetID": "6df82099-a90b-4331-b265-8d59ab4ea3ee"})
    await sio.wait()


@sio.on("antidroneUpdate")
async def on_antidrone_update(update):
    print(update)


if __name__ == "__main__":
    asyncio.run(main())
