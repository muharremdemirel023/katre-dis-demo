/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Appointment {
  id: string;
  name: string;
  phone: string;
  email: string;
  treatmentId: string;
  doctorId: string;
  date: string;
  time: string;
  note: string;
  status: 'PENDING' | 'APPROVED' | 'CANCELLED';
  createdAt: string;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  image: string;
  specialty: string;
  experience: string;
  education: string;
  about: string;
  rating: number;
}

export interface Treatment {
  id: string;
  name: string;
  description: string;
  priceRange: string;
  duration: string;
  iconName: string;
  fullDetails: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  service: string;
}
