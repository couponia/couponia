# Cookies Parser Documentation

## Overview
The cookies parser is a utility module that handles authentication cookie parsing and user verification in the Couponia application. It provides functionality to extract authentication tokens from cookies and verify user authentication status using the AuthService.

## Components

### `useCookiesParser`
A function that processes incoming HTTP requests to extract and validate authentication cookies.

#### Parameters
- `req`: HTTP request object containing headers

#### Returns
- `Promise<User | null>`: Returns the authenticated user object if valid, null otherwise

#### Usage Example
```typescript
const user = await useCookiesParser(request);
if (user) {
  // User is authenticated
  console.log(`Authenticated user: ${user.id}`);
} else {
  // User is not authenticated
  console.log('No authenticated user found');
}
```

### `getDB`
A utility function that determines which database client to use based on the access client type.

#### Parameters
- `client`: String indicating the client type ('admin' or other)

#### Returns
- `PrismaClient | AdminPrismaClient | undefined`: Returns the appropriate database client instance

#### Usage Example
```typescript
const dbClient = getDB('admin');
if (dbClient) {
  // Use admin database client
  const adminData = await dbClient.admin.findMany();
}
```

## Authentication Flow

1. **Cookie Extraction**
   - Checks for presence of request headers
   - Looks for 'x_couponia_auth' cookie in the request
   - Extracts the authorization token from the cookie

2. **Client Identification**
   - Reads the 'x-access-client' header to determine the client type
   - Used for database client selection

3. **User Verification**
   - Uses AuthService to verify the extracted authorization token
   - Returns the authenticated user if verification is successful

## Error Handling

The component implements graceful error handling:
- Returns null if headers are missing
- Returns null if no authentication cookie is present
- Handles malformed cookies gracefully

## Best Practices

1. **Security**
   - Always use HTTPS in production
   - Implement proper cookie security flags (HttpOnly, Secure, SameSite)
   - Regularly rotate authentication tokens

2. **Performance**
   - Cache database connections when possible
   - Implement rate limiting for authentication attempts

3. **Error Handling**
   - Always check for null returns
   - Implement proper logging for authentication failures
   - Handle edge cases (expired tokens, malformed cookies)

## Integration Example

```typescript
import { useCookiesParser } from './cookies.parser';

async function handleRequest(req: Request) {
  try {
    const user = await useCookiesParser(req);
    
    if (!user) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Proceed with authenticated request
    return new Response('Authorized', { status: 200 });
  } catch (error) {
    console.error('Authentication error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
```

## Dependencies

- `@prisma/client`: Database client for regular users
- `@admin/client`: Database client for admin operations
- `@/core/auth/service`: Authentication service

## Notes

- The component is designed to work with both regular and admin clients
- Authentication tokens should be properly formatted and encoded
- Database connections should be properly managed and closed
- Consider implementing token refresh mechanisms for long-running sessions

## Testing

When testing this component, ensure to cover:
1. Valid authentication scenarios
2. Missing or malformed cookies
3. Invalid authentication tokens
4. Different client types (admin vs regular)
5. Database connection handling
6. Error scenarios

## Future Improvements

1. Add support for multiple authentication methods
2. Implement token refresh mechanism
3. Add request rate limiting
4. Enhance error logging and monitoring
5. Add support for session management
6. Implement caching for frequently accessed user data 