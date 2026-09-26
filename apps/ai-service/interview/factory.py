from typing import TYPE_CHECKING
from events.factory import get_event_bus
from interview.coordinator import InterviewCoordinator
from livekit_worker.interview_agent_registry import InterviewAgentRegistry


def get_interview_coordinator(
    agent_registry: InterviewAgentRegistry,
):
    bus = get_event_bus(agent_registry)
    return InterviewCoordinator(bus)