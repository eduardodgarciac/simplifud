'use client'

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Button } from '@/components/ui/button'

import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { Order } from '@/types/order'
import { DialogProps } from '@radix-ui/react-dialog'

type OrderViewProps = DialogProps & {
    order: Order | null;
}

export function OrderViewDialog ({ open, onOpenChange, order }: OrderViewProps) {
    if (!order) return

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-sm sm:max-w-[450px]">
                <DialogHeader>
                    <DialogTitle>Orden #{order.order_num}</DialogTitle>
                    <VisuallyHidden>
                        <DialogDescription></DialogDescription>
                    </VisuallyHidden>
                </DialogHeader>
                <Table>
                    <TableBody>
                        <TableRow className="border-0">
                            <TableHead className="font-medium text-right">Medio de ingreso:</TableHead>
                            <TableCell>{order.channel}</TableCell>
                        </TableRow>
                        <TableRow className="border-0">
                            <TableHead className="font-medium text-right">Fecha de creación:</TableHead>
                            <TableCell>{format(parseISO(order.created_at), 'dd / MMMM / yyyy - hh:mm aa', { locale: es })}</TableCell>
                        </TableRow>
                        <TableRow className="border-0">
                            <TableHead className="font-medium text-right">Nombre del cliente:</TableHead>
                            <TableCell>{order.customer_name}</TableCell>
                        </TableRow>
                        <TableRow className="border-0">
                            <TableHead className="font-medium text-right">Fecha de entrega:</TableHead>
                            <TableCell>{format(parseISO(order.delivery_date), 'dd / MMMM / yyyy', { locale: es })}</TableCell>
                        </TableRow>
                        <TableRow className="border-0">
                            <TableHead className="font-medium text-right">Hora de entrega:</TableHead>
                            <TableCell>{format(parseISO(order.delivery_time), 'hh:mm aa', { locale: es })}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="submit" variant="secondary">Cerrar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
