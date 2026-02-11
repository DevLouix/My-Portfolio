"use client"
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

export default function MainProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <MantineProvider>
            <Notifications position='top-left'/>
            {children}
        </MantineProvider>
    );
}
