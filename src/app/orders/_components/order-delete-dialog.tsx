'use client'

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { DialogProps } from '@radix-ui/react-dialog'
import { Order } from '@/types/order'
import { deleteOrderOptions } from '@/app/orders/orders'
import { useMutation } from '@tanstack/react-query'

type OrderDeleteDialog = DialogProps & {
    order: Order | null;
}

export function OrderDeleteDialog ({ order, open, onOpenChange }: OrderDeleteDialog) {
    const deleteOrder = useMutation(deleteOrderOptions())

    async function onClickOk () {
        if (!order || !onOpenChange) return

        await deleteOrder.mutateAsync(order)

        onOpenChange(false)
    }

    if (!order) return

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirmación</AlertDialogTitle>
                    <AlertDialogDescription>
                        ¿Realmente desea eliminar la <strong>Orden #{order.order_num}</strong>?
                        <br/>
                        <span className="text-destructive text-xs">*Esta acción no se puede deshacer.</span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <Button variant="destructive" loading={deleteOrder.isPending} onClick={onClickOk}>Eliminar</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
