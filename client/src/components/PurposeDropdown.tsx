import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button'
import { Control, Controller } from "react-hook-form";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FormData } from "@/userPages/Support";

interface purposeProps {
    control: Control<FormData>,
    defaultValue?: string

}

export default function PurposeDropdown({ control, defaultValue = '' }: purposeProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedRole, setSelectedRole] = useState("Select Purpose")

    return (
        <Controller
            name="purpose"
            control={control}
            defaultValue={defaultValue}
            rules={{ required: "Purpose is required" }}
            render={({ field }) => (
                <DropdownMenu
                    onOpenChange={(open) => setIsOpen(open)}
                >
                    <DropdownMenuTrigger asChild>
                        <Button className="w-full text-left bg-base-200  hover:bg-base-300 text-black relative">
                            {selectedRole}
                            <span className='absolute right-8'>{isOpen ? (<ChevronDown size={24} />) : (<ChevronUp size={24} />)}</span>
                        </Button>
                    </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-full ">
                            {["Medical Problem", "Financial Probelm"].map((role) => (
                                <DropdownMenuItem
                                    key={role}
                                    onClick={() => {
                                        setSelectedRole(role);
                                        field.onChange(role);
                                    }}
                                    className="min-w-[435px] text-left  py-2 relative"
                                >
                                    {role}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    
                </DropdownMenu>
            )}
        />
    )
}
