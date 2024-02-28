import { ITransactionModel } from 'lib/types/interface';

export const transactionsData: ITransactionModel[] = [
  {
    id: 1,
    user_id: 1,
    package_id: 3,
    quantity: 1,
    checkout_at: new Date(),
    is_paid: true,
  },
  {
    id: 2,
    user_id: 1,
    package_id: 2,
    checkout_at: new Date(),
    quantity: 1,
    is_paid: true,
  },
  {
    id: 3,
    user_id: 1,
    package_id: 1,
    checkout_at: new Date(),
    quantity: 1,
    is_paid: true,
  },
  {
    id: 4,
    user_id: 2,
    package_id: 5,
    checkout_at: new Date(),
    quantity: 1,
    is_paid: true,
  },
  {
    id: 5,
    user_id: 5,
    package_id: 6,
    checkout_at: new Date(),
    quantity: 1,
    is_paid: false,
  },
];
