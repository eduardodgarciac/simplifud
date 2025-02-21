import { getQueryClient } from '@/lib/query-client'
import { DateRangePicker } from '@/components/date-range-picker'
import { OrdersList } from '@/app/orders/_components/orders-list'
import { getOrdersOptions } from '@/app/orders/orders'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { LogoutForm } from '@/app/login/_components/logout-form'

export default async function Page () {
    const queryClient = getQueryClient()
    await queryClient.prefetchQuery(getOrdersOptions())

    return (
        <div className="flex flex-col flex-nowrap gap-y-4 divide-y-2 divide-primary min-h-svh w-full p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex flex-col items-center sm:items-start gap-1">
                    <div className="block text-sm">Bienvenido <span className="font-semibold">Comercializadora la Noria</span></div>
                    <div className="flex items-center gap-x-1.5">
                        <span className="text-2xl font-bold">Mis pedidos</span>
                        <LogoutForm/>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="block text-sm font-semibold">Rango de fechas</div>
                    <DateRangePicker/>
                </div>
            </div>
            <div className="grow">
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <OrdersList/>
                </HydrationBoundary>
            </div>
        </div>
    )
}
