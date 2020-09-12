from datetime import timedelta


def date_generator(start, end):
    """
    Lazy function to return python datetime objects for repeated events
    """
    event_start = start
    event_end = end.replace(day=start.day, month=start.month)

    while True:
        yield event_start, event_end

        event_start = event_start + timedelta(days=1)
        event_end = event_end + timedelta(days=1)
