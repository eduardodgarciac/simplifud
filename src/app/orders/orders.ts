import { queryOptions } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/query-client'
import { Order } from '@/types/order'

export function getOrdersOptions () {
    return queryOptions({
        queryKey: ['orders'],
        queryFn: async () => {
            const response = await fetch('https://67aa117865ab088ea7e58c36.mockapi.io/api/v1/order')
            return response.json()
        }
    })
}

export function deleteOrderOptions () {
    return {
        mutationFn: () => new Promise(res => setTimeout(res, 500)),
        onSuccess: async (result: unknown, order: Order) => {
            const queryClient = getQueryClient()
            const queryKey = getOrdersOptions().queryKey

            await queryClient.cancelQueries({ queryKey })
            queryClient.setQueryData(queryKey, (old) => old.filter((o: Order) => o.order_num !== order.order_num))
        }
    }
}
