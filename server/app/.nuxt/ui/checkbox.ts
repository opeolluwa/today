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
  "list",
  "card"
] as const

const indicator = [
  "start",
  "end",
  "hidden"
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
    "root": "relative flex items-start",
    "container": "flex items-center",
    "base": "rounded-sm ring ring-inset ring-accented overflow-hidden focus-visible:outline-3",
    "indicator": "flex items-center justify-center size-full text-inverted" as typeof indicator[number],
    "icon": "shrink-0 size-full",
    "wrapper": "w-full",
    "label": "block font-medium text-default",
    "description": "text-muted"
  },
  "variants": {
    "color": {
      "primary": {
        "base": "outline-primary/25 focus-visible:ring-primary",
        "indicator": "bg-primary" as typeof indicator[number]
      },
      "secondary": {
        "base": "outline-secondary/25 focus-visible:ring-secondary",
        "indicator": "bg-secondary" as typeof indicator[number]
      },
      "success": {
        "base": "outline-success/25 focus-visible:ring-success",
        "indicator": "bg-success" as typeof indicator[number]
      },
      "info": {
        "base": "outline-info/25 focus-visible:ring-info",
        "indicator": "bg-info" as typeof indicator[number]
      },
      "warning": {
        "base": "outline-warning/25 focus-visible:ring-warning",
        "indicator": "bg-warning" as typeof indicator[number]
      },
      "error": {
        "base": "outline-error/25 focus-visible:ring-error",
        "indicator": "bg-error" as typeof indicator[number]
      },
      "neutral": {
        "base": "outline-inverted/25 focus-visible:ring-inverted",
        "indicator": "bg-inverted" as typeof indicator[number]
      }
    },
    "variant": {
      "list": {
        "root": ""
      },
      "card": {
        "root": "border border-muted rounded-lg"
      }
    },
    "indicator": {
      "start": {
        "root": "flex-row",
        "wrapper": "ms-2"
      },
      "end": {
        "root": "flex-row-reverse",
        "wrapper": "me-2"
      },
      "hidden": {
        "base": "sr-only",
        "wrapper": "text-center"
      }
    },
    "size": {
      "xs": {
        "base": "size-3",
        "container": "h-4",
        "wrapper": "text-xs"
      },
      "sm": {
        "base": "size-3.5",
        "container": "h-4",
        "wrapper": "text-xs"
      },
      "md": {
        "base": "size-4",
        "container": "h-5",
        "wrapper": "text-sm"
      },
      "lg": {
        "base": "size-4.5",
        "container": "h-5",
        "wrapper": "text-sm"
      },
      "xl": {
        "base": "size-5",
        "container": "h-6",
        "wrapper": "text-base"
      }
    },
    "required": {
      "true": {
        "label": "after:content-['*'] after:ms-0.5 after:text-error"
      }
    },
    "disabled": {
      "true": {
        "root": "opacity-75",
        "base": "cursor-not-allowed",
        "label": "cursor-not-allowed",
        "description": "cursor-not-allowed"
      }
    },
    "highlight": {
      "true": ""
    },
    "checked": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "size": "xs" as typeof size[number],
      "variant": "card" as typeof variant[number],
      "class": {
        "root": "p-2.5"
      }
    },
    {
      "size": "sm" as typeof size[number],
      "variant": "card" as typeof variant[number],
      "class": {
        "root": "p-3"
      }
    },
    {
      "size": "md" as typeof size[number],
      "variant": "card" as typeof variant[number],
      "class": {
        "root": "p-3.5"
      }
    },
    {
      "size": "lg" as typeof size[number],
      "variant": "card" as typeof variant[number],
      "class": {
        "root": "p-4"
      }
    },
    {
      "size": "xl" as typeof size[number],
      "variant": "card" as typeof variant[number],
      "class": {
        "root": "p-4.5"
      }
    },
    {
      "color": "primary" as typeof color[number],
      "variant": "card" as typeof variant[number],
      "class": {
        "root": "has-data-[state=checked]:border-primary"
      }
    },
    {
      "color": "secondary" as typeof color[number],
      "variant": "card" as typeof variant[number],
      "class": {
        "root": "has-data-[state=checked]:border-secondary"
      }
    },
    {
      "color": "success" as typeof color[number],
      "variant": "card" as typeof variant[number],
      "class": {
        "root": "has-data-[state=checked]:border-success"
      }
    },
    {
      "color": "info" as typeof color[number],
      "variant": "card" as typeof variant[number],
      "class": {
        "root": "has-data-[state=checked]:border-info"
      }
    },
    {
      "color": "warning" as typeof color[number],
      "variant": "card" as typeof variant[number],
      "class": {
        "root": "has-data-[state=checked]:border-warning"
      }
    },
    {
      "color": "error" as typeof color[number],
      "variant": "card" as typeof variant[number],
      "class": {
        "root": "has-data-[state=checked]:border-error"
      }
    },
    {
      "color": "neutral" as typeof color[number],
      "variant": "card" as typeof variant[number],
      "class": {
        "root": "has-data-[state=checked]:border-inverted"
      }
    },
    {
      "variant": "card" as typeof variant[number],
      "disabled": true,
      "class": {
        "root": "cursor-not-allowed"
      }
    },
    {
      "color": "primary" as typeof color[number],
      "highlight": true,
      "class": {
        "base": "ring-primary"
      }
    },
    {
      "color": "secondary" as typeof color[number],
      "highlight": true,
      "class": {
        "base": "ring-secondary"
      }
    },
    {
      "color": "success" as typeof color[number],
      "highlight": true,
      "class": {
        "base": "ring-success"
      }
    },
    {
      "color": "info" as typeof color[number],
      "highlight": true,
      "class": {
        "base": "ring-info"
      }
    },
    {
      "color": "warning" as typeof color[number],
      "highlight": true,
      "class": {
        "base": "ring-warning"
      }
    },
    {
      "color": "error" as typeof color[number],
      "highlight": true,
      "class": {
        "base": "ring-error"
      }
    },
    {
      "color": "neutral" as typeof color[number],
      "highlight": true,
      "class": {
        "base": "ring-inverted"
      }
    }
  ],
  "defaultVariants": {
    "size": "md" as typeof size[number],
    "color": "primary" as typeof color[number],
    "variant": "list" as typeof variant[number],
    "indicator": "start" as typeof indicator[number]
  }
}