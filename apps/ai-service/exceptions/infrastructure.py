from exceptions.base import  AppError

class InfrastructureError(AppError):
    """Base class for infrastructure failures."""
    
class DatabaseError(InfrastructureError):
    pass

class CacheError(InfrastructureError):
    pass

class ExternalServiceError(InfrastructureError):
    pass