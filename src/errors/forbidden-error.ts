import { ApplicationError } from '@/utils/protocols';

export function forBiddenError(): ApplicationError {
  return {
    name: 'ForBiddenError',
    message: 'Forbidden Error!',
  };
}
