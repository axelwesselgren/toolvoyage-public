"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { NavMain } from "@/components/nav-main"
import { NavSettings } from "@/components/nav-settings"
import { NavSecondary } from "@/components/nav-secondary"
import { WrappedLogo } from "@/components/icons/logo"
import {
  Bell,
  BookOpen,
  CreditCard,
  LayoutDashboard,
  LifeBuoy,
  PieChart,
  Send,
  Settings2,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: PieChart,
    },
    {
      title: "Documentation",
      url: "/docs",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "/docs",
        },
        {
          title: "Get Started",
          url: "/docs",
        },
        {
          title: "Tutorials",
          url: "/docs",
        },
        {
          title: "Changelog",
          url: "/docs",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    }
  ],
  projects: [
    {
      name: "General Settings",
      url: "/dashboard/settings",
      icon: Settings2,
    },
    {
      name: "Billing",
      url: "/dashboard/billing",
      icon: CreditCard,
    },
    {
      name: "Notifications",
      url: "/dashboard/notifications",
      icon: Bell,
    },
  ],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
				<Sidebar variant="inset">
				<SidebarHeader>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton size="lg" asChild >
								<Link href="/" passHref>
									<WrappedLogo scale={1} adjusted={false} />
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>
				<SidebarContent>
					<NavMain items={data.navMain} />
					<NavSettings projects={data.projects} />
					<NavSecondary items={data.navSecondary} className="mt-auto" />
				</SidebarContent>
			</Sidebar>
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
