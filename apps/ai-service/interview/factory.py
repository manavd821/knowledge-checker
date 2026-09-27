from events.factory import get_event_publisher
from interview.coordinator import InterviewCoordinator


def get_interview_coordinator():
    bus = get_event_publisher()
    return InterviewCoordinator(bus)