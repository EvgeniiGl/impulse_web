<?php
// Messages/en.php
return [
    // -------------------------------------------------------------------------
    // General
    // -------------------------------------------------------------------------
    'Impulse'                                                                                   => 'Impulse',
    'Field is required'                                                                         => 'Field is required',
    'Incorrect data'                                                                            => 'Incorrect data',
    'Hello %name%'                                                                              => 'Hello %name%',
    'Invalid JSON data'                                                                         => 'Invalid JSON data',
    'Internal server error'                                                                     => 'Internal server error',
    'Invalid or expired token'                                                                  => 'Invalid or expired token',

    // -------------------------------------------------------------------------
    // Auth
    // -------------------------------------------------------------------------
    'Invalid email or password'                                                                 => 'Invalid email or password',
    'Account is deactivated'                                                                    => 'Account is deactivated',
    'User with this email already exists'                                                       => 'User with this email already exists',
    'Authorization header is missing or invalid'                                                => 'Authorization header is missing or invalid',
    'Successfully logged out'                                                                   => 'Successfully logged out',
    'Token is invalid'                                                                          => 'Token is invalid',
    'User not found or inactive'                                                                => 'User not found or inactive',
    'Authentication required'                                                                   => 'Authentication required',
    'Unauthorized'                                                                              => 'Unauthorized',

    // -------------------------------------------------------------------------
    // Validation — cards
    // -------------------------------------------------------------------------
    'Title is required'                                                                         => 'Title is required',
    'Title must be at least 3 characters'                                                       => 'Title must be at least 3 characters',
    'Title must not exceed 100 characters'                                                      => 'Title must not exceed 100 characters',
    'Description must not exceed 1500 characters'                                               => 'Description must not exceed 1500 characters',
    'Description must not exceed 5000 characters'                                               => 'Description must not exceed 5000 characters',
    'Access type must be one of: private, shared, public'                                       => 'Access type must be one of: private, shared, public',
    'File required'                                                                             => 'File required',
    'Collection ID must be a non-empty string'                                                  => 'Collection ID must be a non-empty string',
    'Collection ID must be a valid UUID'                                                        => 'Collection ID must be a valid UUID',

    // -------------------------------------------------------------------------
    // Cards CRUD
    // -------------------------------------------------------------------------
    'Card deleted successfully'                                                                 => 'Card deleted successfully',
    'Card not found'                                                                            => 'Card not found',
    'Card not found or access denied'                                                           => 'Card not found or access denied',
    'Access denied'                                                                             => 'Access denied',
    'Card hidden successfully'                                                                  => 'Card hidden successfully',

    // -------------------------------------------------------------------------
    // Validation — users / auth
    // -------------------------------------------------------------------------
    'Email is required'                                                                         => 'Email is required',
    'Invalid email format'                                                                      => 'Invalid email format',
    'Email must not exceed 255 characters'                                                      => 'Email must not exceed 255 characters',
    'Password is required'                                                                      => 'Password is required',
    'Password must be at least 8 characters'                                                    => 'Password must be at least 8 characters',
    'Password must not exceed 72 characters'                                                    => 'Password must not exceed 72 characters',
    'Password must contain at least one uppercase letter, one lowercase letter, and one number' => 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    'Name is required'                                                                          => 'Name is required',
    'Name must not exceed 100 characters'                                                       => 'Name must not exceed 100 characters',

    // -------------------------------------------------------------------------
    // Collections
    // -------------------------------------------------------------------------
    'Collection not found'                                                                      => 'Collection not found',
    'Collection not found or access denied'                                                     => 'Collection not found or access denied',
    'Collection already exists'                                                                 => 'Collection already exists',
    'Error creating collection'                                                                 => 'Error creating collection',
    'Collection deleted successfully'                                                           => 'Collection deleted successfully',
    'Collection name is required'                                                               => 'Collection name is required',
    'Collection name must not exceed 100 characters'                                            => 'Collection name must not exceed 100 characters',
    'Card removed from collection'                                                              => 'Card removed from collection',
    'Card not found in collection or access denied'                                             => 'Card not found in collection or access denied',
    'Card already in collection'                                                                => 'Card already in collection',
    'Card added to collection successfully'                                                     => 'Card added to collection successfully',
    'Card collections updated successfully'                                                     => 'Card collections updated successfully',
    'Collection shared successfully'                                                            => 'Collection shared successfully',
    'Collection already shared with this user'                                                  => 'Collection already shared with this user',
    'Permission must be one of: read, write, admin. Allowed values: read, write, admin'         => 'Permission must be one of: read, write, admin',
    'Error updating card collections'                                                           => 'Error updating card collections',

    // -------------------------------------------------------------------------
    // Likes
    // -------------------------------------------------------------------------
    'Like added'                                                                                => 'Like added',
    'Like removed'                                                                              => 'Like removed',
    'Failed to add like'                                                                        => 'Failed to add like',
    'Failed to remove like'                                                                     => 'Failed to remove like',

    // -------------------------------------------------------------------------
    // Reports
    // -------------------------------------------------------------------------
    'Reason is required'                                                                        => 'Reason is required',
    'Invalid report reason'                                                                     => 'Invalid report reason',
    'Report submitted successfully'                                                             => 'Report submitted successfully',

    // -------------------------------------------------------------------------
    // Notifications / schedules
    // -------------------------------------------------------------------------
    'Subscription data required'                                                                => 'Subscription data required',
    'Subscription saved'                                                                        => 'Subscription saved',
    'Failed to save subscription'                                                               => 'Failed to save subscription',
    'Schedule not found'                                                                        => 'Schedule not found',
    'Schedule deleted'                                                                          => 'Schedule deleted',
    'Schedule saved successfully'                                                               => 'Schedule saved successfully',

    // -------------------------------------------------------------------------
    // Mobile devices
    // -------------------------------------------------------------------------
    'Device token is required'                                                                  => 'Device token is required',
    'Device token is too short'                                                                 => 'Device token is too short',
    'Device token is too long'                                                                  => 'Device token is too long',
    'Platform is required'                                                                      => 'Platform is required',
    'Platform must be ios or android'                                                           => 'Platform must be ios or android',
    'Device name is too long'                                                                   => 'Device name is too long',
    'App version is too long'                                                                   => 'App version is too long',
    'OS version is too long'                                                                    => 'OS version is too long',
    'Device registered successfully'                                                            => 'Device registered successfully',
    'Failed to register device'                                                                 => 'Failed to register device',
    'Device unregistered successfully'                                                          => 'Device unregistered successfully',
    'Failed to unregister device'                                                               => 'Failed to unregister device',
    'Device not found'                                                                          => 'Device not found',
    'Active device not found'                                                                   => 'Active device not found',
    'Invalid device ID format'                                                                  => 'Invalid device ID format',
    'Failed to list devices'                                                                    => 'Failed to list devices',
    'Failed to toggle device'                                                                   => 'Failed to toggle device',
    'Failed to update device'                                                                   => 'Failed to update device',
    'Device activated'                                                                          => 'Device activated',
    'Device deactivated'                                                                        => 'Device deactivated',
    'Test notification sent'                                                                    => 'Test notification sent',
    'Failed to send test notification'                                                          => 'Failed to send test notification',

    // -------------------------------------------------------------------------
    // Users
    // -------------------------------------------------------------------------
    'User not found'                                                                            => 'User not found',
    'User blocked'                                                                              => 'User blocked',
    'User unblocked'                                                                            => 'User unblocked',
    'Failed to block user'                                                                      => 'Failed to block user',
    'Failed to unblock user'                                                                    => 'Failed to unblock user',

    // -------------------------------------------------------------------------
    // Error / 404 pages
    // -------------------------------------------------------------------------
    'Page not found'                                                                            => 'Page not found',
    'The page you are looking for does not exist or has been removed'                           => 'The page you are looking for does not exist or has been removed',
    'Please check the URL and try again'                                                        => 'Please check the URL and try again',
    'Back to home'                                                                              => 'Back to home',
];