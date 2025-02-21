import { LoginForm } from '@/app/login/_components/login-form'

export default function Page () {
    const styles = {
        background: 'radial-gradient(circle at top, #fc8346, #dad5c7)'
    }

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10" style={styles}>
            <div className="w-full max-w-sm">
                <LoginForm/>
            </div>
        </div>
    )
}
