const color = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "error",
  "neutral"
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

const position = [
  "start",
  "center",
  "end"
] as const

const type = [
  "solid",
  "dashed",
  "dotted"
] as const

export default {
  "slots": {
    "root": "flex items-center align-center text-center",
    "border": "",
    "container": "font-medium text-default flex",
    "icon": "shrink-0 size-5",
    "avatar": "shrink-0",
    "avatarSize": "2xs",
    "label": "text-sm"
  },
  "variants": {
    "color": {
      "primary": {
        "border": "border-primary"
      },
      "secondary": {
        "border": "border-secondary"
      },
      "success": {
        "border": "border-success"
      },
      "info": {
        "border": "border-info"
      },
      "warning": {
        "border": "border-warning"
      },
      "error": {
        "border": "border-error"
      },
      "neutral": {
        "border": "border-default"
      }
    },
    "orientation": {
      "horizontal": {
        "root": "w-full flex-row",
        "border": "w-full",
        "container": "whitespace-nowrap"
      },
      "vertical": {
        "root": "h-full flex-col",
        "border": "h-full",
        "container": ""
      }
    },
    "size": {
      "xs": "",
      "sm": "",
      "md": "",
      "lg": "",
      "xl": ""
    },
    "position": {
      "start": "",
      "center": "",
      "end": ""
    },
    "type": {
      "solid": {
        "border": "border-solid"
      },
      "dashed": {
        "border": "border-dashed"
      },
      "dotted": {
        "border": "border-dotted"
      }
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal" as typeof orientation[number],
      "position": "start" as typeof position[number],
      "class": {
        "container": "me-3"
      }
    },
    {
      "orientation": "horizontal" as typeof orientation[number],
      "position": "center" as typeof position[number],
      "class": {
        "container": "mx-3"
      }
    },
    {
      "orientation": "horizontal" as typeof orientation[number],
      "position": "end" as typeof position[number],
      "class": {
        "container": "ms-3"
      }
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "position": "start" as typeof position[number],
      "class": {
        "container": "mb-2"
      }
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "position": "center" as typeof position[number],
      "class": {
        "container": "my-2"
      }
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "position": "end" as typeof position[number],
      "class": {
        "container": "mt-2"
      }
    },
    {
      "orientation": "horizontal" as typeof orientation[number],
      "size": "xs" as typeof size[number],
      "class": {
        "border": "border-t"
      }
    },
    {
      "orientation": "horizontal" as typeof orientation[number],
      "size": "sm" as typeof size[number],
      "class": {
        "border": "border-t-[2px]"
      }
    },
    {
      "orientation": "horizontal" as typeof orientation[number],
      "size": "md" as typeof size[number],
      "class": {
        "border": "border-t-[3px]"
      }
    },
    {
      "orientation": "horizontal" as typeof orientation[number],
      "size": "lg" as typeof size[number],
      "class": {
        "border": "border-t-[4px]"
      }
    },
    {
      "orientation": "horizontal" as typeof orientation[number],
      "size": "xl" as typeof size[number],
      "class": {
        "border": "border-t-[5px]"
      }
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "size": "xs" as typeof size[number],
      "class": {
        "border": "border-s"
      }
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "size": "sm" as typeof size[number],
      "class": {
        "border": "border-s-[2px]"
      }
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "size": "md" as typeof size[number],
      "class": {
        "border": "border-s-[3px]"
      }
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "size": "lg" as typeof size[number],
      "class": {
        "border": "border-s-[4px]"
      }
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "size": "xl" as typeof size[number],
      "class": {
        "border": "border-s-[5px]"
      }
    }
  ],
  "defaultVariants": {
    "color": "neutral" as typeof color[number],
    "size": "xs" as typeof size[number],
    "type": "solid" as typeof type[number]
  }
}