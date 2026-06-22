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
  "solid",
  "outline",
  "soft",
  "subtle"
] as const

const size = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl"
] as const

const view = [
  "day",
  "month",
  "year"
] as const

export default {
  "slots": {
    "root": "",
    "header": "flex items-center justify-between",
    "body": "flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0",
    "heading": "flex-1 min-w-0 text-center",
    "headingLabel": "font-medium block truncate p-1.5",
    "grid": "w-full border-collapse select-none space-y-1 focus:outline-none",
    "gridRow": "grid",
    "gridWeekDaysRow": "mb-1 grid w-full grid-cols-7",
    "gridBody": "grid",
    "headCell": "rounded-md",
    "headCellWeek": "rounded-md text-muted",
    "cell": "relative text-center",
    "cellTrigger": [
      "m-0.5 relative flex items-center justify-center whitespace-nowrap focus-visible:outline-3 data-disabled:text-muted data-unavailable:line-through data-unavailable:text-muted data-unavailable:pointer-events-none data-today:font-semibold",
      "transition"
    ],
    "cellWeek": "relative text-center text-muted"
  },
  "variants": {
    "color": {
      "primary": {
        "headCell": "text-primary",
        "cellTrigger": "outline-primary/25"
      },
      "secondary": {
        "headCell": "text-secondary",
        "cellTrigger": "outline-secondary/25"
      },
      "success": {
        "headCell": "text-success",
        "cellTrigger": "outline-success/25"
      },
      "info": {
        "headCell": "text-info",
        "cellTrigger": "outline-info/25"
      },
      "warning": {
        "headCell": "text-warning",
        "cellTrigger": "outline-warning/25"
      },
      "error": {
        "headCell": "text-error",
        "cellTrigger": "outline-error/25"
      },
      "neutral": {
        "headCell": "text-highlighted",
        "cellTrigger": "outline-inverted/25"
      }
    },
    "variant": {
      "solid": "",
      "outline": "",
      "soft": "",
      "subtle": ""
    },
    "size": {
      "xs": {
        "headingLabel": "text-xs",
        "cell": "text-xs",
        "cellWeek": "text-xs",
        "headCell": "text-[10px]",
        "headCellWeek": "text-[10px]",
        "body": "space-y-2 pt-2"
      },
      "sm": {
        "headingLabel": "text-xs",
        "headCell": "text-xs",
        "headCellWeek": "text-xs",
        "cellWeek": "text-xs",
        "cell": "text-xs"
      },
      "md": {
        "headingLabel": "text-sm",
        "headCell": "text-xs",
        "headCellWeek": "text-xs",
        "cellWeek": "text-xs",
        "cell": "text-sm"
      },
      "lg": {
        "headingLabel": "text-md",
        "headCell": "text-md",
        "headCellWeek": "text-md"
      },
      "xl": {
        "headingLabel": "text-lg",
        "headCell": "text-lg",
        "headCellWeek": "text-lg"
      }
    },
    "view": {
      "day": {
        "gridRow": "grid-cols-7 place-items-center",
        "cellTrigger": "rounded-full data-outside-view:text-muted"
      },
      "month": {
        "gridRow": "grid-cols-4",
        "cellTrigger": "rounded-md"
      },
      "year": {
        "gridRow": "grid-cols-4",
        "cellTrigger": "rounded-md"
      }
    },
    "weekNumbers": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "color": "primary" as typeof color[number],
      "variant": "solid" as typeof variant[number],
      "class": {
        "cellTrigger": "data-selected:bg-primary data-selected:text-inverted data-today:not-data-selected:text-primary data-highlighted:bg-primary/20 hover:not-data-selected:bg-primary/20"
      }
    },
    {
      "color": "secondary" as typeof color[number],
      "variant": "solid" as typeof variant[number],
      "class": {
        "cellTrigger": "data-selected:bg-secondary data-selected:text-inverted data-today:not-data-selected:text-secondary data-highlighted:bg-secondary/20 hover:not-data-selected:bg-secondary/20"
      }
    },
    {
      "color": "success" as typeof color[number],
      "variant": "solid" as typeof variant[number],
      "class": {
        "cellTrigger": "data-selected:bg-success data-selected:text-inverted data-today:not-data-selected:text-success data-highlighted:bg-success/20 hover:not-data-selected:bg-success/20"
      }
    },
    {
      "color": "info" as typeof color[number],
      "variant": "solid" as typeof variant[number],
      "class": {
        "cellTrigger": "data-selected:bg-info data-selected:text-inverted data-today:not-data-selected:text-info data-highlighted:bg-info/20 hover:not-data-selected:bg-info/20"
      }
    },
    {
      "color": "warning" as typeof color[number],
      "variant": "solid" as typeof variant[number],
      "class": {
        "cellTrigger": "data-selected:bg-warning data-selected:text-inverted data-today:not-data-selected:text-warning data-highlighted:bg-warning/20 hover:not-data-selected:bg-warning/20"
      }
    },
    {
      "color": "error" as typeof color[number],
      "variant": "solid" as typeof variant[number],
      "class": {
        "cellTrigger": "data-selected:bg-error data-selected:text-inverted data-today:not-data-selected:text-error data-highlighted:bg-error/20 hover:not-data-selected:bg-error/20"
      }
    },
    {
      "color": "primary" as typeof color[number],
      "variant": "outline" as typeof variant[number],
      "class": {
        "cellTrigger": "data-selected:ring data-selected:ring-inset data-selected:ring-primary/50 data-selected:text-primary data-selected:focus-visible:ring-primary data-today:not-data-selected:text-primary data-highlighted:bg-primary/10 hover:not-data-selected:bg-primary/10"
      }
    },
    {
      "color": "secondary" as typeof color[number],
      "variant": "outline" as typeof variant[number],
      "class": {
        "cellTrigger": "data-selected:ring data-selected:ring-inset data-selected:ring-secondary/50 data-selected:text-secondary data-selected:focus-visible:ring-secondary data-today:not-data-selected:text-secondary data-highlighted:bg-secondary/10 hover:not-data-selected:bg-secondary/10"
      }
    },
    {
      "color": "success" as typeof color[number],
      "variant": "outline" as typeof variant[number],
      "class": {
        "cellTrigger": "data-selected:ring data-selected:ring-inset data-selected:ring-success/50 data-selected:text-success data-selected:focus-visible:ring-success data-today:not-data-selected:text-success data-highlighted:bg-success/10 hover:not-data-selected:bg-success/10"
      }
    },
    {
      "color": "info" as typeof color[number],
      "variant": "outline" as typeof variant[number],
      "class": {
        "cellTrigger": "data-selected:ring data-selected:ring-inset data-selected:ring-info/50 data-selected:text-info data-selected:focus-visible:ring-info data-today:not-data-selected:text-info data-highlighted:bg-info/10 hover:not-data-selected:bg-info/10"
      }
    },
    {
      "color": "warning" as typeof color[number],
      "variant": "outline" as typeof variant[number],
      "class": {
        "cellTrigger": "data-selected:ring data-selected:ring-inset data-selected:ring-warning/50 data-selected:text-warning data-selected:focus-visible:ring-warning data-today:not-data-selected:text-warning data-highlighted:bg-warning/10 hover:not-data-selected:bg-warning/10"
      }
    },
    {
      "color": "error" as typeof color[number],
      "variant": "outline" as typeof variant[number],
      "class": {
        "cellTrigger": "data-selected:ring data-selected:ring-inset data-selected:ring-error/50 data-selected:text-error data-selected:focus-visible:ring-error data-today:not-data-selected:text-error data-highlighted:bg-error/10 hover:not-data-selected:bg-error/10"
      }
    },
    {
      "color": "primary" as typeof color[number],
      "variant": "soft" as typeof variant[number],
      "class": {
        "cellTrigger": "data-selected:bg-primary/10 data-selected:text-primary data-today:not-data-selected:text-primary data-highlighted:bg-primary/20 hover:not-data-selected:bg-primary/20"
      }
    },
    {
      "color": "secondary" as typeof color[number],
      "variant": "soft" as typeof variant[number],
      "class": {
        "cellTrigger": "data-selected:bg-secondary/10 data-selected:text-secondary data-today:not-data-selected:text-secondary data-highlighted:bg-secondary/20 hover:not-data-selected:bg-secondary/20"
      }
    },
    {
      "color": "success" as typeof color[number],
      "variant": "soft" as typeof variant[number],
      "class": {
        "cellTrigger": "data-selected:bg-success/10 data-selected:text-success data-today:not-data-selected:text-success data-highlighted:bg-success/20 hover:not-data-selected:bg-success/20"
      }
    },
    {
      "color": "info" as typeof color[number],
      "variant": "soft" as typeof variant[number],
      "class": {
        "cellTrigger": "data-selected:bg-info/10 data-selected:text-info data-today:not-data-selected:text-info data-highlighted:bg-info/20 hover:not-data-selected:bg-info/20"
      }
    },
    {
      "color": "warning" as typeof color[number],
      "variant": "soft" as typeof variant[number],
      "class": {
        "cellTrigger": "data-selected:bg-warning/10 data-selected:text-warning data-today:not-data-selected:text-warning data-highlighted:bg-warning/20 hover:not-data-selected:bg-warning/20"
      }
    },
    {
      "color": "error" as typeof color[number],
      "variant": "soft" as typeof variant[number],
      "class": {
        "cellTrigger": "data-selected:bg-error/10 data-selected:text-error data-today:not-data-selected:text-error data-highlighted:bg-error/20 hover:not-data-selected:bg-error/20"
      }
    },
    {
      "color": "primary" as typeof color[number],
      "variant": "subtle" as typeof variant[number],
      "class": {
        "cellTrigger": "data-selected:bg-primary/10 data-selected:text-primary data-selected:ring data-selected:ring-inset data-selected:ring-primary/25 data-selected:focus-visible:ring-primary data-today:not-data-selected:text-primary data-highlighted:bg-primary/20 hover:not-data-selected:bg-primary/20"
      }
    },
    {
      "color": "secondary" as typeof color[number],
      "variant": "subtle" as typeof variant[number],
      "class": {
        "cellTrigger": "data-selected:bg-secondary/10 data-selected:text-secondary data-selected:ring data-selected:ring-inset data-selected:ring-secondary/25 data-selected:focus-visible:ring-secondary data-today:not-data-selected:text-secondary data-highlighted:bg-secondary/20 hover:not-data-selected:bg-secondary/20"
      }
    },
    {
      "color": "success" as typeof color[number],
      "variant": "subtle" as typeof variant[number],
      "class": {
        "cellTrigger": "data-selected:bg-success/10 data-selected:text-success data-selected:ring data-selected:ring-inset data-selected:ring-success/25 data-selected:focus-visible:ring-success data-today:not-data-selected:text-success data-highlighted:bg-success/20 hover:not-data-selected:bg-success/20"
      }
    },
    {
      "color": "info" as typeof color[number],
      "variant": "subtle" as typeof variant[number],
      "class": {
        "cellTrigger": "data-selected:bg-info/10 data-selected:text-info data-selected:ring data-selected:ring-inset data-selected:ring-info/25 data-selected:focus-visible:ring-info data-today:not-data-selected:text-info data-highlighted:bg-info/20 hover:not-data-selected:bg-info/20"
      }
    },
    {
      "color": "warning" as typeof color[number],
      "variant": "subtle" as typeof variant[number],
      "class": {
        "cellTrigger": "data-selected:bg-warning/10 data-selected:text-warning data-selected:ring data-selected:ring-inset data-selected:ring-warning/25 data-selected:focus-visible:ring-warning data-today:not-data-selected:text-warning data-highlighted:bg-warning/20 hover:not-data-selected:bg-warning/20"
      }
    },
    {
      "color": "error" as typeof color[number],
      "variant": "subtle" as typeof variant[number],
      "class": {
        "cellTrigger": "data-selected:bg-error/10 data-selected:text-error data-selected:ring data-selected:ring-inset data-selected:ring-error/25 data-selected:focus-visible:ring-error data-today:not-data-selected:text-error data-highlighted:bg-error/20 hover:not-data-selected:bg-error/20"
      }
    },
    {
      "color": "neutral" as typeof color[number],
      "variant": "solid" as typeof variant[number],
      "class": {
        "cellTrigger": "data-selected:bg-inverted data-selected:text-inverted data-today:not-data-selected:text-highlighted data-highlighted:bg-inverted/20 hover:not-data-selected:bg-inverted/10"
      }
    },
    {
      "color": "neutral" as typeof color[number],
      "variant": "outline" as typeof variant[number],
      "class": {
        "cellTrigger": "data-selected:ring data-selected:ring-inset data-selected:ring-accented data-selected:text-default data-selected:bg-default data-selected:focus-visible:ring-inverted data-today:not-data-selected:text-highlighted data-highlighted:bg-inverted/10 hover:not-data-selected:bg-inverted/10"
      }
    },
    {
      "color": "neutral" as typeof color[number],
      "variant": "soft" as typeof variant[number],
      "class": {
        "cellTrigger": "data-selected:bg-elevated data-selected:text-default data-today:not-data-selected:text-highlighted data-highlighted:bg-inverted/20 hover:not-data-selected:bg-inverted/10"
      }
    },
    {
      "color": "neutral" as typeof color[number],
      "variant": "subtle" as typeof variant[number],
      "class": {
        "cellTrigger": "data-selected:bg-elevated data-selected:text-default data-selected:ring data-selected:ring-inset data-selected:ring-accented data-selected:focus-visible:ring-inverted data-today:not-data-selected:text-highlighted data-highlighted:bg-inverted/20 hover:not-data-selected:bg-inverted/10"
      }
    },
    {
      "size": "xs" as typeof size[number],
      "view": "day" as typeof view[number],
      "class": {
        "cellTrigger": "size-7"
      }
    },
    {
      "size": "sm" as typeof size[number],
      "view": "day" as typeof view[number],
      "class": {
        "cellTrigger": "size-7"
      }
    },
    {
      "size": "md" as typeof size[number],
      "view": "day" as typeof view[number],
      "class": {
        "cellTrigger": "size-8"
      }
    },
    {
      "size": "lg" as typeof size[number],
      "view": "day" as typeof view[number],
      "class": {
        "cellTrigger": "size-9 text-md"
      }
    },
    {
      "size": "xl" as typeof size[number],
      "view": "day" as typeof view[number],
      "class": {
        "cellTrigger": "size-10 text-lg"
      }
    },
    {
      "size": "xs" as typeof size[number],
      "view": [
        "month" as typeof view[number],
        "year" as typeof view[number]
      ],
      "class": {
        "cellTrigger": "h-7 px-2"
      }
    },
    {
      "size": "sm" as typeof size[number],
      "view": [
        "month" as typeof view[number],
        "year" as typeof view[number]
      ],
      "class": {
        "cellTrigger": "h-7 px-2"
      }
    },
    {
      "size": "md" as typeof size[number],
      "view": [
        "month" as typeof view[number],
        "year" as typeof view[number]
      ],
      "class": {
        "cellTrigger": "h-8 px-3"
      }
    },
    {
      "size": "lg" as typeof size[number],
      "view": [
        "month" as typeof view[number],
        "year" as typeof view[number]
      ],
      "class": {
        "cellTrigger": "h-9 px-4 text-md"
      }
    },
    {
      "size": "xl" as typeof size[number],
      "view": [
        "month" as typeof view[number],
        "year" as typeof view[number]
      ],
      "class": {
        "cellTrigger": "h-10 px-5 text-lg"
      }
    },
    {
      "view": "day" as typeof view[number],
      "weekNumbers": true,
      "class": {
        "gridRow": "grid-cols-8",
        "gridWeekDaysRow": "grid-cols-8 [&>*:first-child]:col-start-2"
      }
    }
  ],
  "defaultVariants": {
    "size": "md" as typeof size[number],
    "color": "primary" as typeof color[number],
    "variant": "solid" as typeof variant[number],
    "view": "day" as typeof view[number]
  }
}