const size = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl"
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
    "root": "flex flex-col min-h-0 min-w-0 ring ring-inset ring-default rounded-lg overflow-hidden",
    "input": "border-b border-default",
    "content": "relative overflow-y-auto flex-1 max-h-60 scroll-py-1 focus:outline-none",
    "group": "p-1 isolate",
    "label": "font-semibold text-highlighted",
    "separator": "-mx-1 my-1 h-px bg-border",
    "empty": "text-center text-muted",
    "loading": "flex items-center justify-center text-muted",
    "loadingIcon": "animate-spin shrink-0",
    "item": [
      "group relative w-full flex items-start select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75 text-default data-highlighted:not-data-disabled:text-highlighted data-highlighted:not-data-disabled:before:bg-elevated/50",
      "transition-colors before:transition-colors"
    ],
    "itemLeadingIcon": [
      "shrink-0 text-dimmed group-data-highlighted:not-group-data-disabled:text-default",
      "transition-colors"
    ],
    "itemLeadingAvatar": "shrink-0",
    "itemLeadingAvatarSize": "",
    "itemLeadingChip": "shrink-0",
    "itemLeadingChipSize": "",
    "itemWrapper": "flex-1 flex flex-col min-w-0",
    "itemLabel": "truncate",
    "itemDescription": "truncate text-muted",
    "itemTrailing": "ms-auto inline-flex gap-1.5 items-center",
    "itemTrailingIcon": "shrink-0"
  },
  "variants": {
    "size": {
      "xs": {
        "label": "p-1 text-[10px]/3 gap-1",
        "empty": "py-3 text-xs",
        "loading": "py-3",
        "loadingIcon": "size-4",
        "item": "p-1 text-xs gap-1",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailingIcon": "size-4"
      },
      "sm": {
        "label": "p-1.5 text-[10px]/3 gap-1.5",
        "empty": "py-4 text-xs",
        "loading": "py-4",
        "loadingIcon": "size-4",
        "item": "p-1.5 text-xs gap-1.5",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailingIcon": "size-4"
      },
      "md": {
        "label": "p-1.5 text-xs gap-1.5",
        "empty": "py-6 text-sm",
        "loading": "py-6",
        "loadingIcon": "size-5",
        "item": "p-1.5 text-sm gap-1.5",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailingIcon": "size-5"
      },
      "lg": {
        "label": "p-2 text-xs gap-2",
        "empty": "py-7 text-sm",
        "loading": "py-7",
        "loadingIcon": "size-5",
        "item": "p-2 text-sm gap-2",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailingIcon": "size-5"
      },
      "xl": {
        "label": "p-2 text-sm gap-2",
        "empty": "py-8 text-base",
        "loading": "py-8",
        "loadingIcon": "size-6",
        "item": "p-2 text-base gap-2",
        "itemLeadingIcon": "size-6",
        "itemLeadingAvatarSize": "xs",
        "itemLeadingChip": "size-6",
        "itemLeadingChipSize": "lg",
        "itemTrailingIcon": "size-6",
        "itemDescription": "text-sm"
      }
    },
    "color": {
      "primary": {
        "root": "outline-primary/25 has-focus-visible:outline-3 has-focus-visible:ring-primary"
      },
      "secondary": {
        "root": "outline-secondary/25 has-focus-visible:outline-3 has-focus-visible:ring-secondary"
      },
      "success": {
        "root": "outline-success/25 has-focus-visible:outline-3 has-focus-visible:ring-success"
      },
      "info": {
        "root": "outline-info/25 has-focus-visible:outline-3 has-focus-visible:ring-info"
      },
      "warning": {
        "root": "outline-warning/25 has-focus-visible:outline-3 has-focus-visible:ring-warning"
      },
      "error": {
        "root": "outline-error/25 has-focus-visible:outline-3 has-focus-visible:ring-error"
      },
      "neutral": {
        "root": "outline-inverted/25 has-focus-visible:outline-3 has-focus-visible:ring-inverted"
      }
    },
    "virtualize": {
      "true": {
        "content": "p-1 isolate"
      },
      "false": {
        "content": "divide-y divide-default"
      }
    },
    "disabled": {
      "true": {
        "root": "opacity-75 cursor-not-allowed"
      }
    },
    "highlight": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "color": "primary" as typeof color[number],
      "highlight": true,
      "class": {
        "root": "ring ring-inset ring-primary"
      }
    },
    {
      "color": "secondary" as typeof color[number],
      "highlight": true,
      "class": {
        "root": "ring ring-inset ring-secondary"
      }
    },
    {
      "color": "success" as typeof color[number],
      "highlight": true,
      "class": {
        "root": "ring ring-inset ring-success"
      }
    },
    {
      "color": "info" as typeof color[number],
      "highlight": true,
      "class": {
        "root": "ring ring-inset ring-info"
      }
    },
    {
      "color": "warning" as typeof color[number],
      "highlight": true,
      "class": {
        "root": "ring ring-inset ring-warning"
      }
    },
    {
      "color": "error" as typeof color[number],
      "highlight": true,
      "class": {
        "root": "ring ring-inset ring-error"
      }
    },
    {
      "color": "neutral" as typeof color[number],
      "highlight": true,
      "class": {
        "root": "ring ring-inset ring-inverted"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary" as typeof color[number],
    "size": "md" as typeof size[number]
  }
}