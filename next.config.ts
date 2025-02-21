import type { NextConfig } from 'next'

module.exports = {
    async redirects () {
        return [{
            source: '/',
            destination: '/login',
            permanent: false
        }]
    }
}

const nextConfig: NextConfig = {
    /* config options here */
}

export default nextConfig
