const color = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "error",
  "neutral"
] as const

const variant = [
  "pill",
  "link"
] as const

const orientation = [
  "horizontal",
  "vertical"
] as const

const size = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl"
] as const

export default {
  "slots": {
    "root": "flex items-center gap-2",
    "list": "relative flex p-1 group",
    "indicator": "absolute transition-[translate,width] duration-200",
    "trigger": [
      "group relative inline-flex items-center min-w-0 data-[state=inactive]:text-muted hover:data-[state=inactive]:not-disabled:text-default font-medium rounded-md disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leadingIcon": "shrink-0",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "label": "truncate",
    "trailingBadge": "shrink-0",
    "trailingBadgeSize": "sm",
    "content": "w-full rounded-md focus-visible:outline-3"
  },
  "variants": {
    "color": {
      "primary": {
        "content": "outline-primary/25"
      },
      "secondary": {
        "content": "outline-secondary/25"
      },
      "success": {
        "content": "outline-success/25"
      },
      "info": {
        "content": "outline-info/25"
      },
      "warning": {
        "content": "outline-warning/25"
      },
      "error": {
        "content": "outline-error/25"
      },
      "neutral": {
        "content": "outline-inverted/25"
      }
    },
    "variant": {
      "pill": {
        "list": "bg-elevated rounded-lg",
        "trigger": [
          "grow",
          "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:content-[''] in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:absolute in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:inset-0 in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:rounded-md in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:shadow-xs in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:-z-10 in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:isolate"
        ],
        "indicator": "rounded-md shadow-xs"
      },
      "link": {
        "list": "border-default",
        "indicator": "rounded-full",
        "trigger": "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:content-[''] in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:absolute in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:rounded-full"
      }
    },
    "orientation": {
      "horizontal": {
        "root": "flex-col",
        "list": "w-full",
        "indicator": "left-0 w-(--reka-tabs-indicator-size) translate-x-(--reka-tabs-indicator-position)",
        "trigger": "justify-center"
      },
      "vertical": {
        "list": "flex-col",
        "indicator": "top-0 h-(--reka-tabs-indicator-size) translate-y-(--reka-tabs-indicator-position)"
      }
    },
    "size": {
      "xs": {
        "trigger": "px-2 py-1 text-xs gap-1",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs"
      },
      "sm": {
        "trigger": "px-2.5 py-1.5 text-xs gap-1.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs"
      },
      "md": {
        "trigger": "px-3 py-1.5 text-sm gap-1.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs"
      },
      "lg": {
        "trigger": "px-3 py-2 text-sm gap-2",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs"
      },
      "xl": {
        "trigger": "px-3 py-2 text-base gap-2",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs"
      }
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal" as typeof orientation[number],
      "variant": "pill" as typeof variant[number],
      "class": {
        "indicator": "inset-y-1"
      }
    },
    {
      "orientation": "horizontal" as typeof orientation[number],
      "variant": "link" as typeof variant[number],
      "class": {
        "list": "border-b -mb-px",
        "indicator": "-bottom-px h-px",
        "trigger": "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:inset-x-0 in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:-bottom-[calc(var(--spacing)+1px)] in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:h-px"
      }
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "variant": "pill" as typeof variant[number],
      "class": {
        "indicator": "inset-x-1",
        "list": "items-center",
        "trigger": "w-full justify-center"
      }
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "variant": "link" as typeof variant[number],
      "class": {
        "list": "border-s -ms-px",
        "indicator": "-start-px w-px",
        "trigger": "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:inset-y-0 in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:-start-[calc(var(--spacing)+1px)] in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:w-px"
      }
    },
    {
      "color": "primary" as typeof color[number],
      "variant": "pill" as typeof variant[number],
      "class": {
        "indicator": "bg-primary",
        "trigger": [
          "data-[state=active]:text-inverted outline-primary/25 focus-visible:outline-3",
          "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:bg-primary"
        ]
      }
    },
    {
      "color": "secondary" as typeof color[number],
      "variant": "pill" as typeof variant[number],
      "class": {
        "indicator": "bg-secondary",
        "trigger": [
          "data-[state=active]:text-inverted outline-secondary/25 focus-visible:outline-3",
          "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:bg-secondary"
        ]
      }
    },
    {
      "color": "success" as typeof color[number],
      "variant": "pill" as typeof variant[number],
      "class": {
        "indicator": "bg-success",
        "trigger": [
          "data-[state=active]:text-inverted outline-success/25 focus-visible:outline-3",
          "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:bg-success"
        ]
      }
    },
    {
      "color": "info" as typeof color[number],
      "variant": "pill" as typeof variant[number],
      "class": {
        "indicator": "bg-info",
        "trigger": [
          "data-[state=active]:text-inverted outline-info/25 focus-visible:outline-3",
          "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:bg-info"
        ]
      }
    },
    {
      "color": "warning" as typeof color[number],
      "variant": "pill" as typeof variant[number],
      "class": {
        "indicator": "bg-warning",
        "trigger": [
          "data-[state=active]:text-inverted outline-warning/25 focus-visible:outline-3",
          "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:bg-warning"
        ]
      }
    },
    {
      "color": "error" as typeof color[number],
      "variant": "pill" as typeof variant[number],
      "class": {
        "indicator": "bg-error",
        "trigger": [
          "data-[state=active]:text-inverted outline-error/25 focus-visible:outline-3",
          "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:bg-error"
        ]
      }
    },
    {
      "color": "neutral" as typeof color[number],
      "variant": "pill" as typeof variant[number],
      "class": {
        "indicator": "bg-inverted",
        "trigger": [
          "data-[state=active]:text-inverted outline-inverted/25 focus-visible:outline-3",
          "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:bg-inverted"
        ]
      }
    },
    {
      "color": "primary" as typeof color[number],
      "variant": "link" as typeof variant[number],
      "class": {
        "indicator": "bg-primary",
        "trigger": [
          "data-[state=active]:text-primary outline-primary/25 focus-visible:outline-3",
          "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:bg-primary"
        ]
      }
    },
    {
      "color": "secondary" as typeof color[number],
      "variant": "link" as typeof variant[number],
      "class": {
        "indicator": "bg-secondary",
        "trigger": [
          "data-[state=active]:text-secondary outline-secondary/25 focus-visible:outline-3",
          "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:bg-secondary"
        ]
      }
    },
    {
      "color": "success" as typeof color[number],
      "variant": "link" as typeof variant[number],
      "class": {
        "indicator": "bg-success",
        "trigger": [
          "data-[state=active]:text-success outline-success/25 focus-visible:outline-3",
          "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:bg-success"
        ]
      }
    },
    {
      "color": "info" as typeof color[number],
      "variant": "link" as typeof variant[number],
      "class": {
        "indicator": "bg-info",
        "trigger": [
          "data-[state=active]:text-info outline-info/25 focus-visible:outline-3",
          "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:bg-info"
        ]
      }
    },
    {
      "color": "warning" as typeof color[number],
      "variant": "link" as typeof variant[number],
      "class": {
        "indicator": "bg-warning",
        "trigger": [
          "data-[state=active]:text-warning outline-warning/25 focus-visible:outline-3",
          "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:bg-warning"
        ]
      }
    },
    {
      "color": "error" as typeof color[number],
      "variant": "link" as typeof variant[number],
      "class": {
        "indicator": "bg-error",
        "trigger": [
          "data-[state=active]:text-error outline-error/25 focus-visible:outline-3",
          "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:bg-error"
        ]
      }
    },
    {
      "color": "neutral" as typeof color[number],
      "variant": "link" as typeof variant[number],
      "class": {
        "indicator": "bg-inverted",
        "trigger": [
          "data-[state=active]:text-highlighted outline-inverted/25 focus-visible:outline-3",
          "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:bg-inverted"
        ]
      }
    }
  ],
  "defaultVariants": {
    "color": "primary" as typeof color[number],
    "variant": "pill" as typeof variant[number],
    "size": "md" as typeof size[number]
  }
}