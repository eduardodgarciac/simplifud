'use client'

import { HTMLAttributes, useState } from 'react'
import { CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export function DateRangePicker ({
    className
}: HTMLAttributes<HTMLDivElement>) {
    const [date, setDate] = useState<DateRange | undefined>()

    return (
        <div className={cn('grid gap-2', className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={'outline'}
                        className={cn(
                            'w-[300px] justify-start text-left font-normal',
                            !date && 'text-muted-foreground'
                        )}
                    >
                        <div className="w-full flex items-center justify-between">
                            <div>
                                {date?.from ? (
                                    date.to ? (
                                        <>
                                            {format(date.from, 'dd/MM/yy', { locale: es })}{' '}-{' '}
                                            {format(date.to, 'dd/MM/yy', { locale: es })}
                                        </>
                                    ) : (
                                        format(date.from, 'dd / MM / yy', { locale: es })
                                    )
                                ) : (
                                    <span>Selecciona una fecha</span>
                                )}
                            </div>
                            <CalendarIcon/>
                        </div>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        autoFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
