from typing import Literal

LogLevel = Literal["INFO", "ERROR", "WARN", "FATAL", "DEBUG"]
AuthenticationMechanism = Literal["jwt", "webhook_signature", "api_key", "oauth", "session"]