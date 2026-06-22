const color = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "error",
  "neutral"
] as const

export default {
  "slots": {
    "root": "relative group overflow-hidden bg-default shadow-lg rounded-lg ring ring-default p-4 flex gap-2.5",
    "wrapper": "w-0 flex-1 flex flex-col",
    "title": "text-sm font-medium text-highlighted",
    "description": "text-sm text-muted",
    "icon": "shrink-0 size-5",
    "avatar": "shrink-0",
    "avatarSize": "2xl",
    "actions": "flex gap-1.5 shrink-0",
    "progress": "absolute inset-x-0 bottom-0",
    "close": "p-0"
  },
  "variants": {
    "color": {
      "primary": {
        "root": "outline-primary/25 focus-visible:outline-3 focus-visible:ring-primary",
        "icon": "text-primary"
      },
      "secondary": {
        "root": "outline-secondary/25 focus-visible:outline-3 focus-visible:ring-secondary",
        "icon": "text-secondary"
      },
      "success": {
        "root": "outline-success/25 focus-visible:outline-3 focus-visible:ring-success",
        "icon": "text-success"
      },
      "info": {
        "root": "outline-info/25 focus-visible:outline-3 focus-visible:ring-info",
        "icon": "text-info"
      },
      "warning": {
        "root": "outline-warning/25 focus-visible:outline-3 focus-visible:ring-warning",
        "icon": "text-warning"
      },
      "error": {
        "root": "outline-error/25 focus-visible:outline-3 focus-visible:ring-error",
        "icon": "text-error"
      },
      "neutral": {
        "root": "outline-inverted/25 focus-visible:outline-3 focus-visible:ring-inverted",
        "icon": "text-highlighted"
      }
    },
    "orientation": {
      "horizontal": {
        "root": "items-center",
        "actions": "items-center"
      },
      "vertical": {
        "root": "items-start",
        "actions": "items-start mt-2.5"
      }
    },
    "title": {
      "true": {
        "description": "mt-1"
      }
    }
  },
  "defaultVariants": {
    "color": "primary" as typeof color[number]
  }
}