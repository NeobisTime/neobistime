from rest_framework import permissions


class PollOwner(permissions.BasePermission):
    """
    Allows access to modify poll only for his owner
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user


class EventOwner(permissions.BasePermission):
    """
    Allows access to delete, modify events only for staff members
    """
    message = 'Only admins can change event information'

    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user.is_staff and obj.owner == request.user)


class NotesOwner(permissions.BasePermission):
    """
    Allows access to modify notes only for his owner
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user
