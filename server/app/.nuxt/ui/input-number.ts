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

const variant = [
  "outline",
  "soft",
  "subtle",
  "ghost",
  "none"
] as const

const orientation = [
  "horizontal",
  "vertical"
] as const

export default {
  "slots": {
    "root": "relative inline-flex items-center",
    "base": [
      "w-full rounded-md border-0 placeholder:text-dimmed disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "increment": "absolute flex items-center",
    "decrement": "absolute flex items-center"
  },
  "variants": {
    "fieldGroup": {
      "horizontal": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none"
      },
      "vertical": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none"
      }
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
    "size": {
      "xs": "px-2 py-1 text-sm/4 gap-1",
      "sm": "px-2.5 py-1.5 text-sm/4 gap-1.5",
      "md": "px-2.5 py-1.5 text-base/5 gap-1.5",
      "lg": "px-3 py-2 text-base/5 gap-2",
      "xl": "px-3 py-2 text-base gap-2"
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
      "ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-highlighted bg-transparent focus:outline-none"
    },
    "disabled": {
      "true": {
        "increment": "opacity-75 cursor-not-allowed",
        "decrement": "opacity-75 cursor-not-allowed"
      }
    },
    "orientation": {
      "horizontal": {
        "base": "text-center",
        "increment": "inset-y-0 end-0 pe-1",
        "decrement": "inset-y-0 start-0 ps-1"
      },
      "vertical": {
        "increment": "top-0 end-0 pe-1 [&>button]:py-0 scale-80",
        "decrement": "bottom-0 end-0 pe-1 [&>button]:py-0 scale-80"
      }
    },
    "highlight": {
      "true": ""
    },
    "fixed": {
      "false": ""
    },
    "increment": {
      "false": ""
    },
    "decrement": {
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
      "orientation": "horizontal" as typeof orientation[number],
      "decrement": false,
      "class": "text-start"
    },
    {
      "decrement": true,
      "size": "xs" as typeof size[number],
      "class": "ps-7"
    },
    {
      "decrement": true,
      "size": "sm" as typeof size[number],
      "class": "ps-8"
    },
    {
      "decrement": true,
      "size": "md" as typeof size[number],
      "class": "ps-9"
    },
    {
      "decrement": true,
      "size": "lg" as typeof size[number],
      "class": "ps-10"
    },
    {
      "decrement": true,
      "size": "xl" as typeof size[number],
      "class": "ps-11"
    },
    {
      "increment": true,
      "size": "xs" as typeof size[number],
      "class": "pe-7"
    },
    {
      "increment": true,
      "size": "sm" as typeof size[number],
      "class": "pe-8"
    },
    {
      "increment": true,
      "size": "md" as typeof size[number],
      "class": "pe-9"
    },
    {
      "increment": true,
      "size": "lg" as typeof size[number],
      "class": "pe-10"
    },
    {
      "increment": true,
      "size": "xl" as typeof size[number],
      "class": "pe-11"
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