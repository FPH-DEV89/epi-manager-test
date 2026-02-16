import { expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Navbar from './navbar'

// Mocks
vi.mock("next/navigation", () => ({
    usePathname: () => "/",
    useRouter: () => ({
        push: vi.fn(),
        refresh: vi.fn(),
    }),
}))

vi.mock("next/link", () => ({
    default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}))

vi.mock("@/app/lib/actions", () => ({
    handleSignOut: vi.fn(),
}))

test('Navbar renders correctly', () => {
    render(<Navbar />)
    expect(screen.getByText('EPI MANAGER')).toBeDefined()
    expect(screen.getByText('Employé')).toBeDefined()
    expect(screen.getByText('Manager')).toBeDefined()
})
