"use client"

import * as React from "react"

// Minimal Slot: merges props onto its single child element.
export const Slot = React.forwardRef<HTMLElement, { children?: React.ReactNode } & Record<string, unknown>>(
  function Slot({ children, ...props }, ref) {
    if (React.isValidElement(children)) {
      const child = children as React.ReactElement<Record<string, unknown>>
      return React.cloneElement(child, {
        ...props,
        ...(child.props as Record<string, unknown>),
        ref,
      } as Record<string, unknown>)
    }
    return null
  },
)
