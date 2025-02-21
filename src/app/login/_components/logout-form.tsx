'use client'

import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LogOut } from 'lucide-react'
import { useActionState } from 'react'
import { logout } from '@/actions/auth'

export function LogoutForm ({
    className,
    ...props
}: ButtonProps) {
    const [, action, pending] = useActionState(logout, undefined)

    return (
        <form action={action}>
            <Button type="submit" variant="ghost" size="icon" loading={pending} className={cn(className)} {...props}>
                {!pending && <LogOut/>}
            </Button>
        </form>
    )
}
