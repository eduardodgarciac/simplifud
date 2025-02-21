import { Column } from '@tanstack/react-table'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react'

interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>
    title: string
}

export function DataTableColumnHeader<TData, TValue> ({
    column,
    title,
    className
}: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) {
        return <div className={cn('w-full text-center', className)}>{title}</div>
    }

    return (
        <Button variant="ghost" size="sm" className={cn('w-full', className)} onClick={() => column.toggleSorting(undefined, column.getCanMultiSort())}>
            <span>{title}</span>
            {column.getIsSorted() === 'desc' ? (
                <ChevronDown className="text-primary"/>
            ) : column.getIsSorted() === 'asc' ? (
                <ChevronUp className="text-primary"/>
            ) : (
                <ChevronsUpDown/>
            )}
        </Button>
    )
}
