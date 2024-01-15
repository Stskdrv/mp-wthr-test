'use client'

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const Navbar = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) => {
    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/map`,
            label: '🗺️ Live location',
            active: pathname === `/map`,
        },
        {
            href: `/search`,
            label: '🔍 Search place',
            active: pathname === `/search`,
        },
        {
            href: `/weather`,
            label: '🌤️ Weather',
            active: pathname === `/weather`,
        },
        {
            href: `/history`,
            label: '📜 History',
            active: pathname === `/history`,
        },
       
    ];
    return (
        <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
            {
                routes.map((route) => (
                    <Link
                        data-testid={route.href}
                        href={route.href}
                        key={route.label}
                        className={cn('text-sm font-medium transition-colors hover:text-primary', 
                            route.active ? "text-black dark:text-white" : "text-muted-foreground")
                    }>
                        {route.label}
                    </Link>
                ))
            }
        </nav>
    )
}

export default Navbar;