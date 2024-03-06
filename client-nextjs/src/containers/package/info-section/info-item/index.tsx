import React from 'react'

interface InfoItemProps {
  children: React.ReactNode | string
  title: string
  icon: React.ReactNode
}

export default function InfoItem({
  children,
  title,
  icon
}: InfoItemProps): React.ReactNode {
  return (
    <div className="flex items-center gap-6">
      {icon}
      <div>
        <p className="font-bold text-heading-3">{title}</p>
        <p className="text-gray-70 font-medium text-heading-4">{children}</p>
      </div>
    </div>
  )
}
