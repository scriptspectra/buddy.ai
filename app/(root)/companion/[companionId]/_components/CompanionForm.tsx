"use client";

import { Category, Companion } from '@prisma/client';
import React from 'react'

interface CompanionFormprops {
    initialData: Companion | null,
    categories: Category[],
}

const CompanionForm = ({
    initialData,
    categories,
}: CompanionFormprops) => {
  return (
    <div>CompanionForm</div>
  )
}

export default CompanionForm