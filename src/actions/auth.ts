'use server'

import { cookies } from 'next/headers'
import { redirect, RedirectType } from 'next/navigation'

type FormState = | {
    success?: boolean
    message?: string
} | undefined

async function setCookie (data: string) {
    const cookieStore = await cookies()
    cookieStore.set('session', data, {
        sameSite: 'lax',
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        path: '/'
    })
}

export async function login (state: FormState, formData: FormData) {
    const email = formData.get('email')
    const password = formData.get('password')
    if (!email || !password) {
        return { success: false, message: 'Email y contraseña son obligatorios' }
    }

    const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    if (!response.ok) {
        return { success: false, message: 'Credenciales inválidas' }
    }

    const { token: access_token } = await response.json()
    const expiresAt = new Date(Date.now() + 60 * 1000)
    const data = JSON.stringify({ access_token, refresh_token: access_token, expires_at: expiresAt })
    await setCookie(data)

    redirect('/orders', RedirectType.replace)
}

export async function logout () {
    const cookieStore = await cookies()
    cookieStore.delete('session')

    redirect('/login', RedirectType.replace)
}


export async function refreshToken () {
    // Simulating 50% chance success from token refresh
    const result = Math.random() >= 0.5
    if (!result) return false

    const cookieStore = await cookies()
    const { access_token } = JSON.parse(cookieStore.get('session')?.value ?? '{}')
    const expires = new Date(Date.now() + 60 * 1000)
    const data = JSON.stringify({ access_token, refresh_token: access_token, expires_at: expires })

    // Update cookie with the new token (actually using same data but updating the expiration time)
    await setCookie(data)
    return true
}
