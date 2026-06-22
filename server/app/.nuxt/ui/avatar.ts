const color = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "error",
  "neutral"
] as const

const size = [
  "3xs",
  "2xs",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl"
] as const

export default {
  "slots": {
    "root": "inline-flex items-center justify-center shrink-0 select-none rounded-full align-middle",
    "image": "h-full w-full rounded-[inherit] object-cover",
    "fallback": "font-medium truncate",
    "icon": "shrink-0"
  },
  "variants": {
    "color": {
      "primary": {
        "root": "bg-primary/10",
        "fallback": "text-primary",
        "icon": "text-primary"
      },
      "secondary": {
        "root": "bg-secondary/10",
        "fallback": "text-secondary",
        "icon": "text-secondary"
      },
      "success": {
        "root": "bg-success/10",
        "fallback": "text-success",
        "icon": "text-success"
      },
      "info": {
        "root": "bg-info/10",
        "fallback": "text-info",
        "icon": "text-info"
      },
      "warning": {
        "root": "bg-warning/10",
        "fallback": "text-warning",
        "icon": "text-warning"
      },
      "error": {
        "root": "bg-error/10",
        "fallback": "text-error",
        "icon": "text-error"
      },
      "neutral": {
        "root": "bg-elevated",
        "fallback": "text-muted",
        "icon": "text-muted"
      }
    },
    "size": {
      "3xs": {
        "root": "size-4 text-[8px]"
      },
      "2xs": {
        "root": "size-5 text-[10px]"
      },
      "xs": {
        "root": "size-6 text-xs"
      },
      "sm": {
        "root": "size-7 text-sm"
      },
      "md": {
        "root": "size-8 text-base"
      },
      "lg": {
        "root": "size-9 text-lg"
      },
      "xl": {
        "root": "size-10 text-xl"
      },
      "2xl": {
        "root": "size-11 text-[22px]"
      },
      "3xl": {
        "root": "size-12 text-2xl"
      }
    }
  },
  "defaultVariants": {
    "size": "md" as typeof size[number],
    "color": "neutral" as typeof color[number]
  }
}