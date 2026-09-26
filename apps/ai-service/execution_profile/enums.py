from enum import Enum

class ExecutionProfile(str, Enum):
    LOW_LATENCY = "low_latency"
    HIGH_QUALITY = "high_quality"
    LOW_COST = "low_cost"
    BALANCED = "balanced"
