'use client'

import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/data-table-column-header'
import { Button } from '@/components/ui/button'
import { Eye, X } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

import { Order } from '@/types/order'
import { DataTable } from '@/components/data-table'
import { useMemo, useState } from 'react'
import { OrderViewDialog } from '@/app/orders/_components/order-view-dialog'
import { OrderDeleteDialog } from '@/app/orders/_components/order-delete-dialog'
import { useQuery } from '@tanstack/react-query'
import { getOrdersOptions } from '@/app/orders/orders'

export function OrdersList () {
    const { data: orders } = useQuery(getOrdersOptions())
    const [order, setOrder] = useState<Order | null>(null)
    const [viewDialog, setViewDialog] = useState<boolean>(false)
    const [deleteDialog, setDeleteDialog] = useState<boolean>(false)

    function onClickAction (action: 'view' | 'delete', order: Order) {
        setOrder(order)
        if (action === 'view') setViewDialog(true)
        else if (action === 'delete') setDeleteDialog(true)
    }

    function onViewDialogChange (open: boolean) {
        if (!open) setOrder(null)
        setViewDialog(open)
    }

    function onDeleteDialogChange (open: boolean) {
        if (!open) setOrder(null)
        setDeleteDialog(open)
    }

    const columns: ColumnDef<Order, string>[] = useMemo(() => [{
        accessorKey: 'order_num',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Número de orden" className="font-semibold text-foreground"/>,
        cell: ({ getValue }) => <div className="text-center font-semibold">Ap-{getValue()}</div>
    }, {
        accessorKey: 'channel',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Medio de ingreso" className="font-semibold text-foreground"/>,
        cell: ({ getValue }) => <div className="text-center">{getValue()}</div>
    }, {
        accessorKey: 'created_at',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Fecha de creación" className="font-semibold text-foreground"/>,
        cell: ({ getValue }) => <div className="text-center">{format(parseISO(getValue()), 'dd / MMMM / yyyy - hh:mm aa', { locale: es })}</div>
    }, {
        accessorKey: 'customer_name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre del cliente" className="font-semibold text-foreground"/>,
        cell: ({ getValue }) => <div className="text-center">{getValue()}</div>
    }, {
        accessorKey: 'delivery_date',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Fecha de entrega" className="font-semibold text-foreground"/>,
        cell: ({ getValue }) => <div className="text-center">{format(parseISO(getValue()), 'dd / MMMM / yyyy', { locale: es })}</div>
    }, {
        accessorKey: 'delivery_time',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Hora de entrega" className="font-semibold text-foreground"/>,
        cell: ({ getValue }) => <div className="text-center">{format(parseISO(getValue()), 'hh:mm aa', { locale: es })}</div>
    }, {
        accessorKey: 'actions',
        enableSorting: false,
        header: ({ column }) => <DataTableColumnHeader column={column} title="Acciones" className="font-semibold text-foreground"/>,
        cell: ({ row }) => (
            <div className="flex items-center justify-center gap-x-3">
                <Button variant="outline" size="icon" className="border-blue-600 text-blue-600 hover:text-blue-600 hover:bg-blue-100" onClick={() => onClickAction('view', row.original)}><Eye/></Button>
                <Button variant="outline" size="icon" className="border-red-600 text-red-600 hover:text-red-600 hover:bg-red-100" onClick={() => onClickAction('delete', row.original)}><X/></Button>
            </div>
        )
    }], [])

    return (
        <>
            <DataTable columns={columns} data={orders}/>

            <OrderViewDialog order={order} open={viewDialog} onOpenChange={onViewDialogChange}/>

            <OrderDeleteDialog order={order} open={deleteDialog} onOpenChange={onDeleteDialogChange}/>
        </>
    )
}
