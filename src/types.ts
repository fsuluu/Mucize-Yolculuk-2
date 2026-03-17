import React from 'react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface BloodSugarRecord {
  id: string;
  meal: string;
  hungerStatus: string;
  date: string;
  time: string;
  value: number;
  insulinDose?: string;
}

export interface ActivityRecord {
  id: string;
  type: string;
  duration: number;
  status: string;
  dateTime: string;
}

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  unit: string;
  description: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  isUnlocked: boolean;
  requirement: string;
}

export interface Quest {
  id: string;
  title: string;
  reward: number;
  isCompleted: boolean;
  type: 'blood_sugar' | 'activity' | 'food' | 'water';
}
