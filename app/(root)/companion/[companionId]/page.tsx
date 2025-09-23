import db from '@/lib/db'
import React from 'react'
import CompanionForm from './_components/CompanionForm'

interface CompanionIdPageProps {
    params: {
        companionId: string,
    }
}

const CompanionIdPage = async ({
    params
}: CompanionIdPageProps) => {
    const companion = await db.companion.findUnique({
        where: {
            id: params.companionId,
        }
    })

    const categories = await db.category.findMany()

  return (
    <div>
        <CompanionForm 
            initialData = {companion}
            categories = {categories}
        />
    </div>
  )
}

export default CompanionIdPage