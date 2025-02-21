'use client'

import { ComponentPropsWithoutRef, useActionState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { login } from '@/actions/auth'

export function LoginForm ({
    className,
    ...props
}: ComponentPropsWithoutRef<'div'>) {
    const [state, action, pending] = useActionState(login, undefined)

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card className="drop-shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl text-primary">Simplifud</CardTitle>
                    <CardDescription>
                        Ingresa tu correo y contraseña para iniciar sesión
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={action}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Correo</Label>
                                <Input id="email" name="email" type="email" placeholder="eve.holt@reqres.in" defaultValue="eve.holt@reqres.in" required/>
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Contraseña</Label>
                                    <a className="ml-auto inline-block text-sm text-gray-300 line-through hover:underline underline-offset-4 pointer-events-none">
                                        Olvidaste tu contraseña?
                                    </a>
                                </div>
                                <Input id="password" name="password" type="password" defaultValue="cityslicka" required/>
                            </div>
                            <Button className="w-full" type="submit" loading={pending}>
                                Entrar
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm text-gray-300 line-through">
                            No tienes una cuenta?{' '}
                            <a className="underline underline-offset-4 pointer-events-none">
                                Registrate
                            </a>
                        </div>
                        {!state?.success && <p className="text-destructive">{state?.message}</p>}
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
