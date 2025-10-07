export function getUserFriendlyErrorMessage(error: string): string {
  const lowerError = error.toLowerCase();

  if (lowerError.includes('unauthorized') || lowerError.includes('not authenticated')) {
    return 'Please log in to continue';
  }
  if (lowerError.includes('invalid credentials') || lowerError.includes('incorrect password')) {
    return 'The email or password you entered is incorrect';
  }
  if (lowerError.includes('email already') || lowerError.includes('already exists')) {
    return 'An account with this email already exists';
  }
  if (lowerError.includes('passwords do not match')) {
    return 'The passwords you entered do not match';
  }
  if (lowerError.includes('password') && lowerError.includes('weak')) {
    return 'Please choose a stronger password';
  }
  if (lowerError.includes('terms') && lowerError.includes('accept')) {
    return 'You must accept the terms and conditions to continue';
  }

  if (lowerError.includes('network') || lowerError.includes('fetch failed')) {
    return 'Unable to connect. Please check your internet connection';
  }
  if (lowerError.includes('timeout')) {
    return 'The request took too long. Please try again';
  }

  if (lowerError.includes('required')) {
    return 'Please fill in all required fields';
  }
  if (lowerError.includes('invalid email')) {
    return 'Please enter a valid email address';
  }
  if (lowerError.includes('invalid phone')) {
    return 'Please enter a valid phone number';
  }

  if (lowerError.includes('not found')) {
    return 'The requested item could not be found';
  }
  if (lowerError.includes('forbidden') || lowerError.includes('permission')) {
    return 'You do not have permission to perform this action';
  }
  if (lowerError.includes('server error') || lowerError.includes('500')) {
    return 'Something went wrong on our end. Please try again later';
  }

  return error || 'Something went wrong. Please try again';
}
