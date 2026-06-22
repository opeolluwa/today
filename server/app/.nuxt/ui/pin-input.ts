const size = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl"
] as const

const variant = [
  "outline",
  "soft",
  "subtle",
  "ghost",
  "none"
] as const

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
    "root": "relative inline-flex items-center gap-1.5",
    "base": [
      "rounded-md border-0 placeholder:text-dimmed text-center disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "separator": "text-dimmed flex items-center justify-center"
  },
  "variants": {
    "size": {
      "xs": {
        "base": "size-6 text-sm/4"
      },
      "sm": {
        "base": "size-7 text-sm/4"
      },
      "md": {
        "base": "size-8 text-base/5"
      },
      "lg": {
        "base": "size-9 text-base/5"
      },
      "xl": {
        "base": "size-10 text-base"
      }
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
      "ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-highlighted bg-transparent focus:outline-none"
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "highlight": {
      "true": ""
    },
    "fixed": {
      "false": ""
    }
  },
  "compoundVariants": [
    {
      "color": "primary" as typeof color[number],
      "variant": [
        "outline" as typeof variant[number],
        "subtle" as typeof variant[number]
      ],
      "class": "outline-primary/25 focus-visible:outline-3 focus-visible:ring-primary"
    },
    {
      "color": "secondary" as typeof color[number],
      "variant": [
        "outline" as typeof variant[number],
        "subtle" as typeof variant[number]
      ],
      "class": "outline-secondary/25 focus-visible:outline-3 focus-visible:ring-secondary"
    },
    {
      "color": "success" as typeof color[number],
      "variant": [
        "outline" as typeof variant[number],
        "subtle" as typeof variant[number]
      ],
      "class": "outline-success/25 focus-visible:outline-3 focus-visible:ring-success"
    },
    {
      "color": "info" as typeof color[number],
      "variant": [
        "outline" as typeof variant[number],
        "subtle" as typeof variant[number]
      ],
      "class": "outline-info/25 focus-visible:outline-3 focus-visible:ring-info"
    },
    {
      "color": "warning" as typeof color[number],
      "variant": [
        "outline" as typeof variant[number],
        "subtle" as typeof variant[number]
      ],
      "class": "outline-warning/25 focus-visible:outline-3 focus-visible:ring-warning"
    },
    {
      "color": "error" as typeof color[number],
      "variant": [
        "outline" as typeof variant[number],
        "subtle" as typeof variant[number]
      ],
      "class": "outline-error/25 focus-visible:outline-3 focus-visible:ring-error"
    },
    {
      "color": "primary" as typeof color[number],
      "variant": [
        "soft" as typeof variant[number],
        "ghost" as typeof variant[number]
      ],
      "class": "outline-primary/25 focus-visible:outline-3"
    },
    {
      "color": "secondary" as typeof color[number],
      "variant": [
        "soft" as typeof variant[number],
        "ghost" as typeof variant[number]
      ],
      "class": "outline-secondary/25 focus-visible:outline-3"
    },
    {
      "color": "success" as typeof color[number],
      "variant": [
        "soft" as typeof variant[number],
        "ghost" as typeof variant[number]
      ],
      "class": "outline-success/25 focus-visible:outline-3"
    },
    {
      "color": "info" as typeof color[number],
      "variant": [
        "soft" as typeof variant[number],
        "ghost" as typeof variant[number]
      ],
      "class": "outline-info/25 focus-visible:outline-3"
    },
    {
      "color": "warning" as typeof color[number],
      "variant": [
        "soft" as typeof variant[number],
        "ghost" as typeof variant[number]
      ],
      "class": "outline-warning/25 focus-visible:outline-3"
    },
    {
      "color": "error" as typeof color[number],
      "variant": [
        "soft" as typeof variant[number],
        "ghost" as typeof variant[number]
      ],
      "class": "outline-error/25 focus-visible:outline-3"
    },
    {
      "color": "primary" as typeof color[number],
      "highlight": true,
      "class": "ring ring-inset ring-primary"
    },
    {
      "color": "secondary" as typeof color[number],
      "highlight": true,
      "class": "ring ring-inset ring-secondary"
    },
    {
      "color": "success" as typeof color[number],
      "highlight": true,
      "class": "ring ring-inset ring-success"
    },
    {
      "color": "info" as typeof color[number],
      "highlight": true,
      "class": "ring ring-inset ring-info"
    },
    {
      "color": "warning" as typeof color[number],
      "highlight": true,
      "class": "ring ring-inset ring-warning"
    },
    {
      "color": "error" as typeof color[number],
      "highlight": true,
      "class": "ring ring-inset ring-error"
    },
    {
      "color": "neutral" as typeof color[number],
      "variant": [
        "outline" as typeof variant[number],
        "subtle" as typeof variant[number]
      ],
      "class": "outline-inverted/25 focus-visible:outline-3 focus-visible:ring-inverted"
    },
    {
      "color": "neutral" as typeof color[number],
      "variant": [
        "soft" as typeof variant[number],
        "ghost" as typeof variant[number]
      ],
      "class": "outline-inverted/25 focus-visible:outline-3"
    },
    {
      "color": "neutral" as typeof color[number],
      "highlight": true,
      "class": "ring ring-inset ring-inverted"
    },
    {
      "fixed": false,
      "size": "xs" as typeof size[number],
      "class": "md:text-xs"
    },
    {
      "fixed": false,
      "size": "sm" as typeof size[number],
      "class": "md:text-xs"
    },
    {
      "fixed": false,
      "size": "md" as typeof size[number],
      "class": "md:text-sm"
    },
    {
      "fixed": false,
      "size": "lg" as typeof size[number],
      "class": "md:text-sm"
    }
  ],
  "defaultVariants": {
    "size": "md" as typeof size[number],
    "color": "primary" as typeof color[number],
    "variant": "outline" as typeof variant[number]
  }
}