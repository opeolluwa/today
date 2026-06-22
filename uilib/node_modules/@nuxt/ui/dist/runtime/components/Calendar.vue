<script>
import { getWeekNumber } from "reka-ui/date";
import { getLocalTimeZone, today } from "@internationalized/date";
import theme from "#build/ui/calendar";
</script>

<script setup>
import { computed, ref, shallowRef, watch } from "vue";
import { useForwardProps } from "../composables/useForwardProps";
import { Calendar as SingleCalendar, RangeCalendar, MonthPicker, MonthRangePicker, YearPicker, YearRangePicker } from "reka-ui/namespaced";
import { reactiveOmit } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useLocale } from "../composables/useLocale";
import { tv } from "../utils/tv";
import UButton from "./Button.vue";
const _props = defineProps({
  as: { type: null, required: false },
  type: { type: String, required: false, default: "date" },
  nextYearIcon: { type: null, required: false },
  nextYear: { type: Object, required: false },
  nextMonthIcon: { type: null, required: false },
  nextMonth: { type: Object, required: false },
  prevYearIcon: { type: null, required: false },
  prevYear: { type: Object, required: false },
  prevMonthIcon: { type: null, required: false },
  prevMonth: { type: Object, required: false },
  viewControl: { type: [Boolean, Object], required: false, default: true },
  color: { type: null, required: false },
  variant: { type: null, required: false },
  size: { type: null, required: false },
  range: { type: Boolean, required: false },
  multiple: { type: Boolean, required: false },
  monthControls: { type: Boolean, required: false, default: true },
  yearControls: { type: Boolean, required: false, default: true },
  defaultValue: { type: null, required: false },
  modelValue: { type: null, required: false },
  weekNumbers: { type: Boolean, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  defaultPlaceholder: { type: Object, required: false },
  placeholder: { type: Object, required: false },
  allowNonContiguousRanges: { type: Boolean, required: false },
  pagedNavigation: { type: Boolean, required: false },
  preventDeselect: { type: Boolean, required: false },
  maximumDays: { type: Number, required: false },
  weekStartsOn: { type: Number, required: false },
  weekdayFormat: { type: String, required: false },
  fixedWeeks: { type: Boolean, required: false, default: true },
  maxValue: { type: Object, required: false },
  minValue: { type: Object, required: false },
  locale: { type: String, required: false },
  numberOfMonths: { type: Number, required: false },
  disabled: { type: Boolean, required: false },
  readonly: { type: Boolean, required: false },
  initialFocus: { type: Boolean, required: false },
  isDateDisabled: { type: Function, required: false },
  isDateUnavailable: { type: Function, required: false },
  isDateHighlightable: { type: Function, required: false },
  nextPage: { type: Function, required: false },
  prevPage: { type: Function, required: false },
  disableDaysOutsideCurrentView: { type: Boolean, required: false },
  fixedDate: { type: String, required: false },
  isMonthDisabled: { type: Function, required: false },
  isMonthUnavailable: { type: Function, required: false },
  isYearDisabled: { type: Function, required: false },
  isYearUnavailable: { type: Function, required: false }
});
const emits = defineEmits(["update:modelValue", "update:placeholder", "update:startValue", "update:validModelValue"]);
defineSlots();
const props = useComponentProps("calendar", _props);
const { dir, t, locale } = useLocale();
const appConfig = useAppConfig();
const VIEWS = ["day", "month", "year"];
const minView = computed(() => props.type === "year" ? "year" : props.type === "month" ? "month" : "day");
const maxView = "year";
const view = ref(minView.value);
watch(() => props.type, () => {
  view.value = minView.value;
});
const switchable = computed(() => minView.value !== maxView);
const isMinView = computed(() => view.value === minView.value);
function clampView(value) {
  const min = VIEWS.indexOf(minView.value);
  const max = VIEWS.indexOf(maxView);
  return VIEWS[Math.min(Math.max(VIEWS.indexOf(value), min), max)];
}
function setView(value) {
  view.value = clampView(value);
}
function cycleView() {
  const max = VIEWS.indexOf(maxView);
  const next = VIEWS.indexOf(view.value) >= max ? minView.value : VIEWS[VIEWS.indexOf(view.value) + 1];
  view.value = next;
}
function resolveDateValue(value) {
  if (Array.isArray(value)) {
    return value[0];
  }
  if (!value) {
    return void 0;
  }
  if ("start" in value || "end" in value) {
    const range = value;
    return range.start ?? range.end ?? void 0;
  }
  return value;
}
const placeholder = shallowRef(
  props.placeholder ?? resolveDateValue(props.modelValue) ?? resolveDateValue(props.defaultValue) ?? today(getLocalTimeZone())
);
watch(() => props.placeholder, (value) => {
  if (value) {
    placeholder.value = value;
  }
});
function setPlaceholder(date) {
  placeholder.value = date;
  emits("update:placeholder", date);
}
function onSelect(value) {
  if (isMinView.value) {
    emits("update:modelValue", value);
    return;
  }
  const resolved = resolveDateValue(value);
  if (resolved) {
    setPlaceholder(resolved);
  }
  setView(VIEWS[VIEWS.indexOf(view.value) - 1]);
}
function paginateYear(date, sign) {
  return sign === -1 ? date.subtract({ years: 1 }) : date.add({ years: 1 });
}
const Picker = computed(() => {
  const range = props.range && isMinView.value;
  if (view.value === "year") {
    return range ? YearRangePicker : YearPicker;
  }
  if (view.value === "month") {
    return range ? MonthRangePicker : MonthPicker;
  }
  return props.range ? RangeCalendar : SingleCalendar;
});
const omittedProps = ["type", "placeholder", "range", "modelValue", "defaultValue", "color", "variant", "size", "monthControls", "yearControls", "viewControl", "class", "ui"];
const dayOnlyProps = ["pagedNavigation", "weekStartsOn", "weekdayFormat", "fixedWeeks", "numberOfMonths", "isDateDisabled", "isDateUnavailable", "isDateHighlightable", "disableDaysOutsideCurrentView", "maximumDays"];
const monthOnlyProps = ["isMonthDisabled", "isMonthUnavailable"];
const yearOnlyProps = ["isYearDisabled", "isYearUnavailable"];
const rangeOnlyProps = ["allowNonContiguousRanges", "fixedDate"];
const rootProps = useForwardProps(reactiveOmit(
  props,
  (_, key) => omittedProps.includes(key) || view.value !== "day" && dayOnlyProps.includes(key) || view.value !== "month" && monthOnlyProps.includes(key) || view.value !== "year" && yearOnlyProps.includes(key) || !isMinView.value && rangeOnlyProps.includes(key)
));
function cellProps(cellDate, monthValue) {
  if (view.value === "month") {
    return { month: cellDate };
  }
  if (view.value === "year") {
    return { year: cellDate };
  }
  return { day: cellDate, month: monthValue };
}
const nextYearIcon = computed(() => props.nextYearIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronDoubleLeft : appConfig.ui.icons.chevronDoubleRight));
const nextMonthIcon = computed(() => props.nextMonthIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronLeft : appConfig.ui.icons.chevronRight));
const prevYearIcon = computed(() => props.prevYearIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronDoubleRight : appConfig.ui.icons.chevronDoubleLeft));
const prevMonthIcon = computed(() => props.prevMonthIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronRight : appConfig.ui.icons.chevronLeft));
const prevLabel = computed(() => view.value === "day" ? t("calendar.prevMonth") : t("calendar.prevYear"));
const nextLabel = computed(() => view.value === "day" ? t("calendar.nextMonth") : t("calendar.nextYear"));
const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.calendar || {} })({
  color: props.color,
  size: props.size,
  variant: props.variant,
  weekNumbers: props.weekNumbers,
  view: view.value
}));
</script>

<template>
  <Picker.Root
    v-slot="{ weekDays, grid, date }"
    v-bind="rootProps"
    :model-value="isMinView ? props.modelValue : void 0"
    :default-value="isMinView ? props.defaultValue : void 0"
    :placeholder="placeholder"
    data-slot="root"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    @update:placeholder="setPlaceholder"
    @update:model-value="onSelect"
    @update:start-value="(value) => emits('update:startValue', value)"
    @update:valid-model-value="(value) => emits('update:validModelValue', value)"
  >
    <Picker.Header data-slot="header" :class="ui.header({ class: props.ui?.header })">
      <Picker.Prev v-if="view === 'day' && props.yearControls" :prev-page="(date) => paginateYear(date, -1)" :aria-label="t('calendar.prevYear')" as-child>
        <UButton :icon="prevYearIcon" :size="props.size" color="neutral" variant="ghost" v-bind="props.prevYear" />
      </Picker.Prev>
      <Picker.Prev v-if="view !== 'day' || props.monthControls" :aria-label="prevLabel" as-child>
        <UButton :icon="prevMonthIcon" :size="props.size" color="neutral" variant="ghost" v-bind="props.prevMonth" />
      </Picker.Prev>
      <Picker.Heading v-slot="{ headingValue }" data-slot="heading" :class="ui.heading({ class: props.ui?.heading })">
        <slot
          name="heading"
          :value="headingValue"
          :view="view"
          :date="date"
          :set-view="setView"
          :set-placeholder="setPlaceholder"
        >
          <UButton
            v-if="switchable && props.viewControl"
            :label="headingValue"
            :size="props.size"
            color="neutral"
            variant="ghost"
            block
            v-bind="typeof props.viewControl === 'object' ? props.viewControl : {}"
            @click="cycleView"
          />
          <span v-else data-slot="headingLabel" :class="ui.headingLabel({ class: props.ui?.headingLabel })">{{ headingValue }}</span>
        </slot>
      </Picker.Heading>
      <Picker.Next v-if="view !== 'day' || props.monthControls" :aria-label="nextLabel" as-child>
        <UButton :icon="nextMonthIcon" :size="props.size" color="neutral" variant="ghost" v-bind="props.nextMonth" />
      </Picker.Next>
      <Picker.Next v-if="view === 'day' && props.yearControls" :next-page="(date) => paginateYear(date, 1)" :aria-label="t('calendar.nextYear')" as-child>
        <UButton :icon="nextYearIcon" :size="props.size" color="neutral" variant="ghost" v-bind="props.nextYear" />
      </Picker.Next>
    </Picker.Header>
    <div data-slot="body" :class="ui.body({ class: props.ui?.body })">
      <Picker.Grid
        v-for="month in Array.isArray(grid) ? grid : [grid]"
        :key="month.value.toString()"
        data-slot="grid"
        :class="ui.grid({ class: props.ui?.grid })"
      >
        <Picker.GridHead v-if="'GridHead' in Picker">
          <Picker.GridRow data-slot="gridWeekDaysRow" :class="ui.gridWeekDaysRow({ class: props.ui?.gridWeekDaysRow })">
            <Picker.HeadCell
              v-for="day in weekDays"
              :key="day"
              data-slot="headCell"
              :class="ui.headCell({ class: props.ui?.headCell })"
            >
              <slot name="week-day" :day="day">
                {{ day }}
              </slot>
            </Picker.HeadCell>
          </Picker.GridRow>
        </Picker.GridHead>
        <Picker.GridBody data-slot="gridBody" :class="ui.gridBody({ class: props.ui?.gridBody })">
          <Picker.GridRow
            v-for="(row, index) in month.rows"
            :key="`row-${index}`"
            data-slot="gridRow"
            :class="ui.gridRow({ class: props.ui?.gridRow })"
          >
            <td
              v-if="view === 'day' && props.weekNumbers && row[0]"
              role="gridcell"
              data-slot="cellWeek"
              :class="ui.cellWeek({ class: props.ui?.cellWeek })"
            >
              {{ getWeekNumber(row[0], props.locale ?? locale.code) }}
            </td>
            <Picker.Cell
              v-for="cellDate in row"
              :key="cellDate.toString()"
              :date="cellDate"
              data-slot="cell"
              :class="ui.cell({ class: props.ui?.cell })"
            >
              <Picker.CellTrigger
                v-slot="cell"
                v-bind="cellProps(cellDate, month.value)"
                data-slot="cellTrigger"
                :class="ui.cellTrigger({ class: props.ui?.cellTrigger })"
              >
                <slot v-if="view === 'day'" name="day" :day="cellDate">
                  {{ cellDate.day }}
                </slot>
                <slot v-else-if="view === 'month'" name="month-cell" :month="cellDate" :selected="cell.selected" :disabled="cell.disabled">
                  {{ cell.monthValue }}
                </slot>
                <slot v-else name="year-cell" :year="cellDate" :selected="cell.selected" :disabled="cell.disabled">
                  {{ cell.yearValue }}
                </slot>
              </Picker.CellTrigger>
            </Picker.Cell>
          </Picker.GridRow>
        </Picker.GridBody>
      </Picker.Grid>
    </div>
  </Picker.Root>
</template>
