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
  "xs",
  "sm",
  "md",
  "lg",
  "xl"
] as const

const orientation = [
  "horizontal",
  "vertical"
] as const

export default {
  "slots": {
    "root": "relative flex items-center select-none touch-none",
    "track": "relative bg-accented overflow-hidden rounded-full grow",
    "range": "absolute rounded-full",
    "thumb": "rounded-full bg-default ring-2 focus-visible:outline-3 focus-visible:outline-offset-2"
  },
  "variants": {
    "color": {
      "primary": {
        "range": "bg-primary",
        "thumb": "ring-primary outline-primary/25"
      },
      "secondary": {
        "range": "bg-secondary",
        "thumb": "ring-secondary outline-secondary/25"
      },
      "success": {
        "range": "bg-success",
        "thumb": "ring-success outline-success/25"
      },
      "info": {
        "range": "bg-info",
        "thumb": "ring-info outline-info/25"
      },
      "warning": {
        "range": "bg-warning",
        "thumb": "ring-warning outline-warning/25"
      },
      "error": {
        "range": "bg-error",
        "thumb": "ring-error outline-error/25"
      },
      "neutral": {
        "range": "bg-inverted",
        "thumb": "ring-inverted outline-inverted/25"
      }
    },
    "size": {
      "xs": {
        "thumb": "size-3"
      },
      "sm": {
        "thumb": "size-3.5"
      },
      "md": {
        "thumb": "size-4"
      },
      "lg": {
        "thumb": "size-4.5"
      },
      "xl": {
        "thumb": "size-5"
      }
    },
    "orientation": {
      "horizontal": {
        "root": "w-full",
        "range": "h-full"
      },
      "vertical": {
        "root": "flex-col h-full",
        "range": "w-full"
      }
    },
    "disabled": {
      "true": {
        "root": "opacity-75 cursor-not-allowed"
      }
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal" as typeof orientation[number],
      "size": "xs" as typeof size[number],
      "class": {
        "track": "h-[6px]"
      }
    },
    {
      "orientation": "horizontal" as typeof orientation[number],
      "size": "sm" as typeof size[number],
      "class": {
        "track": "h-[7px]"
      }
    },
    {
      "orientation": "horizontal" as typeof orientation[number],
      "size": "md" as typeof size[number],
      "class": {
        "track": "h-[8px]"
      }
    },
    {
      "orientation": "horizontal" as typeof orientation[number],
      "size": "lg" as typeof size[number],
      "class": {
        "track": "h-[9px]"
      }
    },
    {
      "orientation": "horizontal" as typeof orientation[number],
      "size": "xl" as typeof size[number],
      "class": {
        "track": "h-[10px]"
      }
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "size": "xs" as typeof size[number],
      "class": {
        "track": "w-[6px]"
      }
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "size": "sm" as typeof size[number],
      "class": {
        "track": "w-[7px]"
      }
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "size": "md" as typeof size[number],
      "class": {
        "track": "w-[8px]"
      }
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "size": "lg" as typeof size[number],
      "class": {
        "track": "w-[9px]"
      }
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "size": "xl" as typeof size[number],
      "class": {
        "track": "w-[10px]"
      }
    }
  ],
  "defaultVariants": {
    "size": "md" as typeof size[number],
    "color": "primary" as typeof color[number]
  }
}