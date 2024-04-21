'use client'

import { Heading } from "@/components/ui/heading";
import { Store } from "@prisma/client"

interface SettingFormProps {
    initailData: Store;
}

const SettingsForm: React.FC<SettingFormProps> = ({
    initailData
}) => {
  return (
    <div className="flex items-center justify-between">
        <Heading
            title="Settings"
            description="Manage store prefrences"
        />
    </div>
  )
}

export default SettingsForm