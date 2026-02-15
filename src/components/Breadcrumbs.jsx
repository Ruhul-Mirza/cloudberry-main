"use client"
import { Home, ChevronRight } from "lucide-react";
import Link from "next/link";

const Breadcrumbs = ({ items }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-sm text-muted-foreground"
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}

          {item.href ? (
            <Link
              href={item.href}
              className="flex items-center gap-1 transition-colors hover:text-foreground"
            >
              {item.icon}
              {item.label && <span>{item.label}</span>}
            </Link>
          ) : (
            <span className="flex items-center gap-1 font-medium text-foreground">
              {item.icon}
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
