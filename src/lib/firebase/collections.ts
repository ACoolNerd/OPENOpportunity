/**
 * Firestore collection helpers.
 *
 * Centralises collection names so they can be updated in one place and
 * provides typed converter factories.
 */

import {
  collection,
  CollectionReference,
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from 'firebase/firestore';
import { db } from './config';

// ─── Collection names ─────────────────────────────────────────────────────────

export const COLLECTIONS = {
  PACKS:        'packs',
  CARDS:        'cards',
  CREATORS:     'creators',
  TRANSACTIONS: 'transactions',
  PASSPORTS:    'passports',
  USERS:        'users',
} as const;

// ─── Generic typed converter ──────────────────────────────────────────────────

function createConverter<T extends DocumentData>(): FirestoreDataConverter<T> {
  return {
    toFirestore(data: WithFieldValue<T>): DocumentData {
      return data as DocumentData;
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions,
    ): T {
      return snapshot.data(options) as T;
    },
  };
}

// ─── Typed collection refs ────────────────────────────────────────────────────

import type { Pack, Card, Creator, Transaction, DigitalPassport } from '@/types';

export const packsCollection = (): CollectionReference<Pack> =>
  collection(db, COLLECTIONS.PACKS).withConverter(createConverter<Pack>());

export const cardsCollection = (): CollectionReference<Card> =>
  collection(db, COLLECTIONS.CARDS).withConverter(createConverter<Card>());

export const creatorsCollection = (): CollectionReference<Creator> =>
  collection(db, COLLECTIONS.CREATORS).withConverter(createConverter<Creator>());

export const transactionsCollection = (): CollectionReference<Transaction> =>
  collection(db, COLLECTIONS.TRANSACTIONS).withConverter(
    createConverter<Transaction>(),
  );

export const passportsCollection = (): CollectionReference<DigitalPassport> =>
  collection(db, COLLECTIONS.PASSPORTS).withConverter(
    createConverter<DigitalPassport>(),
  );
