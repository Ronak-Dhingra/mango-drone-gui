from typing import Callable
import numpy as np
from uuid import uuid4
from time import perf_counter


class Drone:
    def __init__(self, path_function: Callable[[float], np.array]):
        self.path_function = path_function
        self.id = str(uuid4())
        self.kill_position = None

    def get_info(self):
        if self.kill_position is not None:
            return {"latitude": self.kill_position[0], "longitude": self.kill_position[1], "id": self.id}

        t = perf_counter()
        location = self.path_function(t)
        return {"latitude": location[0], "longitude": location[1], "id": self.id}

    def kill(self):
        if self.kill_position is not None:
            return
        t = perf_counter()
        self.kill_position = self.path_function(t)


class CircleDrone(Drone):
    def path_function_maker(self, center: np.array, radius: float, frequency, phase_difference=0) -> Callable[
        [float], np.array]:
        def path_function(t: float) -> np.array:
            argument = 2 * np.pi * frequency * t + phase_difference
            return center + radius * np.array([np.cos(argument), np.sin(argument)])

        return path_function

    def __init__(self, center: np.array = np.array([17.44842, 78.3486]), radius: float = 0.0004, time_period: float = 3,
                 phase_difference=0):
        super().__init__(self.path_function_maker(center, radius, 1 / time_period, phase_difference))
