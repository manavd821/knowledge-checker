from db.base import Database


class DatabaseBuilder:
    def __init__(self) -> None:
        pass
    
    def withConnectionString(self, connection_string: str) -> "DatabaseBuilder":
        self.connection_string = connection_string
        return self
    def withPoolSize(self, pool_size: int) -> "DatabaseBuilder":
        self.pool_size = pool_size
        return self
    
    def withMaxOverflow(self, max_overflow: int) -> "DatabaseBuilder":
        self.max_overflow = max_overflow
        return self
    
    def withPoolTimeout(self, pool_timeout: int) -> "DatabaseBuilder":
        self.pool_timeout = pool_timeout
        return self
    def withPoolPrePing(self, pool_pre_ping: bool) -> "DatabaseBuilder":
        self.pool_pre_ping = pool_pre_ping
        return self
    
    def withConnectArgs(self, key: str, value: str) -> "DatabaseBuilder":
        if not hasattr(self, "connect_args"):
            self.connect_args = {}
        self.connect_args[key] = value
        return self
    
    def build(self)-> Database:
        if self.connection_string is None:
            raise ValueError("Connection string must be set before building the Database")
        return Database(
            connection_string = self.connection_string,
            pool_size = getattr(self, "pool_size", 10),
            max_overflow = getattr(self, "max_overflow", 5),
            pool_timeout = getattr(self, "pool_timeout", 30),
            pool_pre_ping = getattr(self, "pool_pre_ping", True),
            connect_args = getattr(self, "connect_args", {"ssl" : "require"}),
        )